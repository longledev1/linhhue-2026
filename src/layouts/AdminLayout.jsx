import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer } from "@mui/material"; // Giữ lại Drawer cho Mobile/Desktop cố định
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
    // 🌟 KHUNG NGOÀI CÙNG: Dùng Flexbox thuần của Tailwind tràn màn hình
    <div className="flex min-h-screen bg-[#f4f5f7]">
      {/* 1. TOP BAR (Giữ nguyên) */}
      <AdminTopbar
        sidebarWidth={SIDEBAR_WIDTH}
        onDrawerToggle={handleDrawerToggle}
        primaryColor={PRIMARY_COLOR}
      />

      {/* 2. SIDEBAR NAVIGATION */}
      <nav className="md:flex-shrink-0" style={{ width: `${SIDEBAR_WIDTH}px` }}>
        {/* Bản Mobile bằng Drawer MUI */}
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

        {/* Bản Desktop cố định bằng Drawer MUI */}
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
      {/* 🌟 FIX CHÍ MẠNG: Dùng thẻ main thuần với w-full flex-1 và ép tràn viền bằng Tailwind */}
      <main className="mt-[64px] box-border min-w-0 flex-1 overflow-x-hidden p-6">
        <Outlet />
      </main>
    </div>
  );
}
