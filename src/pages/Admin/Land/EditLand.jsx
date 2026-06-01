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

// 🌟 ĐỒNG BỘ CHUẨN ĐẤT NỀN: Import đúng Service và Store của Đất
import { landService } from "../../../services/landService";
import { useLandStore } from "../../../stores/landStore";

import InfoFormCardLand from "./components/InfoFormCardLand";
import ConFfigAndImageCardLand from "./components/ConfigAndImageCardLand";

// 🌟 ĐỒNG BỘ CHUẨN ĐẤT NỀN: Import đúng Schema Validation của Đất
import { zodResolver } from "@hookform/resolvers/zod";
import { landSchema } from "../../../validations/landSchema";

const PRIMARY_COLOR = "#ab8c5d";

export default function AdminEditLand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  // 🌟 ĐỒNG BỘ CHUẨN ĐẤT NỀN: Lấy hàm updateLand từ đúng Store
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
    resolver: zodResolver(landSchema), // Sử dụng landSchema gác cổng dữ liệu số
  });

  // Khai báo Debug bắt lỗi Validation trực diện của Zod dành riêng cho Đất nền
  console.log("=== ❌ LỖI VALIDATION CHỈNH SỬA ĐẤT NỀN ===", errors);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [slides, setSlides] = useState([]);
  const [slidePreviews, setSlidePreviews] = useState([]);

  const [oldImages, setOldImages] = useState({ thumbnail: "", images: [] });

  useEffect(() => {
    const fetchLandDetail = async () => {
      try {
        setLoadingData(true);
        // 🌟 ĐỒNG BỘ CHUẨN ĐẤT NỀN: Gọi API bốc dữ liệu từ table lands
        const data = await landService.getById(id);

        if (data) {
          // Reset dữ liệu đổ vào form khớp 100% các cột đặc thù của bảng lands
          reset({
            title: data.title || "",
            price: data.price?.toString() || "",
            area: data.area || "",
            direction: data.direction || "dong-nam",
            land_type: data.land_type || "dat-nen",
            status: data.status || "sale",
            ward: data.ward || "",
            address_detail: data.address_detail || "",
            map_iframe: data.map_iframe || "",
            description: data.description || "",
            dimensions: data.dimensions || "", // Khớp trường kích thước
            road_width: data.road_width || "", // Khớp trường đường vào
            is_published: data.is_published ?? true,
            is_featured: data.is_featured ?? false,
          });

          // Lưu giữ trạng thái ảnh cũ đang hiển thị từ folder lands/
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

      // Nếu có chọn ảnh đại diện mới thì mới upload đè lên folder con lands
      if (thumbnail) {
        thumbnailUrl = await uploadSingleImage(
          thumbnail,
          "apartments",
          "lands",
        );
      }

      // Khớp mảng album ảnh slides dập tắt lỗi truyền nhầm biến thumbnail cũ
      if (slides.length > 0) {
        const uploadedNewSlideUrls = await uploadMultipleImages(
          slides,
          "apartments",
          "lands",
        );
        slideUrls = [...slideUrls, ...uploadedNewSlideUrls];
      }

      // Build payload chuẩn chỉnh theo đúng Schema cấu trúc bảng public.lands
      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        area: parseFloat(data.area),
        direction: data.direction,
        land_type: data.land_type,
        status: data.status,
        ward: data.ward,
        address_detail: data.address_detail,
        map_iframe: data.map_iframe,
        description: data.description,
        dimensions: data.dimensions, // Trường đặc thù Đất nền
        road_width: data.road_width, // Trường đặc thù Đất nền
        is_published: data.is_published,
        is_featured: data.is_featured,
        thumbnail: thumbnailUrl,
        images: slideUrls,
        category: "land", // Định danh chuẩn phân hệ đất nền
      };

      console.log("=== 🚀 PAYLOAD CẬP NHẬT ĐẤT NỀN BẮN QUA STORE ===", payload);

      // 🌟 ĐỒNG BỘ CHUẨN ĐẤT NỀN: Gọi đúng hàm updateLand từ useLandStore
      const result = await updateLand(id, payload);

      if (result.success) {
        alert("🎉 Cập nhật thông tin đất nền thành công mỹ mãn!");
        navigate("/admin/lands"); // Quay về đúng trang danh sách quản lý đất nền
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
      {/* Thanh tiêu đề điều hướng */}
      <div className="flex w-full items-center gap-3">
        {/* ĐỒNG BỘ ROUTE: Bấm mũi tên quay lại trang danh sách đất nền */}
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
        {/* KHỐI NHẬP LIỆU CHÍNH */}
        <div className="w-full lg:col-span-8">
          <InfoFormCardLand
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </div>

        {/* KHỐI ẢNH & TRẠNG THÁI HỆ THỐNG */}
        <div className="flex w-full flex-col justify-between lg:col-span-4">
          <ConFfigAndImageCardLand
            register={register}
            control={control}
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

          {/* Cụm nút bấm gửi bài */}
          <div className="mt-auto flex justify-end gap-3 pt-6">
            {/* ĐỒNG BỘ ROUTE: Nút hủy quay về danh sách đất nền */}
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
              onClick={handleSubmit(onFormSubmit)} // Ép trigger submit dập tắt lỗi layout
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
