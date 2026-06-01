import React from "react";
import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <div className="flex justify-center py-[100px]">
      <section className="text-secondary w-full max-w-5xl font-sans">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl leading-normal font-bold text-transparent uppercase md:text-4xl lg:text-[44px]"
          >
            GIẢI PHÁP PHÙ HỢP
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-secondary text-center text-sm leading-relaxed font-normal tracking-wide italic md:text-base"
          >
            Mỗi người sẽ có một nhu cầu an cư khác nhau — từ căn hộ hiện đại,
            nhà ở tiện nghi đến quỹ đất dành cho kế hoạch dài hạn. Linh Huệ mang
            đến những giải pháp phù hợp để bạn dễ dàng lựa chọn không gian sống
            hoặc đầu tư theo đúng mục tiêu và khả năng của mình.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default IntroSection;
