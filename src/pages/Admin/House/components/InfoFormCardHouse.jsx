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

import {
  PROVINCE_OPTIONS,
  LOCATION_DATA,
} from "../../../../constants/wardOptions";
import {
  HOUSE_TYPES,
  HOUSE_DIRECTIONS,
} from "../../../../constants/estateOptions";
import {
  QUILL_MODULES,
  QUILL_FORMATS,
} from "../../../../constants/quillConfig";
import {
  formatProvince,
  formatWard,
  formatLocationSuffix,
} from "../../../../utils/format";

export default function InfoFormCardHouse({
  register,
  control,
  errors,
  watch,
  setValue,
}) {
  const selectedProvince = watch("province");
  const selectedWard = watch("ward");

  useEffect(() => {
    if (!selectedProvince) return;

    const provinceWards = LOCATION_DATA[selectedProvince] || [];

    const isValidWard = provinceWards.some((opt) => opt.value === selectedWard);

    if (selectedWard && !isValidWard) {
      setValue("ward", "");
    }
  }, [selectedProvince, selectedWard, setValue]);

  const currentWardOptions = selectedProvince
    ? LOCATION_DATA[selectedProvince] || []
    : [];
  const cleanWardOptions = currentWardOptions.filter((opt) => opt.value !== "");

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%" }}
    >
      <CardContent className="space-y-4">
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#334155" }}>
          Thông tin chi tiết
        </Typography>

        {/* Tên nhà ở */}
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
            label="Số tầng"
            type="number"
            fullWidth
            {...register("floor")}
            error={!!errors.floor}
            helperText={errors.floor?.message}
          />

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
                onChange={(e) => {
                  const newProvince = e.target.value;
                  onChange(e);
                  setValue("ward", "");

                  const currentAddress = watch("address_detail") || "";
                  const oldSuffix = formatLocationSuffix(selectedProvince, selectedWard);

                  let prefix = "";
                  if (oldSuffix && currentAddress.endsWith(oldSuffix)) {
                    prefix = currentAddress.slice(0, -oldSuffix.length);
                  } else if (currentAddress && !currentAddress.startsWith(",")) {
                    prefix = currentAddress;
                  }

                  const newSuffix = formatLocationSuffix(newProvince, "");
                  const newVal = prefix ? `${prefix.trimEnd()}${newSuffix}` : newSuffix;
                  setValue("address_detail", newVal, { shouldValidate: true });
                }}
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
                  onChange={(e) => {
                    const newWard = e.target.value;
                    onChange(e);

                    const currentAddress = watch("address_detail") || "";
                    const oldSuffix = formatLocationSuffix(selectedProvince, selectedWard);

                    let prefix = "";
                    if (oldSuffix && currentAddress.endsWith(oldSuffix)) {
                      prefix = currentAddress.slice(0, -oldSuffix.length);
                    } else if (currentAddress && !currentAddress.startsWith(",")) {
                      prefix = currentAddress;
                    }

                    const newSuffix = formatLocationSuffix(selectedProvince, newWard);
                    const newVal = prefix ? `${prefix.trimEnd()}${newSuffix}` : newSuffix;
                    setValue("address_detail", newVal, { shouldValidate: true });
                  }}
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

        {/* Địa chỉ cụ thể */}
        <div className="mt-[16px]">
          <Controller
            name="address_detail"
            control={control}
            render={({ field }) => {
              const locationSuffix = formatLocationSuffix(selectedProvince, selectedWard);
              return (
                <TextField
                  {...field}
                  label="Địa chỉ cụ thể (Tự động cập nhật theo Phường & Tỉnh/Thành)"
                  fullWidth
                  multiline
                  rows={2}
                  value={field.value ?? ""}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Ví dụ: Số 45 Đường số 7, Khu đô thị An Phú An Khánh..."
                  onKeyDown={(e) => {
                    if (!locationSuffix) return;
                    const input = e.target;
                    const { selectionStart, selectionEnd } = input;
                    const currentVal = input.value || "";
                    const suffixIndex = currentVal.endsWith(locationSuffix)
                      ? currentVal.length - locationSuffix.length
                      : currentVal.length;

                    // Phím Backspace
                    if (e.key === "Backspace") {
                      if (selectionEnd > suffixIndex) {
                        e.preventDefault();
                        if (selectionStart < suffixIndex) {
                          const newPrefix = currentVal.substring(0, selectionStart);
                          field.onChange(newPrefix + locationSuffix);
                          requestAnimationFrame(() => {
                            input.setSelectionRange(selectionStart, selectionStart);
                          });
                        }
                        return;
                      }
                      if (selectionStart === suffixIndex && selectionStart === 0) {
                        e.preventDefault();
                        return;
                      }
                    }

                    // Phím Delete
                    if (e.key === "Delete") {
                      if (selectionStart >= suffixIndex || selectionEnd > suffixIndex) {
                        e.preventDefault();
                        if (selectionStart < suffixIndex) {
                          const newPrefix = currentVal.substring(0, selectionStart);
                          field.onChange(newPrefix + locationSuffix);
                          requestAnimationFrame(() => {
                            input.setSelectionRange(selectionStart, selectionStart);
                          });
                        }
                        return;
                      }
                    }

                    // Gõ ký tự thường khi con trỏ rơi vào vùng suffix
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                      if (selectionStart > suffixIndex || selectionEnd > suffixIndex) {
                        e.preventDefault();
                        const insertPos = Math.min(selectionStart, suffixIndex);
                        const newPrefix = currentVal.substring(0, insertPos) + e.key;
                        field.onChange(newPrefix + locationSuffix);
                        const newPos = newPrefix.length;
                        requestAnimationFrame(() => {
                          input.setSelectionRange(newPos, newPos);
                        });
                        return;
                      }
                    }
                  }}
                  onChange={(e) => {
                    const inputVal = e.target.value;
                    if (!locationSuffix) {
                      field.onChange(inputVal);
                      return;
                    }
                    if (inputVal.endsWith(locationSuffix)) {
                      field.onChange(inputVal);
                    } else {
                      let newPrefix = "";
                      if (inputVal.includes(locationSuffix)) {
                        newPrefix = inputVal.split(locationSuffix)[0];
                      } else {
                        let matchLen = 0;
                        for (let i = locationSuffix.length; i > 0; i--) {
                          const sub = locationSuffix.slice(0, i);
                          if (inputVal.endsWith(sub)) {
                            matchLen = i;
                            break;
                          }
                        }
                        if (matchLen > 0) {
                          newPrefix = inputVal.slice(0, -matchLen);
                        } else {
                          newPrefix = inputVal;
                        }
                      }
                      field.onChange(newPrefix ? `${newPrefix}${locationSuffix}` : locationSuffix);
                    }
                  }}
                  error={!!errors.address_detail}
                  helperText={
                    errors.address_detail?.message ||
                    "Nhập số nhà, tên đường ở phía trước. Phần Phường & Tỉnh/Thành được cố định tự động."
                  }
                />
              );
            }}
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
            Mô tả nhà ở chi tiết (Rich Text)
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
