import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Typography,
} from "@mui/material";

export default function FilterBarBase({
  title,
  fields,
  options,
  onFilterSubmit,
  defaultValues,
}) {
  // 🌟 GIẢI PHÁP: Tính toán defaultValues bằng dữ liệu thô ngay từ đầu để ép React Hook Form ăn giá trị rỗng lập tức
  const initialDefaultValues = fields.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {});

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: defaultValues || initialDefaultValues,
  });
  const currentStatus = watch("status");

  // Tự động reset form đồng bộ lại nếu danh sách fields từ cha thay đổi bất ngờ
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        ...initialDefaultValues,
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  // Tự động xóa giá trị ô khoảng giá khi đổi Hình thức
  useEffect(() => {
    setValue("price", "");
  }, [currentStatus, setValue]);

  // Hàm cấu hình nhãn Tiếng Việt cho từng ô Label của MUI
  const getFieldLabel = (fieldName) => {
    const labels = {
      ward: "Phường/Xã",
      status: "Hình thức",
      price: "Khoảng giá",
      area: "Diện tích",
      bedroom: "Phòng ngủ",
      apartment_type: "Loại căn hộ",
      house_type: "Loại nhà",
      landType: "Loại đất",
    };
    return labels[fieldName] || "Chọn thông số";
  };

  // Logic lấy options động cho ô Khoảng giá
  const getDynamicOptions = (fieldName) => {
    if (fieldName === "price") {
      if (currentStatus === "rent") return options.priceRent || [];
      if (currentStatus === "sale") return options.priceSale || [];
      return []; // Trả về mảng rỗng để khóa khi chưa chọn hình thức
    }
    return options[fieldName] || [];
  };

  const onSubmit = (data) => {
    const activeFilters = Object.keys(data).reduce((acc, key) => {
      if (data[key]) acc[key] = data[key];
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

  // Mã màu thương hiệu của bạn
  const PRIMARY_COLOR = "#ab8c5d";

  return (
    <Box className="w-full bg-white py-6">
      <Box className="container space-y-4">
        {/* 1. Hàng Tiêu Đề Breadcrumb */}
        <Box className="flex flex-col gap-2">
          <Typography className="text-base font-medium text-stone-500 md:text-lg">
            Trang chủ / Bất động sản /{" "}
            <span className="text-primary font-bold">{title}</span>
          </Typography>
        </Box>

        {/* 2. Lưới Grid chứa các ô Select và Nút bấm lọc phối hợp */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Box className="space-y-0">
            <Box
              className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3"
              sx={{
                gridTemplateColumns: {
                  xl: `repeat(${fields.length}, minmax(0, 1fr))`,
                },
              }}
            >
              {fields.map((fieldName) => {
                const fieldOptions = getDynamicOptions(fieldName);
                const isPriceDisabled = fieldName === "price" && !currentStatus;

                return (
                  <FormControl
                    key={fieldName}
                    fullWidth
                    size="small"
                    disabled={isPriceDisabled}
                    sx={{
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: PRIMARY_COLOR,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
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
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          MenuProps={{
                            disableScrollLock: true,
                          }}
                        >
                          <MenuItem value="">
                            <em>Mặc định</em>
                          </MenuItem>

                          {fieldOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />

                    {fieldName === "price" && isPriceDisabled && (
                      <FormHelperText className="font-xs text-stone-400">
                        * Vui lòng chọn hình thức trước khi chọn khoảng giá
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              })}
            </Box>

            <Box className="mt-[20px] flex justify-end gap-2">
              <Button
                onClick={handleClearFilters}
                variant="outlined"
                className="h-[40px] whitespace-nowrap"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  borderColor: "#d1d5db",
                  color: "#6b7280",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Xóa lọc
              </Button>

              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                disableElevation
                className="h-[40px] rounded-md text-sm font-bold tracking-wider whitespace-nowrap text-white normal-case transition-all duration-300"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  bgcolor: PRIMARY_COLOR,
                  borderRadius: "4px",
                  "&:hover": {
                    bgcolor: `${PRIMARY_COLOR}e6`,
                  },
                }}
              >
                Lọc danh sách
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
