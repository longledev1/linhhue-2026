import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  Typography,
  Chip,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { WARD_OPTIONS } from "../../../../constants/wardOptions";
import { formatLandType } from "../../../../utils/format";

export default function LandTable({
  data,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDeleteClick,
}) {
  const formatWard = (wardSlug) => {
    if (!wardSlug) return "---";
    const foundWard = WARD_OPTIONS.find((item) => item.value === wardSlug);
    return foundWard ? foundWard.label : wardSlug;
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: "8px 8px 0 0" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                Ảnh
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                Tiêu đề lô đất
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
              {/* 🌟 ĐỒNG BỘ: Thay thế các cột kích thước/diện tích cũ bằng cột Trạng thái hiển thị */}
              <TableCell
                sx={{ fontWeight: 600, color: "#475569" }}
                align="center"
              >
                Trạng thái
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
            {data.map((row) => (
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
                    sx={{ width: 56, height: 56, border: "1px solid #e2e8f0" }}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                    className="line-clamp-2"
                  >
                    {row.title}
                  </Typography>
                  {/* 🌟 ĐỒNG BỘ: Gom gọn Loại đất, Diện tích, Kích thước, Đường vào xuống dòng caption phụ */}
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: "block", mt: 0.5 }}
                  >
                    <span className="capitalize">
                      {formatLandType(row.land_type)}
                    </span>
                    {row.area && ` | ${row.area} m²`}
                    {row.dimensions && ` | KC: ${row.dimensions}`}
                    {row.road_width && ` | Đường: ${row.road_width}`}
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
                {/* 🌟 ĐỒNG BỘ: Thêm ô hiển thị trạng thái Ẩn/Hiện chuẩn hệ thống */}
                <TableCell align="center">
                  <Chip
                    label={row.is_published ? "Đang hiển thị" : "Đang ẩn"}
                    size="small"
                    sx={{
                      bgcolor: row.is_published
                        ? "rgba(76, 175, 80, 0.12)"
                        : "rgba(148, 163, 184, 0.12)",
                      color: row.is_published ? "#2e7d32" : "#475569",
                      border: row.is_published
                        ? "1px solid rgba(76, 175, 80, 0.25)"
                        : "1px solid rgba(148, 163, 184, 0.2)",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <IconButton
                      component={Link}
                      to={`/admin/lands/edit/${row.id}`}
                      size="small"
                      sx={{
                        color: "#3b82f6",
                        "&:hover": { bgcolor: "#3b82f610" },
                      }}
                    >
                      <FaRegEdit size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteClick(row.id)}
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

      <TablePagination
        component={Paper}
        elevation={0}
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Số dòng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} trong ${count}`
        }
        sx={{
          borderLeft: "1px solid #e2e8f0",
          borderRight: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
          borderRadius: "0 0 8px 8px",
          bgcolor: "#f8fafc",
        }}
      />
    </Box>
  );
}
