import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useLandStore } from "../../../stores/landStore";

// IMPORT CÁC COMPONENT ĐÃ PHÂN TÁCH LUỒNG CHỨC NĂNG
import LandTable from "./components/LandTable";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import FilterBarBase from "../../../components/FilterBase/FilterBarBase";
import { LAND_OPTIONS } from "../../../constants/filterOptions";

export default function AdminLandList() {
  const { lands, total, isLoading, error, fetchLandsForAdmin, deleteLand } =
    useLandStore();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // 🌟 1. ĐỌC CÁC THÔNG SỐ PHÂN TRANG VÀ BỘ LỌC TỪ URL XUỐNG
  const pageUrl = parseInt(searchParams.get("page") || "1", 10);
  const limitUrl = parseInt(searchParams.get("limit") || "10", 10);

  const filterId = searchParams.get("id") || "";
  const filterWard = searchParams.get("ward") || "";
  const filterStatus = searchParams.get("status") || "";
  const filterPublished = searchParams.get("is_published") || "";

  const page = pageUrl - 1;
  const rowsPerPage = limitUrl;

  // 🌟 2. ĐỒNG BỘ EFFECT: Chạy lại fetch khi bất kỳ thông số URL nào thay đổi
  useEffect(() => {
    const activeFilters = {
      id: filterId,
      ward: filterWard,
      status: filterStatus,
      is_published: filterPublished,
    };

    fetchLandsForAdmin(page, rowsPerPage, activeFilters);
  }, [
    fetchLandsForAdmin,
    page,
    rowsPerPage,
    filterId,
    filterWard,
    filterStatus,
    filterPublished,
  ]);

  // Giữ lại các filter cũ khi admin bấm chuyển trang
  const handleChangePage = (event, newPage) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: String(newPage + 1),
      limit: String(rowsPerPage),
    });
  };

  // Giữ lại các filter cũ khi đổi số dòng hiển thị
  const handleChangeRowsPerPage = (event) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: "1",
      limit: String(event.target.value),
    });
  };

  // 🌟 3. HÀM XỬ LÝ KHI ADMIN BẤM NÚT TÌM KIẾM
  const handleFilterSubmit = (filters) => {
    setSearchParams({
      page: "1", // Trở về trang đầu tiên
      limit: String(rowsPerPage),
      ...filters, // Găm toàn bộ trường lọc { id, ward, status, is_published } lên thanh địa chỉ
    });
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      setIsDeleting(true);
      const result = await deleteLand(selectedId);
      if (result.success) {
        setOpenConfirm(false);
        setSelectedId(null);

        // Tải lại dữ liệu trang hiện tại kèm bộ lọc đang active
        const activeFilters = {
          id: filterId,
          ward: filterWard,
          status: filterStatus,
          is_published: filterPublished,
        };
        fetchLandsForAdmin(page, rowsPerPage, activeFilters);
      } else {
        alert("Lỗi: " + result.error);
      }
    } catch (err) {
      alert("Lỗi hệ thống khi xóa bài đăng đất nền: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const PRIMARY_COLOR = "#ab8c5d";

  // Định nghĩa cấu hình các trường lọc cần hiển thị cho mảng Đất nền
  const adminFields = ["id", "ward", "status", "is_published"];

  // Đồng bộ giá trị mặc định từ URL nạp vào ô input form
  const currentDefaultValues = {
    id: filterId,
    ward: filterWard,
    status: filterStatus,
    is_published: filterPublished,
  };

  return (
    <Box>
      {/* HEADER SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b" }}>
          Danh sách Đất nền
        </Typography>
        <Button
          component={Link}
          to="/admin/lands/create"
          variant="contained"
          startIcon={<FaPlus size={14} />}
          sx={{
            bgcolor: PRIMARY_COLOR,
            "&:hover": { bgcolor: "#967b51" },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Thêm đất nền mới
        </Button>
      </Box>

      {/* 🌟 4. THANH BỘ LỌC TÌM KIẾM ĐẤT NỀN ĐỘNG */}
      <Box
        sx={{
          mb: 4,
          p: 2.5,
          bgcolor: "#fafafa",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <FilterBarBase
          isAdmin={true}
          fields={adminFields}
          options={LAND_OPTIONS}
          defaultValues={currentDefaultValues}
          onFilterSubmit={handleFilterSubmit}
        />
      </Box>

      {/* VIEW STATES RENDER */}
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
          <Typography color="error">
            ⚠️ Gặp lỗi khi tải danh sách: {error}
          </Typography>
        </Box>
      ) : lands.length === 0 ? (
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
            Không tìm thấy bài đăng đất nền nào khớp với bộ lọc hiện tại.
          </Typography>
        </Box>
      ) : (
        <LandTable
          data={lands}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* DIALOG XÁC NHẬN XÓA DÙNG CHUNG */}
      <DeleteConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        itemName="Lô đất nền bất động sản"
        itemId={selectedId}
      />
    </Box>
  );
}
