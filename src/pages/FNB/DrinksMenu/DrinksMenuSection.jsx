import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// 🌟 IMPORT CSS CỦA SWIPER ĐỂ KHÔNG BỊ LỖI XẾP DỌC
import "swiper/css";
import "swiper/css/navigation";

// --- 1. MOCKUP DATA CHUẨN REAL ---
const DRINK_DATA = [
  {
    id: "nuoc-ep",
    categoryName: "KOMBUCHA & NƯỚC ÉP TƯƠI",
    items: [
      {
        id: 1,
        name: "KOM ỔI",
        desc: "Sự kết hợp hoàn hảo giữa vị chua ngọt thanh mát của cam sành và dứa mật, giàu Vitamin C giúp tăng cường đề kháng.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500",
      },
      {
        id: 2,
        name: "KOM TÁO",
        desc: "Thức uống thanh lọc cơ thể tuyệt vời từ cần tây hữu cơ kết hợp táo xanh vị ngọt dịu nhẹ, hỗ trợ giữ dáng, đẹp da.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1610970881699-44a55b4cfd87?w=500",
      },
      {
        id: 3,
        name: "KOM VẢI",
        desc: "Vị ngọt lịm tự nhiên của dưa hấu đỏ mọng quyện chút hương bạc hà sảng khoái, giải nhiệt tức thì cho ngày oi bức.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1546173159-315724a31696?w=500",
      },
      {
        id: 4,
        name: "KOM DÂU TÂY",
        desc: "Chiết xuất hoàn toàn từ những quả lựu đỏ mọng nước giàu chất chống oxy hóa, mang lại hương vị ngọt ngào, quý phái.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500",
      },
      {
        id: 5,
        name: "KOM HIBISCUS",
        desc: "Sự biến tấu độc đáo giữa ổi hồng xá lị thơm lừng và vị ngọt thanh của chà là, dồi dào chất xơ tự nhiên.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500",
      },
      {
        id: 5,
        name: "KOM VIỆT QUẤT",
        desc: "Sự biến tấu độc đáo giữa ổi hồng xá lị thơm lừng và vị ngọt thanh của chà là, dồi dào chất xơ tự nhiên.",
        price: "39.000đ",
        image:
          "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500",
      },
    ],
  },
  {
    id: "ca-phe",
    categoryName: "CÀ PHÊ NĂNG LƯỢNG",
    items: [
      {
        id: 6,
        name: "CÀ PHÊ SỮA ĐÁ",
        desc: "Hương vị đậm đà truyền thống từ hạt Robusta rang mộc, hòa quyện cùng sữa đặc sánh mịn.",
        price: "30.000đ",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
      },
      {
        id: 7,
        name: "CÀ PHÊ TRỨNG",
        desc: "Sự kết hợp hoàn hảo giữa vị đắng nhẹ của Espresso và lớp kem trứng đánh bông béo ngậy, ấm nồng.",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500",
      },
      {
        id: 8,
        name: "BẠC SỈU ĐÁ",
        desc: "Thức uống ngọt ngào dành cho người yêu vị sữa thơm béo, nhấn nhá chút hương vị cà phê nhẹ nhàng.",
        price: "35.000đ",
        image:
          "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500",
      },
      {
        id: 9,
        name: "AMERICANO",
        desc: "Cà phê đen nguyên bản pha loãng, giữ trọn hương thơm thanh khiết thoảng nhẹ cho ngày mới tỉnh táo.",
        price: "45.000đ",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
      },
    ],
  },
];

// --- 2. COMPONENTS ---
const DrinkCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white p-4 shadow-sm"
  >
    {/* IMAGE */}
    <div className="mb-4 aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>

    {/* CONTENT - Thêm flex-1 và flex-col để chia không gian hợp lý */}
    <div className="flex flex-1 flex-col justify-between">
      <div>
        {/* TITLE - Để min-h linh hoạt hoặc xóa bỏ min-h cứng nhắc nếu không cần ép hàng */}
        <h4 className="mb-2 text-[16px] leading-snug font-bold tracking-wide text-gray-800 uppercase">
          {item.name}
        </h4>

        {/* 🌟 ĐÃ SỬA: Xóa line-clamp-2, để chữ hiển thị tự nhiên trọn vẹn 100% nội dung */}
        <p className="mb-4 text-justify text-[13px] leading-[1.6] font-light text-gray-500">
          {item.desc}
        </p>
      </div>

      {/* PRICE - Nhờ mt-auto và flex-col nên luôn được đẩy sát đáy card */}
      <div
        className="text-primary border-t border-dashed border-stone-100 pt-2 text-[16px] font-bold"
        style={{ color: "#ab8c5d" }}
      >
        {item.price}
      </div>
    </div>
  </motion.div>
);

