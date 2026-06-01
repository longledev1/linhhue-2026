import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi"; // Chuyển sang react-icons

// --- 1. MOCKUP DATA ---
const DRINK_DATA = [
  {
    id: "nuoc-ep",
    categoryName: "NƯỚC ÉP",
    items: [
      {
        id: 1,
        name: "CAFE SỮA ĐÁ",
        desc: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
      },
      {
        id: 2,
        name: "CAFE SỮA ĐÁ",
        desc: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1544787210-2211d7c80984?w=500",
      },
      {
        id: 3,
        name: "CAFE SỮA ĐÁ",
        desc: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500",
      },
      {
        id: 4,
        name: "CAFE SỮA ĐÁ",
        desc: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      },
      {
        id: 5,
        name: "CAFE SỮA ĐÁ",
        desc: "Món này cực kỳ ngon khi uống lạnh...",
        price: "45.000đ",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
      },
    ],
  },
  {
    id: "ca-phe",
    categoryName: "CÀ PHÊ",
    items: [
      {
        id: 6,
        name: "CAFE SỮA ĐÁ",
        desc: "Lorem Ipsum is simply dummy text of the printing text of the printing",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
      },
      {
        id: 7,
        name: "CAFE SỮA CHUA",
        desc: "Lorem Ipsum is simply dummy text text of the printing",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500",
      },
      {
        id: 8,
        name: "MATCHA ĐÁ XAY",
        desc: "Lorem Ipsum is simply dummy text text of the printing",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500",
      },
      {
        id: 9,
        name: "AMERICANO",
        desc: "Lorem Ipsum is simply dummy text text of the printing",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
      },
      {
        id: 9,
        name: "AMERICANO",
        desc: "Lorem Ipsum is simply dummy text text of the printing",
        price: "40.000đ",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
      },
    ],
  },
];

// --- 2. COMPONENTS ---

// -- Card món ăn lẻ --
const DrinkCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white p-3 shadow-sm"
  >
    {/* IMAGE */}
    <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>

    {/* CONTENT */}
    <div className="flex flex-1 flex-col">
      {/* TITLE */}
      <h4 className="mb-2 min-h-[48px] text-[16px] font-bold tracking-wide text-gray-800 uppercase">
        {item.name}
      </h4>

      {/* DESCRIPTION */}
      <p className="mb-4 line-clamp-2 min-h-[44px] text-[13px] leading-[1.7] text-gray-400 italic">
        {item.desc}
      </p>

      {/* PRICE */}
      <div className="text-primary mt-auto text-[16px] font-bold">
        {item.price}
      </div>
    </div>
  </motion.div>
);

// -- Slider hàng theo Category --
const DrinkRow = ({ category }) => {
  const prevId = `prev-${category.id}`;
  const nextId = `next-${category.id}`;

  return (
    <div className="relative mb-12">
      <div className="mb-6 flex items-center justify-between">
        {/* Badge tiêu đề style giống ảnh */}
        <div className="bg-primary rounded-tr-2xl rounded-bl-2xl px-8 py-2 text-xs font-bold tracking-widest text-white">
          {category.categoryName}
        </div>

        {/* Nút điều hướng Swiper dùng FiChevron */}
        <div className="flex gap-2">
          <button
            id={prevId}
            className="border-primary text-primary hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            id={nextId}
            className="border-primary text-primary hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-4"
      >
        {category.items.map((drink) => (
          <SwiperSlide key={drink.id}>
            <DrinkCard item={drink} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// --- 3. TRANG CHÍNH (MAIN PAGE) ---
export default function DrinksMenuSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Motion variants
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
    <div className="selection:bg-primary/20 min-h-screen overflow-hidden bg-white">
      {/* Sử dụng class .container của bạn */}
      <div className="container">
        {/* Khối Header Tiêu Đề */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 space-y-2 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900 md:text-5xl">
            DRINKS
          </h1>
          <p className="text-primary font-script -mt-6 text-2xl font-light tracking-wide italic md:text-[60px]">
            Trải nghiệm hương vị
          </p>
          <div className="mx-auto max-w-3xl pt-4">
            <p className="text-xs leading-relaxed text-stone-400 md:text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </motion.div>

        {/* Khối Danh Sách Menu Với Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {DRINK_DATA.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <DrinkRow category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Nút Xem Tất Cả */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-primary shadow-primary/30 mt-6 rounded-full p-4 text-[10px] font-bold tracking-[0.2em] text-white shadow-lg"
          >
            XEM TOÀN BỘ MENU
          </motion.button>
        </div>
      </div>

      {/* Style CSS Custom cho Swiper & Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5a25d;
          border-radius: 10px;
        }
        .swiper-button-disabled {
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
