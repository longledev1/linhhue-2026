// src/utils/format.js

// 🌟 1. IMPORT mảng Tỉnh thành và Object Phường xã động mới của bạn vào đây
import { PROVINCE_OPTIONS, LOCATION_DATA } from "../constants/wardOptions";
import {
  HOUSE_DIRECTIONS,
  APARTMENT_TYPES,
  HOUSE_TYPES,
  LAND_TYPES,
} from "../constants/estateOptions";

export const formatPrice = (price) => {
  if (!price) return "Thỏa thuận";
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1).replace(".0", "")} Tỷ`;
  }
  return `${(price / 1000000).toFixed(1).replace(".0", "")} Triệu`;
};

/**
 * 🌟 MỚI: TRA CỨU TỈNH / THÀNH PHỐ
 * @param {string} provinceCode - Ví dụ: "TPHCM", "HA_NOI"
 * @returns {string} - Ví dụ: "Thành phố Hồ Chí Minh"
 */
export const formatProvince = (provinceCode) => {
  if (!provinceCode) return "";
  const foundProvince = PROVINCE_OPTIONS.find(
    (item) => item.value === provinceCode,
  );
  return foundProvince ? foundProvince.label : provinceCode;
};

/**
 * 🌟 ĐÃ FIX: TRA CỨU PHƯỜNG / XÃ ĐỘNG THEO THÀNH PHỐ
 * Vì dữ liệu phường xã giờ nằm trong LOCATION_DATA[provinceCode], ta cần quét qua tất cả các tỉnh để tìm slug
 * @param {string} wardSlug - Ví dụ: "phuong-an-phu"
 * @param {string} [provinceCode] - Nếu truyền kèm mã tỉnh, tốc độ tìm kiếm sẽ nhanh hơn vượt trội
 */
export const formatWard = (wardSlug, provinceCode = null) => {
  if (!wardSlug) return "";

  // Cách 1: Nếu component có sẵn và truyền kèm cả provinceCode (Tối ưu nhất)
  if (provinceCode && LOCATION_DATA[provinceCode]) {
    const foundWard = LOCATION_DATA[provinceCode].find(
      (item) => item.value === wardSlug,
    );
    if (foundWard) return foundWard.label;
  }

  // Cách 2: Phương án dự phòng nếu component cũ chỉ truyền mỗi wardSlug (Quét xuyên tất cả các tỉnh)
  for (const province in LOCATION_DATA) {
    const foundWard = LOCATION_DATA[province].find(
      (item) => item.value === wardSlug,
    );
    if (foundWard) return foundWard.label;
  }

  return wardSlug;
};

/**
 * 🌟 TRA CỨU HƯỚNG NHÀ TỪ HOUSE_DIRECTIONS CỦA BẠN
 * @param {string} directionSlug - Ví dụ: "dong-nam"
 * @returns {string} - Ví dụ: "Hướng Đông Nam"
 */
export const formatDirection = (directionSlug) => {
  if (!directionSlug) return "Chưa cập nhật";
  const found = HOUSE_DIRECTIONS.find(
    (item) => item.value === directionSlug.toLowerCase(),
  );
  return found ? found.label : directionSlug;
};

/**
 * 🌟 TRA CỨU LOẠI CĂN HỘ TỪ APARTMENT_TYPES CỦA BẠN
 * @param {string} typeSlug - Ví dụ: "studio"
 * @returns {string} - Ví dụ: "Căn hộ Studio"
 */
export const formatApartmentType = (typeSlug) => {
  if (!typeSlug) return "";
  const found = APARTMENT_TYPES.find(
    (item) => item.value === typeSlug.toLowerCase(),
  );
  return found ? found.label : typeSlug;
};

export const formatHouseType = (typeSlug) => {
  if (!typeSlug) return "";

  const found = HOUSE_TYPES.find(
    (item) => item.value === typeSlug.toLowerCase(),
  );

  return found ? found.label : typeSlug;
};

/**
 * 🌟 Hàm format hiển thị phân loại Đất nền sang tiếng Việt có dấu
 * @param {string} typeValue - Giá trị value lưu trong database (ví dụ: 'dat-tho-cu')
 * @returns {string} - Nhãn hiển thị tiếng Việt (ví dụ: 'Đất thổ cư')
 */
export const formatLandType = (typeValue) => {
  if (!typeValue) return "---";

  // Tìm item khớp với value trong mảng hằng số cấu hình của bạn
  const foundType = LAND_TYPES.find((item) => item.value === typeValue);

  // Nếu tìm thấy thì trả về label có dấu, ngược lại trả về chính cái chuỗi gốc ban đầu
  return foundType ? foundType.label : typeValue;
};

export const stripHtmlAndEntities = (htmlString) => {
  if (!htmlString) return "Chưa có mô tả chi tiết...";
  let cleanText = htmlString.replace(/<[^>]*>/g, "");
  cleanText = cleanText.replace(/&nbsp;/g, " ");
  // Kiểm tra môi trường Node.js (SSR của Next.js nếu có) tránh lỗi DOMParser undefined
  if (typeof window === "undefined") return cleanText;
  const doc = new DOMParser().parseFromString(cleanText, "text/html");
  return doc.body.textContent || cleanText;
};
