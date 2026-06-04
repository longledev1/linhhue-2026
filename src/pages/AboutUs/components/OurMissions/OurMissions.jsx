import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

const OurMissions = () => {
  // Đồng bộ mảng dữ liệu văn bản dài, trau chuốt theo đúng hình ảnh "Sứ mệnh của chúng tôi"
  const missions = [
    {
      title: "KHÔNG GIAN THẬT",
      description:
        "Chúng tôi không xây phòng để lấp đầy diện tích — mà tạo ra những nơi ở có ánh sáng, sạch sẽ và đủ để con người thật sự nghỉ ngơi sau một ngày dài.",
    },
    {
      title: "GIÁ TRỊ THẬT",
      description:
        "Linh Huệ không chạy theo lợi nhuận bằng cách cắt giảm chất lượng. Chi phí hợp lý đi cùng trải nghiệm sống tốt hơn — đó là cam kết chúng tôi giữ ở mỗi căn hộ.",
    },
    {
      title: "CON NGƯỜI THẬT",
      description:
        "Dù khách thuê là ai, thu nhập bao nhiêu — họ vẫn xứng đáng được lắng nghe và đối xử tử tế. Với chúng tôi, đây không chỉ là dịch vụ, mà là sự đồng hành trong một giai đoạn cuộc sống.",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white pt-4 pb-16 font-sans lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-0 gap-y-0 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:col-span-7 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-2 flex items-center gap-4 lg:self-start"
            >
              <div className="flex items-center gap-3">
                <span className="hidden h-[2px] w-16 bg-[#ab8c5d] lg:block"></span>
                <span className="text-primary hidden text-sm font-bold tracking-wider uppercase md:flex">
                  OUR MISSIONS
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 bg-gradient-to-b from-[#ab8c5d] to-[#453826] bg-clip-text text-center text-3xl font-bold tracking-wide text-transparent uppercase lg:self-start lg:bg-none lg:text-left lg:text-[42px] lg:text-[#1c1c1a] lg:normal-case"
            >
              Sứ mệnh của chúng tôi
            </motion.h2>

            <div className="w-full space-y-6 lg:space-y-10">
              {missions.map((item, index) => (
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
                  <div className="text-primary flex flex-shrink-0 items-center justify-center rounded-xl bg-white/5 p-2 transition-transform duration-300 group-hover:scale-110 md:bg-[#ab8c5d]/10 md:p-1.5">
                    <HiSparkles className="text-xl lg:text-xl" />
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <h4 className="text-primary text-base font-bold tracking-widest uppercase lg:text-lg">
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

          {/* ================= KHỐI BÊN PHẢI: HỆ THỐNG 2 ẢNH SO LE NGHỆ THUẬT (ẨN TRÊN MOBILE, GIỮ NGUYÊN DESKTOP) ================= */}
          <div className="order-1 hidden w-full items-center gap-6 lg:order-2 lg:col-span-5 lg:grid lg:grid-cols-2">
            {/* Tấm ảnh số 1: Giật cấp dâng lên cao */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-[4/6] w-full -translate-y-6 overflow-hidden rounded-[24px] bg-neutral-100 shadow-lg"
            >
              <img
                src="https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2026/aohuojr/2024_03_29/shutterstock-306860177-t-8404.jpg"
                alt="Linh Huệ Mission Architecture Left"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
              />
            </motion.div>

            {/* Tấm ảnh số 2: Giật cấp hạ xuống dưới */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="aspect-[4/6] w-full translate-y-6 overflow-hidden rounded-[24px] bg-neutral-100 shadow-lg"
            >
              <img
                src="https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2026/wpxlcdjwi/2024_07_23/a1-578.jpg"
                alt="Linh Huệ Mission Architecture Right"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissions;
