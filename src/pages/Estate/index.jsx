import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import IntroSection from "./IntroSection/IntroSection";
import ExpandingProjectSlider from "./SlideProject/ExpandingProjectSlider";
import HighLightSection from "./HighLightSection/HighLightSection";
import ProjectCollectionSection from "./ProjectCollectionSection/ProjectCollectionSection";
const EstatePage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <PageHeader
        title="HỆ THỐNG DỰ ÁN"
        subtitle="Hành trình kiến tạo những không gian sống hiện đại, tối ưu giá trị và phù hợp với nhịp sống năng động tại TP.HCM."
        backgroundVideo="/videos/saigon.mp4"
        // backgroundImage="/images/about/building.png"
      />

      <IntroSection />
      <ExpandingProjectSlider />
      <HighLightSection />
      <ProjectCollectionSection />
    </div>
  );
};

export default EstatePage;
