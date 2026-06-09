import { supabase } from "../config/supabaseClient";

/**
 * 🌟 Bóc tách đường dẫn lưu trữ từ URL để phục vụ khâu dọn rác file
 * URL mẫu: https://xxx.supabase.co/storage/v1/object/public/apartments/lands/anh_so_do.webp
 * Kết quả trả về: "lands/anh_so_do.webp"
 */
const getStoragePathFromUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const marker = "/apartments/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.substring(index + marker.length);
};

export const landService = {
  /**
   * 🌟 Danh sách đất nền hiển thị ngoài website công cộng (Có phân trang)
   */
  getAll: async (offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    const { data, error, count } = await supabase
      .from("lands")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data || [],
      totalCount: count || 0,
    };
  },

  /**
   * 🌟 Danh sách tất cả đất nền phục vụ trang quản trị Admin (Đã tích hợp lọc Province)
   */
  getAllForAdmin: async (page, limit, filters = {}) => {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      // 1. Khởi tạo câu query gốc từ bảng lands
      let query = supabase.from("lands").select("*", { count: "exact" });

      // 🌟 2. XỬ LÝ BỘ LỌC ĐỘNG TỪ ADMIN:

      // Tìm kiếm chính xác theo mã ID bài đăng
      if (filters.id) {
        query = query.eq("id", filters.id);
      }

      // 🌟 THÊM MỚI: Lọc theo Tỉnh / Thành phố cho Admin
      if (filters.province) {
        query = query.eq("province", filters.province);
      }

      // Lọc theo Phường/Xã
      if (filters.ward) {
        query = query.eq("ward", filters.ward);
      }

      // Lọc theo Hình thức (rent / sale)
      if (filters.status) {
        query = query.eq("status", filters.status);
      }

      // Lọc theo trạng thái Ẩn / Hiện (is_published)
      if (filters.is_published) {
        const isPublishedBool = filters.is_published === "true";
        query = query.eq("is_published", isPublishedBool);
      }

      // 3. Thực hiện phân trang và sắp xếp ngày tạo mới nhất
      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data: data || [],
        total: count || 0,
      };
    } catch (error) {
      console.error("Lỗi getAllForAdmin Land Service:", error);
      throw error;
    }
  },

  /**
   * 🌟 Danh sách đất nền tiêu biểu (Featured Lands)
   */
  getFeatured: async () => {
    const { data, error } = await supabase
      .from("lands")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("featured_at", {
        ascending: false,
      });

    if (error) throw error;

    return data || [];
  },

  /**
   * 🌟 Chi tiết lô đất theo ID
   */
  getById: async (id) => {
    if (!id) throw new Error("ID đất nền không hợp lệ");

    const { data, error } = await supabase
      .from("lands")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * 🌟 Thêm mới bài đăng đất nền
   */
  create: async (payload) => {
    const { data, error } = await supabase
      .from("lands")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * 🌟 Cập nhật thông tin lô đất
   */
  update: async (id, payload) => {
    const { data, error } = await supabase
      .from("lands")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * 🌟 Xóa bài đăng đất nền và tự động dọn sạch rác hình ảnh trong folder apartments/lands/
   */
  delete: async (id) => {
    if (!id) throw new Error("ID đất nền không hợp lệ");

    // 1. Lấy thông tin URL ảnh trước khi xóa record
    const { data: land, error: fetchError } = await supabase
      .from("lands")
      .select("thumbnail, images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const filesToDelete = [];

    // Trích xuất path ảnh bìa đại diện
    if (land?.thumbnail) {
      const thumbPath = getStoragePathFromUrl(land.thumbnail);
      if (thumbPath) filesToDelete.push(thumbPath);
    }

    // Trích xuất mảng path ảnh album
    if (land?.images && Array.isArray(land.images)) {
      land.images.forEach((url) => {
        if (url) {
          const slidePath = getStoragePathFromUrl(url);
          if (slidePath) filesToDelete.push(slidePath);
        }
      });
    }

    // 2. Tiến hành xóa các file vật lý trong Supabase Storage nếu có dữ liệu hợp lệ
    if (filesToDelete.length > 0) {
      const { data: removedFiles, error: storageError } = await supabase.storage
        .from("apartments")
        .remove(filesToDelete);

      if (storageError) {
        console.error("❌ Lỗi Storage khi xóa đất nền:", storageError.message);
        throw storageError;
      }
    }

    // 3. Xóa dòng dữ liệu trong bảng dữ liệu gốc
    const { error: dbError } = await supabase
      .from("lands")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return true;
  },

  /**
   * 🌟 Lấy danh sách lô đất gợi ý ngẫu nhiên (Loại trừ căn đang xem)
   */
  getSuggestions: async (currentId, limitCount = 6) => {
    if (!currentId) return [];

    const { data, error } = await supabase
      .from("lands")
      .select("*")
      .eq("is_published", true)
      .neq("id", currentId)
      .limit(30);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, limitCount);
  },

  /**
   * 🌟 BỘ LỌC ĐẶC THÙ CHO ĐẤT NỀN (Đã tích hợp lọc Province)
   */
  getFiltered: async (filters, offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    let query = supabase
      .from("lands")
      .select("*", { count: "exact" })
      .eq("is_published", true);

    // 🌟 THÊM MỚI: Đắp bộ lọc tỉnh thành động ngoài Client công cộng cho Đất nền
    if (filters.province) {
      query = query.eq("province", filters.province);
    }

    if (filters.ward) {
      query = query.eq("ward", filters.ward);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.land_type) {
      query = query.eq("land_type", filters.land_type);
    }

    if (filters.price) {
      const [minPrice, maxPrice] = filters.price.split("-");
      query = query
        .gte("price", Number(minPrice))
        .lte("price", Number(maxPrice));
    }

    if (filters.area) {
      const [minArea, maxArea] = filters.area.split("-");
      query = query.gte("area", Number(minArea)).lte("area", Number(maxArea));
    }

    query = query.order("created_at", { ascending: false }).range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      totalCount: count || 0,
    };
  },
};
