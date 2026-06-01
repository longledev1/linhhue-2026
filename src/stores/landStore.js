// src/stores/landStore.js
import { create } from "zustand";
import { landService } from "../services/landService";

export const useLandStore = create((set, get) => ({
  lands: [],
  featuredLands: [],
  totalLands: 0, // Lưu tổng số lượng bản ghi thực tế trong DB phục vụ phân trang
  isLoading: false,
  error: null,

  /**
   * 🌟 ACTION: Tải danh sách đất nền công cộng (Hỗ trợ tải trang đầu hoặc nối đuôi)
   * @param {number} offset - Vị trí bản ghi bắt đầu lấy dữ liệu
   * @param {number} limit - Số lượng đất nền cần bốc
   * @param {boolean} isLoadMore - Nếu true: Nối đuôi data; Nếu false: Làm sạch mảng cũ
   */
  fetchLands: async (offset = 0, limit = 12, isLoadMore = false) => {
    // Nếu không phải là load more (tải trang đầu), dọn sạch RAM cũ ngay lập tức
    if (!isLoadMore) {
      set({
        lands: [],
        totalLands: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await landService.getAll(offset, limit);

      set((state) => ({
        lands: isLoadMore ? [...state.lands, ...data] : data,
        totalLands: totalCount,
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  /**
   * 🌟 ACTION: Tải danh sách đất nền theo bộ lọc tìm kiếm nâng cao ngoài Client
   */
  fetchFilteredLands: async (
    filters,
    offset = 0,
    limit = 12,
    isLoadMore = false,
  ) => {
    if (!isLoadMore) {
      set({
        lands: [],
        totalLands: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await landService.getFiltered(
        filters,
        offset,
        limit,
      );

      set((state) => ({
        lands: isLoadMore ? [...state.lands, ...data] : data,
        totalLands: totalCount,
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  /**
   * 🌟 ACTION: Tải toàn bộ danh sách đất nền cho trang quản trị Admin
   */
  fetchLandsForAdmin: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await landService.getAllForAdmin();

      set({
        lands: data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  /**
   * 🌟 ACTION: Tải danh sách đất nền tiêu biểu nổi bật ngoài trang chủ
   */
  fetchFeaturedLands: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await landService.getFeatured();

      set({
        featuredLands: data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  /**
   * 🌟 ACTION: Đăng bài mới - Thêm một lô đất nền vào Database
   */
  addLand: async (newLandData) => {
    set({ isLoading: true, error: null });

    try {
      const land = await landService.create(newLandData);

      // Đẩy bản ghi mới vừa tạo lên đầu mảng state để cập nhật UI lập tức
      set((state) => ({
        lands: [land, ...state.lands],
        isLoading: false,
      }));

      return {
        success: true,
        data: land,
      };
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });

      return {
        success: false,
        error: err.message,
      };
    }
  },

  /**
   * 🌟 ACTION: Cập nhật thông tin chi tiết lô đất theo ID
   */
  updateLand: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedLand = await landService.update(id, updatedData);

      set((state) => ({
        lands: state.lands.map((land) => (land.id === id ? updatedLand : land)),
        isLoading: false,
      }));

      return { success: true, data: updatedLand };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  /**
   * 🌟 ACTION: Xóa hoàn toàn lô đất ra khỏi hệ thống (DB + Storage)
   */
  deleteLand: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await landService.delete(id);

      // Lọc bỏ ngay lập tức lô đất vừa xóa ra khỏi mảng lands hiện hành trong Store
      set((state) => ({
        lands: state.lands.filter((land) => land.id !== id),
        isLoading: false,
      }));

      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));
