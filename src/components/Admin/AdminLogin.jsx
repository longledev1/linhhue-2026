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
} from "@mui/material";
import { FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../../config/supabaseClient";

const FIXED_ADMIN_EMAIL = "longle1882@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Lấy OTP, 2: Nhập OTP
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Hàm kích hoạt gửi OTP về Email cố định
  const handleRequestOtp = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: FIXED_ADMIN_EMAIL,
        options: {
          shouldCreateUser: false, // 🔑 KHÓA CHẾ ĐỘ: Không cho phép tự đăng ký tài khoản mới
        },
      });

      if (error) throw error;

      setStep(2); // Chuyển sang ô nhập mã số
      setSuccessMsg("Mã OTP đã được gửi về email quản trị thành công!");
    } catch (error) {
      setErrorMsg(
        "Không thể gửi OTP. Vui lòng kiểm tra lại cấu hình hoặc email!",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xác thực mã số OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: FIXED_ADMIN_EMAIL,
        token: otpCode,
        type: "email",
      });

      if (error) throw error;

      if (data.session) {
        setSuccessMsg("Xác thực thành công! Đang vào Dashboard...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);
      }
    } catch (error) {
      setErrorMsg("Mã OTP không chính xác hoặc đã hết hạn. Thử lại nhé!");
    } finally {
      setLoading(false);
    }
  };

  const PRIMARY_COLOR = "#ab8c5d";

  return (
    <Box className="flex h-screen w-screen items-center justify-center bg-stone-50">
      <Card
        elevation={0}
        sx={{
          width: 400,
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          p: 1,
        }}
      >
        <CardContent className="space-y-5">
          <Box className="space-y-1 text-center">
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
              XÁC THỰC QUẢN TRỊ
            </Typography>
            <div className="mt-2">
              <Typography variant="body2" color="textSecondary">
                Hệ thống bảo mật dùng mã OTP Session.
              </Typography>
            </div>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ borderRadius: "8px" }}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ borderRadius: "8px" }}>
              {successMsg}
            </Alert>
          )}

          {step === 1 ? (
            <Box className="space-y-4">
              <TextField
                fullWidth
                disabled
                label="Email nhận mã"
                value="###@gmail.com"
                InputProps={{
                  startAdornment: (
                    <FiMail style={{ marginRight: 8, color: "#94a3b8" }} />
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
              <div className="mt-[16px]">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={handleRequestOtp}
                  disabled={loading}
                  sx={{
                    height: "46px",
                    bgcolor: PRIMARY_COLOR,
                    fontWeight: 600,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#967b51" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "LẤY MÃ OTP"
                  )}
                </Button>
              </div>
            </Box>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <TextField
                fullWidth
                autoFocus
                label="Nhập mã OTP 6 số"
                placeholder="Nhập mã số từ mail..."
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <FiLock style={{ marginRight: 8, color: "#94a3b8" }} />
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
              <Box className="mt-4 flex gap-2">
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setStep(1);
                    setOtpCode("");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  disabled={loading}
                  sx={{
                    height: "46px",
                    borderRadius: "8px",
                    textTransform: "none",
                    borderColor: "#cbd5e1",
                    color: "#475569",
                  }}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disableElevation
                  disabled={loading || !otpCode}
                  startIcon={<FiCheckCircle />}
                  sx={{
                    height: "46px",
                    bgcolor: PRIMARY_COLOR,
                    fontWeight: 600,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#967b51" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "VÀO TRANG"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
