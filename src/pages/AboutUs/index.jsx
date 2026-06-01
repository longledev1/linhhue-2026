import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import BrandPhilosophy from "./components/BrandPhilosophySection/BrandPhilosophySection";
import BrandVision from "./components/BrandVision/BrandVision";
import CoreValues from "./components/CoreValueSection/CoreValueSection";
import OurMissions from "./components/OurMissions/OurMissions";
import CompanyHistorySection from "./components/CompanyHistorySection/CompanyHistorySection";
import SignatureSection from "./components/SignatureSection/SignatureSection";
import FooterImage from "./components/FooterImageSection/FooterImage";
import BrandPartners from "./components/BrandPartnersSection/BrandPartners";
const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <PageHeader
        title="KHỞI NGUỒN"
        subtitle="Linh Huệ ra đời không phải từ một kế hoạch kinh doanh — mà từ trải nghiệm thật, từ mong muốn giản dị để tạo ra nơi ở mà chính mình từng cần."
        backgroundImage="/images/about/building.png"
      />
      <BrandPhilosophy />
      <BrandVision />
      <CoreValues />
      <OurMissions />
      <CompanyHistorySection />
      <SignatureSection />
      <FooterImage />
      <BrandPartners />
    </div>
  );
};

export default AboutUsPage;
