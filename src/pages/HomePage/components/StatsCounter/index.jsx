import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

const CounterItem = ({ value, label, shouldAnimate }) => {
  const numericValue = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [shouldAnimate, numericValue, count]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-primary mb-3 text-4xl font-bold select-none md:text-5xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="max-w-[180px] text-xs leading-relaxed font-medium tracking-widest text-gray-300 uppercase md:text-sm">
        {label}
      </p>
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef(null);
  const isPresent = useInView(sectionRef, { once: true, margin: "-100px" });

  const statsData = [
    { id: 1, value: "10+", label: "Năm kinh nghiệm" },
    { id: 2, value: "25+", label: "Không gian café" },
    { id: 3, value: "50+", label: "Bất động sản" },
    { id: 4, value: "50+", label: "Căn hộ kinh doanh" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full border-b border-gray-950 bg-[#1c1c1a] py-10 md:py-10"
    >
      {/* Gọi class container hệ thống đồng bộ của bạn [cite: 153] */}
      <div className="container">
        {/* Phân chia layout responsive: Mobile 2 cột xếp tầng, Desktop 4 cột thẳng hàng [cite: 159] */}
        <div className="grid grid-cols-2 items-center justify-between gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {statsData.map((stat) => (
            <CounterItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
              shouldAnimate={isPresent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
