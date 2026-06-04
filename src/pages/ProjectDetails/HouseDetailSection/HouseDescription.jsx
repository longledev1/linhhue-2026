import React from "react";
import { FiMapPin } from "react-icons/fi";

export default function HouseDescription({
  id,
  title,
  description,
  mapIframe,
  address,
}) {
  if (!title && !description) return null;

  const getCleanMapUrl = (rawInput) => {
    if (!rawInput) return "";

    const trimmed = rawInput.trim();

    if (trimmed.startsWith("http")) {
      return trimmed;
    }

    const match = trimmed.match(/src=["']([^"']+)["']/);

    return match ? match[1] : "";
  };

  const cleanMapSrc = getCleanMapUrl(mapIframe);
  const FONT_FAMILY = '"Montserrat", sans-serif'; // 🌟 BIẾN ĐỊNH DẠNG FONT CHỮ MONTSERRAT ĐỒNG BỘ

  return (
    <section
      className="mt-6 w-full space-y-6 font-sans md:mt-8 md:space-y-8"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* ==========================================================
          HEADER TITLE & UUID BADGE
         ========================================================== */}
      <div className="space-y-3">
        {/* Tối ưu size h1 mobile từ text-2xl mượt mà, lên md trả về text-3xl */}
        <h1 className="text-xl leading-snug font-bold text-stone-900 sm:text-2xl md:text-3xl">
          {title}
        </h1>
        <div className="flex items-start gap-2">
          <FiMapPin size={22} className="text-primary mt-1 shrink-0" />

          <h2 className="text-secondary text-lg leading-relaxed font-semibold md:text-xl">
            {address}
          </h2>
        </div>
        {id && (
          // Đổi từ inline-flex sang flex/inline-flex linh hoạt, thêm items-start trên mobile
          <div className="inline-flex max-w-full items-start gap-1.5 rounded-2xl bg-stone-100 px-4 py-2 sm:items-center sm:rounded-full">
            {/* 🌟 FIX 1: Thêm whitespace-nowrap trị dứt điểm lỗi gãy chữ "MÃ NHÀ Ở:" */}
            <span className="mt-[1px] text-[11px] font-bold tracking-wider whitespace-nowrap text-stone-500 uppercase sm:mt-0">
              Mã nhà ở:
            </span>

            {/* 🌟 FIX 2: Thêm break-all trị dứt điểm lỗi tràn chuỗi mã UUID dài */}
            <span className="text-xs leading-tight font-bold break-all text-stone-800 sm:text-sm">
              {id}
            </span>
          </div>
        )}
      </div>

      {/* ==========================================================
          THÔNG TIN MÔ TẢ RICH CONTENT
         ========================================================== */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <div
            className="h-5 w-1 rounded-full"
            style={{ backgroundColor: "#ab8c5d" }}
          />
          <h2 className="text-base font-bold tracking-wide text-stone-900 uppercase md:text-lg">
            Thông tin mô tả
          </h2>
        </div>

        <div
          className="rich-content text-justify text-[14px] leading-relaxed text-stone-700 md:text-base md:leading-loose"
          style={{ fontFamily: FONT_FAMILY }}
          dangerouslySetInnerHTML={{
            __html:
              description?.replace(/&nbsp;/g, " ") ??
              "<p>Chưa có mô tả chi tiết...</p>",
          }}
        />
      </div>

      {/* ==========================================================
          BẢN ĐỒ VỊ TRÍ GOOGLE MAP IFRAME
         ========================================================== */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <div
            className="h-5 w-1 rounded-full"
            style={{ backgroundColor: "#ab8c5d" }}
          />
          <h2 className="text-base font-bold tracking-wide text-stone-900 uppercase md:text-lg">
            Vị trí trên bản đồ
          </h2>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-stone-200 shadow-inner">
          {cleanMapSrc ? (
            <iframe
              src={cleanMapSrc}
              // 🌟 FIX 3: Mobile hạ h-[300px] nhìn rất cân đối gọn gàng, lên md quay về h-[450px] của bạn
              className="h-[300px] w-full md:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apartment Location Map"
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center bg-stone-50 md:h-[450px]">
              <p className="p-4 text-center text-sm text-stone-400">
                Chưa có dữ liệu vị trí bản đồ cho dự án này
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
