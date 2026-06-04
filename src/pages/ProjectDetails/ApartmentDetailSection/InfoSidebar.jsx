import React from "react";
import { motion } from "framer-motion";

export default function InfoSidebar({ specs }) {
  const PRIMARY_COLOR = "#ab8c5d";
  const FONT_FAMILY = '"Montserrat", sans-serif';

  // BỘ LỌC PHÂN LOẠI DATA ĐỘNG TRÊN MOBILE:
  const isLongContent = (item) => {
    return (
      item.value &&
      (item.value.length > 25 ||
        item.label.toLowerCase().includes("tiện ích") ||
        item.label.toLowerCase().includes("pháp lý"))
    );
  };

  const shortSpecs = specs.filter((item) => !isLongContent(item));
  const longSpecs = specs.filter((item) => isLongContent(item));

  // TRÍCH XUẤT CÁC TRƯỜNG THÔNG SỐ NGẮN ĐỂ ĐƯA LÊN ĐẦU MOBILE
  const priceSpec = shortSpecs.find((item) =>
    item.label.toLowerCase().includes("giá"),
  );
  const directionSpec = shortSpecs.find((item) =>
    item.label.toLowerCase().includes("hướng"),
  );

  // Lọc lấy danh sách các thông số ngắn còn lại (Diện tích, Tầng, Phòng ngủ, Vệ sinh)
  const coreShortSpecs = shortSpecs.filter(
    (item) =>
      !item.label.toLowerCase().includes("giá") &&
      !item.label.toLowerCase().includes("hướng"),
  );

  // HÀM FORMAT NHÃN VÀ GIÁ TRỊ CHUẨN SẠCH
  const formatLabelText = (label) => {
    return label.replace(":", "").trim();
  };

  const formatShortValue = (item) => {
    if (typeof item.value !== "string") return item.value;

    const upperVal = item.value.toUpperCase();
    if (
      item.label.toLowerCase().includes("vệ sinh") ||
      item.label.toLowerCase().includes("toilet")
    ) {
      return upperVal
        .replace("PHÒNG VỆ SINH", "WC")
        .replace("PHÒNG", "WC")
        .replace("WC VỆ SINH", "WC");
    }
    return upperVal.replace("PHÒNG NGỦ", "PN").replace("PHÒNG", "PN");
  };

  return (
    <>
      {/* ================= LAYOUT 1: HIỂN THỊ TRÊN MOBILE (ĐỒNG BỘ 100% VỚI HOUSE) ================= */}
      <div
        className="block w-full space-y-3.5 rounded-2xl border border-stone-100 bg-white p-5 font-sans shadow-sm md:hidden"
        style={{ fontFamily: FONT_FAMILY }}
      >
        {/* KHỐI 1A: Khoảng giá */}
        {priceSpec && (
          <div className="flex w-full items-center justify-between rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
            <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
              {formatLabelText(priceSpec.label)}
            </span>
            <span className="text-base font-extrabold tracking-wide whitespace-nowrap text-stone-950">
              {typeof priceSpec.value === "string"
                ? priceSpec.value.toUpperCase()
                : priceSpec.value}
            </span>
          </div>
        )}

        {/* KHỐI 1B: Hướng ban công / Hướng cửa */}
        {directionSpec && (
          <div className="flex w-full items-center justify-between rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
            <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
              {formatLabelText(directionSpec.label)}
            </span>
            <span className="text-[14px] font-bold whitespace-nowrap text-stone-900">
              {typeof directionSpec.value === "string"
                ? directionSpec.value.toUpperCase()
                : directionSpec.value}
            </span>
          </div>
        )}

        {/* KHỐI 1C: Diện tích, Số tầng, Vệ sinh, Phòng ngủ */}
        {coreShortSpecs.length > 0 && (
          <div className="w-full space-y-3.5">
            {coreShortSpecs.map((item, idx) => (
              <div
                key={`short-${idx}`}
                className="flex w-full items-center justify-between rounded-xl border border-stone-100 bg-stone-50/60 p-3.5"
              >
                <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
                  {formatLabelText(item.label)}
                </span>
                <span className="text-[14px] font-bold whitespace-nowrap text-stone-900">
                  {formatShortValue(item)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* KHỐI 2: Tiện ích nội khu & Ghi chú căn hộ dài (Xếp tầng chống vỡ khung) */}
        {longSpecs.length > 0 && (
          <div className="w-full space-y-3.5">
            {longSpecs.map((item, idx) => (
              <div
                key={`long-${idx}`}
                className="flex w-full flex-col items-start gap-1.5 rounded-xl border border-stone-100 bg-stone-50/60 p-3.5 text-left"
              >
                <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
                  {formatLabelText(item.label)}
                </span>
                <span className="w-full text-[13.5px] leading-relaxed font-semibold break-words whitespace-pre-line text-stone-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* NÚT LIÊN HỆ ZALO MOBILE */}
        <motion.a
          whileTap={{ scale: 0.98 }}
          href="https://zalo.me/0937175384"
          target="_blank"
          rel="noreferrer"
          className="shadow-primary/10 mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold tracking-widest text-white shadow-md transition-colors"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-sans text-[8px] font-extrabold tracking-tighter text-[#0068ff]">
            Zalo
          </div>
          LIÊN HỆ NHANH QUA ZALO
        </motion.a>
      </div>

      {/* ================= LAYOUT 2: HIỂN THỊ TRÊN DESKTOP (HỘP DỌC STICKY CHUẨN CĂN HỘ) ================= */}
      <div
        className="hidden flex-col rounded-3xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-200/50 md:flex md:p-8"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <h3
          className="mb-8 text-center text-xl font-bold tracking-wider uppercase md:text-2xl"
          style={{ color: PRIMARY_COLOR }}
        >
          Thông tin căn hộ
        </h3>

        <div className="mb-8 flex-1 space-y-5">
          {specs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 text-stone-700">
              <div
                className="mt-0.5 flex w-6 flex-shrink-0 justify-center"
                style={{ color: PRIMARY_COLOR }}
              >
                {item.icon}
              </div>
              <div className="text-sm leading-relaxed md:text-base">
                <span
                  className={
                    item.isBoldLabel
                      ? "font-bold text-stone-900"
                      : "font-semibold text-stone-800"
                  }
                >
                  {item.label}
                </span>{" "}
                <span className="text-stone-600">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://zalo.me/0937175384"
          target="_blank"
          rel="noreferrer"
          className="shadow-primary/20 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-bold tracking-widest text-white shadow-lg transition-colors"
          style={{
            backgroundColor: PRIMARY_COLOR,
            boxShadow: "0 10px 25px -5px rgba(171, 140, 93, 0.3)",
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-sans text-[10px] font-extrabold tracking-tighter text-[#0068ff]">
            Zalo
          </div>
          LIÊN HỆ NHANH QUA ZALO
        </motion.a>
      </div>
    </>
  );
}
