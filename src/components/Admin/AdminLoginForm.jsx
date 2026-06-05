import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import { FiLock, FiShield, FiUser, FiLogIn } from "react-icons/fi";
import { supabase } from "../../config/supabaseClient";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const FONT_FAMILY = '"Montserrat", sans-serif';
  const PRIMARY_COLOR = "#ab8c5d";

  // 🌟 LOGIC ĐĂNG NHẬP BẰNG USERNAME & MẬT KHẨU
  const handleUsernameLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ Tài khoản và Mật khẩu!");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 🔑 MẸO CHUYỂN ĐỔI: Biến đổi username nhập vào thành định dạng email nội bộ để Supabase Auth hiểu
      const fakeEmail = `${username.trim().toLowerCase()}@hethong.internal`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        setSuccessMsg("Đăng nhập thành công! Đang vào Dashboard...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="flex h-screen w-screen items-center justify-center bg-stone-50 font-sans select-none"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <Card
        elevation={0}
        sx={{
          width: 400,
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          p: 1,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        }}
      >
        <CardContent className="space-y-5">
          {/* Header */}
          <Box className="space-y-1 text-center">
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "#fdf6ec",
                  border: "1px solid #f0dfc0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiShield size={22} color={PRIMARY_COLOR} />
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                fontFamily: FONT_FAMILY,
              }}
            >
              HỆ THỐNG QUẢN TRỊ
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 0.5, fontFamily: FONT_FAMILY }}
            >
              Đăng nhập bằng tài khoản được cấp để tiếp tục.
            </Typography>
          </Box>

          {/* Cụm thông báo lỗi/thành công */}
          {errorMsg && (
            <Alert
              severity="error"
              sx={{
                borderRadius: "8px",
                fontFamily: FONT_FAMILY,
                fontSize: "13px",
              }}
            >
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert
              severity="success"
              sx={{
                borderRadius: "8px",
                fontFamily: FONT_FAMILY,
                fontSize: "13px",
              }}
            >
              {successMsg}
            </Alert>
          )}

          {/* Form Nhập Tài Khoản */}
          <form onSubmit={handleUsernameLogin} className="space-y-4">
            {/* Ô nhập Username */}
            <div className="mb-6">
              <TextField
                fullWidth
                label="Tài khoản đăng nhập"
                type="text"
                placeholder="Nhập tên tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiUser style={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                    style: { fontFamily: FONT_FAMILY, fontSize: "14px" },
                  },
                  inputLabel: {
                    style: { fontFamily: FONT_FAMILY, fontSize: "14px" },
                  },
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>
            {/* Ô nhập Password */}
            <div className="mb-6">
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiLock style={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                    style: { fontFamily: FONT_FAMILY, fontSize: "14px" },
                  },
                  inputLabel: {
                    style: { fontFamily: FONT_FAMILY, fontSize: "14px" },
                  },
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>

            {/* Nút bấm Đăng Nhập */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              disabled={loading}
              startIcon={!loading && <FiLogIn />}
              sx={{
                height: "46px",
                bgcolor: PRIMARY_COLOR,
                fontWeight: 600,
                fontFamily: FONT_FAMILY,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "#967b51" },
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "ĐĂNG NHẬP"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
