// src/components/Admin/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { supabase } from "../../config/supabaseClient"; // Hướng đường dẫn chuẩn về file supabase client của bạn

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    // Kiểm tra nhanh xem bộ nhớ tạm của tab trình duyệt có Token đăng nhập chưa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setChecking(false);
    });
  }, []);

  // Trong lúc hệ thống đang quét kiểm tra Token thì hiện màn hình loading chờ
  if (checking) {
    return (
      <Box className="flex h-screen w-screen items-center justify-center bg-stone-50">
        <CircularProgress sx={{ color: "#ab8c5d" }} />
      </Box>
    );
  }

  // 🛑 CHẶN LẠI: Nếu không tìm thấy Session (chưa nhập OTP hoặc đã tắt trình duyệt trước đó)
  // Hệ thống sẽ cưỡng chế đẩy Admin bay thẳng về trang login
  if (!hasSession) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ CHO QUA: Nếu nhập đúng mã OTP và session đang active, cho phép hiển thị trang Admin con
  return children;
}
