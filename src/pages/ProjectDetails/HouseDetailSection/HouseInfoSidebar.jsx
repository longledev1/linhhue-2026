import React from "react";
import { motion } from "framer-motion";

export default function InfoSidebar({ specs }) {
  return (
    <>
      <div className="block w-full space-y-6 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm md:hidden">
        <div className="flex flex-wrap items-center justify-start gap-y-6">
          {specs.map((item, idx) => {
            const isLastItem = idx === specs.length - 1;

            return (
              <div
                key={idx}
                className={`flex items-center justify-center ${
                  isLastItem
                    ? "mt-2 w-full justify-start border-t border-stone-100 pt-4 text-left"
                    : "w-[33.33%] min-w-[100px] border-r border-stone-200 last:border-r-0"
                }`}
                style={{
                  borderRightColor:
                    idx === 2 || idx === 5 || isLastItem
                      ? "transparent"
                      : undefined,
                }}
              >
                <div
                  className={`flex flex-col space-y-1 ${isLastItem ? "text-left" : "w-full px-2 text-center"}`}
                >
                  <span className="text-xs font-medium tracking-wide text-stone-400">
                    {item.label.replace(":", "")}
                  </span>

                  <span
                    className={`leading-tight text-[#1c1c1a] ${
                      item.isBoldLabel || isLastItem
                        ? "text-base font-bold text-stone-900"
                        : "text-sm font-semibold text-stone-800"
                    }`}
                  >
                    {typeof item.value === "string"
                      ? item.value.toUpperCase().replace("PHÒNG", "PN")
                      : item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <motion.a
          whileTap={{ scale: 0.98 }}
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-primary shadow-primary/10 hover:bg-primary/90 mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold tracking-widest text-white shadow-md transition-colors"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[8px] font-extrabold tracking-tighter text-[#0068ff]">
            Zalo
          </div>
          LIÊN HỆ NHANH QUA ZALO
        </motion.a>
      </div>

      {/* ================= LAYOUT 2: HIỂN THỊ TRÊN DESKTOP (HỘP DỌC STICKY) ================= */}
      <div className="hidden flex-col rounded-3xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-200/50 md:flex md:p-8">
        <h3 className="text-primary mb-8 text-center text-xl font-bold tracking-wider uppercase md:text-2xl">
          Thông tin nhà ở
        </h3>

        {/* Danh sách thông số dạng dọc chuẩn chỉ của bạn */}
        <div className="mb-8 flex-1 space-y-5">
          {specs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 text-stone-700">
              <div className="text-primary mt-0.5 flex w-6 flex-shrink-0 justify-center">
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

        {/* Nút liên hệ qua Zalo */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-primary shadow-primary/20 hover:bg-primary/90 flex w-full items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-bold tracking-widest text-white shadow-lg transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-extrabold tracking-tighter text-[#0068ff]">
            Zalo
          </div>
          LIÊN HỆ NHANH QUA ZALO
        </motion.a>
      </div>
    </>
  );
}
