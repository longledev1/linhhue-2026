// src/validations/landSchema.js
import { z } from "zod";

export const landSchema = z.object({
  // 1. Thông tin bài đăng (Bắt buộc tiêu đề)
  title: z
    .string()
    .nonempty("Tiêu đề tin đăng không được bỏ trống")
    .min(5, "Tiêu đề tin đăng phải từ 5 ký tự trở lên")
    .max(150, "Tiêu đề không được vượt quá 150 ký tự"),

  // 2. Hình thức & Phân loại
  status: z.string().optional().nullable().or(z.literal("")),
  land_type: z.string().optional().nullable().or(z.literal("")),

  // 3. Thông số kỹ thuật dạng SỐ (Tùy chọn)
  price: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : typeof val === "string"
          ? parseFloat(val.replace(/\D/g, "")) || null
          : Number(val),
    z.number().min(0, "Giá tiền không được là số âm").nullable().optional(),
  ),

  area: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseFloat(val),
    z.number().min(0, "Diện tích không được là số âm").nullable().optional(),
  ),

  // 4. Các thông số dạng Chuỗi văn bản bổ sung (Tùy chọn)
  dimensions: z.string().optional().nullable().or(z.literal("")),
  road_width: z.string().optional().nullable().or(z.literal("")),
  direction: z.string().optional().nullable().or(z.literal("")),

  // 5. Vị trí địa lý
  province: z.string().optional().nullable().or(z.literal("")),
  ward: z.string().optional().nullable().or(z.literal("")),

  phone_number: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) =>
        !val ||
        /^(?:\+84|84|0)(3|5|7|8|9)\d{8}$/.test(val.replace(/[\s.-]/g, "")),
      {
        message: "Số điện thoại không đúng định dạng (Ví dụ: 0909123456)",
      },
    ),

  address_detail: z.string().optional().nullable().or(z.literal("")),
  map_iframe: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || val.includes("<iframe") || val.startsWith("http"), {
      message:
        "Mã nhúng bản đồ không hợp lệ. Vui lòng copy đúng đoạn mã <iframe> từ Google Maps",
    }),

  // 6. Nội dung mô tả Rich Text & Tiện ích
  description: z.string().optional().nullable(),
  amenities: z
    .string()
    .max(300, "Khu tiện ích không được vượt quá 300 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),

  // 7. Cấu hình trạng thái quản lý hệ thống
  is_published: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});
