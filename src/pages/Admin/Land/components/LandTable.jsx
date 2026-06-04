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
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa";

import {
  formatWard,
  formatProvince,
  formatLandType,
} from "../../../../utils/format";
export default function LandTable({
  data,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDeleteClick,
}) {
  const FONT_FAMILY = '"Montserrat", sans-serif'; //
  return (
    <Box sx={{ fontFamily: FONT_FAMILY }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: "8px 8px 0 0" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Ảnh
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Tiêu đề lô đất
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Hình thức
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Khu vực
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Giá
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Trạng thái
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: "#475569",
                  fontFamily: FONT_FAMILY,
                }}
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
                    sx={{
                      width: 56,
                      height: 56,
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </TableCell>

                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#1e293b",
                      fontFamily: FONT_FAMILY,
                    }}
                    className="line-clamp-2"
                  >
                    {row.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      color: "#64748b",
                      fontFamily: FONT_FAMILY,
                    }}
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
                      fontFamily: FONT_FAMILY,
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    color: "#334155",
                    fontFamily: FONT_FAMILY,
                    fontSize: "13px",
                  }}
                >
                  {row.ward ? (
                    <>
                      {row.province && (
                        <span className="font-semibold">
                          {formatProvince(row.province)}
                        </span>
                      )}

                      {row.province && <span>{" - "}</span>}

                      <span className="text-gray-600">
                        {formatWard(row.ward, row.province)}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">---</span>
                  )}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color: "#0f172a",
                    fontFamily: FONT_FAMILY,
                  }}
                >
                  {Number(row.price).toLocaleString("vi-VN")} đ
                </TableCell>

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
                      fontSize: "11px",
                      fontFamily: FONT_FAMILY,
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    {/* 👁️ NÚT XEM CHI TIẾT BÀI VIẾT (MỚI THÊM) */}
                    <IconButton
                      component={Link}
                      to={`/bat-dong-san/dat-dai/${row.id}`}
                      target="_blank" // Thêm target="_blank" nếu bạn muốn mở tab mới để xem bài viết, xóa đi nếu muốn chuyển trang trực tiếp
                      size="small"
                      sx={{
                        color: "#64748b", // Màu xám
                        "&:hover": { bgcolor: "#10b98110" },
                      }}
                    >
                      <FaRegEye size={18} />
                    </IconButton>

                    {/* 📝 NÚT CHỈNH SỬA */}
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

                    {/* 🗑️ NÚT XÓA */}
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
          fontFamily: FONT_FAMILY,
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select":
            {
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
            },
        }}
      />
    </Box>
  );
}
