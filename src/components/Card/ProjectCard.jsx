import React from "react";
import {
  formatPrice,
  formatWard,
  formatProvince, // 🌟 IMPORT THÊM: Để lấy nhãn Tỉnh/Thành phố có dấu
  stripHtmlAndEntities,
  formatApartmentType,
  formatHouseType,
  formatLandType,
} from "../../utils/format";

const ProjectCard = ({ project, isDetail = false }) => {
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

  const isLand =
    project.category?.toLowerCase().trim() === "land" ||
    project.apartment_type === "dat-nen" ||
    !!project.land_type;

  const detailUrl = getDetailLink(project);
  const FONT_FAMILY = '"Montserrat", sans-serif'; // 🌟 BIẾN FONT MONTSERRAT ĐỒNG BỘ

  return (
    <a
      href={detailUrl}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white font-sans shadow-sm transition-all duration-300 select-none hover:shadow-xl"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* 1. KHỐI HÌNH ẢNG BANNER */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={
            project.thumbnail || "https://placehold.co/600x400?text=No+Image"
          }
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Cụm Badge trạng thái đè lên ảnh */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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

      {/* 2. KHỐI THÔNG TIN BÊN TRONG CARD */}
      <div className="flex flex-1 flex-col p-5 text-sm">
        <div className="flex-1">
          {/* 🌟 ĐÃ SỬA: Render chuỗi địa chỉ liên kết động đầy đủ kèm Tỉnh/Thành phố */}
          {project.ward && (
            <p className="mb-2 text-[12px] font-medium tracking-wide text-stone-500">
              {formatWard(project.ward, project.province)}
              {project.province && `, ${formatProvince(project.province)}`}
            </p>
          )}
          <h3
            className={`group-hover:text-primary mb-2 text-base leading-snug font-bold text-[#1c1c1a] transition-colors md:text-lg ${isDetail ? "" : "line-clamp-2"}`}
          >
            {project.title}
          </h3>

          {/* VÙNG THÔNG SỐ KỸ THUẬT ĐƯỢC PHÂN LUỒNG THÔNG MINH */}
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-50 py-2 text-xs font-medium text-gray-500">
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

          <p className="text-primary mb-3 text-base font-extrabold">
            {formatPrice(project.price)}{" "}
            {project.status === "rent" ? "/ tháng" : ""}
          </p>

          <p
            className={`mb-4 text-left text-xs leading-relaxed text-gray-400 md:text-sm ${isDetail ? "whitespace-pre-line text-gray-600" : "line-clamp-3"}`}
          >
            {stripHtmlAndEntities(project.description)}
          </p>
        </div>

        {/* Nút Xem chi tiết dưới đáy Card */}
        <div className="mt-auto border-t border-gray-100 pt-3">
          <div className="text-primary inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase transition-all hover:gap-2">
            <span>Xem chi tiết</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default React.memo(ProjectCard);
