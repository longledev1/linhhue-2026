import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    id: "coffee",
    label: "CÀ PHÊ",
  },
  {
    id: "tea",
    label: "TRÀ",
  },
  {
    id: "gift",
    label: "SET QUÀ TẶNG",
  },
];

const ShowCaseSection = () => {
  const [activeTab, setActiveTab] = useState("coffee");

  return (
    <section className="relative mt-[80px] overflow-hidden py-24">
      {/* BACKGROUND */}
      <img
        src="/images/fnb/showcase_banner.png"
        alt="banner"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* HEADER */}
        <div className="mb-20 grid items-start gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <h2 className="text-primary text-[38px] font-bold tracking-[6px] uppercase md:text-[42px]">
              GÓI TRỌN HƯƠNG VỊ
            </h2>

            <p className="font-script -mt-3 text-[42px] text-white md:text-[60px]">
              Thưởng thức sự nguyên bản ở bất cứ đâu.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{
              once: true,
            }}
            className="max-w-[500px] justify-self-end text-right"
          >
            <p className="text-[15px] leading-[2.1] text-white/80">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>
        </div>

        {/* TAB */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`text-[20px] tracking-[2px] uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-[#c9a063]"
                    : "text-white hover:text-[#c9a063]"
                } `}
              >
                {tab.label}
              </button>

              {/* Divider */}
              {index !== tabs.length - 1 && (
                <span className="text-[20px] text-white/60">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* PRODUCT LIST */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {PRODUCT_DATA[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -10,
                }}
                className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.12] shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              >
                {/* IMAGE */}
                <div className="flex h-[300px] items-center justify-center bg-white/[0.06] p-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[230px] object-contain transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                {activeTab === "coffee" ? (
                  <>
                    {/* TITLE */}
                    <div className="relative flex h-[72px] items-center justify-center overflow-hidden border-y border-white/10 bg-white/[0.06] px-6 text-center backdrop-blur-xl">
                      {/* overlay glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.08] to-white/[0.02]" />

                      <h3 className="relative z-10 text-[16px] font-bold tracking-[1px] text-white uppercase">
                        {item.name}
                      </h3>
                    </div>

                    {/* COLOR INFO */}
                    <div
                      className={` ${item.bgColor} flex min-h-[110px] flex-col items-center justify-center px-6 py-5 text-center`}
                    >
                      {item.desc.map((text, idx) => (
                        <p
                          key={idx}
                          className="text-[12px] leading-[1.9] text-white"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-between bg-white/[0.03] px-8 py-8 text-center backdrop-blur-xl">
                    <h3 className="mb-5 text-[18px] font-bold tracking-[1px] text-white uppercase">
                      {item.name}
                    </h3>

                    <p className="flex-1 text-[13px] leading-[2] text-white/75">
                      {item.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ShowCaseSection;
