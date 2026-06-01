import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedProjects = () => {
  // 1. Cấu trúc dữ liệu mẫu (Mockup Data) chuẩn hóa để sau này bạn dễ dàng kết nối API
  const projectsData = [
    {
      id: "lusso-saigon",
      title: "Lusso Saigon",
      description:
        "Tọa lạc tại vị trí kim cương của trung tâm thành phố, Lusso Saigon định nghĩa lại khái niệm căn hộ hạng sang bằng ngôn ngữ kiến trúc tối giản tinh tế, hệ thống tiện ích đặc quyền chuẩn resort và tầm nhìn panorama ôm trọn lõi đô thị phồn hoa.",
      image: "/images/home/bds1.png",
    },
    {
      id: "saigon-marina",
      title: "Saigon Marina - Ngoc Suong",
      description:
        "Tổ hợp biệt thự sinh thái và bến du thuyền đẳng cấp bên sông. Dự án mang đến một không gian sống thượng lưu khép kín, nơi thiên nhiên nguyên bản giao hòa trọn vẹn cùng những đặc quyền sống xa hoa bậc nhất.",
      image: "/images/home/bds2.png",
    },
    {
      id: "the-centena",
      title: "The Centena - An Phu Ward",
      description:
        "Biểu tượng sống mới tại tâm điểm khu Đông Sài Gòn. Căn hộ cao cấp phong cách chuẩn Âu với thiết kế không gian mở tối ưu ánh sáng tự nhiên, không gian xanh phủ lớn và kết nối giao thông hoàn hảo tới các khu vực trọng điểm.",
      image: "/images/home/bds3.png",
    },
  ];

  // Khởi tạo state quản lý dự án đang được chọn (mặc định là dự án đầu tiên)
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  return (
    <section className="relative w-full overflow-hidden py-20 font-sans">
      {/* --- PHẦN 1: TIÊU ĐỀ SECTION --- */}
      <div className="container mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-3xl font-bold tracking-wider text-transparent uppercase md:text-[44px]">
            DANH MỤC DỰ ÁN
          </h2>
          <p className="mx-auto max-w-4xl text-sm leading-relaxed font-light text-gray-500 md:text-base">
            Chào mừng quý khách đến với bộ sưu tập những công trình kiến trúc
            đẳng cấp và các dự án bất động sản tiêu biểu nhất của chúng tôi. Mỗi
            dự án tọa lạc tại một vị trí chiến lược vô giá, sở hữu mô hình quy
            hoạch đồng bộ mang tầm vóc tương lai, cam kết mang đến những giải
            pháp sống hoàn hảo và giá trị thực chất trường tồn.
          </p>
        </motion.div>
      </div>

      {/* --- PHẦN 2: LAYOUT HIỂN THỊ CHÍNH (Đồng bộ ảnh nền toàn cảnh) --- */}
      <div className="relative mt-[30px] flex min-h-[600px] w-full items-center bg-neutral-900 lg:h-[800px]">
        {/* BACKGROUND IMAGE SLIDER: Ảnh nền toàn cảnh thay đổi mượt mà theo dự án đang chọn */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeProject.image})` }}
            >
              {/* Lớp phủ tối mờ tinh tế giúp giữ được chiều sâu cảnh quan và tăng tương phản với Card nội dung */}
              <div className="absolute inset-0 bg-black/30 lg:bg-black/20"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 container w-full py-12 lg:py-0">
          <div className="flex w-full flex-col gap-2 rounded-[24px] bg-white p-6 shadow-2xl md:p-8 lg:w-[480px]">
            <h3 className="mb-4 text-2xl font-bold text-[#ab8c5d] md:text-3xl">
              DỰ ÁN TIÊU BIỂU
            </h3>

            {/* DANH SÁCH MENU CÁC DỰ ÁN */}
            <div className="flex flex-col gap-1">
              {projectsData.map((project) => {
                const isActive = project.id === activeProject.id;

                return (
                  <div key={project.id} className="w-full">
                    {/* Nút bấm kích hoạt dự án */}
                    <button
                      onClick={() => setActiveProject(project)}
                      className={`flex w-full flex-col rounded-xl px-4 py-3 text-left text-base font-semibold transition-all duration-300 md:text-lg ${
                        isActive
                          ? "bg-[#ab8c5d] text-white shadow-md"
                          : "text-[#1c1c1a] hover:bg-gray-50 hover:text-[#ab8c5d]"
                      }`}
                    >
                      <span>{project.title}</span>

                      {/* VÙNG HIỂN THỊ MÔ TẢ: Chỉ mở ra khi mục đó được click Active */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              marginTop: 12,
                            }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-white/20 pt-3 text-justify text-xs leading-relaxed font-light text-white/90 md:text-sm">
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
