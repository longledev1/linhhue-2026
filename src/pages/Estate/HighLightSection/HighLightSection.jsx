import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../components/Card/ProjectCard";

const HighLightSection = () => {
  // ================= API DATA MOCK =================
  // Sau này chỉ cần thay bằng API thật
  const projectsData = [
    {
      id: 1,
      title:
        "VINHOMES ROYAL ISLAND – THÀNH PHỐ ĐẢO ĐẲNG CẤP QUỐC TẾ TẠI VŨ YÊN, HẢI PHÒNG",
      description:
        "Không gian sống hiện đại được quy hoạch đồng bộ với hệ thống tiện ích cao cấp, mật độ xây dựng tối ưu và định hướng phát triển bền vững dành cho cộng đồng cư dân mới.",
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1400",
      tags: ["Hoạt động", "Nổi bật"],
      isFeatured: true,
      slug: "vinhomes-royal-island",
    },

    {
      id: 2,
      title: "The Sun Residence – Quận 7",
      description:
        "Không gian sống hiện đại với thiết kế tối giản và hệ tiện ích đầy đủ dành cho cư dân trẻ.",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
      tags: ["Hoạt động", "Nổi bật"],
      slug: "the-sun-residence",
    },

    {
      id: 3,
      title: "The Lusso – Thảo Điền",
      description:
        "Dự án cao cấp sở hữu vị trí chiến lược cùng không gian sống xanh chuẩn quốc tế.",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800",
      tags: ["Hoạt động", "Nổi bật"],
      slug: "the-lusso",
    },

    {
      id: 4,
      title: "Eco Smart City",
      description:
        "Kiến tạo môi trường sống hiện đại kết hợp công nghệ và hệ sinh thái bền vững.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800",
      tags: ["Hoạt động", "Nổi bật"],
      slug: "eco-smart-city",
    },
  ];

  // ================= FEATURED PROJECT =================
  const featuredProject =
    projectsData.find((item) => item.isFeatured) || projectsData[0];

  // ================= NORMAL PROJECTS =================
  const normalProjects = projectsData.filter(
    (item) => item.id !== featuredProject.id,
  );

  return (
    <section className="mb-[100px] w-full font-sans">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl leading-normal font-bold text-transparent uppercase md:text-4xl lg:text-[44px]"
          >
            DỰ ÁN TIÊU BIỂU
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-secondary max-w-5xl text-sm leading-relaxed font-light md:text-base"
          >
            Linh Huệ phát triển những không gian sống hiện đại với định hướng
            tối ưu trải nghiệm, chi phí hợp lý và giá trị sử dụng bền vững. Mỗi
            dự án đều được chú trọng từ vị trí, thiết kế đến chất lượng vận hành
            nhằm mang lại môi trường sống tiện nghi và phù hợp với nhiều nhu cầu
            an cư khác nhau.
          </motion.p>
        </div>

        {/* ================= FEATURED PROJECT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-10 overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
            {/* IMAGE */}
            <div className="relative h-[320px] overflow-hidden lg:h-full">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* TAGS */}
              <div className="absolute top-5 left-5 flex gap-2">
                {featuredProject.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`rounded-xl px-4 py-2 text-xs font-medium ${
                      index === 0
                        ? "bg-[#dff5e8] text-green-600"
                        : "bg-[#fff1c9] text-yellow-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="mb-5 text-2xl leading-snug font-bold text-[#1c1c1a] uppercase">
                {featuredProject.title}
              </h3>

              <p className="text-secondary mb-8 leading-relaxed font-light">
                {featuredProject.description}
              </p>

              <button className="group flex w-fit items-center gap-2 border-b border-[#ab8c5d] pb-1 text-sm font-semibold tracking-wide text-[#ab8c5d] transition-all hover:opacity-70">
                Xem chi tiết dự án
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {normalProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighLightSection;
