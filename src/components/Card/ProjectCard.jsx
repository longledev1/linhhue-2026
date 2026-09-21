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
        <div className="flex flex-1 flex-col">
          {/* 🌟 VÙNG VỊ TRÍ: Khóa đúng 1 dòng (truncate) để không bị lệch giữa card 1 dòng và 2 dòng */}
          <p
            className="mb-1.5 text-[12px] font-medium tracking-wide text-stone-500 truncate h-5 leading-5"
            title={
              project.ward || project.province
                ? `${project.ward ? formatWard(project.ward, project.province) : ""}${project.ward && project.province ? ", " : ""}${project.province ? formatProvince(project.province) : ""}`
                : "Đang cập nhật vị trí"
            }
          >
            {project.ward || project.province ? (
              <>
                {project.ward
                  ? `${formatWard(project.ward, project.province)}${project.province ? `, ${formatProvince(project.province)}` : ""}`
                  : formatProvince(project.province)}
              </>
            ) : (
              <span className="text-stone-400">Đang cập nhật vị trí</span>
            )}
          </p>

          {/* TIÊU ĐỀ: Khóa đúng 2 dòng với line-height chuẩn, không bị cắt dấu tiếng Việt */}
          <h3
            className={`group-hover:text-primary mb-2.5 text-base leading-6 font-bold text-[#1c1c1a] transition-colors line-clamp-2 min-h-[48px]`}
            title={project.title}
          >
            {project.title}
          </h3>

          {/* VÙNG THÔNG SỐ KỸ THUẬT: Cố định chiều cao và fix triệt để lỗi in số 0 */}
          <div className="mb-3 flex h-8 items-center gap-x-3 border-y border-gray-100 py-1.5 text-xs font-medium text-gray-500">
            <div className="shrink-0">
              Diện tích:{" "}
              <span className="font-bold text-gray-800">
                {project.area && Number(project.area) > 0
                  ? `${project.area} m²`
                  : "Đang cập nhật"}
              </span>
            </div>

            {isLand ? (
              <>
                {Boolean(project.dimensions) && (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200 shrink-0"></div>
                    <div className="truncate">
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
                {Number(project.bedroom) > 0 ? (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200 shrink-0"></div>
                    <div className="shrink-0">
                      PN:{" "}
                      <span className="font-bold text-gray-800">
                        {project.bedroom}
                      </span>
                    </div>
                  </>
                ) : null}
                {Number(project.bathroom) > 0 ? (
                  <>
                    <div className="h-3 w-[1px] bg-gray-200 shrink-0"></div>
                    <div className="shrink-0">
                      WC:{" "}
                      <span className="font-bold text-gray-800">
                        {project.bathroom}
                      </span>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>

          {/* GIÁ TIỀN: Cố định chiều cao */}
          <p className="text-primary mb-2.5 text-base font-extrabold h-6 leading-6 truncate">
            {formatPrice(project.price)}{" "}
            {project.price && project.status === "rent" ? "/ tháng" : ""}
          </p>

          {/* MÔ TẢ: line-clamp-3 với line-height chuẩn (leading-5) để không bị cắt chữ / mất nửa chữ ở dòng 3 */}
          <p
            className={`mb-4 text-left text-xs leading-5 text-gray-400 md:text-sm md:leading-5 line-clamp-3 min-h-[60px]`}
          >
            {stripHtmlAndEntities(project.description) || "Chưa có thông tin mô tả chi tiết..."}
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
