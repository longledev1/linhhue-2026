import { create } from "zustand";
import { houseService } from "../services/houseService";

export const useHouseStore = create((set, get) => ({
  houses: [],
  featuredHouses: [],
  isLoading: false,
  error: null,

  /**
   * 🌟 ACTION MỚI: Tải danh sách nhà (Hỗ trợ tải trang đầu hoặc nối đuôi trang tiếp theo)
   * @param {number} page - Trang cần tải
   * @param {number} limit - Số lượng nhà cần bốc
   * @param {boolean} isLoadMore - Nếu true: Nối đuôi data; Nếu false: Reset mảng mới (Dùng cho trang đầu hoặc khi đổi bộ lọc)
   */
  // src/stores/houseStore.js

  fetchHouses: async (offset = 0, limit = 12, isLoadMore = false) => {
    if (!isLoadMore) {
      set({
        houses: [],
        totalHouses: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await houseService.getAll(offset, limit);

      set((state) => ({
        houses: isLoadMore ? [...state.houses, ...data] : data,
        totalHouses: totalCount,
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  // fillred
  fetchFilteredHouses: async (
    filters,
    offset = 0,
    limit = 12,
    isLoadMore = false,
  ) => {
    if (!isLoadMore) {
      set({
        houses: [],
        totalHouses: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await houseService.getFiltered(
        filters,
        offset,
        limit,
      );

      set((state) => ({
        houses: isLoadMore ? [...state.houses, ...data] : data,
        totalHouses: totalCount,
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  // src/stores/houseStore.js

  fetchHousesForAdmin: async (page, limit, filters = {}) => {
    set({ isLoading: true, error: null });

    try {
      // 🌟 ĐÃ CẬP NHẬT: Truyền page, limit, filters vào trong service
      const result = await houseService.getAllForAdmin(page, limit, filters);

      set({
        houses: result.data,
        total: result.total, // Lưu tổng số lượng bài đăng phục vụ phân trang
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  fetchFeaturedHouses: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await houseService.getFeatured();

      set({
        featuredHouses: data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  addHouse: async (newHouseData) => {
    set({ isLoading: true, error: null });

    try {
      const house = await houseService.create(newHouseData);

      set((state) => ({
        houses: [house, ...state.houses],
        isLoading: false,
      }));

      return {
        success: true,
        data: house,
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

  updateHouse: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedHouse = await houseService.update(id, updatedData);

      set((state) => ({
        houses: state.houses.map((house) =>
          house.id === id ? updatedHouse : house,
        ),
        isLoading: false,
      }));

      return { success: true, data: updatedHouse };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deleteHouse: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await houseService.delete(id);

      // Lọc bỏ ngay lập tức căn hộ vừa xóa ra khỏi mảng houses trong Store
      set((state) => ({
        houses: state.houses.filter((house) => house.id !== id),
        isLoading: false,
      }));

      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));
