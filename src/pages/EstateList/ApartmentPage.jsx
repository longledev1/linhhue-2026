import React, { useEffect, useState } from "react";
import FilterBarBase from "../../components/FilterBase/FilterBarBase";
import ProjectCard from "../../components/Card/ProjectCard";
import { APARTMENT_OPTIONS } from "../../constants/filterOptions";
import { useApartmentStore } from "../../stores/apartmentStore";
import { CircularProgress } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
export default function ApartmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const apartmentFields = [
    "ward",
    "status",
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
  // Bốc state totalApartments từ Zustand Store
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
      ward: searchParams.get("ward") || "",
      status: searchParams.get("status") || "",
      price: searchParams.get("price") || "",
      area: searchParams.get("area") || "",
      bedroom: searchParams.get("bedroom") || "",
      apartment_type: searchParams.get("apartment_type") || "",
    };

    const hasFilter = Object.values(filtersFromUrl).some(Boolean);

    if (hasFilter) {
      setCurrentFilters(filtersFromUrl);

      fetchFilteredApartments(filtersFromUrl, 0, INITIAL_LIMIT, false);
    } else {
      fetchApartments(0, INITIAL_LIMIT, false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  console.log("Danh sách căn hộ hiện có trên UI:", apartments);

  return (
    <div className="min-h-screen pt-[140px] pb-16">
      {/* 1. Thanh Filter Bar cố định đầu trang */}
      <FilterBarBase
        title="Danh mục căn hộ"
        fields={apartmentFields}
        options={APARTMENT_OPTIONS}
        onFilterSubmit={handleFilterSubmit}
        defaultValues={currentFilters}
      />
      {/* 2. Khối nội dung chính */}
      <div className="container mx-auto mt-8 px-4">
        {/* Số lượng danh mục căn hộ (Đếm real-time dựa trên tổng số đếm trong DB) */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            Hiện có{" "}
            <span className="text-xl text-[#ab8c5d]">
              {isLoading && apartments.length === 0 ? "..." : totalApartments}
            </span>{" "}
            danh mục căn hộ phù hợp
          </p>
        </div>

        {/* 🌟 VÙNG ĐIỀU KHIỂN NỘI DUNG */}
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

          {/* 🌟 RENDER GRID CARD KHI ĐÃ CÓ DATA SẠCH */}
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
                className="group flex items-center justify-center gap-2 rounded-xl border border-[#ab8c5d] bg-white px-8 py-3.5 text-xs font-bold tracking-widest text-[#ab8c5d] shadow-sm transition-all duration-300 hover:bg-[#ab8c5d] hover:text-white hover:shadow-md active:scale-[0.98]"
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
