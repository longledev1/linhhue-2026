import { create } from "zustand";
import { apartmentService } from "../services/apartmentService";

export const useApartmentStore = create((set, get) => ({
  apartments: [],
  featuredApartments: [],
  isLoading: false,
  error: null,

  /**
   * 🌟 ACTION MỚI: Tải danh sách căn hộ (Hỗ trợ tải trang đầu hoặc nối đuôi trang tiếp theo)
   * @param {number} page - Trang cần tải
   * @param {number} limit - Số lượng căn cần bốc
   * @param {boolean} isLoadMore - Nếu true: Nối đuôi data; Nếu false: Reset mảng mới (Dùng cho trang đầu hoặc khi đổi bộ lọc)
   */
  // src/stores/apartmentStore.js

  fetchApartments: async (offset = 0, limit = 12, isLoadMore = false) => {
    if (!isLoadMore) {
      set({
        apartments: [],
        totalApartments: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await apartmentService.getAll(offset, limit);

      set((state) => ({
        apartments: isLoadMore ? [...state.apartments, ...data] : data,
        totalApartments: totalCount,
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
  fetchFilteredApartments: async (
    filters,
    offset = 0,
    limit = 12,
    isLoadMore = false,
  ) => {
    if (!isLoadMore) {
      set({
        apartments: [],
        totalApartments: 0,
      });
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { data, totalCount } = await apartmentService.getFiltered(
        filters,
        offset,
        limit,
      );

      set((state) => ({
        apartments: isLoadMore ? [...state.apartments, ...data] : data,
        totalApartments: totalCount,
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  fetchApartmentsForAdmin: async (page, limit, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      // 🌟 ĐÃ CẬP NHẬT: Truyền thêm filters vào hàm của service
      const result = await apartmentService.getAllForAdmin(
        page,
        limit,
        filters,
      );

      set({
        apartments: result.data,
        total: result.total,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchFeaturedApartments: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await apartmentService.getFeatured();

      set({
        featuredApartments: data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        isLoading: false,
      });
    }
  },

  addApartment: async (newApartmentData) => {
    set({ isLoading: true, error: null });

    try {
      const apartment = await apartmentService.create(newApartmentData);

      set((state) => ({
        apartments: [apartment, ...state.apartments],
        isLoading: false,
      }));

      return {
        success: true,
        data: apartment,
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

  updateApartment: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedApartment = await apartmentService.update(id, updatedData);

      set((state) => ({
        apartments: state.apartments.map((apt) =>
          apt.id === id ? updatedApartment : apt,
        ),
        isLoading: false,
      }));

      return { success: true, data: updatedApartment };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deleteApartment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apartmentService.delete(id);

      // Lọc bỏ ngay lập tức căn hộ vừa xóa ra khỏi mảng apartments trong Store
      set((state) => ({
        apartments: state.apartments.filter((apt) => apt.id !== id),
        isLoading: false,
      }));

      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));
