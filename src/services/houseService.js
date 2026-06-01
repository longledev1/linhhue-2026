import { supabase } from "../config/supabaseClient";

const getStoragePathFromUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const marker = "/apartments/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.substring(index + marker.length);
};

export const houseService = {
  getAll: async (offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    const { data, error, count } = await supabase
      .from("houses")
      .select("*", { count: "exact" }) // <-- Thêm mới đếm chính xác số tổng dòng
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data || [],
      totalCount: count || 0, // <-- Gán biến đếm chính xác thay cho data.length
    };
  },

  /**
   * Danh sách tất cả nhà cho Admin
   */
  getAllForAdmin: async () => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  /**
   * Danh sách nhà tiêu biểu
   */
  getFeatured: async () => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  /**
   * Chi tiết nhà theo ID
   */
  getById: async (id) => {
    if (!id) throw new Error("ID không hợp lệ");

    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Thêm mới nhà
   */
  create: async (payload) => {
    const { data, error } = await supabase
      .from("houses")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Cập nhật nhà
   */
  update: async (id, payload) => {
    const { data, error } = await supabase
      .from("houses")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * Xóa nhà và dọn sạch Storage bảo mật
   */
  delete: async (id) => {
    if (!id) throw new Error("ID không hợp lệ");

    const { data: house, error: fetchError } = await supabase
      .from("houses")
      .select("thumbnail, images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const filesToDelete = [];

    if (house?.thumbnail) {
      const thumbPath = getStoragePathFromUrl(house.thumbnail);
      if (thumbPath) filesToDelete.push(thumbPath);
    }

    if (house?.images && Array.isArray(house.images)) {
      house.images.forEach((url) => {
        if (url) {
          const slidePath = getStoragePathFromUrl(url);
          if (slidePath) filesToDelete.push(slidePath);
        }
      });
    }

    if (filesToDelete.length > 0) {
      const { data: removedFiles, error: storageError } = await supabase.storage
        .from("apartments")
        .remove(filesToDelete);

      if (storageError) {
        console.error("❌ Lỗi dọn rác Storage:", storageError.message);
        throw storageError;
      }
    }

    const { error: dbError } = await supabase
      .from("houses")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return true;
  },

  /**
   * Lấy danh sách nhà gợi ý ngẫu nhiên
   */
  getSuggestions: async (currentId, limitCount = 6) => {
    if (!currentId) return [];

    const { data, error } = await supabase
      .from("houses")
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
   * Bộ lọc nâng cao nhà ở bên ngoài Client
   */
  getFiltered: async (filters, offset = 0, limit = 12) => {
    const from = offset;
    const to = offset + limit - 1;

    let query = supabase
      .from("houses")
      .select("*", { count: "exact" })
      .eq("is_published", true);

    if (filters.ward) {
      query = query.eq("ward", filters.ward);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.house_type) {
      query = query.eq("house_type", filters.house_type);
    }

    if (filters.bedroom) {
      // Tránh ép kiểu chuỗi trống sang 0 sai mục đích
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

  // 3 CĂN NHÀ MỚI NHẤT CHO TRANG CHỦ
  getLatest: async (limit = 3) => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  },
};
