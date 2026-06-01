import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import router from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>,
);
