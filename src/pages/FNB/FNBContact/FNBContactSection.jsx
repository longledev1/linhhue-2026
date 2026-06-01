import React from "react";
import { motion } from "framer-motion";

const FNBContactSection = () => {
  return (
    <section className="relative mt-[100px] h-[540px] w-full overflow-hidden">
      {/* BACKGROUND */}
      <motion.img
        initial={{
          scale: 1.08,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        src="/images/fnb/contact.png"
        alt="Linh Huệ Coffee"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* LIGHT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#c28d3f]/20" />

      {/* CONTENT */}
      <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[900px]"
        >
          {/* TITLE */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="mb-10 text-[42px] font-bold tracking-[-1px] text-white italic md:text-[64px]"
          >
            Đến với Linh Huệ Coffee
          </motion.h2>

          {/* INFO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
            className="space-y-6 text-[15px] leading-[2] text-white/90 md:text-[17px]"
          >
            <p>
              <span className="font-bold text-white uppercase">ĐỊA CHỈ:</span>{" "}
              21D Nguyễn Tuyển, Phường Bình Trưng, TPHCM
            </p>

            <p>
              <span className="font-bold text-white uppercase">
                GIỜ MỞ CỬA:
              </span>{" "}
              Thứ 2 - Chủ nhật: 10:00AM - 23:00PM
            </p>

            <p>
              <span className="font-bold text-white uppercase">HOTLINE:</span>{" "}
              0384 985 533
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FNBContactSection;
