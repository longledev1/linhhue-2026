import React from "react";
import { motion } from "framer-motion";

const CompanyHistory = () => {
  const timelineData = [
    {
      id: 1,
      year: "2025 – 2026",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
      description:
        "Bắt đầu tại khu vực trung tâm & phía Đông thành phố. Chuẩn hóa mô hình, xây dựng thương hiệu, tạo trải nghiệm thật tốt.",
      dotTopClass: "top-[130px]",
    },
    {
      id: 2,
      year: "2025 – 2026",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
      description:
        "Phát triển sang khu vực phía Nam & ven trung tâm. Chuẩn hóa vận hành và tăng kết nối cộng đồng.",
      dotTopClass: "top-[160px]",
    },
    {
      id: 3,
      year: "2025 – 2026",
      image:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600",
      description:
        "Mở rộng toàn TP.HCM và các tỉnh lân cận. Hướng tới hệ sinh thái co-living, mini apartment — không gian sống cộng đồng văn minh.",
      dotTopClass: "top-[195px]",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 font-sans lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-[50%] z-10 hidden w-full -translate-y-1/2 lg:block">
        <img
          src="/images/about/wave.svg"
          alt="Timeline Wave Line"
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative hidden w-full lg:block">
          <div className="relative z-20 grid w-full grid-cols-3 gap-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="relative flex w-full flex-col items-center"
              >
                <div className="flex w-full flex-col items-center">
                  <div className="mt-[-120px] mb-[160px] h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
                    <img
                      src={item.image}
                      alt={item.year}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="w-full max-w-[320px] text-center">
                    <span className="text-primary mb-2 block text-lg font-bold tracking-wide">
                      {item.year}
                    </span>
                    <div className="mx-auto mb-3 h-[2px] w-8 bg-[#ab8c5d]/40" />
                    <p className="text-sm leading-relaxed font-normal text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${item.dotTopClass}`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-100 bg-white shadow-md">
                    <div className="h-3 w-3 rounded-full bg-neutral-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl font-bold tracking-wide text-transparent uppercase md:hidden lg:self-start lg:bg-none lg:text-left lg:text-[42px] lg:text-[#1c1c1a] lg:normal-case"
        >
          ĐỊNH HƯỚNG PHÁT TRIỂN
        </motion.h2>

        <div className="relative ml-[-15px] block w-full lg:hidden">
          {/* Timeline Line */}
          <div className="absolute top-0 left-5 h-full w-[2px] bg-[#ab8c5d]/20" />

          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="relative flex gap-4"
              >
                {/* Dot */}
                <div className="relative z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ab8c5d]/20 bg-white shadow-sm">
                  <div className="h-3 w-3 rounded-full bg-[#ab8c5d]" />
                </div>

                {/* Card */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.year}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-primary mb-2 block text-lg font-bold">
                      {item.year}
                    </span>

                    <div className="mb-3 h-[2px] w-8 bg-[#ab8c5d]/30" />

                    <p className="text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
