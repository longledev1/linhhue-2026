import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import AboutFNBSection from "./AboutFnb/AboutFnbSection";
import CoffeVideoSection from "./CoffeVideo/CoffeVideoSection";
import OriginSection from "./Origin/OriginSection";
import DrinksMenuSection from "./DrinksMenu/DrinksMenuSection";
import ShowCaseSection from "./ShowCase/ShowCaseSection";
import FNBContactSection from "./FNBContact/FNBContactSection";
const FNBPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <PageHeader
        title="TRỌN VẸN TỰ NHIÊN"
        subtitle="Từ những rẫy cafe mộc mạc cho đến những quả tươi lành, chúng tôi chắt lọc tinh túy của đất trời vào từng sản phẩm. Dù là cafe di sản hay Kombucha thanh mát, tất cả đều mang đến cho bạn hương vị nguyên bản và thuần khiết nhất"
        backgroundImage="/images/fnb/coffee_banner.png"
      />
      <AboutFNBSection />
      <CoffeVideoSection />
      <OriginSection />
      <DrinksMenuSection />
      <ShowCaseSection />
      <FNBContactSection />
    </div>
  );
};

export default FNBPage;
