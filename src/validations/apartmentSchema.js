// src/validations/apartmentSchema.js
import { z } from "zod";

export const apartmentSchema = z.object({
  title: z
    .string()
    .nonempty("Tên căn hộ không được bỏ trống")
    .min(5, "Tiêu đề quá ngắn (Tối thiểu 5 ký tự)")
    .max(150, "Tiêu đề quá dài (Tối đa 150 ký tự)"),

  // Giá tiền: Tùy chọn (để trống hoặc >= 0)
  price: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : typeof val === "string"
          ? parseFloat(val.replace(/\D/g, "")) || null
          : Number(val),
    z.number().min(0, "Giá tiền không được là số âm").nullable().optional(),
  ),

  // Diện tích: Tùy chọn (để trống hoặc > 0)
  area: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseFloat(val),
    z.number().min(0, "Diện tích không được là số âm").nullable().optional(),
  ),

  // Số phòng ngủ: Tùy chọn (>= 0)
  bedroom: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseInt(val, 10),
    z.number().min(0, "Số phòng ngủ không được là số âm").nullable().optional(),
  ),

  // Số phòng vệ sinh: Tùy chọn (>= 0)
  bathroom: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseInt(val, 10),
    z.number().min(0, "Số phòng vệ sinh không được là số âm").nullable().optional(),
  ),

  // Vị trí tầng (Tùy chọn)
  floor: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseInt(val, 10),
    z.number().min(0, "Số tầng không được là số âm").nullable().optional(),
  ),

  direction: z.string().optional().nullable().or(z.literal("")),
  apartment_type: z.string().optional().nullable().or(z.literal("")),
  status: z.string().optional().nullable().or(z.literal("")),
  ward: z.string().optional().nullable().or(z.literal("")),
  province: z.string().optional().nullable().or(z.literal("")),

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

  description: z.string().optional().nullable(),
  amenities: z
    .string()
    .max(300, "Khu tiện ích không được vượt quá 300 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),
  is_published: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});
