import React from "react";
import { motion } from "framer-motion";

const BrandPhilosophy = () => {
  return (
    <div className="flex justify-center">
      <section className="text-secondary max-w-5xl py-16 font-sans lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-secondary text-center text-sm leading-relaxed font-normal tracking-wide italic md:text-base lg:text-lg"
          >
            “<span className="font-bold">Linh Huệ</span> không bắt đầu từ những
            con số đầu tư lớn. Mà bắt đầu từ chính những năm tháng sống trong
            phòng trọ chật hẹp, nóng bức, thiếu ánh sáng — những nơi chỉ đủ để
            ngủ, nhưng không đủ để sống. Từ đó, chúng tôi mong muốn tạo ra điều
            mình từng cần: một nơi ở nhỏ thôi, nhưng có giá trị thật.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4 text-center"
          >
            <div className="h-[1px] w-12 bg-neutral-700" />
            <span className="font-display text-primary text-sm tracking-wider italic md:text-[25px]">
              Linh Hue Investment
            </span>
            <div className="h-[1px] w-12 bg-neutral-700" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandPhilosophy;
