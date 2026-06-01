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
        "Bắt đầu tại khu vực trung tâm & phía Đông thành phố. Chuẩn hóa mô hình, xây dựng thương hiệu, tạo trải nghiệm đầu tiên thật tốt.",
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
        "Phát triển sang khu vực phía Nam & ven trung tâm. Chuẩn hóa vận hành và tăng kết nối cộng đồng.",
      dotTopClass: "top-[195px]",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 font-sans lg:py-32">
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
                    <span className="mb-2 block text-lg font-bold tracking-wide text-[#ab8c5d]">
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

        <div className="block w-full space-y-6 lg:hidden">
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
              className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-800/40 bg-[#1c1c1a] p-6 text-center shadow-md"
            >
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 shadow-md">
                <img
                  src={item.image}
                  alt={item.year}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-1 text-lg font-bold tracking-wide text-[#ab8c5d]">
                  {item.year}
                </span>
                <p className="mt-2 max-w-sm text-xs leading-relaxed font-light text-neutral-300 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
