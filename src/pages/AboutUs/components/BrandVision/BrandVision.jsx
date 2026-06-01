import React from "react";
import { motion } from "framer-motion";

const BrandVision = () => {
  return (
    <section className="relative h-[60vh] min-h-[750px] w-full overflow-hidden bg-neutral-900 font-sans lg:h-[60vh]">
      <motion.img
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        src="/images/about/vision.png"
        alt="Linh Huệ Vision Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center md:items-end md:justify-end md:p-12 md:text-right lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex max-w-2xl flex-col items-center md:items-end"
        >
          <h3 className="font-display mb-4 text-4xl font-light tracking-wide text-white italic md:text-4xl lg:text-[48px]">
            Tầm nhìn
          </h3>

          <p className="max-w-xl text-center text-xs leading-relaxed font-normal tracking-wide text-neutral-200 md:text-right md:text-sm lg:text-base">
            Trong 10 năm tới, Linh Huệ hướng tới hệ thống không gian sống tối
            giản, hiện đại, giá hợp lý — dành cho người trẻ đi làm, người lao
            động, người thu nhập trung bình. Không chỉ phát triển về số lượng,
            mà xây dựng một cộng đồng sống tích cực và văn minh tại TP.HCM.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandVision;
