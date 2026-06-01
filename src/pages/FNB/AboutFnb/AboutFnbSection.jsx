import React from "react";
import { motion } from "framer-motion";

const AboutFNBSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Image */}
            <div className="relative z-10 overflow-hidden rounded-[24px]">
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
            className="relative"
          >
            {/* Heading */}
            <div className="mb-10">
              <h2 className="mb-2 text-4xl font-bold tracking-[8px] text-[#161616] uppercase lg:text-4xl">
                LINH HUỆ COFFEE
              </h2>

              <p className="font-script -mt-7 ml-48 text-5xl text-[#b08b57] italic lg:text-7xl">
                Về chúng tôi
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-10 text-[17px] leading-[2.2] text-[#2e2e2e]">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s. From coffee farms nestled deep in the
                highlands to carefully handcrafted brewing methods, every cup is
                created with passion and authenticity.
              </p>

              <p>
                We believe coffee is more than a beverage — it is an experience,
                a culture, and a story carried through every aroma and every
                sip. LINH HUỆ COFFEE was founded with the desire to preserve the
                pure essence of Vietnamese coffee while bringing a refined and
                modern lifestyle to every customer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFNBSection;
