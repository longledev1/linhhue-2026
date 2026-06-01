import React from "react";
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
import { WARD_OPTIONS } from "../../../../constants/wardOptions";
import {
  HOUSE_DIRECTIONS,
  LAND_TYPES,
} from "../../../../constants/estateOptions";

// 🌟 ĐỒNG BỘ: Định nghĩa danh mục đất nền tương thích với DB

export default function InfoFormCardLand({
  register,
  control,
  errors,
  watch,
  setValue,
}) {
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
            label="Giá tiền thực tế (VND - Ví dụ: 3500000000)"
            type="number"
            fullWidth
            {...register("price")}
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

        {/* Khu vực Phường Xã */}
        <Controller
          name="ward"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              select
              label="Khu vực Phường / Xã"
              fullWidth
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? ""}
              inputRef={ref}
              error={!!errors.ward}
              helperText={errors.ward?.message}
            >
              {WARD_OPTIONS.filter((opt) => opt.value !== "").map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

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
            Mô tả thông tin chi tiết lô đất (Rich Text - Sổ đỏ, pháp lý, tiềm
            năng...)
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value ?? ""}
                onChange={field.onChange}
                style={{ height: "220px", marginBottom: "45px" }}
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
