import React from "react";
import { motion } from "framer-motion";
import {
  formatPrice,
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

  const detailUrl = getDetailLink(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="mb-10 overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
    >
      {/* Thay thế thẻ div ngoài cùng thành thẻ <a> để click vào bất kỳ đâu trên card cũng nhảy trang */}
      <a
        href={detailUrl}
        className="group grid cursor-pointer grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
      >
        {/* KHỐI HÌNH ẢNH BANNER */}
        <div className="relative h-[320px] overflow-hidden lg:h-full">
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

        {/* KHỐI THÔNG TIN CHI TIẾT */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <h3 className="mb-3 line-clamp-2 text-2xl leading-snug font-bold text-[#1c1c1a] uppercase transition-colors group-hover:text-[#ab8c5d]">
            {project.title}
          </h3>

          <p className="mb-5 text-xl font-extrabold text-[#ab8c5d]">
            {formatPrice(project.price)}{" "}
            {project.status === "rent" ? "/ tháng" : ""}
          </p>

          <p className="text-secondary mb-8 line-clamp-4 leading-relaxed font-light">
            {stripHtmlAndEntities(project.description)}
          </p>

          <div className="group/btn flex w-fit items-center gap-2 border-b border-[#ab8c5d] pb-1 text-sm font-semibold tracking-wide text-[#ab8c5d] transition-all hover:opacity-70">
            Xem chi tiết dự án
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default React.memo(FeaturedProjectCard);
