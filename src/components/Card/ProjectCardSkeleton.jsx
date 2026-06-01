// src/components/Card/ProjectCardSkeleton.jsx

import { Skeleton } from "@mui/material";

export default function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Ảnh */}
      <Skeleton variant="rectangular" height={260} />

      <div className="space-y-3 p-5">
        {/* Ward */}
        <Skeleton width="30%" height={20} />

        {/* Title */}
        <Skeleton width="90%" height={32} />
        <Skeleton width="65%" height={32} />

        {/* Info row */}
        <Skeleton width="100%" height={24} />

        {/* Price */}
        <Skeleton width="50%" height={36} />

        {/* Description */}
        <Skeleton width="100%" height={18} />
        <Skeleton width="90%" height={18} />
        <Skeleton width="75%" height={18} />

        {/* Footer */}
        <Skeleton width="35%" height={24} />
      </div>
    </div>
  );
}
