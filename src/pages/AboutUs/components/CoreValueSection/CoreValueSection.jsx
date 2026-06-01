import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

const CoreValues = () => {
  const values = [
    {
      title: "SÁNG",
      description:
        "Mỗi căn phòng đều có ánh sáng tự nhiên và không khí thoáng đãng — vì ánh sáng không chỉ làm không gian đẹp hơn, mà giúp con người tích cực và khỏe mạnh hơn mỗi ngày.",
    },
    {
      title: "TÔN TRỌNG",
      description:
        "Dù khách thuê là ai, thu nhập bao nhiêu — họ vẫn xứng đáng được hỗ trợ và được đối xử tử tế. Tôn trọng không phải đặc quyền của người trả tiền nhiều hơn. Đó là thứ mỗi người đều xứng đáng có được, ngay từ lần đầu bước vào.",
    },
    {
      title: "GIÁ TRỊ THẬT",
      description:
        "Không chạy theo xa xỉ, không cắt giảm chất lượng. Chúng tôi theo đuổi một điều đơn giản: chi phí hợp lý đi cùng chất lượng sống tốt hơn.",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white pt-16 pb-8 font-sans lg:pt-28 lg:pb-0">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden w-full overflow-hidden rounded-[32px] bg-neutral-100 shadow-xl lg:col-span-5 lg:block lg:aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
              alt="Linh Huệ Core Values Architecture"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </motion.div>

          <div className="flex w-full flex-col items-center lg:col-span-7 lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-2 flex items-center gap-4 lg:self-end"
            >
              <div className="flex items-center gap-3">
                <span className="hidden h-[2px] w-16 bg-[#ab8c5d] lg:block"></span>
                <span className="hidden text-sm font-bold tracking-wider text-[#ab8c5d] uppercase md:flex">
                  CORE VALUES
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl font-bold tracking-wide text-transparent uppercase lg:self-end lg:bg-none lg:text-right lg:text-[42px] lg:text-[#1c1c1a] lg:normal-case"
            >
              Những giá trị nền tảng
            </motion.h2>

            <div className="w-full space-y-6 lg:space-y-10">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-800/40 bg-[#1c1c1a] p-6 text-center shadow-md md:flex-row md:items-start md:border-none md:bg-transparent md:p-0 md:text-left md:shadow-none"
                >
                  <div className="flex flex-shrink-0 items-center justify-center rounded-xl bg-white/5 p-2 text-[#ab8c5d] transition-transform duration-300 group-hover:scale-110 md:bg-[#ab8c5d]/10 md:p-1.5">
                    <HiSparkles className="text-xl lg:text-xl" />
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <h4 className="text-base font-bold tracking-widest text-[#ab8c5d] uppercase lg:text-lg">
                      {item.title}
                    </h4>

                    <p className="text-center text-sm leading-relaxed font-normal text-neutral-300 md:text-justify md:text-neutral-600 lg:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
