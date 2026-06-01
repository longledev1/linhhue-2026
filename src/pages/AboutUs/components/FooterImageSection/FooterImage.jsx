import React from "react";
import { motion } from "framer-motion";

const FooterImage = () => {
  return (
    <section className="relative mt-[120px] h-[60vh] min-h-[750px] w-full overflow-hidden bg-neutral-900 font-sans lg:h-[60vh]">
      <motion.img
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        src="/images/about/image_footer.png"
        alt="Linh Huệ Vision Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
};

export default FooterImage;
