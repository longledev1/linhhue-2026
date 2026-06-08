import React, { useEffect, useState } from "react";
import FilterBarBase from "../../components/FilterBase/FilterBarBase";
import ProjectCard from "../../components/Card/ProjectCard";
// 🌟 ĐỒNG BỘ: Chuyển sang sử dụng mảng hằng số lọc và Store Đất nền
import { LAND_OPTIONS } from "../../constants/filterOptions";
import { useLandStore } from "../../stores/landStore";
import { CircularProgress } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { FiX } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
export default function LandPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState(false);

  // 🌟 ĐỒNG BỘ: Loại bỏ trường "bedroom" và đổi "house_type" thành "land_type" cho bộ lọc đất nền
  const landFields = [
    "province",
    "ward",
    "status",
    "price",
    "area",
    "land_type",
  ];

  const handleFilterSubmit = async (formData) => {
    setCurrentFilters(formData);
    setSearchParams(formData);

    const hasFilter = Object.keys(formData).length > 0;

    if (!hasFilter) {
      fetchLands(0, INITIAL_LIMIT, false);
      return;
    }

    fetchFilteredLands(formData, 0, INITIAL_LIMIT, false);
  };

  // 🌟 ĐỒNG BỘ: Bóc tách toàn bộ State và Action từ useLandStore
  const {
    lands,
    totalLands,
    isLoading,
    error,
    fetchLands,
    fetchFilteredLands,
  } = useLandStore();

  const INITIAL_LIMIT = 12;
  const LOAD_MORE_LIMIT = 4;
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    // 🌟 ĐỒNG BỘ: Cập nhật cấu trúc lấy tham số từ URL (Loại bỏ bedroom, gán land_type)
    const filtersFromUrl = {
      ward: searchParams.get("ward") || "",
      province: searchParams.get("province") || "",
      status: searchParams.get("status") || "",
      price: searchParams.get("price") || "",
      area: searchParams.get("area") || "",
      land_type: searchParams.get("land_type") || "",
    };

    const hasFilter = Object.values(filtersFromUrl).some(Boolean);

    if (hasFilter) {
      setCurrentFilters(filtersFromUrl);
      fetchFilteredLands(filtersFromUrl, 0, INITIAL_LIMIT, false);
    } else {
      fetchLands(0, INITIAL_LIMIT, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    const hasFilter = Object.keys(currentFilters).length > 0;

    if (hasFilter) {
      fetchFilteredLands(currentFilters, lands.length, LOAD_MORE_LIMIT, true);
    } else {
      fetchLands(lands.length, LOAD_MORE_LIMIT, true);
    }
  };

  const hasMore = lands.length < totalLands;

  console.log("Danh sách đất nền hiện có trên UI:", lands);

  return (
    <div className="min-h-screen pt-[140px] md:pt-[140px]">
      {/* 1. Thanh Filter Bar cố định đầu trang */}
      <div className="hidden md:block">
        <FilterBarBase
          title="Danh mục đất nền"
          fields={landFields}
          options={LAND_OPTIONS} // Trỏ trúng hằng số option của đất nền
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
            <h2 className="text-lg font-bold">Bộ lọc đất nền</h2>
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
            title="Danh mục đất nền"
            fields={landFields}
            options={LAND_OPTIONS}
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
          Bất động sản /{" "}
          <span className="text-primary font-semibold">Danh mục đất nền</span>
        </p>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            Hiện có{" "}
            <span className="text-primary text-xl">
              {isLoading && lands.length === 0 ? "..." : totalLands}
            </span>{" "}
            danh mục đất nền phù hợp
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
          {!isLoading && lands?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-16 text-center font-medium text-gray-400">
              Hiện chưa có bất động sản đất nền nào được đăng tải trong danh mục
              này.
            </div>
          )}

          {/* 🌟 RENDER GRID CARD KHI ĐÃ CÓ DATA SẠCH */}
          {lands && lands.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lands.map((land) => (
                <div key={land.id} className="w-full">
                  {/* Tái sử dụng ProjectCard xịn sò của hệ thống để render dữ liệu mảnh đất */}
                  <ProjectCard project={land} />
                </div>
              ))}
            </div>
          )}

          {/* Khối loading tròn xoay nhịp nhàng */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <CircularProgress size={32} sx={{ color: "#ab8c5d" }} />
              {lands.length === 0 && (
                <p className="animate-pulse text-sm font-medium text-gray-500">
                  Đang tải danh sách dữ liệu đất nền từ hệ thống...
                </p>
              )}
            </div>
          )}

          {/* Nút load more xem thêm mượt mà phân trang chống trùng lặp dữ liệu */}
          {!isLoading && hasMore && lands.length > 0 && (
            <div className="flex w-full items-center justify-center pt-4">
              <button
                onClick={handleLoadMore}
                className="group text-primary flex items-center justify-center gap-2 rounded-xl border border-[#ab8c5d] bg-white px-8 py-3.5 text-xs font-bold tracking-widest shadow-sm transition-all duration-300 hover:bg-[#ab8c5d] hover:text-white hover:shadow-md active:scale-[0.98]"
              >
                <FiPlusCircle
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                XEM THÊM ĐẤT NỀN KHÁC
              </button>
            </div>
          )}

          {/* Thông báo nhỏ khi kết thúc danh mục */}
          {!isLoading && !hasMore && lands.length > 0 && (
            <div className="flex w-full items-center justify-center pt-6">
              <p className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
                ✨ Bạn đã xem hết danh sách đất nền hiện có
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
