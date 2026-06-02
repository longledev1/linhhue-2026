import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../../../components/Card/ProjectCard";
import { apartmentService } from "../../../services/apartmentService";
import { houseService } from "../../../services/houseService";
import { landService } from "../../../services/landService";

const ProjectCollectionSection = () => {
  // ================= STATE =================
  const [activeFilter, setActiveFilter] = useState("apartment");
  const [showAll, setShowAll] = useState(false);

  const [apartmentProjects, setApartmentProjects] = useState([]);
  const [houseProjects, setHouseProjects] = useState([]);
  const [landProjects, setLandProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading để tránh bị nhấp nháy chữ "Không có dự án" khi đang fetch

  const filters = [
    { label: "Căn hộ", value: "apartment" },
    { label: "Nhà ở", value: "house" },
    { label: "Đất đai", value: "land" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const [apartments, houses, lands] = await Promise.all([
          apartmentService.getFeatured(),
          houseService.getFeatured(),
          landService.getFeatured(),
        ]);

        setApartmentProjects(apartments || []);
        setHouseProjects(houses || []);
        setLandProjects(lands || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case "house":
        return houseProjects;
      case "land":
        return landProjects;
      default:
        return apartmentProjects;
    }
  }, [activeFilter, apartmentProjects, houseProjects, landProjects]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setShowAll(false);
  };

  // Lấy nhãn tiếng Việt của tab hiện tại để đưa vào câu thông báo trống cho thân thiện
  const currentFilterLabel =
    filters.find((f) => f.value === activeFilter)?.label || "dự án";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-[100px] w-full font-sans"
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
                  onClick={() => handleFilterChange(filter.value)}
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

        {/* ================= PROJECT GRID & EMPTY STATE ================= */}
        {loading ? (
          // Khối Loading giả lập (Skeleton) trong lúc đợi API
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] animate-pulse rounded-2xl bg-stone-100"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          // Nếu CÓ dự án -> Render danh sách như cũ
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleProjects.map((project, index) => (
              <div key={project.id}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          // 🌟 Nếu KHÔNG CÓ dự án -> Hiện khối Empty State cực đẹp
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 px-4 py-16 text-center"
          >
            {/* Icon chiếc hộp rỗng tối giản vẽ bằng SVG */}
            <svg
              className="mb-4 h-12 w-12 text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="mb-1 text-base font-semibold text-stone-700">
              Chưa có dữ liệu hiển thị
            </h3>
            <p className="max-w-xs text-sm font-light text-stone-400">
              Hiện tại danh mục{" "}
              <span className="font-medium text-stone-500">
                {currentFilterLabel}
              </span>{" "}
              tiêu biểu đang được cập nhật. Vui lòng quay lại sau!
            </p>
          </motion.div>
        )}

        {/* ================= LOAD MORE ================= */}
        {filteredProjects.length > 6 && !showAll && !loading && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-primary rounded-xl px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Xem thêm dự án
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ProjectCollectionSection;
