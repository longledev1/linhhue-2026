import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { MainLayout } from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// USER
const HomePage = lazy(() => import("../pages/HomePage/index.jsx"));
const EstatePage = lazy(() => import("../pages/Estate/index.jsx"));
const AboutUsPage = lazy(() => import("../pages/AboutUs/index.jsx"));
const FNBPage = lazy(() => import("../pages/FNB/index.jsx"));
const NotFound = lazy(() => import("../pages/NotFoundPage.jsx"));

const ApartmentPage = lazy(
  () => import("../pages/EstateList/ApartmentPage.jsx"),
);

const HousePage = lazy(() => import("../pages/EstateList/HousePage.jsx"));

const LandPage = lazy(() => import("../pages/EstateList/LandPage.jsx"));

const ApartmentDetail = lazy(
  () => import("../pages/ProjectDetails/ApartmentDetailSection/index.jsx"),
);

const HouseDetailSection = lazy(
  () => import("../pages/ProjectDetails/HouseDetailSection/index.jsx"),
);

const LandDetailSection = lazy(
  () => import("../pages/ProjectDetails/LandDetailSection.jsx/index.jsx"),
);

// ADMIN
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard.jsx"));

const AdminApartmentList = lazy(
  () => import("../pages/Admin/Apartment/ApartmentList.jsx"),
);

const AdminCreateApartment = lazy(
  () => import("../pages/Admin/Apartment/CreateApartment.jsx"),
);

const AdminApartmentEdit = lazy(
  () => import("../pages/Admin/Apartment/EditApartment.jsx"),
);

const AdminHouseList = lazy(() => import("../pages/Admin/House/HouseList.jsx"));

const AdminCreateHouse = lazy(
  () => import("../pages/Admin/House/CreateHouse.jsx"),
);

const AdminHouseEdit = lazy(() => import("../pages/Admin/House/EditHouse.jsx"));

const AdminLandList = lazy(() => import("../pages/Admin/Land/LandList.jsx"));

const AdminCreateLand = lazy(
  () => import("../pages/Admin/Land/CreateLand.jsx"),
);

const AdminEditLand = lazy(() => import("../pages/Admin/Land/EditLand.jsx"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/ve-chung-toi",
        element: <AboutUsPage />,
      },
      {
        path: "/bat-dong-san",
        element: <EstatePage />,
      },
      {
        path: "/bat-dong-san/can-ho",
        element: <ApartmentPage />,
      },
      {
        path: "/bat-dong-san/can-ho/:id",
        element: <ApartmentDetail />,
      },
      {
        path: "/bat-dong-san/nha-o",
        element: <HousePage />,
      },
      {
        path: "/bat-dong-san/nha-o/:id",
        element: <HouseDetailSection />,
      },
      {
        path: "/bat-dong-san/dat-dai",
        element: <LandPage />,
      },
      {
        path: "/bat-dong-san/dat-dai/:id",
        element: <LandDetailSection />,
      },
      {
        path: "/fnb",
        element: <FNBPage />,
      },
    ],
  },

  {
    element: <AdminLayout />,
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

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
