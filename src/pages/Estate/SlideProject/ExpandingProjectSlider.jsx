import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ExpandingProjectSlider = () => {
  // Mặc định hover slide đầu tiên (id: 0) để màn hình desktop không bị trống trải, tạo điểm nhấn ban đầu
  const [activeHover, setActiveHover] = useState(0);

  const slidesData = [
    {
      id: 0,
      title: "Danh mục căn hộ",
      category: "Apartment",
      image: "/images/estate/apartment_banner.jpg",
      desc: "Không gian sống đẳng cấp với thiết kế tinh tế, tối ưu hóa công năng và tầm nhìn tuyệt đẹp.",
      link: "/bat-dong-san/can-ho",
    },
    {
      id: 1,
      title: "Danh mục nhà ở",
      category: "Residential",
      image: "/images/estate/home_banner.png",
      desc: "Nơi tôn vinh sự yên tĩnh tuyệt đối với các gam màu trung tính nhẹ nhàng, ấm cúng.",
      link: "/bat-dong-san/nha-o",
    },
    {
      id: 2,
      title: "Danh mục đất đai",
      category: "Land",
      image: "/images/estate/land_banner.png",
      desc: "Thiết kế hệ tủ ẩn gọn gàng, mang lại cảm giác sạch sẽ và khơi nguồn cảm hứng.",
      link: "/bat-dong-san/dat-dai",
    },
  ];

  return (
    <section className="mb-[100px] h-screen w-full overflow-hidden bg-black font-sans text-white select-none">
      {/* ================= DESKTOP ================= */}
      <div className="hidden h-full w-full lg:flex">
        {slidesData.map((slide) => {
          const isExpanded = activeHover === slide.id;

          return (
            <a
              href={slide.link}
              key={slide.id}
              onMouseEnter={() => setActiveHover(slide.id)}
              className={`relative h-full cursor-pointer overflow-hidden transition-all duration-700 ease-out ${
                isExpanded ? "flex-[4]" : "flex-1"
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000"
                style={{
                  transform: isExpanded ? "scale(1.05)" : "scale(1)",
                }}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isExpanded ? "bg-black/35" : "bg-black/70"
                }`}
              />

              {/* Vertical Title khi chưa hover */}
              {!isExpanded && (
                <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
                  <h3
                    className="text-lg font-medium tracking-[0.3em] whitespace-nowrap text-stone-300 uppercase transition-colors hover:text-white"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {slide.category}
                  </h3>
                </div>
              )}

              {/* Content khi hover */}
              <div
                className={`absolute bottom-0 left-0 z-20 w-full p-12 transition-all duration-500 ${
                  isExpanded
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-10 opacity-0"
                }`}
              >
                <span className="mb-4 block text-xs font-bold tracking-[0.35em] text-[#ab8c5d] uppercase">
                  {slide.category}
                </span>

                <h2 className="mb-5 max-w-xl text-5xl leading-tight font-semibold text-white drop-shadow-sm">
                  {slide.title}
                </h2>

                <p className="max-w-md text-sm leading-relaxed text-neutral-300">
                  {slide.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 border-b border-[#ab8c5d]/40 pb-1 text-xs font-bold tracking-wider text-[#ab8c5d] uppercase">
                  Khám phá ngay &rarr;
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* ================= MOBILE SWIPER ================= */}
      <div className="block h-screen lg:hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="project-swiper h-full"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              {/* Bọc thẻ <a> toàn bộ vùng slide trên mobile để tăng trải nghiệm bấm của user */}
              <a
                href={slide.link}
                className="relative block h-screen w-full overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-16 left-0 z-10 w-full p-8 pb-12">
                  <span className="mb-2 block text-xs font-bold tracking-[0.3em] text-[#ab8c5d] uppercase">
                    {slide.category}
                  </span>

                  <h3 className="mb-3 text-3xl font-semibold text-white">
                    {slide.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-300">
                    {slide.desc}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#ab8c5d] uppercase">
                    Xem danh mục &rarr;
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= CUSTOM PAGINATION ================= */}
      <style jsx="true" global="true">{`
        .project-swiper .swiper-pagination-bullet {
          background: #777 !important;
          opacity: 1;
        }

        .project-swiper .swiper-pagination-bullet-active {
          background: #ab8c5d !important;
          width: 24px !important;
          border-radius: 999px !important;
          transition: all 0.3s ease;
        }

        .project-swiper .swiper-pagination {
          bottom: 32px !important;
        }
      `}</style>
    </section>
  );
};

export default ExpandingProjectSlider;
