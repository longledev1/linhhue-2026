import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useHouseStore } from "../../../stores/houseStore";

// IMPORT CÁC COMPONENT ĐÃ ĐƯỢC CHUẨN HÓA KHỐI CHỨC NĂNG
import HouseTable from "./components/HouseTable";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import FilterBarBase from "../../../components/FilterBase/FilterBarBase";
import { HOUSE_OPTIONS } from "../../../constants/filterOptions";

export default function AdminHouseList() {
  const { houses, total, isLoading, error, fetchHousesForAdmin, deleteHouse } =
    useHouseStore();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cấu hình phân trang đồng bộ thẳng lên thanh URL trình duyệt
  const [searchParams, setSearchParams] = useSearchParams();

  // 🌟 1. ĐỌC THÔNG SỐ PHÂN TRANG VÀ BỘ LỌC TỪ URL XUỐNG (ĐÃ BỔ SUNG PROVINCE)
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

  // 🌟 2. ĐỒNG BỘ EFFECT: Tải lại dữ liệu khi URL thay đổi (ĐÃ BỔ SUNG PROVINCE)
  useEffect(() => {
    const activeFilters = {
      id: filterId,
      province: filterProvince, // 🔑 ĐẨY PROVINCE VÀO BỘ LỌC ĐỂ GỬI LÊN STORE/API
      ward: filterWard,
      status: filterStatus,
      bedroom: filterBedroom,
      is_published: filterPublished,
    };

    fetchHousesForAdmin(page, rowsPerPage, activeFilters);
  }, [
    fetchHousesForAdmin,
    page,
    rowsPerPage,
    filterId,
    filterProvince, // 🔑 THÊM VÀO MẢNG DEPENDENCIES ĐỂ THEO DÕI SỰ THAY ĐỔI URL
    filterWard,
    filterStatus,
    filterBedroom,
    filterPublished,
  ]);

  // Giữ lại các bộ lọc cũ khi chuyển trang
  const handleChangePage = (event, newPage) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: String(newPage + 1),
      limit: String(rowsPerPage),
    });
  };

  // Giữ lại các bộ lọc cũ khi đổi số lượng dòng hiển thị
  const handleChangeRowsPerPage = (event) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: "1",
      limit: String(event.target.value),
    });
  };

  // 🌟 3. HÀM XỬ LÝ KHI ADMIN BẤM NÚT TÌM KIẾM TRÊN FILTER BAR
  const handleFilterSubmit = (filters) => {
    setSearchParams({
      page: "1", // Luôn ép quay về trang 1 khi lọc điều kiện mới
      limit: String(rowsPerPage),
      ...filters, // Trải phẳng dữ liệu bộ lọc lên thanh URL địa chỉ
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
      const result = await deleteHouse(selectedId);
      if (result.success) {
        setOpenConfirm(false);
        setSelectedId(null);

        // Gọi tải lại dữ liệu kèm filter đang kích hoạt
        const activeFilters = {
          id: filterId,
          province: filterProvince, // 🔑 Đồng bộ biến tỉnh thành khi reload sau xóa
          ward: filterWard,
          status: filterStatus,
          bedroom: filterBedroom,
          is_published: filterPublished,
        };
        fetchHousesForAdmin(page, rowsPerPage, activeFilters);
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

  // 🌟 CẬP NHẬT: Thêm "province" đứng trước "ward" để giao diện thanh lọc xếp chuẩn thứ tự
  const adminFields = [
    "id",
    "province", // 🔑 CHÈN VÀO ĐÂY
    "ward",
    "status",
    "bedroom",
    "is_published",
  ];

  // 🌟 CẬP NHẬT: Đổ ngược province từ URL về Form để giữ nguyên trạng thái select khi F5
  const currentDefaultValues = {
    id: filterId,
    province: filterProvince, // 🔑 GÁN GIÁ TRỊ MẶC ĐỊNH CHO FORM
    ward: filterWard,
    status: filterStatus,
    bedroom: filterBedroom,
    is_published: filterPublished,
  };

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
          Danh sách Nhà ở
        </Typography>
        <Button
          component={Link}
          to="/admin/houses/create"
          variant="contained"
          startIcon={<FaPlus size={14} />}
          sx={{
            bgcolor: PRIMARY_COLOR,
            "&:hover": { bgcolor: "#967b51" },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Thêm nhà ở mới
        </Button>
      </Box>

      {/* 🌟 4. THANH BỘ LỌC TÌM KIẾM CHUYÊN NGHIỆP CỦA ADMIN (ĐÃ NHẬN DIỆN PROVINCE ĐỘNG) */}
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
          options={HOUSE_OPTIONS}
          defaultValues={currentDefaultValues}
          onFilterSubmit={handleFilterSubmit}
        />
      </Box>

      {/* TRẠNG THÁI RENDER GIAO DIỆN CHÍNH */}
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
      ) : houses.length === 0 ? (
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
            Không tìm thấy bài đăng nhà ở nào khớp với bộ lọc hiện tại.
          </Typography>
        </Box>
      ) : (
        <HouseTable
          data={houses}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* TÁI SỬ DỤNG: Gọi Dialog xóa chung xịn sò */}
      <DeleteConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        itemName="Nhà ở bất động sản"
        itemId={selectedId}
      />
    </Box>
  );
}
