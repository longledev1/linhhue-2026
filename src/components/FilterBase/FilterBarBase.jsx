import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  TextField,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

// IMPORT THÊM BỘ DATA TỈNH THÀNH VÀ DANH SÁCH PHƯỜNG XÃ ĐỘNG CỦA BẠN
import { PROVINCE_OPTIONS, LOCATION_DATA } from "../../constants/wardOptions";

export default function FilterBarBase({
  title,
  fields,
  options,
  onFilterSubmit,
  defaultValues,
  isAdmin = false,
}) {
  // KHẮC PHỤC LỖI LOOP: Bọc reduce vào useMemo để cố định địa chỉ ô nhớ Object
  const initialDefaultValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      if (field === "province") {
        acc[field] = "TPHCM"; // value thực tế của TP.HCM
      } else {
        acc[field] = "";
      }
      return acc;
    }, {});
  }, [fields]);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: defaultValues || initialDefaultValues,
  });

  const currentStatus = watch("status");
  const selectedProvince = watch("province"); // LẮNG NGHE BIẾN THÀNH PHỐ TRÊN URL/FORM

  // ĐỒNG BỘ DỮ LIỆU: Reset form an toàn khi nhận defaultValues từ URL parse về Trang cha
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        ...initialDefaultValues,
        ...defaultValues,
      });
    } else {
      reset(initialDefaultValues);
    }
  }, [defaultValues, reset, initialDefaultValues]);

  useEffect(() => {
    if (fields.includes("price")) {
      setValue("price", "");
    }
  }, [currentStatus, setValue, fields]);

  // TỰ ĐỘNG RESET: Nếu đổi Thành phố thì xóa sạch Phường/Xã cũ để tránh râu ông nọ cắm cằm bà kia
  useEffect(() => {
    if (
      fields.includes("ward") &&
      defaultValues?.province === selectedProvince
    ) {
      return;
    }
    if (fields.includes("ward") && selectedProvince !== undefined) {
      setValue("ward", "");
    }
  }, [selectedProvince, setValue, fields, defaultValues?.province]);

  const getFieldLabel = (fieldName) => {
    const labels = {
      id: "Mã bài đăng (ID)",
      is_published: "Trạng thái hiển thị",
      province: "Tỉnh / Thành phố",
      ward: "Phường/Xã",
      status: "Hình thức",
      price: "Khoảng giá",
      area: "Diện tích",
      bedroom: "Phòng ngủ",
      apartment_type: "Loại căn hộ",
      house_type: "Loại nhà",
      land_type: "Loại đất",
    };
    return labels[fieldName] || "Chọn thông số";
  };

  const getDynamicOptions = (fieldName) => {
    if (fieldName === "price") {
      if (currentStatus === "rent") return options.priceRent || [];
      if (currentStatus === "sale") return options.priceSale || [];
      return [];
    }
    if (fieldName === "province") {
      return PROVINCE_OPTIONS;
    }
    return options[fieldName] || [];
  };

  const onSubmit = (data) => {
    const activeFilters = Object.keys(data).reduce((acc, key) => {
      const value =
        typeof data[key] === "string" ? data[key].trim() : data[key];
      if (value !== "" && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (onFilterSubmit) onFilterSubmit(activeFilters);
  };

  const handleClearFilters = () => {
    reset(initialDefaultValues);
    if (onFilterSubmit) {
      onFilterSubmit({});
    }
  };

  const PRIMARY_COLOR = "#ab8c5d";
  const FONT_FAMILY = '"Montserrat", sans-serif';

  return (
    <Box className="w-full bg-transparent">
      <Box
        className={
          isAdmin ? "w-full space-y-5" : "container mx-auto space-y-5 px-4"
        }
      >
        {/* Breadcrumb Client */}
        {!isAdmin && (
          <Box className="mb-2 flex flex-col gap-2">
            <Typography
              className="text-base font-medium text-stone-500 md:text-lg"
              sx={{ fontFamily: FONT_FAMILY }}
            >
              Trang chủ / Bất động sản /{" "}
              <span
                className="text-primary font-bold"
                style={{ color: PRIMARY_COLOR }}
              >
                {title}
              </span>
            </Typography>
          </Box>
        )}

        {/* Lưới Lọc Dữ Liệu */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Box className="flex flex-col gap-5">
            <Box
              className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              sx={{
                gridTemplateColumns: {
                  xl: `repeat(${fields.length}, minmax(0, 1fr))`,
                },
              }}
            >
              {fields.map((fieldName) => {
                // ================= TRƯỜNG HỢP 1: Ô INPUT TEXT TÌM KIẾM THEO ID =================
                if (fieldName === "id") {
                  return (
                    <Controller
                      key={fieldName}
                      name={fieldName}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="medium"
                          label={getFieldLabel(fieldName)}
                          variant="outlined"
                          placeholder="Nhập mã ID..."
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              fontFamily: FONT_FAMILY,
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: PRIMARY_COLOR,
                            },
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              fontFamily: FONT_FAMILY,
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: PRIMARY_COLOR,
                                  borderWidth: "1.5px",
                                },
                            },
                          }}
                        />
                      )}
                    />
                  );
                }
                // ================= TRƯỜNG HỢP 2: AUTOCOMPLETE TỈNH / THÀNH PHỐ =================
                if (fieldName === "province") {
                  return (
                    <Controller
                      key={fieldName}
                      name={fieldName}
                      control={control}
                      render={({ field: { onChange, value, ref } }) => {
                        const currentSelection =
                          PROVINCE_OPTIONS.find(
                            (opt) => String(opt.value) === String(value),
                          ) || null;

                        return (
                          <Autocomplete
                            size="medium"
                            options={PROVINCE_OPTIONS}
                            getOptionLabel={(option) => option.label || ""}
                            value={currentSelection}
                            onChange={(event, newValue) => {
                              onChange(newValue ? newValue.value : "");
                            }}
                            disableScrollLock
                            ListboxProps={{
                              style: {
                                fontFamily: FONT_FAMILY,
                                fontSize: "14px",
                              },
                            }}
                            renderOption={(props, option) => {
                              const { key, ...otherProps } = props;

                              return (
                                <li
                                  key={option.value}
                                  {...otherProps}
                                  style={{
                                    fontFamily: FONT_FAMILY,
                                    fontSize: "14px",
                                  }}
                                >
                                  {option.label}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label="Tỉnh / Thành phố"
                                placeholder="Gõ để tìm nhanh tỉnh thành..."
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    fontSize: "14px",
                                    fontFamily: FONT_FAMILY,
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: PRIMARY_COLOR,
                                  },
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    fontFamily: FONT_FAMILY,
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: PRIMARY_COLOR,
                                        borderWidth: "1.5px",
                                      },
                                  },
                                }}
                              />
                            )}
                          />
                        );
                      }}
                    />
                  );
                }
                // ================= TRƯỜNG HỢP 2: Ô AUTOCOMPLETE PHƯỜNG XÃ LIÊN KẾT ĐỘNG CHỐNG LAG =================
                if (fieldName === "ward") {
                  return (
                    <Controller
                      key={fieldName}
                      name={fieldName}
                      control={control}
                      render={({ field: { onChange, value, ref } }) => {
                        const wardOptions = selectedProvince
                          ? LOCATION_DATA[selectedProvince] || []
                          : [];
                        const cleanWardOptions = wardOptions.filter(
                          (opt) => opt.value !== "",
                        );

                        const currentSelection =
                          cleanWardOptions.find(
                            (opt) => String(opt.value) === String(value),
                          ) || null;

                        const isWardDisabled = !selectedProvince;

                        return (
                          <Autocomplete
                            size="medium"
                            disabled={isWardDisabled}
                            options={cleanWardOptions}
                            getOptionLabel={(option) => option.label || ""}
                            value={currentSelection}
                            onChange={(event, newValue) => {
                              onChange(newValue ? newValue.value : "");
                            }}
                            disableScrollLock
                            ListboxProps={{
                              style: {
                                fontFamily: FONT_FAMILY,
                                fontSize: "14px",
                              },
                            }}
                            // 🌟 VÁ LỖI 1: Ép dùng option.value làm key cho từng thẻ li đổ xuống, giải quyết triệt để lỗi trùng tên phường xã
                            renderOption={(props, option) => {
                              const { key, ...otherProps } = props;
                              return (
                                <li
                                  key={option.value}
                                  {...otherProps}
                                  style={{
                                    fontFamily: FONT_FAMILY,
                                    fontSize: "14px",
                                  }}
                                >
                                  {option.label}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                label={getFieldLabel(fieldName)}
                                placeholder={
                                  isWardDisabled
                                    ? "Vui lòng chọn Tỉnh/Thành trước"
                                    : "Gõ để tìm nhanh phường xã..."
                                }
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    fontSize: "14px",
                                    fontFamily: FONT_FAMILY,
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: PRIMARY_COLOR,
                                  },
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    fontFamily: FONT_FAMILY,
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: PRIMARY_COLOR,
                                        borderWidth: "1.5px",
                                      },
                                  },
                                }}
                              />
                            )}
                          />
                        );
                      }}
                    />
                  );
                }

                // ================= TRƯỜNG HỢP 3: CÁC Ô SELECT BOX THÔNG THƯỜNG (CÓ CẢ PROVINCE) =================
                const fieldOptions = getDynamicOptions(fieldName);
                const isPriceDisabled = fieldName === "price" && !currentStatus;

                return (
                  <FormControl
                    key={fieldName}
                    fullWidth
                    size="medium"
                    disabled={isPriceDisabled}
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px",
                        fontFamily: FONT_FAMILY,
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: PRIMARY_COLOR,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        fontFamily: FONT_FAMILY,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isPriceDisabled
                            ? "rgba(0, 0, 0, 0.26)"
                            : PRIMARY_COLOR,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: PRIMARY_COLOR,
                          borderWidth: "1.5px",
                        },
                      },
                    }}
                  >
                    <InputLabel id={`label-${fieldName}`}>
                      {getFieldLabel(fieldName)}
                    </InputLabel>
                    <Controller
                      name={fieldName}
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId={`label-${fieldName}`}
                          label={getFieldLabel(fieldName)}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          MenuProps={{ disableScrollLock: true }}
                          // 🌟 VÁ LỖI 2: Dùng slotProps chuẩn thay vì lồng PaperProps thô bạo vào MenuProps gây lỗi DOM attribute
                          slotProps={{
                            paper: {
                              style: { fontFamily: FONT_FAMILY },
                            },
                          }}
                          sx={{ fontSize: "14px", fontFamily: FONT_FAMILY }}
                        >
                          <MenuItem
                            value=""
                            sx={{ fontSize: "14px", fontFamily: FONT_FAMILY }}
                          >
                            <em>Tất cả dữ liệu</em>
                          </MenuItem>
                          {fieldOptions.map((opt) => (
                            <MenuItem
                              key={String(opt.value)}
                              value={String(opt.value)}
                              sx={{ fontSize: "14px", fontFamily: FONT_FAMILY }}
                            >
                              {opt.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />

                    {fieldName === "price" && isPriceDisabled && (
                      <FormHelperText
                        sx={{
                          color: "#a8a29e",
                          fontSize: "11px",
                          fontFamily: FONT_FAMILY,
                          mt: 0.5,
                          ml: 1,
                          fontStyle: "italic",
                        }}
                      >
                        * Vui lòng chọn hình thức trước khi chọn khoảng giá
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              })}
            </Box>

            {/* HỆ THỐNG NÚT BẤM TO KHỎE, ĐẦM TAY VỚI FONT MONTSERRAT */}
            <Box className="flex flex-wrap items-center justify-end gap-3">
              <Button
                onClick={handleClearFilters}
                variant="outlined"
                startIcon={<FiRefreshCw size={15} />}
                sx={{
                  height: "46px",
                  px: 4,
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: FONT_FAMILY,
                  borderRadius: "8px",
                  color: "#475569",
                  borderColor: "#cbd5e1",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#94a3b8",
                    backgroundColor: "#f8fafc",
                    color: "#1e293b",
                  },
                }}
              >
                Xóa bộ lọc
              </Button>

              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                disableElevation
                startIcon={<FiSearch size={16} />}
                sx={{
                  height: "46px",
                  px: 5,
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: FONT_FAMILY,
                  borderRadius: "8px",
                  bgcolor: PRIMARY_COLOR,
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#967b51",
                    boxShadow: "0 4px 12px rgba(171, 140, 93, 0.2)",
                  },
                }}
              >
                Tìm kiếm kết quả
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
