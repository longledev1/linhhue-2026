import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIdx,
  setCurrentIdx,
}) {
  const activeImg = images[currentIdx];

  const nextImage = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          {/* Nút đóng modal */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
          >
            <FiX size={24} />
          </button>

          {/* Nút điều hướng ảnh (Trái) */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-6 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
          >
            <FiChevronLeft size={28} />
          </button>

          {/* Nút điều hướng ảnh (Phải) */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-6 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
          >
            <FiChevronRight size={28} />
          </button>

          {/* Vùng hiển thị ảnh chính giữa */}
          <div className="flex h-full max-h-[85vh] w-full max-w-5xl items-center justify-center p-4">
            <motion.img
              key={currentIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={activeImg.src}
              alt="Apartment full view"
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>

          {/* Hiển thị số đếm ảnh hiện tại */}
          <div className="absolute bottom-6 text-sm font-medium tracking-widest text-white/70">
            {currentIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
