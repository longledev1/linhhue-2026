import React from "react";
import { motion } from "framer-motion";
import {
  formatPrice,
  formatWard,
  formatProvince, // 🌟 IMPORT THÊM: Để hiển thị địa chỉ có dấu đầy đủ
  stripHtmlAndEntities,
  formatApartmentType,
  formatHouseType,
  formatLandType,
} from "../../utils/format";

const FeaturedProjectCard = ({ project }) => {
  if (!project) return null;

  // Hàm phân luồng link chuẩn chỉ, chống lệch danh mục
  const getDetailLink = (item) => {
    const cate = item.category?.toLowerCase().trim();
    if (cate === "house" || cate === "nha-o")
      return `/bat-dong-san/nha-o/${item.id}`;
    if (cate === "land" || cate === "dat-dai")
      return `/bat-dong-san/dat-dai/${item.id}`;
    return `/bat-dong-san/can-ho/${item.id}`;
  };

  // Kỹ thuật kiểm tra xem có phải phân luồng Đất Đai hay không
  const isLand =
    project.category?.toLowerCase().trim() === "land" ||
    project.apartment_type === "dat-nen" ||
    !!project.land_type;

  const detailUrl = getDetailLink(project);
  const FONT_FAMILY = '"Montserrat", sans-serif'; // 🌟 Đồng bộ font chữ hệ thống cao cấp

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="mb-10 overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] select-none"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <a
        href={detailUrl}
        className="group grid cursor-pointer grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
      >
        {/* 1. KHỐI HÌNH ẢNH BANNER */}
        <div className="relative h-[320px] overflow-hidden bg-stone-100 lg:h-full">
          <img
            src={
              project.thumbnail || "https://placehold.co/600x400?text=No+Image"
            }
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Cụm Badge trạng thái đè lên ảnh */}
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            <span
              className={`rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-[2px] ${
                project.status === "rent"
                  ? "bg-[#e6f7ed] text-[#22c55e]"
                  : "bg-[#eff6ff] text-[#3b82f6]"
              }`}
            >
              {project.status === "rent" ? "Cho thuê" : "Cần bán"}
            </span>

            {project.apartment_type && (
              <span className="rounded-lg bg-stone-900/80 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white uppercase shadow-sm backdrop-blur-[2px]">
                {formatApartmentType(project.apartment_type)}
              </span>
            )}

            {project.house_type && (
              <span className="rounded-lg bg-stone-900/80 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white uppercase shadow-sm backdrop-blur-[2px]">
                {formatHouseType(project.house_type)}
              </span>
            )}

            {project.land_type && (
              <span className="rounded-lg bg-stone-900/80 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white uppercase shadow-sm backdrop-blur-[2px]">
                {formatLandType(project.land_type)}
              </span>
            )}
          </div>
        </div>

        {/* 2. KHỐI THÔNG TIN CHI TIẾT */}
        <div className="flex flex-col justify-center p-8 text-sm lg:p-12">
          {/* 🌟 ĐÃ THÊM: Khu vực hiển thị địa chỉ Tỉnh/Thành Phố đồng bộ */}
          {project.ward && (
            <p className="mb-2 text-[12px] font-medium tracking-wide text-stone-500">
              {formatWard(project.ward, project.province)}
              {project.province && `, ${formatProvince(project.province)}`}
            </p>
          )}

          <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl leading-snug font-bold text-[#1c1c1a] uppercase transition-colors md:text-2xl">
            {project.title}
          </h3>

          {/* 🌟 ĐÃ THÊM: Khối thông số kỹ thuật phân luồng thông minh (Diện tích / PN / Kích thước) */}
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-100 py-2.5 text-xs font-medium text-gray-500">
            <div>
              Diện tích:{" "}
              <span className="font-bold text-gray-800">{project.area} m²</span>
            </div>

            {isLand ? (
              <>
                {project.dimensions && (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200"></div>
                    <div>
                      Kích thước:{" "}
                      <span className="font-bold text-gray-800">
                        {project.dimensions}
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {project.bedroom && (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200"></div>
                    <div>
                      PN:{" "}
                      <span className="font-bold text-gray-800">
                        {project.bedroom}
                      </span>
                    </div>
                  </>
                )}
                {project.bathroom && (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200"></div>
                    <div>
                      WC:{" "}
                      <span className="font-bold text-gray-800">
                        {project.bathroom}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <p className="text-primary mb-5 text-xl font-extrabold">
            {formatPrice(project.price)}{" "}
            {project.status === "rent" ? "/ tháng" : ""}
          </p>

          <p className="text-secondary mb-8 line-clamp-3 leading-relaxed font-light text-stone-400 md:text-sm">
            {stripHtmlAndEntities(project.description)}
          </p>

          <div className="group/btn text-primary flex w-fit items-center gap-2 border-b border-[#ab8c5d] pb-1 text-xs font-bold tracking-wider uppercase transition-all hover:opacity-70">
            <span>Xem chi tiết dự án</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default React.memo(FeaturedProjectCard);
