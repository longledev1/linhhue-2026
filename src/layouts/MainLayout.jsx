import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
export const MainLayout = () => {
  return (
    <div>
      <Header />
      {/* <HeroBanner /> */}
      {/* Main Content */}
      <Outlet />
      <Footer />
    </div>
  );
};
