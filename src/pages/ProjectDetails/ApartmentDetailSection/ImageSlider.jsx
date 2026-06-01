import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageSlider({
  images,
  currentIdx,
  setCurrentIdx,
  onOpenModal,
}) {
  const activeImg = images[currentIdx];

  const nextImage = (e) => {
    e.stopPropagation(); // Tránh kích hoạt sự kiện mở modal của thẻ cha
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Ảnh lớn chính */}
      <div
        onClick={onOpenModal}
        className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl bg-black shadow-md"
      >
        <img
          src={activeImg.src}
          alt="Apartment view"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
            activeImg.orientation === "portrait"
              ? "object-contain"
              : "object-cover"
          }`}
        />

        {/* Nút chuyển ảnh bên trái */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/60"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Nút chuyển ảnh bên phải */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/60"
        >
          <FiChevronRight size={24} />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Danh sách ảnh nhỏ Thumbnails */}
      <div className="grid grid-cols-6 gap-2 md:gap-3">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setCurrentIdx(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-stone-100 transition-all ${
              currentIdx === index
                ? "border-primary scale-95 shadow-md"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt="thumbnail"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
