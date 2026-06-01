import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../components/Card/ProjectCard";
import { Skeleton } from "@mui/material";
// 🌟 IMPORT LỚP SERVICE TRUNG GIAN
import { houseService } from "../../../services/houseService";

export default function SuggestedProjects({ currentId }) {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedHouses = async () => {
      try {
        setLoading(true);

        // 🌟 GỌI HÀM QUA SERVICE: UI hoàn toàn sạch bóng câu lệnh Supabase
        const data = await houseService.getSuggestions(currentId, 6);

        setSuggested(data);
      } catch (err) {
        console.error("Lỗi lấy danh sách gợi ý từ Service:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentId) {
      fetchSuggestedHouses();
    }
  }, [currentId]);

  // Cấu hình dòng chảy animation so le (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  // Khung xương LOADING giữ nguyên
  if (loading) {
    return (
      <section className="py-16">
        <div className="mb-12 h-8 w-48 animate-pulse rounded bg-stone-200" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-4">
              <Skeleton
                variant="rounded"
                width="100%"
                height={200}
                sx={{ borderRadius: "16px" }}
              />
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="100%" height={40} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (suggested.length === 0) return null;

  return (
    <section className="overflow-hidden py-16">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-wider text-[#1c1c1a] uppercase"
        >
          Gợi ý dành cho bạn
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {suggested.map((item, index) => (
            <motion.div key={item.id} variants={cardVariants}>
              <ProjectCard project={item} index={index} isDetail={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
