import React from "react";
import { motion } from "framer-motion";
import { formatPhoneNumber } from "../../../utils/format";
import { FiPhoneCall } from "react-icons/fi";

export default function LandInfoSidebar({ specs, phone_number }) {
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

  // Lọc lấy danh sách các thông số ngắn còn lại (Diện tích, Kích thước, Loại đất, Vị trí...)
  const coreShortSpecs = shortSpecs.filter(
    (item) =>
      !item.label.toLowerCase().includes("giá") &&
      !item.label.toLowerCase().includes("hướng"),
  );

  // HÀM FORMAT NHÃN VÀ GIÁ TRỊ CHUẨN SẠCH
  const formatLabelText = (label) => {
    return label.replace(":", "").trim();
  };

  return (
    <>
      {/* ================= LAYOUT 1: HIỂN THỊ TRÊN MOBILE (THIẾT KẾ XẾP TẦNG SANG TRỌNG) ================= */}
      <div
        className="block w-full space-y-3.5 rounded-2xl border border-stone-100 bg-white p-5 font-sans shadow-sm md:hidden"
        style={{ fontFamily: FONT_FAMILY }}
      >
        {/* KHỐI 1A: Khoảng giá đất */}
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

        {/* KHỐI 1B: Hướng đất */}
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

        {/* KHỐI 1C: Diện tích, Kích thước, Loại đất nền khác (Cấu trúc ngang song song tối giản) */}
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
                  {typeof item.value === "string"
                    ? item.value.toUpperCase()
                    : item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* KHỐI 2: Tiện ích xung quanh & Ghi chú pháp lý đất đai dài (Tách khối tầng chống tràn text) */}
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
        {/* CỤM NÚT LIÊN HỆ TRÊN MOBILE (Đã chuyển sang flex-col và cỡ chữ text-sm) */}
        <div className="mt-5 flex w-full flex-col gap-3">
          {/* NÚT 1: CHAT QUA ZALO */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={`https://zalo.me/${phone_number}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-[#0068ff] py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0056cc]"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-sans text-[9px] font-extrabold tracking-tighter text-[#0068ff]">
              Zalo
            </div>
            <span className="font-semibold whitespace-nowrap">
              Liên hệ Zalo
            </span>
          </motion.a>

          {/* NÚT 2: SỐ ĐIỆN THOẠI */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={`tel:${phone_number}`}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all"
            style={{
              backgroundColor: PRIMARY_COLOR,
              boxShadow: "0 10px 25px -5px rgba(171, 140, 93, 0.3)",
            }}
          >
            <FiPhoneCall className="h-4 w-4 shrink-0 animate-pulse" />
            <span className="whitespace-nowrap">
              {formatPhoneNumber(phone_number)}
            </span>
          </motion.a>
        </div>
      </div>

      {/* ================= LAYOUT 2: HIỂN THỊ TRÊN DESKTOP (HỘP DỌC STICKY CHUẨN ĐẤT NỀN) ================= */}
      <div
        className="hidden flex-col rounded-3xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-200/50 md:flex md:p-8"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <h3
          className="mb-8 text-center text-xl font-bold tracking-wider uppercase md:text-2xl"
          style={{ color: PRIMARY_COLOR }}
        >
          Thông tin đất nền
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
        {/* CỤM NÚT LIÊN HỆ TRÊN DESKTOP (Hàng ngang flex-row) */}
        <div className="mx-auto flex w-full max-w-md flex-row items-center justify-center gap-3">
          {/* NÚT 1: CHAT QUA ZALO */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={`https://zalo.me/${phone_number}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-[#0068ff] py-3.5 font-medium text-white shadow-sm transition-colors hover:bg-[#0056cc]"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-sans text-[9px] font-extrabold tracking-tighter text-[#0068ff]">
              Zalo
            </div>
            <span className="font-semibold whitespace-nowrap">
              Liên hệ Zalo
            </span>
          </motion.a>

          {/* NÚT 2: SỐ ĐIỆN THOẠI */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={`tel:${phone_number}`}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold tracking-wide text-white shadow-lg transition-all"
            style={{
              backgroundColor: PRIMARY_COLOR,
              boxShadow: "0 10px 25px -5px rgba(171, 140, 93, 0.3)",
            }}
          >
            <FiPhoneCall className="h-4 w-4 shrink-0 animate-pulse" />
            <span className="font-semibold whitespace-nowrap">
              {formatPhoneNumber(phone_number)}
            </span>
          </motion.a>
        </div>
      </div>
    </>
  );
}
