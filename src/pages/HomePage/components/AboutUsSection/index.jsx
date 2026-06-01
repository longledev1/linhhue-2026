import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="w-full overflow-hidden py-20 font-sans lg:py-28">
      <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-primary h-[2px] w-16"></span>
            <span className="text-primary text-sm font-bold tracking-wider uppercase">
              ABOUT US
            </span>
          </div>

          <h2 className="mb-8 text-3xl leading-[1.25] font-bold text-[#1c1c1a] md:text-4xl lg:text-[40px]">
            Kiến tạo không gian – Gia tăng giá trị bền vững
          </h2>

          <p className="mb-6 text-justify text-sm leading-relaxed font-light text-gray-600 lg:text-base">
            Chúng tôi tự hào là đơn vị tiên phong trong việc phát triển và cung
            cấp các giải pháp không gian sống toàn diện. Với triết lý đặt chất
            lượng sống và giá trị vững bền làm trọng tâm, mỗi sản phẩm được ra
            mắt không chỉ dừng lại ở một công trình kiến trúc đơn thuần, mà còn
            là một kiệt tác nghệ thuật thực thụ, nơi lưu giữ hạnh phúc bền lâu.
          </p>

          <p className="mb-8 text-justify text-sm leading-relaxed font-light text-gray-600 lg:text-base">
            Từng viên gạch, góc nhỏ cảnh quan đều được chọn lọc kỹ lưỡng, mang
            đến sự an tâm tuyệt đối và khẳng định vị thế đỉnh cao cho chủ sở
            hữu.
          </p>

          <div className="mb-12">
            <a
              href="#"
              className="border-primary text-primary inline-block border-b-2 pb-1 text-sm font-semibold tracking-wider uppercase transition-colors hover:border-[#453826] hover:text-[#453826]"
            >
              XEM CHI TIẾT
            </a>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-md">
              <img
                src="/images/home/founder.png"
                alt="Linh Hue Nguyen"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-base font-bold tracking-wide text-[#1c1c1a] uppercase">
                LINH HUE NGUYEN
              </h4>
              <p className="text-primary mt-0.5 text-xs font-medium tracking-wider uppercase italic">
                FOUNDER OF LINH HUE INVESTMENT
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-8 hidden w-full justify-center md:flex lg:mt-0 lg:justify-end"
        >
          <div className="aspect-[4/3] w-[100%] overflow-hidden rounded-[24px] border border-gray-100 shadow-2xl sm:aspect-[16/11] lg:w-[85%]">
            <img
              src="/images/home/board.png"
              alt="Luxury villa architecture"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
