import React from "react";
import { motion } from "framer-motion";

const SignatureSection = () => {
  return (
    <div className="flex justify-center">
      <section className="text-secondary w-full max-w-5xl font-sans">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl leading-normal font-bold text-transparent uppercase md:text-4xl lg:text-[44px]">
            TỐI GIẢN - NHƯNG ĐỦ ĐỂ SỐNG
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-secondary text-center text-sm leading-relaxed font-normal tracking-wide italic md:text-base"
          >
            Linh Huệ không xây phòng để lấp đầy diện tích. Mỗi căn hộ được thiết
            kế với một suy nghĩ đơn giản: người ở đây sẽ cảm thấy thế nào sau
            một ngày dài? Chúng tôi tối giản những thứ không cần thiết, và giữ
            lại những thứ thật sự có giá trị — ánh sáng, sự sạch sẽ, cảm giác
            được nghỉ ngơi thật sự. Bởi vì một nơi ở tốt không cần phải đắt
            tiền, chỉ cần được làm ra với sự quan tâm đúng chỗ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 w-full"
          >
            <div className="flex w-full justify-end">
              <span className="text-primary text-sm font-light tracking-wider italic">
                “Tối giản không gian không có nghĩa là thiếu thốn”
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SignatureSection;
