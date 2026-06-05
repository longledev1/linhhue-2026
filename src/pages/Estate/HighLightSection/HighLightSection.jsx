import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../components/Card/ProjectCard";
import FeaturedProjectCard from "../../../components/Card/FeaturedProjectCard";
import { apartmentService } from "../../../services/apartmentService";
import { houseService } from "../../../services/houseService";
import { landService } from "../../../services/landService";

const HighLightSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const [apartments, houses, lands] = await Promise.all([
          apartmentService.getFeatured(),
          houseService.getFeatured(),
          landService.getFeatured(),
        ]);

        const merged = [...apartments, ...houses, ...lands];
        console.log("APARTMENTS", apartments);
        console.log("HOUSES", houses);
        console.log("LANDS", lands);
        merged.sort(
          (a, b) =>
            new Date(b.featured_at).getTime() -
            new Date(a.featured_at).getTime(),
        );

        setProjects(merged);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const featuredProject = projects[0];
  console.log("Featured Project:", featuredProject);
  const normalProjects = projects.slice(1);
  const visibleProjects = showAll ? normalProjects : normalProjects.slice(0, 3);

  if (loading) {
    return (
      <section className="mb-[100px]">
        <div className="container">
          <div className="h-[500px] animate-pulse rounded-[28px] bg-gray-100" />
        </div>
      </section>
    );
  }

  // Đã xóa phần if (!featuredProject) return null; ở đây

  return (
    <section className="mb-[100px] w-full font-sans">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* ================= HEADER (Luôn hiển thị) ================= */}
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

        {/* ================= CONTENT LOGIC ================= */}
        {!featuredProject ? (
          /* TRƯỜNG HỢP: KHÔNG CÓ DỮ LIỆU */
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
              <span className="font-medium text-stone-500">dự án</span> tiêu
              biểu đang được cập nhật. Vui lòng quay lại sau!
            </p>
          </motion.div>
        ) : (
          /* TRƯỜNG HỢP: CÓ DỮ LIỆU */
          <>
            {/* ================= FEATURED PROJECT ================= */}
            <FeaturedProjectCard project={featuredProject} />

            {/* ================= PROJECT GRID ================= */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Nút Xem Thêm */}
            {normalProjects.length > 3 && !showAll && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-primary rounded-xl px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Xem thêm dự án
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HighLightSection;
