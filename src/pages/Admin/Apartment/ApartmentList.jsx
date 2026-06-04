import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useApartmentStore } from "../../../stores/apartmentStore";

// IMPORT COMPONENT CON ĐÃ PHÂN TÁCH
import ApartmentTable from "./components/ApartmentTable";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import FilterBarBase from "../../../components/FilterBase/FilterBarBase";
import { APARTMENT_OPTIONS } from "../../../constants/filterOptions";

export default function AdminApartmentList() {
  const {
    apartments,
    total,
    isLoading,
    error,
    fetchApartmentsForAdmin,
    deleteApartment,
  } = useApartmentStore();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // 🌟 1. ĐỌC CÁC THÔNG SỐ PHÂN TRANG VÀ BỘ LỌC TỪ URL
  const pageUrl = parseInt(searchParams.get("page") || "1", 10);
  const limitUrl = parseInt(searchParams.get("limit") || "10", 10);

  const filterId = searchParams.get("id") || "";
  const filterProvince = searchParams.get("province") || "";
  const filterWard = searchParams.get("ward") || "";
  const filterStatus = searchParams.get("status") || "";
  const filterBedroom = searchParams.get("bedroom") || "";
  const filterPublished = searchParams.get("is_published") || "";

  const page = pageUrl - 1;
  const rowsPerPage = limitUrl;

  // 🌟 2. ĐỒNG BỘ EFFECT: Gửi kèm bộ lọc activeFilters qua hàm fetch của Store
  useEffect(() => {
    const activeFilters = {
      id: filterId,
      province: filterProvince,
      ward: filterWard,
      status: filterStatus,
      bedroom: filterBedroom,
      is_published: filterPublished,
    };

    fetchApartmentsForAdmin(page, rowsPerPage, activeFilters);
  }, [
    fetchApartmentsForAdmin,
    page,
    rowsPerPage,
    filterId,
    filterProvince,
    filterWard,
    filterStatus,
    filterBedroom,
    filterPublished,
  ]);

  // Đổi trang
  const handleChangePage = (event, newPage) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: String(newPage + 1),
      limit: String(rowsPerPage),
    });
  };

  // Đổi số dòng hiển thị mỗi trang
  const handleChangeRowsPerPage = (event) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: "1",
      limit: String(event.target.value),
    });
  };

  // 🌟 3. HÀM XỬ LÝ KHI ADMIN BẤM TÌM KIẾM TRÊN FILTER BAR
  const handleFilterSubmit = (filters) => {
    setSearchParams({
      page: "1", // Bấm lọc mới thì luôn cưỡng chế quay về trang 1
      limit: String(rowsPerPage),
      ...filters, // Trải phẳng dữ liệu { id, ward, status, bedroom, is_published } lên URL
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
      const result = await deleteApartment(selectedId);
      if (result.success) {
        setOpenConfirm(false);
        setSelectedId(null);

        // Fetch lại kèm bộ lọc hiện tại để tránh mất dữ liệu view
        const activeFilters = {
          id: filterId,
          ward: filterWard,
          status: filterStatus,
          bedroom: filterBedroom,
          is_published: filterPublished,
        };
        fetchApartmentsForAdmin(page, rowsPerPage, activeFilters);
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

  // Định nghĩa cấu hình 5 ô nhập/chọn mà Admin yêu cầu
  const adminFields = [
    "id",
    "province",
    "ward",
    "status",
    "bedroom",
    "is_published",
  ];

  // Đổ ngược dữ liệu từ URL về form để giữ nguyên trạng thái hiển thị của ô nhập
  const currentDefaultValues = {
    id: filterId,
    ward: filterWard,
    status: filterStatus,
    bedroom: filterBedroom,
    is_published: filterPublished,
    province: filterProvince,
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

      {/* 🌟 4. KHỐI BỘ LỌC CỦA ADMIN (Xử lý giao diện cách biệt chuyên nghiệp) */}
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
          options={APARTMENT_OPTIONS}
          defaultValues={currentDefaultValues}
          onFilterSubmit={handleFilterSubmit}
        />
      </Box>

      {/* RENDER DỮ LIỆU THEO TRẠNG THÁI */}
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
            Không tìm thấy bài đăng căn hộ nào khớp với bộ lọc hiện tại.
          </Typography>
        </Box>
      ) : (
        <ApartmentTable
          data={apartments}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <DeleteConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        itemName="Căn hộ bất động sản"
        itemId={selectedId}
      />
    </Box>
  );
}
