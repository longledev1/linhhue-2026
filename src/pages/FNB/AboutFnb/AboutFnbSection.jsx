import React from "react";
import { motion } from "framer-motion";

const AboutFNBSection = () => {
  return (
    <section className="overflow-hidden md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative z-10 aspect-[4/3] w-full max-w-[540px] overflow-hidden rounded-[20px] md:rounded-[24px] lg:aspect-auto lg:max-w-none">
              <img
                src="/images/fnb/about_fnb.png"
                alt="Coffee Farm"
                className="h-full w-full object-cover lg:w-[720px]"
              />
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            {/* Heading */}
            {/* 🌟 ĐÃ SỬA: Trên mobile text-center hoặc text-left tùy gu, ở đây tôi để mặc định tự co giãn theo dòng */}
            <div className="mb-6 text-center md:mb-10 lg:text-left">
              {/* Hạ size chữ mobile xuống text-2xl hoặc text-3xl cho vừa khung, lg: quay về text-4xl của bạn */}
              <h2 className="mb-2 text-2xl leading-tight font-bold tracking-[4px] text-[#161616] uppercase sm:text-3xl md:tracking-[8px] lg:text-4xl">
                LINH HUỆ COFFEE
              </h2>

              {/* 🔑 KHÓA CHÍNH: Trị dứt điểm ml-48 và -mt-7 gây tràn màn hình mobile */}
              <p className="font-script mt-[-28px] ml-0 text-center text-[50px] text-[#b08b57] italic sm:text-5xl lg:-mt-7 lg:ml-48 lg:text-left lg:text-7xl">
                Về chúng tôi
              </p>
            </div>

            {/* Paragraphs */}
            {/* 🌟 ĐÃ SỬA: Hạ line-relaxed xuống [1.8] trên mobile cho dễ đọc, không bị thưa quá mức; lên desktop trả lại [2.2] đầm tay */}
            <div className="space-y-6 text-justify text-[15px] leading-[1.8] text-[#2e2e2e] md:space-y-10 md:text-[17px] md:leading-[2.2] lg:text-left">
              <p>
                Hành trình của Linh Huệ Coffee bắt đầu từ những rẫy cà phê bạt
                ngàn ẩn mình nơi đại ngàn cao nguyên, nơi những hạt chín mọng
                được người nông dân nâng niu thu hoạch thủ công. Qua quy trình
                sơ chế tỉ mỉ và phương pháp rang xay mộc nghệ thuật, mỗi tách cà
                phê trao tay khách hàng là kết tinh của niềm đam mê trọn vẹn và
                hương vị nguyên bản thuần khiết.
              </p>

              <p>
                Chúng tôi tin rằng cà phê không đơn thuần là một thức uống — đó
                là sự trải nghiệm, là văn hóa và là câu chuyện được truyền tải
                qua từng nốt hương, từng ngụm thưởng thức. Linh Huệ Coffee ra
                đời với khát vọng gìn giữ và tôn vinh những giá trị tinh túy
                nhất của hạt cà phê Việt, mang đến một phong cách hiện đại, tinh
                tế và trọn vẹn cho mỗi vị khách ghé chân.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFNBSection;
