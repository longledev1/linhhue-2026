import React, { useEffect, useState } from "react";
import { dashboardService } from "../../services/dashboardService";
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
  LuWarehouse,
  LuCompass,
  LuHandshake,
  LuDollarSign,
} from "react-icons/lu";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const PRIMARY_COLOR = "#ab8c5d";

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const result = await dashboardService.getStatistics();
        setStats(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatistics();
  }, []);

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
        sx={{ fontWeight: 600, color: "#475569", mb: "16px" }}
      >
        Hiệu năng tích hợp toàn hệ thống
      </Typography>

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
                  {stats?.totalProducts || 0}
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
                  {stats?.totalRent || 0}
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
                  {stats?.totalSale || 0}
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
        sx={{ fontWeight: 600, color: "#475569", mb: "16px" }}
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

              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Tổng số bài đăng:{" "}
                <strong>{stats?.apartments?.total || 0}</strong>
              </Typography>

              {/* Bổ sung hiển thị Ẩn/Hiện */}
              <Box sx={{ display: "flex", gap: 3, fontSize: "13px", mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#4caf50", fontWeight: 600 }}
                >
                  ● Đang hiện: {stats?.apartments?.visible || 0}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#f44336", fontWeight: 600 }}
                >
                  ● Đang ẩn: {stats?.apartments?.hidden || 0}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.6, my: 1 }} />

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: {stats?.apartments?.rent || 0}</span>
                <span>Bán: {stats?.apartments?.sale || 0}</span>
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
                <LuWarehouse size={20} style={{ color: "#3b82f6" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Mảng Nhà Ở
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Tổng số bài đăng: <strong>{stats?.houses?.total || 0}</strong>
              </Typography>

              {/* Bổ sung hiển thị Ẩn/Hiện */}
              <Box sx={{ display: "flex", gap: 3, fontSize: "13px", mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#4caf50", fontWeight: 600 }}
                >
                  ● Đang hiện: {stats?.houses?.visible || 0}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#f44336", fontWeight: 600 }}
                >
                  ● Đang ẩn: {stats?.houses?.hidden || 0}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.6, my: 1 }} />

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: {stats?.houses?.rent || 0}</span>
                <span>Bán: {stats?.houses?.sale || 0}</span>
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

              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Tổng số bài đăng: <strong>{stats?.lands?.total || 0}</strong>
              </Typography>

              {/* Bổ sung hiển thị Ẩn/Hiện */}
              <Box sx={{ display: "flex", gap: 3, fontSize: "13px", mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#4caf50", fontWeight: 600 }}
                >
                  ● Đang hiện: {stats?.lands?.visible || 0}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#f44336", fontWeight: 600 }}
                >
                  ● Đang ẩn: {stats?.lands?.hidden || 0}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.6, my: 1 }} />

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                sx={{ fontSize: "14px", color: "#64748b" }}
              >
                <span>Thuê: {stats?.lands?.rent || 0}</span>
                <span>Bán: {stats?.lands?.sale || 0}</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
