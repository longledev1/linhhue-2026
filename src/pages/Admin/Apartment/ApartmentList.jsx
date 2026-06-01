import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useApartmentStore } from "../../../stores/apartmentStore";
import { WARD_OPTIONS } from "../../../constants/wardOptions";

export default function AdminApartmentList() {
  // 🌟 ĐỒNG BỘ MỚI: Gọi action deleteApartment từ Store
  const {
    apartments,
    isLoading,
    error,
    fetchApartmentsForAdmin,
    deleteApartment,
  } = useApartmentStore();

  // State quản lý việc đóng/mở và lưu ID căn hộ chuẩn bị xóa của Popup
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchApartmentsForAdmin();
  }, [fetchApartmentsForAdmin]);

  const formatWard = (wardSlug) => {
    if (!wardSlug) return "---";
    const foundWard = WARD_OPTIONS.find((item) => item.value === wardSlug);
    return foundWard ? foundWard.label : wardSlug;
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      setIsDeleting(true);
      const result = await deleteApartment(selectedId);

      if (result.success) {
        setOpenConfirm(false); // Đóng Popup
        setSelectedId(null);
      } else {
        alert("Lỗi: " + result.error);
      }
    } catch (err) {
      alert("Lỗi hệ thống khi xóa bài đăng: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const PRIMARY_COLOR = "#ab8c5d";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b" }}>
          Danh sách Căn hộ
        </Typography>
        <Button
          component={Link}
          to="/admin/apartments/create"
          variant="contained"
          startIcon={<FaPlus size={14} />}
          sx={{
            bgcolor: PRIMARY_COLOR,
            "&:hover": { bgcolor: "#967b51" },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Thêm căn hộ mới
        </Button>
      </Box>

      {isLoading && !isDeleting ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: PRIMARY_COLOR }} />
        </Box>
      ) : error ? (
        <Box
          sx={{
            p: 3,
            bgcolor: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
          }}
        >
          <Typography color="error" variant="body1">
            ⚠️ Gặp lỗi khi tải danh sách: {error}
          </Typography>
        </Box>
      ) : apartments.length === 0 ? (
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <Typography color="textSecondary">
            Danh sách trống. Bấm nút "Thêm căn hộ mới" để đăng bài viết đầu
            tiên.
          </Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                  Ảnh
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                  Tên căn hộ
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                  Hình thức
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                  Khu vực
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: "#475569" }}
                  align="right"
                >
                  Giá
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: "#475569" }}
                  align="right"
                >
                  Diện tích
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: "#475569" }}
                  align="center"
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apartments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#fdfbf7" },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={row.thumbnail}
                      variant="rounded"
                      sx={{
                        width: 56,
                        height: 56,
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 280 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#1e293b" }}
                      className="line-clamp-2"
                    >
                      {row.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {row.bedroom} PN | {row.bathroom} WC
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status === "rent" ? "Cho thuê" : "Cần bán"}
                      size="small"
                      sx={{
                        bgcolor: row.status === "rent" ? "#e6f4ea" : "#fce8e6",
                        color: row.status === "rent" ? "#137333" : "#c5221f",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {formatWard(row.ward)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color: "#0f172a" }}
                  >
                    {Number(row.price).toLocaleString("vi-VN")} đ
                  </TableCell>
                  <TableCell align="right">{row.area} m²</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <IconButton
                        component={Link}
                        to={`/admin/apartments/edit/${row.id}`}
                        size="small"
                        sx={{
                          color: "#3b82f6",
                          "&:hover": { bgcolor: "#3b82f610" },
                        }}
                      >
                        <FaRegEdit size={18} />
                      </IconButton>

                      {/* 🌟 ĐÃ CẬP NHẬT: Gọi hàm mở popup xác nhận xóa thay vì alert rác */}
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row.id)}
                        sx={{
                          color: "#ef4444",
                          "&:hover": { bgcolor: "#ef444410" },
                        }}
                      >
                        <FaRegTrashAlt size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ==================== 🌟 POPUP BOX XÁC NHẬN XÓA TOÀN DIỆN ==================== */}
      <Dialog
        open={openConfirm}
        onClose={() => !isDeleting && setOpenConfirm(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{ fontWeight: 700, color: "#1e293b" }}
        >
          🚨 Xác nhận xóa bài viết?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#475569", fontSize: "14px" }}>
            Bạn đang yêu cầu xóa căn hộ có mã{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>
              {selectedId}
            </span>
            . Hành động này sẽ gỡ bỏ hoàn toàn dữ liệu bài đăng trên Database,
            đồng thời xóa vĩnh viễn toàn bộ file ảnh liên quan. Bạn có chắc chắn
            muốn tiếp tục?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => setOpenConfirm(false)}
            disabled={isDeleting}
            sx={{ textTransform: "none", color: "#64748b", fontWeight: 600 }}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            variant="contained"
            color="error"
            startIcon={
              isDeleting ? <CircularProgress size={16} color="inherit" /> : null
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#ef4444",
              "&:hover": { bgcolor: "#dc2626" },
              minWidth: 110,
            }}
          >
            {isDeleting ? "Đang xóa..." : "Xóa vĩnh viễn"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
