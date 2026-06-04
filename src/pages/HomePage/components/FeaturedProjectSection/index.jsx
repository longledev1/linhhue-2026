import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedProjects = () => {
  // 1. Cấu trúc dữ liệu mẫu (Mockup Data) chuẩn hóa
  const projectsData = [
    {
      id: "vinhomes-grand-park",
      title: "Vinhomes Grand Park",
      description:
        "Tọa lạc tại vị trí kim cương của trung tâm thành phố, Vinhomes Grand Park định nghĩa lại khái niệm căn hộ hạng sang bằng ngôn ngữ kiến trúc tối giản tinh tế, hệ thống tiện ích đặc quyền chuẩn resort và tầm nhìn panorama ôm trọn lõi đô thị phồn hoa.",
      image: "/images/home/bds1.png",
    },
    {
      id: "dat-gia-riverside",
      title: "Đạt Gia Riverside",
      description:
        "Tổ hợp biệt thự sinh thái và bến du thuyền đẳng cấp bên sông. Dự án mang đến một không gian sống thượng lưu khép kín, nơi thiên nhiên nguyên bản giao hòa trọn vẹn cùng những đặc quyền sống xa hoa bậc nhất.",
      image: "/images/home/bds2.png",
    },
    {
      id: "the-centena",
      title: "The Centena",
      description:
        "Biểu tượng sống mới tại tâm điểm khu Đông Sài Gòn. Căn hộ cao cấp phong cách chuẩn Âu với thiết kế không gian mở tối ưu ánh sáng tự nhiên, không gian xanh phủ lớn và kết nối giao thông hoàn hảo tới các khu vực trọng điểm.",
      image: "/images/home/bds3.png",
    },
  ];

  // Khởi tạo state quản lý dự án đang được chọn
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projectsData[activeIndex];

  // Xử lý vuốt màn hình (Swipe) trên Mobile
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Vuốt sang trái -> Next Slide
      setActiveIndex((prev) => (prev + 1) % projectsData.length);
    } else if (info.offset.x > swipeThreshold) {
      // Vuốt sang phải -> Prev Slide
      setActiveIndex(
        (prev) => (prev - 1 + projectsData.length) % projectsData.length,
      );
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-12 font-sans md:py-20">
      {/* --- PHẦN 1: TIÊU ĐỀ SECTION --- */}
      <div className="container mx-auto mb-8 px-4 text-center md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-2xl font-bold tracking-wider text-transparent uppercase md:text-[44px]">
            DANH MỤC DỰ ÁN
          </h2>
          <p className="mx-auto max-w-4xl text-xs leading-relaxed font-light text-gray-500 md:text-base">
            Chào mừng quý khách đến với bộ sưu tập những công trình kiến trúc
            đẳng cấp và các dự án bất động sản tiêu biểu nhất của chúng tôi. Mỗi
            dự án tọa lạc tại một vị trí chiến lược vô giá, sở hữu mô hình quy
            hoạch đồng bộ mang tầm vóc tương lai.
          </p>
        </motion.div>
      </div>

      {/* --- PHẦN 2: LAYOUT HIỂN THỊ CHÍNH --- */}
      {/* Giao diện Mobile: Chiều cao cố định h-[500px] làm slider | Desktop: Trở lại h-[750px] như cũ */}
      <div className="relative mt-[20px] flex h-[500px] w-full flex-col bg-neutral-900 md:mt-[30px] lg:h-[750px] lg:flex-row lg:items-center">
        {/* === KHU VỰC HÌNH ẢNH NỀN === */}
        {/* Mobile: Phủ full màn hình làm background cho text overlay | Desktop: Absolute z-0 */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeProject.image})` }}
            >
              {/* Lớp phủ tối (Overlay) giúp text trên mobile nổi bật và dễ đọc hơn */}
              <div className="absolute inset-0 bg-black/50 lg:bg-black/20"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === KHU VỰC HIỂN THỊ MOBILE SLIDER OVERLAY (Chỉ hiện trên Mobile < lg) === */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 py-12 text-center lg:hidden">
          {/* Vùng chứa text có hiệu ứng đổi slide khi vuốt */}
          <div className="my-auto w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="cursor-grab select-none active:cursor-grabbing"
              >
                <h3 className="mb-2 text-xs font-bold tracking-widest text-[#ab8c5d] uppercase">
                  DỰ ÁN HỢP TÁC
                </h3>
                <h2 className="mb-4 text-2xl font-bold tracking-wide text-white">
                  {activeProject.title}
                </h2>
                <p className="line-clamp-6 text-sm leading-relaxed font-light text-gray-200">
                  {activeProject.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hệ thống Dots Pagination (3 nút tròn điều hướng dưới đáy slide) */}
          <div className="flex items-center justify-center gap-3">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "scale-125 bg-[#ab8c5d]"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* === KHU VỰC CARD NỘI DUNG DESKTOP (Ẩn trên Mobile, chỉ hiện từ màn hình lg trở lên) === */}
        <div className="relative z-10 hidden w-full px-4 py-6 sm:px-6 lg:container lg:block lg:py-0">
          <div className="flex w-full flex-col gap-2 rounded-2xl bg-white p-5 shadow-xl md:p-8 lg:w-[460px] lg:rounded-[24px] lg:shadow-2xl">
            <h3 className="mb-3 text-lg font-bold tracking-wide text-[#ab8c5d] uppercase md:text-xl lg:mb-4">
              DỰ ÁN HỢP TÁC
            </h3>

            {/* DANH SÁCH MENU CÁC DỰ ÁN */}
            <div className="flex flex-col gap-1.5">
              {projectsData.map((project, index) => {
                const isActive = project.id === activeProject.id;

                return (
                  <div key={project.id} className="w-full">
                    {/* Nút bấm kích hoạt dự án */}
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`flex w-full flex-col rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-[#ab8c5d] text-white shadow-md"
                          : "text-[#1c1c1a] hover:bg-gray-50 hover:text-[#ab8c5d]"
                      }`}
                    >
                      <span className="text-sm font-semibold md:text-base lg:text-lg">
                        {project.title}
                      </span>

                      {/* VÙNG HIỂN THỊ MÔ TẢ: Chỉ mở ra khi mục đó được click Active */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              marginTop: 10,
                            }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full overflow-hidden"
                          >
                            <p className="border-t border-white/20 pt-2.5 text-justify text-xs leading-relaxed font-light text-white/90 md:text-sm">
                              {project.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
