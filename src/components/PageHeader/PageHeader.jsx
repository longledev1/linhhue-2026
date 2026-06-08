import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PageHeader = ({
  title,
  subtitle,
  backgroundImage = "/images/banner.webp",
  backgroundVideo,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    if (!backgroundVideo && backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setImageLoaded(true);
    }
  }, [backgroundImage, backgroundVideo]);

  return (
    <section className="relative h-[60vh] min-h-[725px] w-full overflow-hidden bg-neutral-900 font-sans lg:h-[65vh]">
      {/* BACKGROUND */}
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/banner-poster.webp"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <>
          {/* Placeholder */}
          <div
            className={`absolute inset-0 bg-neutral-800 transition-opacity duration-500 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Main Image */}
          <motion.img
            loading="eager"
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            src={backgroundImage}
            alt={title || "Banner"}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 will-change-transform ${
              imageLoaded ? "opacity-65" : "opacity-0"
            }`}
          />
        </>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
      <div className="absolute bottom-4 left-0 h-px w-full bg-white/5" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-6 pt-24 pb-12 text-center lg:-top-[80px] lg:flex-row lg:items-end lg:justify-start lg:pt-0 lg:pb-16 lg:text-left">
        <div className="flex w-full max-w-[950px] flex-col items-center lg:items-start">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="mb-6 text-3xl leading-[0.95] font-extrabold tracking-tight text-white uppercase md:text-5xl lg:text-[58px] xl:text-[64px]"
          >
            {title || "KHỞI NGUỒN"}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="max-w-2xl text-center text-sm leading-relaxed font-light tracking-wide text-white/90 md:text-base lg:text-left"
          >
            {subtitle ||
              "Linh Huệ ra đời không phải từ một kế hoạch kinh doanh — mà từ trải nghiệm thật, từ mong muốn giản dị: tạo ra nơi ở mà chính mình từng cần."}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
