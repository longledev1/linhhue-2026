import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { compressToWebP } from "../../../utils/imageHelper";

import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../../../services/uploadService";

// ĐỒNG BỘ CHUẨN ĐẤT NỀN: Import đúng Service và Store của Đất
import { landService } from "../../../services/landService";
import { useLandStore } from "../../../stores/landStore";

import InfoFormCardLand from "./components/InfoFormCardLand";
import ConFfigAndImageCardLand from "./components/ConfigAndImageCardLand";

// ĐỒNG BỘ CHUẨN ĐẤT NỀN: Import đúng Schema Validation của Đất
import { zodResolver } from "@hookform/resolvers/zod";
import { landSchema } from "../../../validations/landSchema";

const PRIMARY_COLOR = "#ab8c5d";

export default function AdminEditLand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const [oldLandData, setOldLandData] = useState(null);

  const { updateLand } = useLandStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(landSchema),
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [slides, setSlides] = useState([]);
  const [slidePreviews, setSlidePreviews] = useState([]);

  const [oldImages, setOldImages] = useState({ thumbnail: "", images: [] });

  useEffect(() => {
    const fetchLandDetail = async () => {
      try {
        setLoadingData(true);
        const data = await landService.getById(id);

        if (data) {
          setOldLandData(data);
          reset({
            title: data.title || "",
            price: data.price?.toString() || "",
            area: data.area || "",
            direction: data.direction || "dong-nam",
            land_type: data.land_type || "dat-nen",
            status: data.status || "sale",
            province: data.province || "", // 🔑 Đã nạp Tỉnh/Thành
            amenities: data.amenities || "", // 🔑 Đã nạp tiện ích
            ward: data.ward || "",
            address_detail: data.address_detail || "",
            map_iframe: data.map_iframe || "",
            description: data.description || "",
            dimensions: data.dimensions || "",
            road_width: data.road_width || "",
            is_published: data.is_published ?? true,
            is_featured: data.is_featured ?? false,
            phone_number: data.phone_number || "",
          });

          setOldImages({
            thumbnail: data.thumbnail || "",
            images: data.images || [],
          });

          if (data.thumbnail) setThumbnailPreview(data.thumbnail);
          if (Array.isArray(data.images)) setSlidePreviews(data.images);
        }
      } catch (err) {
        console.error("Lỗi lấy chi tiết đất nền:", err.message);
        alert("🔥 Không thể tải dữ liệu cũ của lô đất nền này!");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) fetchLandDetail();
  }, [id, reset]);

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const webpFile = await compressToWebP(file);
    setThumbnail(webpFile);
    setThumbnailPreview(URL.createObjectURL(webpFile));
  };

  const handleSlidesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const webpFiles = await Promise.all(
      files.map((file) => compressToWebP(file)),
    );

    setSlides((prev) => [...prev, ...webpFiles]);
    const newPreviews = webpFiles.map((file) => URL.createObjectURL(file));
    setSlidePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeSlide = (index) => {
    const targetUrl = slidePreviews[index];

    setSlidePreviews((prev) => prev.filter((_, i) => i !== index));

    if (oldImages.images.includes(targetUrl)) {
      setOldImages((prev) => ({
        ...prev,
        images: prev.images.filter((url) => url !== targetUrl),
      }));
    } else {
      const newFilesOnlyPreviews = slidePreviews.filter(
        (url) => !oldImages.images.includes(url),
      );
      const fileIndexInSlides = newFilesOnlyPreviews.indexOf(targetUrl);
      if (fileIndexInSlides !== -1) {
        setSlides((prev) => prev.filter((_, i) => i !== fileIndexInSlides));
      }
    }
  };

  const onFormSubmit = async (data) => {
    if (!thumbnailPreview) {
      alert("Vui lòng tải lên Ảnh bìa đại diện của lô đất (Thumbnail)!");
      return;
    }

    setIsSubmittingState(true);

    try {
      let thumbnailUrl = oldImages.thumbnail;
      let slideUrls = oldImages.images;

      if (thumbnail) {
        thumbnailUrl = await uploadSingleImage(
          thumbnail,
          "apartments",
          "lands",
        );
      }

      if (slides.length > 0) {
        const uploadedNewSlideUrls = await uploadMultipleImages(
          slides,
          "apartments",
          "lands",
        );
        slideUrls = [...slideUrls, ...uploadedNewSlideUrls];
      }

      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        area: parseFloat(data.area),
        direction: data.direction,
        land_type: data.land_type,
        status: data.status,
        province: data.province,
        ward: data.ward,
        phone_number: data.phone_number,
        address_detail: data.address_detail,
        map_iframe: data.map_iframe,
        description: data.description,
        dimensions: data.dimensions,
        amenities: data.amenities || null,
        road_width: data.road_width,
        is_published: data.is_published,
        is_featured: data.is_featured,
        thumbnail: thumbnailUrl,
        images: slideUrls,
        category: "land",
      };

      if (oldLandData) {
        const oldFeatured = oldLandData.is_featured;
        const newFeatured = data.is_featured;

        if (!oldFeatured && newFeatured) {
          payload.featured_at = new Date().toISOString();
        }

        if (oldFeatured && !newFeatured) {
          payload.featured_at = null;
        }
      }

      const result = await updateLand(id, payload);

      if (result.success) {
        alert("Cập nhật thông tin đất nền thành công");
        navigate("/admin/lands");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert("🔥 Lỗi cập nhật hệ thống đất nền: " + err.message);
    } finally {
      setIsSubmittingState(false);
    }
  };

  if (loadingData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 15,
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
        <Typography
          variant="body2"
          color="textSecondary"
          className="animate-pulse"
        >
          Đang truy xuất dữ liệu gốc của sản phẩm đất nền số #{id}...
        </Typography>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-6">
      <div className="flex w-full items-center gap-3">
        <IconButton
          onClick={() => navigate("/admin/lands")}
          sx={{ bgcolor: "white", border: "1px solid #e2e8f0" }}
        >
          <FiArrowLeft size={18} style={{ color: "#475569" }} />
        </IconButton>
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b]">
            Chỉnh Sửa Tin Đất Nền #{id}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Cập nhật lại thông số kích thước hình học, lộ giới đường vào, chỉnh
            sửa nội dung mô tả hoặc thay đổi album ảnh pháp lý.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="w-full lg:col-span-8">
          <InfoFormCardLand
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </div>

        <div className="flex w-full flex-col justify-between lg:col-span-4">
          <ConFfigAndImageCardLand
            register={register}
            control={control}
            errors={errors}
            thumbnailPreview={thumbnailPreview}
            slidePreviews={slidePreviews}
            handleThumbnailChange={handleThumbnailChange}
            handleSlidesChange={handleSlidesChange}
            setThumbnail={setThumbnail}
            setThumbnailPreview={(val) => {
              setThumbnailPreview(val);
              if (val === "")
                setOldImages((prev) => ({ ...prev, thumbnail: "" }));
            }}
            removeSlide={removeSlide}
            PRIMARY_COLOR={PRIMARY_COLOR}
          />

          <div className="mt-auto flex justify-end gap-3 pt-6">
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/lands")}
              sx={{ textTransform: "none" }}
              disabled={isSubmittingState}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmittingState}
              sx={{
                bgcolor: PRIMARY_COLOR,
                "&:hover": { bgcolor: "#967b51" },
                textTransform: "none",
                minWidth: 140,
              }}
            >
              {isSubmittingState ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
