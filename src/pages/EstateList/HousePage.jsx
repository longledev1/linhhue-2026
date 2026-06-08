import React, { useEffect, useState } from "react";
import FilterBarBase from "../../components/FilterBase/FilterBarBase";
import ProjectCard from "../../components/Card/ProjectCard";
import { HOUSE_OPTIONS } from "../../constants/filterOptions";
import { useHouseStore } from "../../stores/houseStore";
import { CircularProgress } from "@mui/material";
import { FiPlusCircle, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { FiFilter } from "react-icons/fi";
export default function HousePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState(false);

  const houseFields = [
    "province",
    "ward",
    "status",
    "price",
    "area",
    "bedroom",
    "house_type",
  ];
  const handleFilterSubmit = async (formData) => {
    setCurrentFilters(formData);

    setSearchParams(formData);

    const hasFilter = Object.keys(formData).length > 0;

    if (!hasFilter) {
      fetchHouses(0, INITIAL_LIMIT, false);
      return;
    }

    fetchFilteredHouses(formData, 0, INITIAL_LIMIT, false);
  };
  // Bốc state totalHouses từ Zustand Store
  const {
    houses,
    totalHouses,
    isLoading,
    error,
    fetchHouses,
    fetchFilteredHouses,
  } = useHouseStore();

  const INITIAL_LIMIT = 12;
  const LOAD_MORE_LIMIT = 4;
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    const filtersFromUrl = {
      ward: searchParams.get("ward") || "",
      status: searchParams.get("status") || "",
      province: searchParams.get("province") || "",
      price: searchParams.get("price") || "",
      area: searchParams.get("area") || "",
      bedroom: searchParams.get("bedroom") || "",
      house_type: searchParams.get("house_type") || "",
    };

    const hasFilter = Object.values(filtersFromUrl).some(Boolean);

    if (hasFilter) {
      setCurrentFilters(filtersFromUrl);

      fetchFilteredHouses(filtersFromUrl, 0, INITIAL_LIMIT, false);
    } else {
      fetchHouses(0, INITIAL_LIMIT, false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLoadMore = () => {
    const hasFilter = Object.keys(currentFilters).length > 0;

    if (hasFilter) {
      fetchFilteredHouses(currentFilters, houses.length, LOAD_MORE_LIMIT, true);
    } else {
      fetchHouses(houses.length, LOAD_MORE_LIMIT, true);
    }
  };
  const hasMore = houses.length < totalHouses;

  return (
    <div className="min-h-screen pt-[140px] md:pt-[140px]">
      {/* 1. Thanh Filter Bar cố định đầu trang */}
      <div className="hidden md:block">
        <FilterBarBase
          title="Danh mục nhà ở"
          fields={houseFields}
          options={HOUSE_OPTIONS}
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
            <h2 className="text-lg font-bold">Bộ lọc nhà ở</h2>
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
            title="Danh mục nhà ở"
            fields={houseFields}
            options={HOUSE_OPTIONS}
            onFilterSubmit={(data) => {
              handleFilterSubmit(data);
              setOpenFilter(false);
            }}
            defaultValues={currentFilters}
          />
        </div>
      </Drawer>

      <div className="container mx-auto mt-8 px-4">
        <p className="mt-2 mb-2 text-sm text-gray-500 md:hidden">
          Bất động sản /{" "}
          <span className="text-primary font-semibold">Danh mục nhà ở</span>
        </p>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            Hiện có{" "}
            <span className="text-primary text-xl">
              {isLoading && houses.length === 0 ? "..." : totalHouses}
            </span>{" "}
            danh mục nhà ở phù hợp
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
          {!isLoading && houses?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-16 text-center font-medium text-gray-400">
              Hiện chưa có nhà ở nào được đăng tải trong danh mục này.
            </div>
          )}

          {/* 🌟 RENDER GRID CARD KHI ĐÃ CÓ DATA SẠCH */}
          {houses && houses.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {houses.map((house) => (
                <div key={house.id} className="w-full">
                  <ProjectCard project={house} />
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <CircularProgress size={32} sx={{ color: "#ab8c5d" }} />
              {houses.length === 0 && (
                <p className="animate-pulse text-sm font-medium text-gray-500">
                  Đang tải danh sách nhà ở từ hệ thống...
                </p>
              )}
            </div>
          )}

          {!isLoading && hasMore && houses.length > 0 && (
            <div className="flex w-full items-center justify-center pt-4">
              <button
                onClick={handleLoadMore}
                className="group text-primary flex items-center justify-center gap-2 rounded-xl border border-[#ab8c5d] bg-white px-8 py-3.5 text-xs font-bold tracking-widest shadow-sm transition-all duration-300 hover:bg-[#ab8c5d] hover:text-white hover:shadow-md active:scale-[0.98]"
              >
                <FiPlusCircle
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                XEM THÊM NHÀ Ở KHÁC
              </button>
            </div>
          )}

          {/* Dòng thông báo nhỏ tinh tế khi đã xem hết sạch danh mục sản phẩm */}
          {!isLoading && !hasMore && houses.length > 0 && (
            <div className="flex w-full items-center justify-center pt-6">
              <p className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
                ✨ Bạn đã xem hết danh sách nhà ở hiện có
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
