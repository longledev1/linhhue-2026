// src/validations/landSchema.js
import { z } from "zod";

export const landSchema = z.object({
  // 1. Thông tin bài đăng
  title: z
    .string()
    .min(5, "Tiêu đề tin đăng phải từ 5 ký tự trở lên")
    .max(100, "Tiêu đề không được vượt quá 100 ký tự"),

  // 2. Hình thức & Phân loại đặc thù Đất nền
  status: z
    .string()
    .min(1, "Vui lòng chọn hình thức giao dịch (Cần bán / Cho thuê)"),
  land_type: z.string().min(1, "Vui lòng chọn phân loại đất nền"),

  // 3. Thông số kỹ thuật dạng SỐ (Bọc z.coerce để tự động ép kiểu từ Input sang Number an toàn)
  price: z.coerce
    .number({ invalid_type_error: "Giá tiền bắt buộc phải nhập số thuần túy" })
    .min(1, "Vui lòng nhập giá tiền hợp lệ lớn hơn 0"),

  area: z.coerce
    .number({ invalid_type_error: "Diện tích bắt buộc phải nhập số" })
    .min(1, "Vui lòng nhập diện tích đất (m²)")
    .positive("Diện tích đất phải là số dương"),

  // 4. Các thông số dạng Chuỗi văn bản bổ sung (Bắt buộc nhập theo yêu cầu form)
  dimensions: z
    .string()
    .min(1, "Vui lòng nhập kích thước hình học (Ví dụ: 6x20m, 5x25m...)"),

  road_width: z
    .string()
    .min(1, "Vui lòng nhập thông tin đường vào / lộ giới hẻm rộng bao nhiêu"),

  direction: z.string().min(1, "Vui lòng chọn hướng đất"),

  // 5. Vị trí địa lý & Bản đồ định vị
  province: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"),
  ward: z.string().min(1, "Vui lòng chọn khu vực Phường / Xã"),
  address_detail: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ cụ thể (Số lô, tên đường...)"),
  map_iframe: z.string().optional().nullable(),

  // 6. Nội dung mô tả Rich Text
  description: z.string().optional().nullable(),
  amenities: z
    .string()
    .max(300, "Khu tiện ích không được vượt quá 300 ký tự")
    .optional()
    .or(z.literal("")), // Chấp nhận cả chuỗi rỗng "" nếu user không nhập gì
  // 7. Cấu hình trạng thái quản lý hệ thống (Nút gạt Boolean)
  is_published: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});
