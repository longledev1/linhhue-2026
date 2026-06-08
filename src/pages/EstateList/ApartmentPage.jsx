import React, { useEffect, useState } from "react";
import FilterBarBase from "../../components/FilterBase/FilterBarBase";
import ProjectCard from "../../components/Card/ProjectCard";
import { APARTMENT_OPTIONS } from "../../constants/filterOptions";
import { useApartmentStore } from "../../stores/apartmentStore";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { FiPlusCircle, FiX } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
export default function ApartmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState(false);
  const apartmentFields = [
    "province",
    "ward",
    "price",
    "area",
    "bedroom",
    "apartment_type",
  ];

  const handleFilterSubmit = async (formData) => {
    setCurrentFilters(formData);
    setSearchParams(formData);

    const hasFilter = Object.keys(formData).length > 0;

    if (!hasFilter) {
      fetchApartments(0, INITIAL_LIMIT, false);
      return;
    }

    fetchFilteredApartments(formData, 0, INITIAL_LIMIT, false);
  };

  const {
    apartments,
    totalApartments,
    isLoading,
    error,
    fetchApartments,
    fetchFilteredApartments,
  } = useApartmentStore();

  const INITIAL_LIMIT = 12;
  const LOAD_MORE_LIMIT = 4;
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    const filtersFromUrl = {
      id: searchParams.get("id") || "",
      status: searchParams.get("status") || "",
      price: searchParams.get("price") || "",
      province: searchParams.get("province") || "",
      ward: searchParams.get("ward") || "",
      area: searchParams.get("area") || "",
      bedroom: searchParams.get("bedroom") || "",
      apartment_type: searchParams.get("apartment_type") || "",
    };

    const cleanFilters = Object.keys(filtersFromUrl).reduce((acc, key) => {
      if (filtersFromUrl[key]) acc[key] = filtersFromUrl[key];
      return acc;
    }, {});

    const hasFilter = Object.keys(cleanFilters).length > 0;

    if (hasFilter) {
      setCurrentFilters(cleanFilters);
      fetchFilteredApartments(cleanFilters, 0, INITIAL_LIMIT, false);
    } else {
      fetchApartments(0, INITIAL_LIMIT, false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleLoadMore = () => {
    const hasFilter = Object.keys(currentFilters).length > 0;

    if (hasFilter) {
      fetchFilteredApartments(
        currentFilters,
        apartments.length,
        LOAD_MORE_LIMIT,
        true,
      );
    } else {
      fetchApartments(apartments.length, LOAD_MORE_LIMIT, true);
    }
  };

  const hasMore = apartments.length < totalApartments;

  return (
    <div className="pt-[140px] md:pt-[140px]">
      {/* 1. Thanh Filter Bar cố định đầu trang */}
      {/* Desktop */}
      <div className="hidden md:block">
        <FilterBarBase
          title="Danh mục căn hộ"
          fields={apartmentFields}
          options={APARTMENT_OPTIONS}
          onFilterSubmit={handleFilterSubmit}
          defaultValues={currentFilters}
        />
      </div>

      {/* Mobile Button */}
      <div className="fixed right-4 bottom-6 z-50 md:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 rounded-full bg-[#ab8c5d] px-5 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <FiFilter size={18} />
          Bộ lọc
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "90vh",
          },
        }}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <FiFilter size={18} />
            <h2 className="text-lg font-bold">Bộ lọc căn hộ</h2>
          </div>

          <button
            onClick={() => setOpenFilter(false)}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          <FilterBarBase
            title="Danh mục căn hộ"
            fields={apartmentFields}
            options={APARTMENT_OPTIONS}
            onFilterSubmit={(data) => {
              handleFilterSubmit(data);
              setOpenFilter(false);
            }}
            defaultValues={currentFilters}
          />
        </div>
      </Drawer>

      {/* 2. Khối nội dung chính */}
      <div className="container mx-auto mt-8 px-4">
        <p className="mt-2 mb-2 text-sm text-gray-500 md:hidden">
          Bất động sản / {""}
          <span className="text-primary font-semibold">Danh mục căn hộ</span>
        </p>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800 sm:text-lg">
            Hiện có{" "}
            <span className="text-primary text-xl sm:text-2xl">
              {isLoading && apartments.length === 0 ? "..." : totalApartments}
            </span>{" "}
            danh mục căn hộ phù hợp
          </p>
        </div>

        {/* VÙNG ĐIỀU KHIỂN NỘI DUNG */}
        <div className="w-full space-y-10">
          {error && (
            <div className="my-10 rounded-xl border border-red-100 bg-red-50/50 p-6 text-center font-medium text-red-600">
              🔥 Gặp lỗi kết nối dữ liệu: {error}. Vui lòng F5 hoặc thử lại sau!
            </div>
          )}

          {/* Màn hình trống (Chỉ hiện khi không loading và mảng trống trơn) */}
          {!isLoading && apartments?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-16 text-center font-medium text-gray-400">
              Hiện chưa có căn hộ nào được đăng tải trong danh mục này.
            </div>
          )}

          {/* RENDER GRID CARD KHI ĐÃ CÓ DATA SẠCH */}
          {apartments && apartments.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {apartments.map((apt) => (
                <div key={apt.id} className="w-full">
                  <ProjectCard project={apt} />
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <CircularProgress size={32} sx={{ color: "#ab8c5d" }} />
              {apartments.length === 0 && (
                <p className="animate-pulse text-sm font-medium text-gray-500">
                  Đang tải danh sách căn hộ từ hệ thống...
                </p>
              )}
            </div>
          )}

          {!isLoading && hasMore && apartments.length > 0 && (
            <div className="flex w-full items-center justify-center pt-4">
              <button
                onClick={handleLoadMore}
                className="group text-primary flex items-center justify-center gap-2 rounded-xl border border-[#ab8c5d] bg-white px-8 py-3.5 text-xs font-bold tracking-widest shadow-sm transition-all duration-300 hover:bg-[#ab8c5d] hover:text-white hover:shadow-md active:scale-[0.98]"
              >
                <FiPlusCircle
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                XEM THÊM CĂN HỘ KHÁC
              </button>
            </div>
          )}

          {/* Dòng thông báo nhỏ tinh tế khi đã xem hết sạch danh mục sản phẩm */}
          {!isLoading && !hasMore && apartments.length > 0 && (
            <div className="flex w-full items-center justify-center pt-6">
              <p className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
                ✨ Bạn đã xem hết danh sách căn hộ hiện có
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
