import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import SplashScreen from "./components/SplashScreen";
import router from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <SplashScreen />
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  </>,
);
