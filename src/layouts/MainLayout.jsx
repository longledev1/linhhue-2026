import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VoteModal from "../components/VoteModal";

export const MainLayout = () => {
  return (
    <div>
      <VoteModal />
      <Header />
      <Outlet />
      <Footer />

      <ScrollRestoration />
    </div>
  );
};
