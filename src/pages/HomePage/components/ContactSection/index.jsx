import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="mt-20 w-full overflow-hidden bg-gradient-to-r from-[#ab8c5d] to-[#453826] py-10 font-sans lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center text-white"
          >
            <h2 className="mb-6 text-2xl font-bold tracking-wide uppercase italic md:text-3xl lg:text-[36px]">
              LIÊN HỆ TRỰC TIẾP
            </h2>

            <div className="flex flex-col gap-5">
              <div className="group flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold tracking-wider text-white uppercase">
                    VĂN PHÒNG LÀM VIỆC
                  </h3>
                  <p className="text-xs font-light tracking-wide text-white/90 md:text-sm">
                    97 Nguyễn Tư Nghiêm, Phường Bình Trưng, TPHCM
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold tracking-wider text-white uppercase">
                    GIỜ LÀM VIỆC
                  </h3>
                  <p className="text-xs font-light tracking-wide text-white/90 md:text-sm">
                    Thứ 2 - Chủ nhật: 10:00AM - 23:00PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative h-[240px] w-full overflow-hidden rounded-[24px] border-4 border-white/20 shadow-2xl md:h-[300px] lg:h-[320px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.320974331922!2d106.75854387451736!3d10.78671015900501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527000d4b780d%3A0xa674a71bbcd3d90!2sLINH%20HU%E1%BB%86%20Coffee!5e0!3m2!1svi!2s!4v1779887117087!5m2!1svi!2s"
              className="h-full w-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
