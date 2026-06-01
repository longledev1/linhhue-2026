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

import InfoFormCardHouse from "./components/InfoFormCardHouse";
import ConfigAndImageCardHouse from "./components/ConfigAndImageCardHouse";

const PRIMARY_COLOR = "#ab8c5d";

import { zodResolver } from "@hookform/resolvers/zod";
import { houseSchema } from "../../../validations/houseSchema";
import { useHouseStore } from "../../../stores/houseStore";

export default function AdminCreateHouse() {
  const navigate = useNavigate();
  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const { addHouse } = useHouseStore();
  // 🌟 CHÈN DÒNG NÀY ĐỂ THẤY ZOD ĐANG CHẶN Ô NÀO KHI BẠN BẤM ĐĂNG:
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(houseSchema),
    defaultValues: {
      title: "",
      price: "",
      area: "",
      bedroom: "",
      bathroom: "",
      floor: "",
      direction: "dong-nam",
      house_type: "nha-pho",
      status: "rent",
      ward: "",
      address_detail: "",
      map_iframe: "",
      description: "",
      amenities: "",
      is_published: true,
      is_featured: false,
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
      alert("Vui lòng tải lên Ảnh bìa đại diện (Thumbnail)!");
      return;
    }

    setIsSubmittingState(true);

    try {
      const thumbnailUrl = await uploadSingleImage(
        thumbnail,
        "apartments",
        "houses",
      );
      const slideUrls = await uploadMultipleImages(
        slides,
        "apartments",
        "houses",
      );

      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        area: parseFloat(data.area),
        bedroom: parseInt(data.bedroom, 10),
        bathroom: parseInt(data.bathroom, 10),
        floor: data.floor ? parseInt(data.floor, 10) : null,
        direction: data.direction,
        house_type: data.house_type,
        status: data.status,
        ward: data.ward,
        address_detail: data.address_detail,
        map_iframe: data.map_iframe,
        description: data.description,
        amenities: data.amenities || null,
        is_published: data.is_published,
        is_featured: data.is_featured,
        thumbnail: thumbnailUrl,
        images: slideUrls,
        category: "house",
      };

      const result = await addHouse(payload);

      if (result.success) {
        alert("🎉 Đăng sản phẩm nhà ở thành công rực rỡ!");
        navigate("/admin/houses");
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
          onClick={() => navigate("/admin/houses")}
          sx={{ bgcolor: "white", border: "1px solid #e2e8f0" }}
        >
          <FiArrowLeft size={18} style={{ color: "#475569" }} />
        </IconButton>
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b]">
            Đăng tin nhà ở mới
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Cấu hình chi tiết thông số kỹ thuật, bản đồ vị trí và hệ thống lưu
            trữ hình ảnh.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="w-full lg:col-span-8">
          <InfoFormCardHouse
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </div>

        {/* CỘT PHẢI (Chiếm 4/12 cột) */}
        <div className="flex w-full flex-col justify-between lg:col-span-4">
          <ConfigAndImageCardHouse
            register={register}
            control={control}
            thumbnailPreview={thumbnailPreview}
            slidePreviews={slidePreviews}
            handleThumbnailChange={handleThumbnailChange}
            handleSlidesChange={handleSlidesChange}
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
            removeSlide={removeSlide}
            PRIMARY_COLOR={PRIMARY_COLOR}
          />

          {/* Cụm nút bấm gửi bài */}
          <div className="mt-auto flex justify-end gap-3 pt-6">
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/apartments")}
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
                "Đăng bài ngay"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
