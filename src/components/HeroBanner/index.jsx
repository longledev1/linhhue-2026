import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const HeroBanner = () => {
  const propertySlides = [
    {
      id: 1,
      title: "Green View Residence",
      price: "10.000.000 ₫",
      description:
        "Nơi hoàn hảo để an cư với không gian thiết kế hiện đại, tinh tế. Sở hữu tầm nhìn bao quát và tiện ích đẳng cấp dành cho giới thượng lưu.",
      bgImage: "/images/home/banner1.png",
      thumbImage: "/images/home/banner1.png",
    },
    {
      id: 2,
      title: "Ocean View Villa",
      price: "18.000.000 ₫",
      description:
        "Biệt thự hướng biển tuyệt đẹp với hồ bơi vô cực. Không gian mở tối đa hóa ánh sáng tự nhiên và gió biển trong lành.",
      bgImage: "/images/home/banner2.jpg",
      thumbImage: "/images/home/banner2.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () =>
    setCurrentSlide((prev) =>
      prev === propertySlides.length - 1 ? 0 : prev + 1,
    );
  const handlePrev = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? propertySlides.length - 1 : prev - 1,
    );

  return (
    // SỬA: Đổi từ h-screen thành h-auto trên mobile để nội dung không bị tràn khung, giữ h-screen trên desktop
    <div className="relative h-auto min-h-screen w-full overflow-hidden bg-black font-sans lg:h-screen lg:min-h-[800px]">
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${propertySlides[currentSlide].bgImage})`,
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Content Container */}
      {/* SỬA: Thay thế absolute inset-0 thành flex layout phù hợp cho cả dạng cuộn dọc di động */}
      <div className="relative z-10 flex w-full items-center pt-[120px] pb-10 lg:absolute lg:inset-0 lg:pt-[180px] lg:pb-0">
        <div className="container flex w-full flex-col items-stretch justify-between gap-8 lg:flex-row lg:items-center lg:gap-0">
          {/* LEFT CONTENT: Khối tiêu đề và mô tả */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex w-full flex-col justify-center pr-0 text-white lg:w-1/2 lg:pr-4"
          >
            <h1 className="mb-4 text-3xl leading-[1.1] font-bold md:text-5xl lg:mb-6 lg:text-[62px]">
              AN CƯ, LẠC NGHIỆP <br />
              <span className="text-2xl font-light md:text-4xl md:whitespace-nowrap lg:text-[45px]">
                VỚI MÔ HÌNH LÝ TƯỞNG
              </span>
            </h1>
            <p className="max-w-lg text-[14px] leading-relaxed text-gray-200 lg:mb-10 lg:text-base">
              Giải pháp an cư lý tưởng, kiến tạo không gian sống hoàn hảo để bạn
              vững tâm lạc nghiệp và xây dựng tương lai bền vững
            </p>

            {/* Khối nút bấm trên Desktop (Ẩn hoàn toàn khi về Mobile) */}
            <div className="hidden flex-wrap gap-4 lg:flex">
              <Link
                to="/bat-dong-san"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ab8c5d] to-[#453826] px-8 py-3 font-medium text-white transition-all hover:brightness-110"
              >
                Xem chi tiết &rarr;
              </Link>

              <Link
                target="_blank"
                to="https://zalo.me/0937175384"
                className="flex items-center gap-2 rounded-lg bg-[#1c1c1a]/80 px-8 py-3 font-medium text-white transition-all hover:bg-[#1c1c1a]"
              >
                Liên hệ tư vấn &rarr;
              </Link>
            </div>
          </motion.div>

          {/* RIGHT CONTENT: Khối Card Slider */}
          {/* SỬA: pt-[50px] trên di động làm lệch cấu trúc nên đã được hạ thấp xuống `pt-0` */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-0 flex w-full justify-start pt-0 lg:mt-0 lg:w-[45%] lg:justify-end"
          >
            <div className="flex w-full flex-col gap-5 rounded-[24px] border border-gray-800/40 bg-[#1c1c1a]/75 p-4 shadow-2xl backdrop-blur-xl sm:flex-row md:p-5">
              {/* Thumbnail Image */}
              <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[16px] bg-neutral-900 sm:h-[220px] sm:w-[240px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    src={propertySlides[currentSlide].thumbImage}
                    alt="House thumbnail"
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Slider Text Content */}
              <div className="flex w-full flex-col justify-between overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h3 className="mb-1 text-xl font-semibold text-white md:text-2xl">
                      {propertySlides[currentSlide].title}
                    </h3>
                    <p className="text-primary mb-2 text-base font-bold md:text-lg lg:mb-3">
                      {propertySlides[currentSlide].price}
                    </p>
                    <p className="line-clamp-3 text-xs leading-relaxed text-gray-300 sm:line-clamp-4 md:text-sm">
                      {propertySlides[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Thanh điều hướng mũi tên */}
                <div className="z-20 mt-4 flex justify-end gap-3">
                  <button
                    onClick={handlePrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-[#ab8c5d] hover:text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-[#ab8c5d] hover:text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SỬA: Thêm khối nút bấm dành riêng cho Mobile nằm ở dưới cùng Slide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex w-full flex-col gap-3 sm:flex-row lg:hidden"
          >
            <button className="w-full rounded-xl bg-gradient-to-b from-[#ab8c5d] to-[#453826] py-3.5 text-center font-medium text-white shadow-lg transition-transform active:scale-[0.99]">
              Xem chi tiết &rarr;
            </button>
            <button className="w-full rounded-xl bg-[#1c1c1a]/90 py-3.5 text-center text-white transition-transform active:scale-[0.99]">
              Liên hệ tư vấn &rarr;
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