const DrinkRow = ({ category }) => {
  const prevId = `prev-${category.id}`;
  const nextId = `next-${category.id}`;

  return (
    <div className="relative mb-14 w-full">
      <div className="mb-6 flex items-center justify-between">
        {/* Badge tiêu đề */}
        <div
          className="rounded-tr-2xl rounded-bl-2xl px-6 py-2.5 text-xs font-bold tracking-widest text-white uppercase"
          style={{ backgroundColor: "#ab8c5d" }}
        >
          {category.categoryName}
        </div>

        {/* Nút điều hướng Swiper */}
        <div className="flex gap-2">
          <button
            id={prevId}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all disabled:pointer-events-none disabled:opacity-30"
            style={{ borderColor: "#ab8c5d", color: "#ab8c5d" }}
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            id={nextId}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all disabled:pointer-events-none disabled:opacity-30"
            style={{ borderColor: "#ab8c5d", color: "#ab8c5d" }}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* SWIPER CONTAINER */}
      <div className="w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.2}
          navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-4"
        >
          {category.items.map((drink) => (
            /* 🌟 ĐÃ SỬA: Ép cứng h-full vào SwiperSlide để các card bằng chiều cao của nhau */
            <SwiperSlide key={drink.id} className="flex !h-auto">
              <DrinkCard item={drink} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// --- 3. TRANG CHÍNH (MAIN PAGE) ---
export default function DrinksMenuSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full overflow-hidden bg-white py-16 font-sans">
      <div className="container mx-auto px-4">
        {/* Khối Header Tiêu Đề */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h1
            className="text-4xl font-extrabold tracking-widest text-gray-900 md:text-5xl"
            style={{ letterSpacing: "4px" }}
          >
            DRINKS
          </h1>
          <p
            className="font-script text-4xl font-light tracking-wide text-gray-500 italic md:text-5xl lg:text-[60px]"
            style={{
              color: "#ab8c5d",
              marginTop: "-12px",
            }}
          >
            Trải nghiệm hương vị
          </p>
          <div className="mx-auto max-w-2xl pt-4">
            <p className="text-xs leading-relaxed text-stone-400 md:text-sm">
              Đắm chìm vào thế giới đồ uống tinh tế với những ly nước ép tươi
              mọng 100% tự nhiên và các công thức cà phê mang năng lượng tràn
              đầy, thức tỉnh mọi giác quan của bạn.
            </p>
          </div>
        </motion.div>

        {/* Khối Danh Sách Menu */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full"
        >
          {DRINK_DATA.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="w-full"
            >
              <DrinkRow category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Nút Xem Tất Cả */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer rounded-full px-10 py-4 text-[11px] font-bold tracking-[0.2em] text-white shadow-lg transition-all hover:brightness-110"
            style={{
              backgroundColor: "#ab8c5d",
              boxShadow: "0 10px 25px -5px rgba(171, 140, 93, 0.4)",
            }}
          >
            XEM TOÀN BỘ MENU
          </motion.button>
        </div>
      </div>

      {/* CSS can thiệp để giữ layout flex-row và căn chỉnh chiều cao slide */}
      <style jsx global>{`
        .swiper {
          display: flex !important;
          flex-direction: row !important;
          overflow: hidden !important;
        }
        .swiper-wrapper {
          display: flex !important;
          flex-direction: row !important;
          width: 100% !important;
        }
        .swiper-slide {
          flex-shrink: 0 !important;
          height: auto !important; /* Cho phép chiều cao tự động co giãn */
        }
        .swiper-button-disabled {
          opacity: 0.25 !important;
          border-color: #e2e8f0 !important;
          color: #94a3b8 !important;
        }
      `}</style>
    </div>
  );
}
