import React from "react";
import { Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

export default function ConfigAndImageCardHouse({
  register,
  control,
  errors, // 🌟 NHẬN THÊM: Object errors từ file Page cha gửi xuống (formState: { errors })
  thumbnailPreview,
  slidePreviews,
  handleThumbnailChange,
  handleSlidesChange,
  setThumbnail,
  setThumbnailPreview,
  removeSlide,
  PRIMARY_COLOR,
}) {
  return (
    <div className="w-full space-y-4">
      {/* Khối cấu hình trạng thái & Tiện ích đính kèm */}
      <Card
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%" }}
      >
        <CardContent className="space-y-4">
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#334155" }}>
            Cấu hình trạng thái & Tiện ích
          </Typography>

          {/* Khối nút bật tắt Toggles */}
          <div className="flex gap-6 rounded-lg border border-stone-100 bg-stone-50 p-2">
            <Controller
              name="is_published"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="success"
                    />
                  }
                  label="Hiển thị"
                />
              )}
            />
            <Controller
              name="is_featured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: PRIMARY_COLOR,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          { bgcolor: PRIMARY_COLOR },
                      }}
                    />
                  }
                  label="Tin tiêu biểu ⭐"
                />
              )}
            />
          </div>

          {/* Ô NHẬP TIỆN ÍCH TEXT TỰ DO CHUẨN THÔNG SỐ VĂN BẢN */}
          <div className="w-full">
            <TextField
              label="Khu tiện ích công cộng (Nhập chuỗi tự do)"
              fullWidth
              multiline
              rows={3}
              placeholder="Ví dụ: Gần trung tâm thương mại, khu vực dân trí cao, có hồ bơi tràn bờ, phòng gym nội khu, sân nướng BBQ..."
              // 🌟 BẮT LỖI TẠI ĐÂY:
              error={!!errors?.amenities} // Nếu có lỗi -> Đổi khung viền input sang màu ĐỎ
              helperText={errors?.amenities?.message} // Hiển thị dòng chữ "Không được vượt quá 100 ký tự"
              {...register("amenities")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Ảnh đại diện Thumbnail */}
      <Card
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%" }}
      >
        <CardContent className="space-y-3">
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#334155" }}>
            Ảnh bìa (Thumbnail)
          </Typography>
          {thumbnailPreview ? (
            <div className="group relative overflow-hidden rounded-lg border border-stone-200">
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<FiTrash2 />}
                  size="small"
                  onClick={() => {
                    setThumbnail(null);
                    setThumbnailPreview("");
                  }}
                >
                  Xóa ảnh
                </Button>
              </div>
            </div>
          ) : (
            <Button
              component="label"
              variant="outlined"
              fullWidth
              className="flex h-40 flex-col items-center justify-center border-dashed"
              sx={{
                textTransform: "none",
                "& hover": { borderColor: PRIMARY_COLOR },
              }}
            >
              <FiUploadCloud
                size={32}
                style={{ color: PRIMARY_COLOR, marginBottom: "8px" }}
              />
              <Typography variant="body2">Chọn một ảnh làm đại diện</Typography>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleThumbnailChange}
              />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Upload Bộ sưu tập Album Slides */}
      <Card
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%" }}
      >
        <CardContent className="space-y-3">
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#334155" }}>
            Album ảnh chi tiết (Slide)
          </Typography>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            className="flex h-24 flex-col items-center justify-center border-dashed"
            sx={{
              textTransform: "none",
              "& hover": { borderColor: PRIMARY_COLOR },
            }}
          >
            <FiUploadCloud
              size={24}
              style={{ color: PRIMARY_COLOR, marginBottom: "4px" }}
            />
            <Typography variant="body2">Chọn nhiều hình cùng lúc</Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleSlidesChange}
            />
          </Button>

          {slidePreviews.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {slidePreviews.map((url, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded border border-stone-200"
                >
                  <img
                    src={url}
                    alt="Slide preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all group-hover:opacity-100">
                    <IconButton
                      size="small"
                      sx={{ color: "white" }}
                      onClick={() => removeSlide(index)}
                    >
                      <FiTrash2 size={16} />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
