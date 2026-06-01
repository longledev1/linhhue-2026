import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../components/Card/ProjectCard";

const ProjectCollectionSection = () => {
  // ================= MOCK DATA =================
  const projectsData = [
    {
      id: 1,
      title: "The Sun Residence - Quận 7",
      category: "apartment",
      description:
        "Không gian sống hiện đại với thiết kế tối giản và hệ tiện ích đầy đủ dành cho cư dân trẻ.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 2,
      title: "The Lusso - Thảo Điền",
      category: "house",
      description:
        "Dự án cao cấp sở hữu vị trí chiến lược cùng không gian sống xanh chuẩn quốc tế.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 3,
      title: "Eco Smart City",
      category: "land",
      description:
        "Kiến tạo môi trường sống hiện đại kết hợp công nghệ và hệ sinh thái bền vững.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 4,
      title: "Palm Residence",
      category: "apartment",
      description:
        "Không gian sống tinh gọn nhưng đầy đủ tiện nghi dành cho cộng đồng cư dân trẻ.",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 5,
      title: "Urban Villa",
      category: "house",
      description:
        "Kiến trúc hiện đại cùng không gian mở mang đến trải nghiệm sống đẳng cấp.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 6,
      title: "Skyline Riverside",
      category: "apartment",
      description:
        "Sở hữu vị trí ven sông chiến lược cùng hệ thống tiện ích cao cấp.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 7,
      title: "Central Garden",
      category: "land",
      description:
        "Quỹ đất giàu tiềm năng phát triển với hạ tầng kết nối đồng bộ.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 8,
      title: "Minimal Living",
      category: "house",
      description:
        "Không gian sống tối giản hướng đến giá trị sử dụng thực tế và bền vững.",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },

    {
      id: 9,
      title: "River View Apartment",
      category: "apartment",
      description:
        "Thiết kế hiện đại với tầm nhìn toàn cảnh thành phố và hệ tiện ích khép kín.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
      tags: ["Hoạt động", "Nổi bật"],
    },
  ];

  // ================= FILTER =================
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "Tất cả", value: "all" },
    { label: "Căn hộ", value: "apartment" },
    { label: "Nhà ở", value: "house" },
    { label: "Đất đai", value: "land" },
  ];

  // ================= FILTERED DATA =================
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsData;

    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full font-sans"
    >
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* ================= FILTER BUTTONS ================= */}
        <div className="mb-10 flex items-center justify-center gap-5">
          {/* Left Line */}
          <div className="h-px flex-1 bg-gray-300/70" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border-[#ab8c5d] bg-[#ab8c5d] text-white shadow-md"
                      : "border-black/10 bg-white text-[#1c1c1a] hover:border-[#ab8c5d] hover:text-[#ab8c5d]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Right Line */}
          <div className="h-px flex-1 bg-gray-300/70" />
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* ================= LOAD MORE ================= */}
        <div className="mt-14 flex justify-center">
          <button className="rounded-xl bg-gradient-to-b from-[#ab8c5d] to-[#453826] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:brightness-110">
            Xem thêm
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectCollectionSection;
