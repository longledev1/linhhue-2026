import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { MainLayout } from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// 🌟 IMPORT TẤM KHIÊN BẢO VỆ ROUTE
import ProtectedRoute from "../components/Admin/ProtectedRoute.jsx";

// ============================================================================
// 🛠️ HÀM BỌC LAZY TỰ ĐỘNG KHẮC PHỤC LỖI FETCH MODULE (CACHE/DEPLOY MỚI)
// ============================================================================
const lazyWithRetry = (componentImport) =>
  lazy(() =>
    componentImport().catch((error) => {
      const isNetworkError =
        error.message.includes("Failed to fetch dynamically imported module") ||
        error.message.includes("is not a valid script");

      if (isNetworkError) {
        // Tự động ép trình duyệt reload lại để nhận danh sách file build mới nhất từ server
        window.location.reload();
      }
      throw error;
    }),
  );

// ============================================================================
// 📦 KHAI BÁO CÁC TRANG (ỨNG DỤNG LAZY WITH RETRY)
// ============================================================================

// USER
const HomePage = lazyWithRetry(() => import("../pages/HomePage/index.jsx"));
const EstatePage = lazyWithRetry(() => import("../pages/Estate/index.jsx"));
const AboutUsPage = lazyWithRetry(() => import("../pages/AboutUs/index.jsx"));
const FNBPage = lazyWithRetry(() => import("../pages/FNB/index.jsx"));
const NotFound = lazyWithRetry(() => import("../pages/NotFoundPage.jsx"));

const ApartmentPage = lazyWithRetry(
  () => import("../pages/EstateList/ApartmentPage.jsx"),
);
const HousePage = lazyWithRetry(
  () => import("../pages/EstateList/HousePage.jsx"),
);
const LandPage = lazyWithRetry(
  () => import("../pages/EstateList/LandPage.jsx"),
);

const ApartmentDetail = lazyWithRetry(
  () => import("../pages/ProjectDetails/ApartmentDetailSection/index.jsx"),
);
const HouseDetailSection = lazyWithRetry(
  () => import("../pages/ProjectDetails/HouseDetailSection/index.jsx"),
);
const LandDetailSection = lazyWithRetry(
  () => import("../pages/ProjectDetails/LandDetailSection.jsx/index.jsx"),
);

// ADMIN
const AdminLogin = lazyWithRetry(
  () => import("../components/Admin/AdminLoginForm.jsx"),
);
const AdminDashboard = lazyWithRetry(
  () => import("../pages/Admin/Dashboard.jsx"),
);

const AdminApartmentList = lazyWithRetry(
  () => import("../pages/Admin/Apartment/ApartmentList.jsx"),
);
const AdminCreateApartment = lazyWithRetry(
  () => import("../pages/Admin/Apartment/CreateApartment.jsx"),
);
const AdminApartmentEdit = lazyWithRetry(
  () => import("../pages/Admin/Apartment/EditApartment.jsx"),
);

const AdminHouseList = lazyWithRetry(
  () => import("../pages/Admin/House/HouseList.jsx"),
);
const AdminCreateHouse = lazyWithRetry(
  () => import("../pages/Admin/House/CreateHouse.jsx"),
);
const AdminHouseEdit = lazyWithRetry(
  () => import("../pages/Admin/House/EditHouse.jsx"),
);

const AdminLandList = lazyWithRetry(
  () => import("../pages/Admin/Land/LandList.jsx"),
);
const AdminCreateLand = lazyWithRetry(
  () => import("../pages/Admin/Land/CreateLand.jsx"),
);
const AdminEditLand = lazyWithRetry(
  () => import("../pages/Admin/Land/EditLand.jsx"),
);

// ============================================================================
// 🗺️ ĐỊNH TUYẾN ROUTER
// ============================================================================
const router = createBrowserRouter([
  // ======================== PHÂN HỆ USER KHÔNG KHÓA ========================
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/ve-chung-toi", element: <AboutUsPage /> },
      { path: "/bat-dong-san", element: <EstatePage /> },
      { path: "/bat-dong-san/can-ho", element: <ApartmentPage /> },
      { path: "/bat-dong-san/can-ho/:id", element: <ApartmentDetail /> },
      { path: "/bat-dong-san/nha-o", element: <HousePage /> },
      { path: "/bat-dong-san/nha-o/:id", element: <HouseDetailSection /> },
      { path: "/bat-dong-san/dat-dai", element: <LandPage /> },
      { path: "/bat-dong-san/dat-dai/:id", element: <LandDetailSection /> },
      { path: "/fnb", element: <FNBPage /> },
    ],
  },

  // ======================== TRANG LOGIN CỦA ADMIN (MỞ CÔNG KHAI) ========================
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // ======================== 🌟 VÙNG BẢO MẬT ADMIN (BỌC PROTECTEDROUTE) ========================
  {
    element: <ProtectedRoute children={<AdminLayout />} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },

      // APARTMENTS
      {
        path: "/admin/apartments",
        element: <AdminApartmentList />,
      },
      {
        path: "/admin/apartments/create",
        element: <AdminCreateApartment />,
      },
      {
        path: "/admin/apartments/edit/:id",
        element: <AdminApartmentEdit />,
      },

      // HOUSES
      {
        path: "/admin/houses",
        element: <AdminHouseList />,
      },
      {
        path: "/admin/houses/create",
        element: <AdminCreateHouse />,
      },
      {
        path: "/admin/houses/edit/:id",
        element: <AdminHouseEdit />,
      },

      // LANDS
      {
        path: "/admin/lands",
        element: <AdminLandList />,
      },
      {
        path: "/admin/lands/create",
        element: <AdminCreateLand />,
      },
      {
        path: "/admin/lands/edit/:id",
        element: <AdminEditLand />,
      },
    ],
  },

  // TRANG LỖI 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
