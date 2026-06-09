import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";

import {
  FiDollarSign,
  FiMaximize,
  FiCompass,
  FiBookOpen,
  FiTrendingUp,
  FiMapPin,
  FiGrid,
} from "react-icons/fi";

import ImageSlider from "../ApartmentDetailSection/ImageSlider";
import LandInfoSidebar from "./LandInfoSidebar";
import ImageModal from "../ApartmentDetailSection/ImageModal";
import LandDescription from "./LandDescription";
import SuggestedProjectsLand from "./SuggestedProjectLand";

import {
  formatPrice,
  formatWard,
  formatProvince,
  formatDirection,
} from "../../../utils/format";
import { formatLandType } from "../../../utils/format";
import { CircularProgress } from "@mui/material";
import { BiBuildingHouse } from "react-icons/bi";

export default function LandDetailSection() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLandDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("lands")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết đất nền:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLandDetail();
    }
  }, [id]);

  // 🛡️ 1. Giao diện Loading
  if (loading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-3 pt-[140px]">
        <CircularProgress sx={{ color: "#ab8c5d" }} />
        <p className="animate-pulse text-sm font-medium text-stone-500">
          Đang truy xuất thông tin chi tiết đất nền...
        </p>
      </div>
    );
  }

  // 🛡️ 2. Giao diện lỗi / Không tìm thấy dữ liệu đất
  if (error || !project) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 pt-[140px]">
        <div className="max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-bold text-red-600 shadow-sm">
          🔥 Không tìm thấy thông tin đất nền này hoặc liên kết đã bị gỡ bỏ!
        </div>
      </div>
    );
  }

  // Xử lý nạp mảng hình ảnh từ mảng images của DB Đất nền
  const dynamicImages = [];
  if (Array.isArray(project.images) && project.images.length > 0) {
    project.images.forEach((url, index) => {
      dynamicImages.push({
        id: `slide-land-${index}`,
        src: url,
        orientation: "landscape",
      });
    });
  }

  if (dynamicImages.length === 0) {
    dynamicImages.push({
      id: "placeholder-land",
      src: "https://placehold.co/1200x675?text=No+Land+Images",
      orientation: "landscape",
    });
  }

  const isRent = project.status === "rent";
  const typeLabel = formatLandType(project.land_type) || "Đất nền";
  const provinceLabel = formatProvince(project.province) || "Chưa xác định";

  const SPEC_ITEMS = [
    {
      icon: <FiDollarSign className="text-xl" />,
      label: "Khoảng giá từ:",
      value: `${formatPrice(project.price)}${isRent ? "/tháng" : ""}`,
      isBoldLabel: true,
    },
    {
      icon: <FiMaximize className="text-lg" />,
      label: "Diện tích đất:",
      value: project.area ? `${project.area} m²` : "Chưa cập nhật thông số",
    },
    {
      icon: <FiGrid className="text-lg" />, // Icon lưới đại diện cho kích thước hình học hình khối
      label: "Kích thước (Rộng x Sâu):",
      value: project.dimensions || "Chưa cập nhật kích thước",
    },
    {
      icon: <FiMapPin className="text-lg" />, // Icon định vị đại diện cho đường lộ giới
      label: "Đường vào:",
      value: project.road_width || "Chưa cập nhật thông tin đường",
    },
    {
      icon: <FiTrendingUp className="text-lg" />, // Icon phân loại
      label: "Phân loại:",
      value: typeLabel,
    },
    {
      icon: <FiCompass className="text-lg" />,
      label: "Hướng đất:",
      value: project.direction
        ? `${formatDirection(project.direction)}`
        : "Chưa xác định hướng",
    },
    {
      icon: <BiBuildingHouse className="text-xl" />,
      label: "Khu tiện ích & Ghi chú:",
      value: project.amenities || "Chưa cập nhật",
    },
    {
      icon: <FiBookOpen className="text-xl" />,
      label: "Pháp lý:",
      value: `${isRent ? "Hợp đồng cho thuê mặt bằng lâu dài" : "Pháp lý rõ ràng"}`,
    },
  ];

  const statusLabel = isRent ? "Cho thuê mặt bằng" : "Mua bán đất nền";
  const wardLabel = formatWard(project.ward) || "Chưa xác định";
  return (
    <div className="mt-[140px] flex w-full flex-col bg-stone-50/20">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* CỘT TRÁI - TOÀN BỘ ALBUM ẢNH SỔ ĐỎ VÀ NỘI DUNG MÔ TẢ ĐẤT NỀN */}
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

            {/* Hiển thị Responsive Mobile Sidebar */}
            <div className="block pt-2 lg:hidden">
              <LandInfoSidebar specs={SPEC_ITEMS} />
            </div>

            <LandDescription
              id={project.id}
              title={project.title}
              description={project.description}
              mapIframe={project.map_iframe}
              address={project.address_detail}
            />

            {/* Thanh chứa các dự án gợi ý ngẫu nhiên */}
            <SuggestedProjectsLand currentId={project.id} />
          </div>

          {/* CỘT PHẢI - SIDEBAR STICKY THÔNG SỐ ĐẶC THÙ ĐẤT NỀN TRÊN DESKTOP */}
          <div className="hidden lg:sticky lg:top-6 lg:col-span-1 lg:block">
            <LandInfoSidebar specs={SPEC_ITEMS} />
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
