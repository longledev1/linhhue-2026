import React, { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let animationFrameId;
    const duration = 1800; // 1.8 giây chạy mượt mà từ 0% đến 100%
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Easing mượt mà: hơi chậm lúc đầu, tăng tốc ở giữa và về đích 100% rõ ràng
      const currentPercent = Math.min(100, Math.floor(linearProgress * 100));
      setProgress(currentPercent);

      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Đảm bảo hiển thị tròn trịa 100%
        setProgress(100);

        // Dừng lại 250ms ở mốc 100% để người dùng nhìn thấy rõ kết quả hoàn thành
        setTimeout(() => {
          setIsFading(true);
          // Sau khi hiệu ứng mờ dần (fade out 500ms) kết thúc thì gỡ bỏ hoàn toàn khỏi DOM
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 500);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#1c1c1a] transition-all duration-500 ease-out ${
        isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      style={{ fontFamily: '"Montserrat", sans-serif' }}
    >
      {/* Hiệu ứng ánh sáng hào quang vàng nhẹ phía sau Logo */}
      <div className="absolute h-72 w-72 rounded-full bg-[#ab8c5d]/10 blur-3xl pointer-events-none" />

      {/* Khối Logo & Tên thương hiệu */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src="/images/home/logo.png"
            alt="Logo"
            className="h-24 w-auto object-contain select-none drop-shadow-[0_8px_16px_rgba(171,140,93,0.25)] transition-transform duration-700 ease-out"
          />
        </div>

        {/* Thanh Progress Bar vàng đồng sang trọng */}
        <div className="relative h-[3px] w-56 overflow-hidden rounded-full bg-white/10 md:w-64">
          <div
            className="h-full bg-gradient-to-r from-[#ab8c5d] via-[#e5c991] to-[#ab8c5d] transition-all duration-75 ease-out rounded-full shadow-[0_0_10px_#ab8c5d]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Số phần trăm đếm tới 100% */}
        <div className="mt-4 flex items-center justify-center">
          <span className="font-mono text-sm font-semibold tracking-widest text-[#ab8c5d]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
