import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function VoteModal() {
  const [isOpen, setIsOpen] = useState(true);

  // Cho phép đóng bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[410px] aspect-[3/4] max-h-[88vh] bg-black shadow-2xl overflow-hidden flex flex-col justify-end"
          >
            {/* Nút đóng modal góc trên bên phải */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2.5 right-2.5 z-30 flex h-9 w-9 items-center justify-center bg-black/70 hover:bg-black text-white transition-colors cursor-pointer border border-white/20"
              aria-label="Đóng"
            >
              <FiX size={20} />
            </button>

            {/* Ảnh model phủ theo dáng poster dọc 3:4 */}
            <img
              src="/images/model.png"
              alt="Heritage Pageant Vote"
              className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
            />

            {/* Lớp phủ gradient tối dần về đáy để đọc chữ rõ ràng */}
            <div className="relative z-10 w-full pt-20 pb-5 px-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent text-center flex flex-col items-center">
              {/* Thông tin cô đọng, dễ hiểu */}
              <div className="mb-3 max-w-sm">
                <span className="inline-block text-[10px] md:text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-0.5">
                  Đại diện Việt Nam
                </span>
                <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                  Bà Nguyễn Thị Huệ
                </h3>
                <p className="mt-1 text-[11px] md:text-xs text-stone-300 leading-relaxed">
                  Tham dự <span className="font-semibold text-white">Mrs Gold Heritage International 2026</span> — Cuộc thi sắc đẹp quốc tế quảng bá văn hóa & di sản.
                </p>
              </div>

              {/* Nút VOTE NOW màu trắng, chữ bé lại, bo góc rounded */}
              <a
                href="https://heritagepageant.com/vote/121"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[280px] py-2.5 px-6 text-center font-bold tracking-wider text-stone-900 text-xs md:text-sm uppercase bg-white hover:bg-stone-100 rounded-full shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-stone-200"
                style={{ fontFamily: '"Montserrat", sans-serif' }}
              >
                <span>VOTE NOW</span>
                <svg
                  className="w-4 h-4 text-[#ab8c5d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
