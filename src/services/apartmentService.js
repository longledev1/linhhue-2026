import { supabase } from "../config/supabaseClient";

const getStoragePathFromUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const marker = "/apartments/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.substring(index + marker.length);
};

export const apartmentService = {
  /**
   * Danh sách căn hộ hiển thị ngoài website công cộng
   */
  getAll: async (offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    const { data, error, count } = await supabase
      .from("apartments")
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
   * Danh sách tất cả căn hộ cho Admin (Đã tích hợp lọc Province)
   */
  getAllForAdmin: async (page, limit, filters = {}) => {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      // 1. Khởi tạo câu query gốc từ bảng apartments
      let query = supabase.from("apartments").select("*", { count: "exact" });

      // 🌟 2. KIỂM TRA VÀ ĐẮP BỘ LỌC ĐỘNG TỪ ĐÂY:

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

      // Lọc theo số lượng Phòng ngủ
      if (filters.bedroom) {
        query = query.eq("bedroom", filters.bedroom);
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
      console.error("Lỗi getAllForAdmin Service:", error);
      throw error;
    }
  },

  /**
   * Danh sách căn hộ tiêu biểu
   */
  getFeatured: async () => {
    const { data, error } = await supabase
      .from("apartments")
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
   * Chi tiết căn hộ theo ID
   */
  getById: async (id) => {
    if (!id) throw new Error("ID không hợp lệ");

    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Thêm mới căn hộ
   */
  create: async (payload) => {
    const { data, error } = await supabase
      .from("apartments")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Cập nhật căn hộ
   */
  update: async (id, payload) => {
    const { data, error } = await supabase
      .from("apartments")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Xóa căn hộ và dọn dẹp bộ nhớ ảnh
   */
  delete: async (id) => {
    if (!id) throw new Error("ID không hợp lệ");

    const { data: apartment, error: fetchError } = await supabase
      .from("apartments")
      .select("thumbnail, images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const filesToDelete = [];

    if (apartment?.thumbnail) {
      const thumbFile = getStoragePathFromUrl(apartment.thumbnail);
      if (thumbFile) filesToDelete.push(thumbFile);
    }

    if (apartment?.images && Array.isArray(apartment.images)) {
      apartment.images.forEach((url) => {
        if (url) {
          const slideFile = getStoragePathFromUrl(url);
          if (slideFile) filesToDelete.push(slideFile);
        }
      });
    }

    if (filesToDelete.length > 0) {
      const { data: removedFiles, error: storageError } = await supabase.storage
        .from("apartments")
        .remove(filesToDelete);

      if (storageError) {
        console.error("❌ Lỗi Storage:", storageError);
        throw storageError;
      }
    }

    const { error: dbError } = await supabase
      .from("apartments")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return true;
  },

  /**
   * Lấy danh sách căn hộ gợi ý ngẫu nhiên
   */
  getSuggestions: async (currentId, limitCount = 6) => {
    if (!currentId) return [];

    const { data, error } = await supabase
      .from("apartments")
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
   * Bộ lọc căn hộ ngoài client nâng cao (Đã tích hợp lọc Province)
   */
  getFiltered: async (filters, offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    let query = supabase
      .from("apartments")
      .select("*", { count: "exact" })
      .eq("is_published", true);

    // 🌟 THÊM MỚI: Đắp bộ lọc tỉnh thành động ngoài Client công cộng
    if (filters.province) {
      query = query.eq("province", filters.province);
    }

    if (filters.ward) {
      query = query.eq("ward", filters.ward);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.apartment_type) {
      query = query.eq("apartment_type", filters.apartment_type);
    }

    if (filters.bedroom) {
      query = query.eq("bedroom", Number(filters.bedroom));
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

  /**
   * 10 căn hộ mới nhất cho trang chủ
   */
  getLatest: async (limit = 10) => {
    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  },
};
