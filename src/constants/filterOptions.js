import { WARD_OPTIONS } from "./wardOptions";
import { APARTMENT_TYPES, HOUSE_TYPES, LAND_TYPES } from "./estateOptions";

export const APARTMENT_OPTIONS = {
  ward: WARD_OPTIONS, // Giữ nguyên mảng phường xã cũ của bạn

  priceRent: [
    { value: "0-5000000", label: "Dưới 5 triệu" },
    { value: "5000000-10000000", label: "5 - 10 triệu" },
    { value: "10000000-20000000", label: "10 - 20 triệu" },
    { value: "20000000-999999999999", label: "Trên 20 triệu" },
  ],
  priceSale: [
    { value: "0-2000000000", label: "Dưới 2 tỷ" },
    { value: "2000000000-4000000000", label: "2 - 4 tỷ" },
    { value: "4000000000-6000000000", label: "4 - 6 tỷ" },
    { value: "6000000000-999999999999", label: "Trên 6 tỷ" },
  ],
  area: [
    { value: "0-45", label: "Dưới 45 m²" },
    { value: "45-70", label: "45 - 70 m²" },
    { value: "70-100", label: "70 - 100 m²" },
    { value: "100-99999", label: "Trên 100 m²" },
  ],
  bedroom: [
    { value: "1", label: "1 PN" },
    { value: "2", label: "2 PN" },
    { value: "3", label: "3 PN" },
    { value: "4", label: "4+ PN" },
  ],
  apartment_type: APARTMENT_TYPES,
  status: [
    { value: "rent", label: "Cho thuê" },
    { value: "sale", label: "Cần bán" },
  ],
};
// 2. DATA OPTIONS CHO TRANG NHÀ Ở (Sau này viết tiếp vào đây)
export const HOUSE_OPTIONS = {
  ward: WARD_OPTIONS,

  priceRent: [
    { value: "0-10000000", label: "Dưới 10 triệu" },
    { value: "10000000-25000000", label: "10 - 25 triệu" },
    { value: "25000000-50000000", label: "25 - 50 triệu" },
    { value: "50000000-999999999999", label: "Trên 50 triệu" },
  ],
  priceSale: [
    { value: "0-3000000000", label: "Dưới 3 tỷ" },
    { value: "3000000000-6000000000", label: "3 - 6 tỷ" },
    { value: "6000000000-10000000000", label: "6 - 10 tỷ" },
    { value: "10000000000-20000000000", label: "10 - 20 tỷ" },
    { value: "20000000000-999999999999", label: "Trên 20 tỷ" },
  ],

  area: [
    { value: "0-50", label: "Dưới 50 m²" },
    { value: "50-80", label: "50 - 80 m²" },
    { value: "80-150", label: "80 - 150 m²" },
    { value: "150-300", label: "150 - 300 m²" },
    { value: "300-99999", label: "Trên 300 m² (Biệt thự lớn)" },
  ],

  bedroom: [
    { value: "1", label: "1 PN" },
    { value: "2", label: "2 PN" },
    { value: "3", label: "3 PN" },
    { value: "4", label: "4+ PN" },
  ],

  house_type: HOUSE_TYPES,

  status: [
    { value: "rent", label: "Cho thuê" },
    { value: "sale", label: "Cần bán" },
  ],
};
// 3. DATA OPTIONS CHO TRANG ĐẤT ĐAI
export const LAND_OPTIONS = {
  // Phường/Xã: Kế thừa danh sách TPHCM từ file wardOptions
  ward: WARD_OPTIONS,

  // Khoảng giá Thuê (Triệu/tháng) và Bán (Tỷ) chuẩn hóa quy đổi số học cho DB
  priceRent: [
    { value: "0-15000000", label: "Dưới 15 triệu" },
    { value: "15000000-40000000", label: "15 - 40 triệu" },
    { value: "40000000-100000000", label: "40 - 100 triệu" },
    { value: "100000000-999999999999", label: "Trên 100 triệu" },
  ],
  priceSale: [
    { value: "0-2000000000", label: "Dưới 2 tỷ" },
    { value: "2000000000-5000000000", label: "2 - 5 tỷ" },
    { value: "5000000000-10000000000", label: "5 - 10 tỷ" },
    { value: "10000000000-30000000000", label: "10 - 30 tỷ" },
    { value: "30000000000-999999999999", label: "Trên 30 tỷ" },
  ],

  // Diện tích đất (Mốc lớn phù hợp cho cả đất nền lẫn đất công, đất mẫu)
  area: [
    { value: "0-80", label: "Dưới 80 m²" },
    { value: "80-150", label: "80 - 150 m²" },
    { value: "150-300", label: "150 - 300 m²" },
    { value: "300-1000", label: "300 - 1000 m²" },
    { value: "1000-999999", label: "Trên 1000 m² (Đất diện tích lớn)" },
  ],

  // Phân loại các loại hình đất phổ biến
  land_type: LAND_TYPES,

  // Hình thức giao dịch
  status: [
    { value: "rent", label: "Cho thuê" },
    { value: "sale", label: "Cần bán" },
  ],
};
