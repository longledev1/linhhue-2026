import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. MOCKUP DATA ---
const PRODUCT_DATA = {
  coffee: [
    {
      id: 1,
      name: "BAO CÀ PHÊ 65E (500G)",
      image: "/images/fnb/coffee_bag.png",
      desc: [
        "Thành phần: 65% Robusta, 25% Arabica, 10% Culi",
        "Hương vị: Đậm đà, có vị chua nhẹ",
        "Sản xuất tại Tây Nguyên",
      ],
      bgColor: "bg-[#798463]",
    },
    {
      id: 2,
      name: "BAO CÀ PHÊ 75E (500G)",
      image: "/images/fnb/coffee_bag.png",
      desc: [
        "Thành phần: 65% Robusta, 25% Arabica, 10% Culi",
        "Hương vị: Đậm đà, có vị chua nhẹ",
        "Sản xuất tại Tây Nguyên",
      ],
      bgColor: "bg-[#d85833]",
    },
    {
      id: 3,
      name: "BAO CÀ PHÊ 85E (500G)",
      image: "/images/fnb/coffee_bag.png",
      desc: [
        "Thành phần: 65% Robusta, 25% Arabica, 10% Culi",
        "Hương vị: Đậm đà, có vị chua nhẹ",
        "Sản xuất tại Tây Nguyên",
      ],
      bgColor: "bg-[#efb3bb]",
    },
  ],

  tea: [
    {
      id: 4,
      name: "TRÀ ĐÀO CAM SẢ",
      image: "/images/fnb/tea-pack.png",
      description:
        "Hương trà thanh nhẹ kết hợp cùng vị trái cây tự nhiên, mang đến trải nghiệm thư giãn và tươi mới.",
    },
    {
      id: 5,
      name: "TRÀ HOA CÚC",
      image: "/images/fnb/tea-pack.png",
      description:
        "Được tuyển chọn từ những cánh hoa tự nhiên, mang hương thơm dịu nhẹ và hậu vị dễ chịu.",
    },
    {
      id: 6,
      name: "TRÀ BERRY",
      image: "/images/fnb/tea-pack.png",
      description:
        "Sự kết hợp hài hòa giữa trà và vị berry chua ngọt, thích hợp cho những buổi chiều thư giãn.",
    },
  ],

  gift: [
    {
      id: 7,
      name: "SET QUÀ TẶNG PREMIUM",
      image: "/images/fnb/gift-box.png",
      description:
        "Thiết kế sang trọng cùng những sản phẩm được tuyển chọn kỹ lưỡng dành cho những dịp đặc biệt.",
    },
    {
      id: 8,
      name: "SET QUÀ TẶNG DOANH NGHIỆP",
      image: "/images/fnb/gift-box.png",
      description:
        "Mang đậm dấu ấn thương hiệu và sự tinh tế dành cho đối tác và khách hàng doanh nghiệp.",
    },
    {
      id: 9,
      name: "SET QUÀ TẶNG TẾT",
      image: "/images/fnb/gift-box.png",
      description:
        "Sự kết hợp giữa cà phê, trà và đặc sản tuyển chọn tạo nên món quà đầy ý nghĩa.",
    },
  ],
};

const tabs = [
  { id: "coffee", label: "CÀ PHÊ" },
  { id: "tea", label: "TRÀ" },
  { id: "gift", label: "SET QUÀ TẶNG" },
];

const ShowCaseSection = () => {
  const [activeTab, setActiveTab] = useState("coffee");

  return (
    <section className="relative mt-[80px] overflow-hidden py-14 lg:py-24">
      <img
        src="/images/fnb/showcase_banner.png"
        alt="banner"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mb-12 grid grid-cols-1 items-start gap-6 lg:mb-20 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-[26px] leading-tight font-bold tracking-[4px] text-[#ab8c5d] uppercase sm:text-[32px] lg:text-[38px] lg:tracking-[6px] xl:text-[42px]">
              GÓI TRỌN HƯƠNG VỊ
            </h2>

            <p className="font-script mt-1 text-[28px] text-white italic sm:text-[38px] lg:-mt-3 lg:text-[50px] xl:text-[60px]">
              Thưởng thức sự nguyên bản ở bất cứ đâu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-none text-justify lg:max-w-[500px] lg:justify-self-end lg:text-right"
          >
            <p className="text-[14px] leading-[1.8] font-light text-white/80 sm:text-[15px] lg:leading-[2.1]">
              Gìn giữ trọn vẹn tinh hoa nông sản Việt thông qua những gói quà
              tặng tinh tế. Linh Huệ gửi gắm vào từng sản phẩm lòng đam mê và sự
              trân quý, sẵn sàng đồng hành cùng bạn trên mọi hành trình thưởng
              thức hương vị đỉnh cao.
            </p>
          </motion.div>
        </div>

        <div className="mb-12 flex w-full justify-center">
          <div className="custom-scrollbar-hide flex max-w-full items-center gap-4 overflow-x-auto px-4 pb-2 whitespace-nowrap lg:flex-wrap lg:justify-center lg:gap-3 lg:overflow-visible lg:p-0">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer text-[15px] font-semibold tracking-[1px] uppercase transition-all duration-300 lg:text-[20px] lg:tracking-[2px] ${
                    activeTab === tab.id
                      ? "scale-105 font-bold text-[#c9a063]"
                      : "text-white/80 hover:text-[#c9a063]"
                  }`}
                >
                  {tab.label}
                </button>

                {index !== tabs.length - 1 && (
                  <span className="hidden text-[20px] text-white/40 lg:inline">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="mx-auto grid max-w-[340px] items-stretch justify-center gap-8 sm:max-w-[540px] md:max-w-none md:grid-cols-2 xl:grid-cols-3"
          >
            {PRODUCT_DATA[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
              >
                <div className="flex h-[260px] flex-shrink-0 items-center justify-center bg-white/[0.04] p-6 sm:h-[300px] sm:p-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[200px] object-contain transition-transform duration-700 hover:scale-105 sm:h-[230px]"
                  />
                </div>

                {activeTab === "coffee" ? (
                  <div className="flex flex-1 flex-col">
                    <div className="relative flex h-[68px] items-center justify-center overflow-hidden border-y border-white/10 bg-white/[0.05] px-4 text-center sm:h-[72px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] via-white/[0.06] to-white/[0.01]" />
                      <h3 className="relative z-10 text-[14px] font-bold tracking-[0.5px] text-white uppercase sm:text-[16px]">
                        {item.name}
                      </h3>
                    </div>

                    <div
                      className={`${item.bgColor} flex min-h-[110px] flex-1 flex-col items-center justify-center px-5 py-4 text-center`}
                    >
                      {item.desc.map((text, idx) => (
                        <p
                          key={idx}
                          className="text-[11px] leading-[1.8] font-medium text-white/95 sm:text-[12px]"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col justify-between bg-white/[0.02] p-6 text-center sm:p-8">
                    <h3 className="mb-3 text-[16px] leading-snug font-bold tracking-[0.5px] text-white uppercase sm:mb-4 sm:text-[18px]">
                      {item.name}
                    </h3>

                    <p className="flex-1 text-justify text-[13px] leading-[1.7] font-light text-white/80 sm:text-center sm:leading-[2]">
                      {item.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ShowCaseSection;
