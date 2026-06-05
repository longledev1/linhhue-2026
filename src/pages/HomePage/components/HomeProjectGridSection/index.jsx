import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../../components/Card/ProjectCard";
import { houseService } from "../../../../services/houseService";
import { useNavigate } from "react-router-dom";

const ProjectGrid = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestHouses = async () => {
      try {
        const data = await houseService.getLatest(3);
        setHouses(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestHouses();
  }, []);

  console.log("Latest houses:", houses);

  return (
    <section className="l w-full overflow-hidden font-sans">
      {/* --- PHẦN 1: TIÊU ĐỀ SECTION VỚI TEXT GRADIENT --- */}
      <div className="container mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-[16px] bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-3xl leading-normal font-bold text-transparent uppercase md:text-4xl lg:text-[42px]">
            DANH MỤC NHÀ Ở
          </h2>
          <p className="mx-auto max-w-4xl px-4 text-sm leading-relaxed font-light text-gray-500 md:text-base">
            Hệ thống sản phẩm bất động sản phân khúc cao cấp sở hữu pháp lý minh
            bạch, vị trí đắc địa chiến lược và tiến độ thi công vượt trội. Chúng
            tôi không chỉ xây nhà, chúng tôi kiến tạo không gian sống lý tưởng
            hoàn mỹ nhất.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="mt-[9px] grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-3 py-10 text-center">
              Đang tải dữ liệu...
            </div>
          ) : houses.length > 0 ? (
            houses.map((house, index) => (
              <ProjectCard key={house.id} project={house} index={index} />
            ))
          ) : (
            /* Thêm giao diện Empty State cho Nhà Ở */
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-primary flex flex-col items-center justify-center rounded-2xl border border-dashed bg-stone-50/50 px-4 py-16 text-center"
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
                    dự án nhà ở
                  </span>{" "}
                  đang được cập nhật. Vui lòng quay lại sau!
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Ẩn nút nếu không có nhà ở nào để tránh phá vỡ bố cục trải nghiệm */}
        {houses.length > 0 && (
          <div className="mt-16 flex w-full justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => navigate("/bat-dong-san/nha-o")}
              className="bg-primary cursor-pointer rounded-xl px-10 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
            >
              XEM THÊM DỰ ÁN
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
