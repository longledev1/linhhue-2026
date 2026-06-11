import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// 🌟 IMPORT BỘ DATA TỈNH THÀNH VÀ LOGIC PHƯỜNG XÃ LIÊN KẾT ĐỘNG
import {
  PROVINCE_OPTIONS,
  LOCATION_DATA,
} from "../../../../constants/wardOptions";
import {
  LAND_TYPES,
  HOUSE_DIRECTIONS,
} from "../../../../constants/estateOptions";
import {
  QUILL_FORMATS,
  QUILL_MODULES,
} from "../../../../constants/quillConfig";

// 🌟 ĐỒNG BỘ: Định nghĩa danh mục đất nền tương thích với DB

export default function InfoFormCardLand({
  register,
  control,
  errors,
  watch,
  setValue,
}) {
  const selectedProvince = watch("province");
  const selectedWard = watch("ward");

  // 🌟 ĐỒNG BỘ: Chống xóa nhầm phường khi Edit
  useEffect(() => {
    if (!selectedProvince) return;
    const provinceWards = LOCATION_DATA[selectedProvince] || [];
    const isValidWard = provinceWards.some((opt) => opt.value === selectedWard);
    if (selectedWard && !isValidWard) {
      setValue("ward", "");
    }
  }, [selectedProvince, selectedWard, setValue]);

  const cleanWardOptions = (
    selectedProvince ? LOCATION_DATA[selectedProvince] || [] : []
  ).filter((opt) => opt.value !== "");
  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%" }}
    >
      <CardContent className="space-y-4">
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#334155" }}>
          Thông tin chi tiết đất nền
        </Typography>

        {/* Tiêu đề tin đăng đất nền */}
        <div className="mt-[16px] mb-[16px]">
          <TextField
            label="Tiêu đề tin đăng / Tên lô đất"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>

        {/* Khối Giá & Diện tích */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Giá tiền thực tế (VND)"
            fullWidth
            value={
              watch("price")
                ? Number(watch("price")).toLocaleString("vi-VN")
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setValue("price", raw);
            }}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <Controller
            name="area"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                label="Diện tích đất (m²)"
                type="number"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.area}
                helperText={errors.area?.message}
                slotProps={{
                  htmlInput: { step: "any" },
                }}
              />
            )}
          />
        </div>

        {/* ==================== 🌟 KHỐI ĐẶC THÙ ĐẤT NỀN MỚI BỔ SUNG ==================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* 1. Trường nhập Kích thước */}
          <TextField
            label="Kích thước lô đất (Ví dụ: 6x20m)"
            fullWidth
            placeholder="Ví dụ: 6x20m, 5x25m..."
            {...register("dimensions")}
            error={!!errors.dimensions}
            helperText={errors.dimensions?.message}
          />

          {/* 2. Trường nhập Lộ giới / Đường vào */}
          <TextField
            label="Đường vào / Lộ giới rộng"
            fullWidth
            placeholder="Ví dụ: Đường nhựa 12m, Hẻm xe hơi 6m..."
            {...register("road_width")}
            error={!!errors.road_width}
            helperText={errors.road_width?.message}
          />

          {/* 3. Trường chọn Hướng đất */}
          <Controller
            name="direction"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Hướng đất"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.direction}
                helperText={errors.direction?.message}
              >
                {HOUSE_DIRECTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        {/* Khối Loại đất & Hình thức giao dịch */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="land_type"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Phân loại đất"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.land_type}
                helperText={errors.land_type?.message}
              >
                {LAND_TYPES.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Hình thức giao dịch"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="sale">Cần bán</MenuItem>
                <MenuItem value="rent">Cho thuê (Mặt bằng / Kho bãi)</MenuItem>
              </TextField>
            )}
          />
        </div>

        {/* Khối Khu vực: 🌟 ĐÃ ĐỒNG BỘ: Tỉnh/Thành phố & Phường xã liên kết động */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Tỉnh / Thành phố */}
          <Controller
            name="province"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Tỉnh / Thành phố"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.province}
                helperText={errors.province?.message}
              >
                {PROVINCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Ô Phường / Xã tự động khóa/mở và thay đổi danh mục menu dynamic */}
          <Controller
            name="ward"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              const isWardDisabled = !selectedProvince;
              return (
                <TextField
                  select
                  disabled={isWardDisabled}
                  label="Khu vực Phường / Xã"
                  fullWidth
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ?? ""}
                  inputRef={ref}
                  error={!!errors.ward}
                  helperText={errors.ward?.message}
                >
                  {isWardDisabled ? (
                    <MenuItem value="">
                      <em>Vui lòng chọn Tỉnh/Thành trước</em>
                    </MenuItem>
                  ) : (
                    cleanWardOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              );
            }}
          />
        </div>

        {/* Số điện thoại liên hệ */}

        <div className="mt-[16px]">
          <TextField
            label="Số điện thoại liên hệ"
            fullWidth
            multiline
            rows={1}
            placeholder="Ví dụ: 0909 123 456"
            {...register("phone_number")}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
        </div>

        {/* Địa chỉ cụ thể lô đất */}
        <div className="mt-[16px]">
          <TextField
            label="Địa chỉ cụ thể (Số lô, tên đường...)"
            fullWidth
            multiline
            rows={2}
            placeholder="Ví dụ: Lô đất số A12 Đường số 4, Khu dân cư Thạnh Mỹ Lợi..."
            {...register("address_detail")}
            error={!!errors.address_detail}
            helperText={errors.address_detail?.message}
          />
        </div>

        {/* Link Iframe bản đồ Google Maps */}
        <div>
          <TextField
            label="Link Iframe Google Maps"
            fullWidth
            multiline
            rows={2}
            placeholder='<iframe src="https://www.google.com/maps/embed..."></iframe>'
            {...register("map_iframe")}
            error={!!errors.map_iframe}
            helperText={errors.map_iframe?.message}
          />
        </div>

        {/* Khối mô tả chi tiết lô đất */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-medium text-gray-600">
            Mô tả thông tin chi tiết lô đất (Rich Text)
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value ?? ""}
                onChange={field.onChange}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                style={{ height: "220px", marginBottom: "45px" }}
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
