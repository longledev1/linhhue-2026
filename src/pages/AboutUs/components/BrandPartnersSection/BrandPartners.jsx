import React from "react";
import { motion } from "framer-motion";

const BrandPartners = () => {
  const partners = [
    {
      id: 1,
      name: "Đối tác 1",
      logo: "/images/about/vin_logo.png",
      className: "scale-90",
    },
    {
      id: 2,
      name: "Đối tác 2",
      logo: "/images/about/dat_gia_logo.png",
      className: "scale-70",
    },
    {
      id: 3,
      name: "Đối tác 3",
      logo: "/images/about/hung_thinh_logo.png",
      className: "scale-85",
    },
    {
      id: 4,
      name: "Đối tác 4",
      logo: "/images/about/novaland_logo.png",
      className: "scale-70",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-16 font-sans lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl leading-normal font-bold text-transparent uppercase md:text-4xl lg:text-[44px]"
          >
            HỆ THỐNG ĐỐI TÁC
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-secondary mb-16 w-full max-w-5xl text-center text-sm leading-relaxed font-light tracking-wide md:text-base"
          >
            Linh Huệ liên kết chặt chẽ với các đơn vị thiết kế kiến trúc, nhà
            thầu xây dựng uy tín cùng các đối tác tài chính chiến lược. Chúng
            tôi tin rằng sự đồng hành bền vững từ những thương hiệu hàng đầu là
            nền tảng vững chắc để kiến tạo nên những không gian sống tối giản,
            hiện đại và đạt chất lượng tốt nhất phục vụ cộng đồng.
          </motion.p>

          <div className="grid w-full max-w-5xl grid-cols-2 justify-items-center gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex w-full flex-col items-center justify-center"
              >
                <div className="group flex aspect-square w-full max-w-[180px] cursor-pointer items-center justify-center rounded-full border border-neutral-300/40 bg-neutral-200/70 p-8 shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#ab8c5d]/50 hover:bg-neutral-100/50 sm:max-w-[250px]">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`h-full w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${partner.className}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
