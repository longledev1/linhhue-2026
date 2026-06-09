import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer } from "@mui/material";
import AdminTopbar from "../components/Admin/AdminTopbar";
import AdminSidebar from "../components/Admin/AdminSidebar";

const SIDEBAR_WIDTH = 260;
const PRIMARY_COLOR = "#ab8c5d";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      {/* 1. TOP BAR */}
      <AdminTopbar
        sidebarWidth={SIDEBAR_WIDTH}
        onDrawerToggle={handleDrawerToggle}
        primaryColor={PRIMARY_COLOR}
      />

      {/* 2. SIDEBAR NAVIGATION */}
      {/* Trên Mobile: Ẩn hoàn toàn khung nav (w-0) | Trên Desktop: Hiện cố định (md:w-[260px]) */}
      <nav className="w-0 md:w-[260px] md:flex-shrink-0">
        {/* Bản Mobile: Drawer vuốt từ cạnh ra */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              border: "none",
            },
          }}
        >
          <AdminSidebar primaryColor={PRIMARY_COLOR} />
        </Drawer>

        {/* Bản Desktop: Ghim cố định bên trái */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              border: "none",
            },
          }}
          open
        >
          <AdminSidebar primaryColor={PRIMARY_COLOR} />
        </Drawer>
      </nav>

      {/* 3. VÙNG NỘI DUNG CHÍNH (MAIN CONTENT) */}
      {/* 
         - Trên Mobile: p-4 tràn 100% màn hình, không bị Sidebar chiếm chỗ.
         - Trên Desktop: p-6 và thụt lề md:pl-[284px] (260px Sidebar + 24px padding-left).
      */}
      <main className="mt-[64px] box-border min-w-0 p-4 transition-all duration-300 md:p-6 md:pl-[284px]">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
