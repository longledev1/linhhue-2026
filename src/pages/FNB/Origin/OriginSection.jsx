import React from "react";
import { motion } from "framer-motion";

const OriginSection = () => {
  return (
    // Giảm padding y của cả section trên mobile để các cụm bám sát nhau gọn gàng
    <section className="mt-[60px] overflow-hidden bg-[#121212] py-8 font-sans lg:bg-transparent lg:py-20">
      <div className="w-full">
        {/* CONTAINER CHÍNH */}
        <div className="relative w-full">
          {/* BANNER NỀN: Ẩn trên mobile, hiện trên desktop */}
          <div className="hidden h-[1100px] w-full lg:block xl:h-[1334px]">
            <img
              src="/images/fnb/origin_banner.png"
              alt="Origin Banner"
              className="h-full w-full object-cover"
            />
          </div>

          {/* ==========================================================
              PHẦN 1: CỤM CÀ PHÊ (Xếp tiêu đề trước -> Glass Card sau)
             ========================================================== */}
          <div className="flex w-full flex-col-reverse lg:block">
            {/* THẺ KÍNH: Vùng đất của cà phê nguyên bản */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              // 🌟 ĐÃ SỬA: Giảm mb-12 xuống mb-6 trên mobile để rút ngắn khoảng cách với Cụm 2 bên dưới
              className="mx-4 mt-3 mb-6 w-auto rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur-md lg:absolute lg:top-[17%] lg:right-[6%] lg:m-0 lg:w-[520px] lg:rounded-[24px] lg:bg-black/35 lg:p-8 xl:w-[550px]"
            >
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="/images/fnb/coffee_icon.svg"
                  alt="icon"
                  className="h-9 w-9 object-contain lg:h-15 lg:w-15"
                />
                <p className="text-xs font-semibold tracking-[1px] text-[#d2b07a] uppercase lg:text-sm lg:tracking-[3px]">
                  Vùng đất của cà phê nguyên bản
                </p>
              </div>
              <p className="text-justify text-[13px] leading-[1.7] text-stone-300 sm:text-[14px] lg:text-left lg:text-sm lg:leading-[2] lg:text-white">
                Tại đây, chúng tôi cam kết tôn trọng hương vị mộc mạc tự nhiên
                thông qua quy trình rang mộc thủ công, không tẩm ướp tạp chất.
                Từng làn hương nồng nàn và hậu vị ngọt sâu lắng đặc trưng của
                dòng Robusta, Arabica thượng hạng sẽ được giữ vẹn nguyên, mang
                đến trải nghiệm thưởng thức chân thật và trọn vẹn nhất cho bạn.
              </p>
            </motion.div>

            {/* TIÊU ĐỀ: Khởi nguồn từ hạt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full px-4 pt-4 pb-1 text-white lg:absolute lg:top-[18%] lg:left-[6%] lg:max-w-[520px] lg:p-0"
            >
              {/* 🌟 ĐÃ SỬA: Hạ xuống text-xl kèm tracking-[2px] trên mobile để TRÁNH RỚT CHỮ */}
              <h2 className="text-center text-2xl font-bold tracking-[2px] text-white uppercase sm:text-2xl md:tracking-[5px] lg:text-[34px] xl:text-[38px]">
                KHỞI NGUỒN TỪ HẠT
              </h2>
              {/* 🌟 ĐÃ SỬA: Hạ size chữ nghệ thuật trên mobile từ 32px xuống 24px nhìn thanh thoát, tinh tế hơn */}
              <p className="font-script mt-0.5 mb-2 hidden text-2xl text-[#d2b07a] italic sm:block sm:text-3xl lg:-mt-3 lg:mb-8 lg:text-[50px] lg:text-white/90 xl:text-[60px]">
                Giữ trọn tinh túy vùng đất bazan
              </p>
              <p className="hidden max-w-none text-justify text-[13px] leading-[1.7] text-stone-300 sm:block sm:text-[14px] lg:max-w-[480px] lg:text-left lg:leading-[2] lg:text-white/85">
                Mỗi hạt cà phê là một câu chuyện kể về vùng đất đỏ bazan lộng
                gió, nơi những tinh túy thuần khiết nhất của đất trời được kết
                tinh qua những giọt sương sớm và ánh nắng cao nguyên rực rỡ.
              </p>
            </motion.div>
          </div>

          {/* ==========================================================
              PHẦN 2: CỤM TRÁI CÂY (Xếp tiêu đề trước -> Glass Card sau)
             ========================================================== */}
          {/* 🌟 ĐÃ SỬA: Đổi mt-6 sang mt-2 trên mobile để kéo Cụm 2 lên sát Cụm 1 cực kỳ khít khao */}
          <div className="mt-2 flex w-full flex-col-reverse lg:mt-0 lg:block">
            {/* THẺ KÍNH: Vùng đất của trái cây tươi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mx-4 mt-3 mb-4 w-auto rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur-md lg:absolute lg:bottom-[15%] lg:left-[4%] lg:m-0 lg:w-[520px] lg:rounded-[24px] lg:bg-black/35 lg:p-8 xl:w-[550px]"
            >
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="/images/fnb/fruit_icon.svg"
                  alt="icon"
                  className="h-9 w-9 object-contain lg:h-15 lg:w-15"
                />
                <p className="text-xs font-semibold tracking-[1px] text-[#81B29A] uppercase lg:text-sm lg:tracking-[3px]">
                  Vùng đất của trái cây tươi
                </p>
              </div>
              <p className="text-justify text-[13px] leading-[1.7] text-stone-300 sm:text-[14px] lg:text-left lg:text-sm lg:leading-[2] lg:text-white">
                Chúng tôi tự hào mang đến nguồn trái cây tươi sạch, mọng nước,
                được canh tác tự nhiên và thu hoạch theo mùa. Không dùng chất
                bảo quản hay hương liệu nhân tạo, từng ly nước ép trao tay bạn
                là sự kết hợp hoàn hảo giữa vị ngọt thanh khiết thuần túy và
                nguồn vitamin dồi dào, đánh thức mọi giác quan ngay từ ngụm đầu
                tiên.
              </p>
            </motion.div>

            {/* TIÊU ĐỀ: Nở rộ lên khu vườn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full px-4 pt-4 pb-1 text-left text-stone-300 lg:absolute lg:right-[5%] lg:bottom-[15%] lg:max-w-[600px] lg:p-0 lg:text-right lg:text-white"
            >
              {/* 🌟 ĐÃ SỬA: Hạ hẳn size tiêu đề từ 22px cố định xuống cấu trúc linh hoạt text-xl và thu hẹp tracking-[2px] */}
              <h2 className="text-center text-2xl font-bold tracking-[2px] text-white uppercase sm:text-right sm:text-2xl md:tracking-[5px] lg:text-[34px] xl:text-[38px]">
                NỞ RỘ LÊN KHU VƯỜN
              </h2>
              {/* 🌟 ĐÃ SỬA: Thu hẹp size chữ nghệ thuật trên di động để ôm khít màn hình, không bao giờ lo gãy chữ */}
              <p className="font-script mt-0.5 mb-2 hidden text-2xl text-[#81B29A] italic sm:block sm:text-3xl lg:-mt-3 lg:mb-8 lg:text-[50px] lg:text-white/90 xl:text-[60px]">
                Tinh tuyển vị tươi từ miền nhiệt đới
              </p>
              <p className="mx-auto hidden max-w-none text-justify text-[13px] leading-[1.7] text-stone-300 sm:block sm:text-[14px] lg:mr-0 lg:max-w-[520px] lg:text-right lg:leading-[2] lg:text-white/85">
                Những thức quả thanh mát mang theo hơi thở rực rỡ của nắng và
                gió miền nhiệt đới, được thu hái trọn vẹn sự tươi ngon ngay tại
                nông trại để dệt nên một bức tranh hương vị đầy sống động.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
