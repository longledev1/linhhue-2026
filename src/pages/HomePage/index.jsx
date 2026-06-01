import React from "react";
import AboutUs from "./components/AboutUsSection";
import StatsCounter from "./components/StatsCounter";
import FeaturedProjects from "./components/FeaturedProjectSection";
import ProjectGrid from "./components/HomeProjectGridSection";
import ApartmentGrid from "./components/ApartmentProjectGridSection";
import ContactSection from "./components/ContactSection";
import HeroBanner from "../../components/HeroBanner";
const HomePage = () => {
  return (
    <main className="flex w-full flex-col bg-[#F9FAFB]">
      <HeroBanner />
      <AboutUs />
      <StatsCounter />
      <FeaturedProjects />
      <ProjectGrid />
      <ApartmentGrid />
      <ContactSection />
    </main>
  );
};

export default HomePage;
