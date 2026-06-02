import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
const CoffeVideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-5 sm:gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-[700px]"
          >
            {/* Script Heading */}
            <div className="md:mb-12">
              <h2 className="font-script text-center text-[52px] leading-[1.1] font-light text-[#b08b57] sm:text-left md:text-[72px]">
                Nguồn hạt chất lượng
                <br />
                từ nông trại
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-8 text-[16px] leading-[2.1] text-[#2f2f2f]">
              <p>
                Hạt cà phê chất lượng thượng hạng được nuôi dưỡng và chắt lọc
                khắt khe từ những nông trại vùng cao lộng gió. Từng quả chín
                mọng được thu hoạch thủ công hoàn toàn vào thời điểm lý tưởng
                nhất, trải qua quy trình phân loại nghiêm ngặt nhằm gìn giữ vẹn
                nguyên hương thơm thuần khiết cùng vị ngọt tự nhiên sâu lắng của
                đất trời.
              </p>
            </div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Video Wrapper */}
            <div className="group relative overflow-hidden rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Video */}
              <video
                ref={videoRef}
                loop
                playsInline
                preload="metadata"
                poster="/images/fnb/coffee_banner.png"
                className="h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              >
                <source src="/videos/coffee.mp4" type="video/mp4" />
              </video>

              {/* Play Button */}
              <button
                onClick={handleToggleVideo}
                className="absolute top-1/2 left-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                {isPlaying ? (
                  <FaPause className="h-8 w-8 text-white" />
                ) : (
                  <FaPlay className="ml-1 h-8 w-8 text-white" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoffeVideoSection;
