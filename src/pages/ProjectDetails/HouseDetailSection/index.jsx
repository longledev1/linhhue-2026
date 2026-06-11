import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";

// Import các icon hệ thống
import {
  FiDollarSign,
  FiMaximize,
  FiLayers,
  FiCompass,
  FiDroplet,
  FiBookOpen,
} from "react-icons/fi";
import { BiBed, BiBuildingHouse } from "react-icons/bi";

// Import các sub-component
import ImageSlider from "../ApartmentDetailSection/ImageSlider";
import HouseInfoSidebar from "./HouseInfoSidebar";
import ImageModal from "../ApartmentDetailSection/ImageModal";
import HouseDescription from "./HouseDescription";
import SuggestedProjectHome from "./SuggestedProjectHome";

// Import bộ utils dùng chung
import {
  formatPrice,
  formatWard,
  formatProvince,
  formatDirection,
  formatHouseType,
} from "../../../utils/format";
import { CircularProgress } from "@mui/material";

export default function HouseDetailSection() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gọi API Supabase lấy chi tiết căn hộ
  useEffect(() => {
    const fetchHouseDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("houses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHouseDetail();
    }
  }, [id]);

  // 🛡️ 1. Giao diện Loading
  if (loading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-3 pt-[140px]">
        <CircularProgress sx={{ color: "#ab8c5d" }} />
        <p className="animate-pulse text-sm font-medium text-stone-500">
          Đang truy xuất thông tin chi tiết nhà ở...
        </p>
      </div>
    );
  }

  // 🛡️ 2. Giao diện lỗi / Không tìm thấy data
  if (error || !project) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 pt-[140px]">
        <div className="max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-bold text-red-600 shadow-sm">
          🔥 Không tìm thấy thông tin nhà ở này hoặc liên kết không tồn tại!
        </div>
      </div>
    );
  }

  // Xử lý mảng hình ảnh từ mảng images của DB
  const dynamicImages = [];
  if (Array.isArray(project.images) && project.images.length > 0) {
    project.images.forEach((url, index) => {
      dynamicImages.push({
        id: `slide-${index}`,
        src: url,
        orientation: "landscape",
      });
    });
  }

  if (dynamicImages.length === 0) {
    dynamicImages.push({
      id: "placeholder",
      src: "https://placehold.co/1200x675?text=No+Album+Images",
      orientation: "landscape",
    });
  }

  const isRent = project.status === "rent";
  const typeLabel = formatHouseType(project.house_type) || "Căn hộ";

  const SPEC_ITEMS = [
    {
      icon: <FiDollarSign className="text-xl" />,
      label: "Khoảng giá:",
      value: `${formatPrice(project.price)}${isRent ? "/tháng" : ""}`,
      isBoldLabel: true,
    },
    {
      icon: <FiMaximize className="text-lg" />,
      label: "Diện tích:",
      value: project.area ? `${project.area} m²` : "Chưa cập nhật",
    },
    {
      icon: <FiLayers className="text-lg" />,
      label: "Tầng:",
      value: project.floor ? `${project.floor}` : "Chưa cập nhật",
    },
    {
      icon: <FiCompass className="text-lg" />,
      label: "Hướng nhà:",
      value: project.direction
        ? `${formatDirection(project.direction)}`
        : "Chưa cập nhật",
    },
    {
      icon: <FiDroplet className="text-lg" />,
      label: "Số phòng vệ sinh:",
      value: project.bathroom ? `${project.bathroom} phòng` : "Chưa cập nhật",
    },
    {
      icon: <BiBed className="text-xl" />,
      label: "Số phòng ngủ:",
      value: project.bedroom ? `${project.bedroom} phòng` : "Chưa cập nhật",
    },
    {
      icon: <BiBuildingHouse className="text-xl" />,
      label: "Khu tiện ích & Ghi chú:",
      value: project.amenities || "Chưa cập nhật",
    },
    {
      icon: <FiBookOpen className="text-xl" />,
      label: "Pháp lý:",
      value: `${isRent ? "Hợp đồng cho thuê rõ ràng" : "Pháp lý rõ ràng"}`,
    },
  ];

  const statusLabel = isRent ? "Cho thuê" : "Mua bán";
  const wardLabel = formatWard(project.ward) || "Chưa xác định";
  const provinceLabel = formatProvince(project.province) || "Chưa xác định";

  return (
    <div className="mt-[140px] flex w-full flex-col bg-stone-50/20">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* CỘT TRÁI - CHI TIẾT NỘI DUNG CHÍNH */}
          <div className="space-y-4 lg:col-span-2">
            <ImageSlider
              images={dynamicImages}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
              onOpenModal={() => setIsModalOpen(true)}
            />

            <div className="pt-4 text-xs font-bold tracking-wide text-stone-500 uppercase md:text-sm">
              {statusLabel} / {provinceLabel} / {wardLabel} / {typeLabel}{" "}
            </div>

            <div className="block pt-2 lg:hidden">
              <HouseInfoSidebar
                phone_number={project.phone_number}
                specs={SPEC_ITEMS}
              />
            </div>

            <HouseDescription
              id={project.id} //
              title={project.title}
              description={project.description}
              address={project.address_detail}
              mapIframe={project.map_iframe}
            />
            <SuggestedProjectHome currentId={project.id} />
          </div>

          {/* CỘT PHẢI - SIDEBAR STICKY DESKTOP */}
          <div className="hidden lg:sticky lg:top-6 lg:col-span-1 lg:block">
            <HouseInfoSidebar
              phone_number={project.phone_number}
              specs={SPEC_ITEMS}
            />
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={dynamicImages}
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
      />
    </div>
  );
}
