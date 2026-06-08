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
  const [loading, setLoading] = useState(true);

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
        <div className="mb-10 flex items-center justify-center gap-4">
          {/* Left Line - Ẩn hoàn toàn trên mobile, chỉ hiện từ md trở lên */}
          <div className="hidden h-px flex-1 bg-gray-300/70 md:block" />

          {/* Filter Buttons Container - Grid 3 cột đều trên mobile, chuyển sang Flex trên desktop */}
          <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:items-center sm:justify-center sm:gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  onClick={() => handleFilterChange(filter.value)}
                  className={`rounded-lg border py-2.5 text-center text-xs font-medium transition-all duration-300 sm:px-4 sm:text-sm ${
                    isActive
                      ? "border-[#ab8c5d] bg-[#ab8c5d] text-white shadow-md shadow-[#ab8c5d]/20"
                      : "border-black/10 bg-white text-[#1c1c1a] hover:border-[#ab8c5d] hover:text-[#ab8c5d]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Right Line - Ẩn hoàn toàn trên mobile, chỉ hiện từ md trở lên */}
          <div className="hidden h-px flex-1 bg-gray-300/70 md:block" />
        </div>

        {/* ================= PROJECT GRID & EMPTY STATE ================= */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] animate-pulse rounded-2xl bg-stone-100"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleProjects.map((project, index) => (
              <div key={project.id}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State với màu border-dashed sắc nét ăn theo tone nâu vàng chủ đạo */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#ab8c5d]/40 bg-stone-50/60 px-6 py-16 text-center"
          >
            <svg
              className="mb-4 h-12 w-12 text-stone-400"
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
            <h3 className="mb-1.5 text-base font-semibold text-stone-700">
              Chưa có dữ liệu hiển thị
            </h3>
            <p className="max-w-xs text-sm leading-relaxed font-light text-stone-500">
              Hiện tại danh mục{" "}
              <span className="font-semibold text-[#ab8c5d]">
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
              className="rounded-xl bg-[#ab8c5d] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
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
