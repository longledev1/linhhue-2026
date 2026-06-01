import React from "react";
import { motion } from "framer-motion";

const OriginSection = () => {
  return (
    <section className="py-20">
      <div className="">
        <div className="relative">
          <img
            src="/images/fnb/origin_banner.png"
            alt="Origin Banner"
            className="h-[1100px] w-full object-cover lg:h-[1334px]"
          />

          {/* TOP CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="absolute top-[15%] left-[6%] max-w-[520px] text-white"
          >
            {/* Title */}
            <h2 className="text-[34px] font-bold tracking-[5px] uppercase md:text-[38px]">
              KHỞI NGUỒN TỪ HẠT
            </h2>

            {/* Script Text */}
            <p className="font-script -mt-3 mb-8 text-[38px] text-white/90 md:text-[60px]">
              Giữ trọn tinh túy vùng đất bazan
            </p>

            {/* Description */}
            <p className="max-w-[480px] text-[15px] leading-[2] text-white/85">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>

          {/* TOP RIGHT GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute top-[15%] right-[6%] w-[550px] rounded-[24px] border border-white/10 bg-black/35 p-8 backdrop-blur-md"
          >
            {/* Icon + Label */}
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/images/fnb/coffee_icon.svg"
                alt="icon"
                className="h-15 w-15 object-contain"
              />

              <p className="text-sm font-semibold tracking-[3px] text-[#d2b07a] uppercase">
                Vùng đất của cà phê nguyên bản
              </p>
            </div>

            {/* Text */}
            <p className="text-sm leading-[2] text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry’s standard dummy text ever since the 1500s.
            </p>
          </motion.div>

          {/* BOTTOM LEFT GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute bottom-[15%] left-[4%] w-[550px] rounded-[24px] border border-white/10 bg-black/35 p-8 backdrop-blur-md"
          >
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/images/fnb/fruit_icon.svg"
                alt="icon"
                className="h-15 w-15 object-contain"
              />

              <p className="text-sm font-semibold tracking-[3px] text-[#81B29A] uppercase">
                Vùng đất của trái cây tươi
              </p>
            </div>

            <p className="text-sm leading-[2] text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry’s standard dummy text ever since the 1500s.
            </p>
          </motion.div>

          {/* BOTTOM CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="absolute right-[5%] bottom-[15%] max-w-[600px] text-center text-white"
          >
            {/* Title */}
            <h2 className="text-right text-[34px] font-bold tracking-[5px] uppercase md:text-[38px]">
              NỞ RỘ LÊN KHU VƯỜN
            </h2>

            {/* Script Text */}
            <p className="font-script -mt-3 mb-8 text-right text-[38px] text-white/90 md:text-[60px]">
              Tinh tuyển vị tươi từ miền nhiệt đới{" "}
            </p>

            {/* Description */}
            <p className="mx-auto max-w-[520px] text-right text-[15px] leading-[2] text-white/85">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
