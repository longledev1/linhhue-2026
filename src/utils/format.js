// src/utils/format.js
import { WARD_OPTIONS } from "../constants/wardOptions";
// 🌟 1. IMPORT hai mảng option của bạn vào đây (Nhớ sửa lại đường dẫn file cho đúng cấu trúc dự án nha)
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

export const formatWard = (wardSlug) => {
  if (!wardSlug) return "";
  const foundWard = WARD_OPTIONS.find((item) => item.value === wardSlug);
  return foundWard ? foundWard.label : wardSlug;
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
  const doc = new DOMParser().parseFromString(cleanText, "text/html");
  return doc.body.textContent || cleanText;
};
