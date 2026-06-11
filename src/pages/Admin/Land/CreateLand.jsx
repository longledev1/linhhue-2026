import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, IconButton, CircularProgress } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { compressToWebP } from "../../../utils/imageHelper";

import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../../../services/uploadService";

import InfoFormCardLand from "./components/InfoFormCardLand";
import ConFfigAndImageCardLand from "./components/ConfigAndImageCardLand";

const PRIMARY_COLOR = "#ab8c5d";

import { zodResolver } from "@hookform/resolvers/zod";
import { landSchema } from "../../../validations/landSchema";
import { useLandStore } from "../../../stores/landStore";

export default function AdminCreateLand() {
  const navigate = useNavigate();
  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const { addLand } = useLandStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(landSchema),
    defaultValues: {
      title: "",
      price: "",
      area: "",
      direction: "dong-nam",
      land_type: "dat-nen",
      status: "sale",
      province: "",
      ward: "",
      phone_number: "",
      amenities: "",
      address_detail: "",
      map_iframe: "",
      description: "",
      dimensions: "", // Trường mới bổ sung
      road_width: "", // Trường mới bổ sung
      is_published: true,
      is_featured: false,
      featured_at: null,
    },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [slides, setSlides] = useState([]);
  const [slidePreviews, setSlidePreviews] = useState([]);

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
    setSlides((prev) => prev.filter((_, i) => i !== index));
    setSlidePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = async (data) => {
    if (!thumbnail) {
      alert("Vui lòng tải lên Ảnh bìa đại diện của lô đất (Thumbnail)!");
      return;
    }

    setIsSubmittingState(true);

    try {
      const thumbnailUrl = await uploadSingleImage(
        thumbnail,
        "apartments",
        "lands",
      );
      const slideUrls = await uploadMultipleImages(
        slides,
        "apartments",
        "lands",
      );

      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        area: parseFloat(data.area),
        direction: data.direction,
        land_type: data.land_type,
        status: data.status,
        province: data.province,
        amenities: data.amenities,
        ward: data.ward,
        phone_number: data.phone_number,
        address_detail: data.address_detail,
        map_iframe: data.map_iframe,
        description: data.description,
        dimensions: data.dimensions,
        road_width: data.road_width,
        is_published: data.is_published,
        is_featured: data.is_featured,
        featured_at: data.is_featured ? new Date().toISOString() : null,
        thumbnail: thumbnailUrl,
        images: slideUrls,
        category: "land",
      };

      const result = await addLand(payload);

      if (result.success) {
        alert("Đăng tin bất động sản đất nền thành công");
        navigate("/admin/lands");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert("🔥 Lỗi hệ thống: " + err.message);
    } finally {
      setIsSubmittingState(false);
    }
  };

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
            Đăng Tin Đất Nền Mới
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Cấu hình chi tiết thông số kích thước, lộ giới đường vào, vị trí lô
            đất và hệ thống hình ảnh pháp lý.
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
            setThumbnailPreview={setThumbnailPreview}
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
              onClick={handleSubmit(onFormSubmit)}
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
                "Đăng bài ngay"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
