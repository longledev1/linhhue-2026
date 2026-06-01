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
  HOUSE_TYPES,
  HOUSE_DIRECTIONS,
} from "../../../../constants/estateOptions";

export default function InfoFormCardHouse({
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
          Thông tin chi tiết
        </Typography>

        {/* Tên căn hộ - Trường text thông thường sử dụng register an toàn */}
        <div className="mt-[16px] mb-[16px]">
          <TextField
            label="Tên nhà ở / Tiêu đề tin đăng"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>
        {/* Khối Giá & Diện tích */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Giá tiền thực tế (VND - Ví dụ: 15000000)"
            type="number"
            fullWidth
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          {/* 🌟 FIX CHI TIẾT 1: Dùng Controller cho trường Diện tích để chống lỗi xung đột inputProps */}
          <Controller
            name="area"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                label="Diện tích (m²)"
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

        {/* Khối thông số kỹ thuật */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <TextField
            label="Số PN"
            type="number"
            fullWidth
            {...register("bedroom")}
            error={!!errors.bedroom}
            helperText={errors.bedroom?.message}
          />
          <TextField
            label="Số WC"
            type="number"
            fullWidth
            {...register("bathroom")}
            error={!!errors.bathroom}
            helperText={errors.bathroom?.message}
          />
          <TextField
            label="Vị trí Tầng"
            type="number"
            fullWidth
            {...register("floor")}
            error={!!errors.floor}
            helperText={errors.floor?.message}
          />

          {/* 🌟 FIX CHI TIẾT 2: Sử dụng Controller bọc trường Select để dập tắt lỗi primaryTypographyProps */}
          <Controller
            name="direction"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Hướng nhà"
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

        {/* Khối Loại & Hình thức */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="house_type"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                select
                label="Loại nhà ở"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value ?? ""}
                inputRef={ref}
                error={!!errors.house_type}
                helperText={errors.house_type?.message}
              >
                {HOUSE_TYPES.map((opt) => (
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
                <MenuItem value="rent">Cho thuê</MenuItem>
                <MenuItem value="sale">Cần bán</MenuItem>
              </TextField>
            )}
          />
        </div>

        {/* Phường Xã */}
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

        {/* Địa chỉ cụ thể */}
        <div className="mt-[16px]">
          <TextField
            label="Địa chỉ cụ thể (Số nhà, tên đường...)"
            fullWidth
            multiline
            rows={2}
            placeholder="Ví dụ: Căn hộ số 12.04 Block B, Chung cư Masteri An Phú..."
            {...register("address_detail")}
            error={!!errors.address_detail}
            helperText={errors.address_detail?.message}
          />
        </div>

        {/* Link Iframe Google Maps */}
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

        {/* Soạn thảo Rich Text */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-medium text-gray-600">
            Mô tả căn hộ chi tiết (Rich Text)
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
