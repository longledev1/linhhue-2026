// src/validations/apartmentSchema.js
import { z } from "zod";

export const houseSchema = z.object({
  title: z
    .string()
    .nonempty("Tên nhà ở không được bỏ trống")
    .min(10, "Tiêu đề quá ngắn (Tối thiểu 10 ký tự)")
    .max(120, "Tiêu đề quá dài (Tối đa 120 ký tự)"),

  // 🌟 FIX TRƯỜNG GIÁ: Ép kiểu và bắt lỗi tiếng Việt
  price: z.coerce
    .number({
      invalid_type_error: "Vui lòng nhập giá tiền bằng số thực tế",
      required_error: "Giá tiền không được để trống",
    })
    .positive("Giá tiền phải lớn hơn 0đ"),

  // 🌟 FIX TRƯỜNG DIỆN TÍCH: Ép kiểu và bắt lỗi tiếng Việt
  area: z.coerce
    .number({
      invalid_type_error: "Vui lòng nhập diện tích bằng số hợp lệ",
      required_error: "Diện tích không được để trống",
    })
    .positive("Diện tích phải lớn hơn 0 m²"),

  // 🌟 FIX TRƯỜNG PHÒNG NGỦ: Ép kiểu số nguyên >= 0
  bedroom: z.coerce
    .number({
      invalid_type_error: "Số phòng ngủ phải là số",
      required_error: "Vui lòng nhập số phòng ngủ",
    })
    .int("Số phòng ngủ phải là số nguyên")
    .min(0, "Số phòng ngủ không được là số âm"),

  // 🌟 FIX TRƯỜNG WC: Ép kiểu số nguyên >= 0
  bathroom: z.coerce
    .number({
      invalid_type_error: "Số phòng vệ sinh phải là số",
      required_error: "Vui lòng nhập số phòng vệ sinh",
    })
    .int("Số phòng vệ sinh phải là số nguyên")
    .min(0, "Số phòng vệ sinh không được là số âm"),

  // Vị trí tầng (Cho phép để trống, nếu nhập thì phải >= 0)
  floor: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? null
        : parseInt(val, 10),
    z.number().min(0, "Số tầng không được là số âm").nullable(),
  ),

  direction: z.string().nonempty("Vui lòng chọn hướng nhà"),
  house_type: z.string().nonempty("Vui lòng chọn loại nhà ở"),
  status: z.string().nonempty("Vui lòng chọn hình thức giao dịch"),
  ward: z.string().nonempty("Vui lòng chọn khu vực Phường / Xã"),
  province: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"),
  address_detail: z
    .string()
    .nonempty("Vui lòng nhập địa chỉ cụ thể số nhà, tên đường"),

  map_iframe: z
    .string()
    .optional()
    .refine((val) => !val || val.includes("<iframe"), {
      message:
        "Mã nhúng bản đồ không hợp lệ. Vui lòng copy đúng đoạn mã <iframe> từ Google Maps",
    }),

  description: z.string().optional(),
  // giới hạn ký tự
  amenities: z
    .string()
    .max(300, "Khu tiện ích không được vượt quá 300 ký tự")
    .optional()
    .or(z.literal("")), // Chấp nhận cả chuỗi rỗng "" nếu user không nhập gì
  is_published: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});
