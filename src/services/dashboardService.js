import { supabase } from "../config/supabaseClient";

export const dashboardService = {
  getStatistics: async () => {
    // Lấy thêm trường is_published từ database
    const [apartmentsRes, housesRes, landsRes] = await Promise.all([
      supabase.from("apartments").select("status, is_published"),
      supabase.from("houses").select("status, is_published"),
      supabase.from("lands").select("status, is_published"),
    ]);

    const apartments = apartmentsRes.data || [];
    const houses = housesRes.data || [];
    const lands = landsRes.data || [];

    // Filter theo Loại hình giao dịch (Rent/Sale)
    const apartmentRent = apartments.filter(
      (item) => item.status === "rent",
    ).length;
    const apartmentSale = apartments.filter(
      (item) => item.status === "sale",
    ).length;
    const houseRent = houses.filter((item) => item.status === "rent").length;
    const houseSale = houses.filter((item) => item.status === "sale").length;
    const landRent = lands.filter((item) => item.status === "rent").length;
    const landSale = lands.filter((item) => item.status === "sale").length;

    // --- BỔ SUNG: Tính toán số lượng Ẩn / Hiện ---
    const apartmentVisible = apartments.filter(
      (item) => item.is_published === true,
    ).length;
    const apartmentHidden = apartments.filter(
      (item) => item.is_published === false,
    ).length;

    const houseVisible = houses.filter(
      (item) => item.is_published === true,
    ).length;
    const houseHidden = houses.filter(
      (item) => item.is_published === false,
    ).length;

    const landVisible = lands.filter(
      (item) => item.is_published === true,
    ).length;
    const landHidden = lands.filter(
      (item) => item.is_published === false,
    ).length;

    return {
      totalProducts: apartments.length + houses.length + lands.length,
      totalRent: apartmentRent + houseRent + landRent,
      totalSale: apartmentSale + houseSale + landSale,

      apartments: {
        total: apartments.length,
        rent: apartmentRent,
        sale: apartmentSale,
        visible: apartmentVisible, // <--- Thêm mới
        hidden: apartmentHidden, // <--- Thêm mới
      },
      houses: {
        total: houses.length,
        rent: houseRent,
        sale: houseSale,
        visible: houseVisible, // <--- Thêm mới
        hidden: houseHidden, // <--- Thêm mới
      },
      lands: {
        total: lands.length,
        rent: landRent,
        sale: landSale,
        visible: landVisible, // <--- Thêm mới
        hidden: landHidden, // <--- Thêm mới
      },
    };
  },
};
