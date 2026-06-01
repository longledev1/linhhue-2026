import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import {
  LuWallet,
  LuBuilding2,
  LuWarehouse, // 🌟 SỬA TẠI ĐÂY: Thay LuHome bằng LuWarehouse
  LuCompass,
  LuHandshake,
  LuDollarSign,
} from "react-icons/lu";

export default function AdminDashboard() {
  const PRIMARY_COLOR = "#ab8c5d";

  return (
    <Box className="space-y-6">
      {/* Tiêu đề trang */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b" }}>
          Hệ Thống Báo Cáo Tổng Quan
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
          Thống kê dữ liệu thời gian thực của toàn bộ danh mục bất động sản.
        </Typography>
      </Box>

      {/* ========================================================================= */}
      {/* HÀNG 1: SỐ LIỆU TỔNG TOÀN SÀN */}
      {/* ========================================================================= */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#475569", mb: -1 }}
      >
        Hiệu năng tích hợp toàn hệ thống
      </Typography>

      {/* 🌟 SỬA TẠI ĐÂY: Đổi sang dùng Grid container cũ */}
      <Grid container spacing={3}>
        {/* Card 1: Tổng tài sản trên sàn */}
        <Grid item xs={12} sm={4}>
          <Card
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Box>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ fontWeight: 500 }}
                >
                  Tổng Sản Phẩm Toàn Sàn
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, mt: 1, color: "#0f172a" }}
                >
                  42
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: `${PRIMARY_COLOR}15`,
                  borderRadius: "8px",
                  color: PRIMARY_COLOR,
                  display: "flex",
                }}
              >
                <LuWallet size={28} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Tổng sản phẩm Đang cho thuê */}
        <Grid item xs={12} sm={4}>
          <Card
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Box>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ fontWeight: 500 }}
                >
                  Tổng Tin Cho Thuê
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, mt: 1, color: "#10b981" }}
                >
                  25
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "#10b98115",
                  borderRadius: "8px",
                  color: "#10b981",
                  display: "flex",
                }}
              >
                <LuHandshake size={28} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Tổng sản phẩm Cần bán */}
        <Grid item xs={12} sm={4}>
          <Card
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Box>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ fontWeight: 500 }}
                >
                  Tổng Tin Cần Bán
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, mt: 1, color: "#ef4444" }}
                >
                  17
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "#ef444415",
                  borderRadius: "8px",
                  color: "#ef4444",
                  display: "flex",
                }}
              >
                <LuDollarSign size={28} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* ========================================================================= */}
      {/* HÀNG 2: PHÂN RÃ CHI TIẾT THEO TỪNG DANH MỤC */}
      {/* ========================================================================= */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#475569", mb: -1 }}
      >
        Phân loại theo danh mục kinh doanh
      </Typography>

      <Grid container spacing={3}>
        {/* Khối Căn Hộ */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderLeft: `4px solid ${PRIMARY_COLOR}`,
              bgcolor: "white",
              borderTop: "1px solid #e2e8f0",
              borderRight: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
                sx={{ color: "#334155" }}
              >
                <LuBuilding2 size={20} style={{ color: PRIMARY_COLOR }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Mảng Căn Hộ
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Tổng số bài đăng: <strong>12</strong>
              </Typography>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: 8</span>
                <span>Bán: 4</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Khối Nhà Ở */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderLeft: "4px solid #3b82f6",
              bgcolor: "white",
              borderTop: "1px solid #e2e8f0",
              borderRight: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
                sx={{ color: "#334155" }}
              >
                {/* 🌟 SỬA TẠI ĐÂY: Đổi LuHome sang LuWarehouse */}
                <LuWarehouse size={20} style={{ color: "#3b82f6" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Mảng Nhà Ở
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Tổng số bài đăng: <strong>18</strong>
              </Typography>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: 10</span>
                <span>Bán: 8</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Khối Đất Đai */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderLeft: "4px solid #ec4899",
              bgcolor: "white",
              borderTop: "1px solid #e2e8f0",
              borderRight: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
                sx={{ color: "#334155" }}
              >
                <LuCompass size={20} style={{ color: "#ec4899" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Mảng Đất Đai
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Tổng số bài đăng: <strong>12</strong>
              </Typography>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: 7</span>
                <span>Bán: 5</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
