import React from "react";
import Drawer from "@mui/material/Drawer";
import { FiFilter, FiX } from "react-icons/fi";

export default function MobileFilterDrawer({ open, onClose, children }) {
  return (
    <>
      <div className="fixed right-4 bottom-6 z-50 md:hidden">
        <button onClick={() => onClose(false)} className="hidden" />
      </div>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => onClose(false)}
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
            <h2 className="text-lg font-bold">Bộ lọc</h2>
          </div>

          <button onClick={() => onClose(false)}>
            <FiX size={22} />
          </button>
        </div>

        <div className="overflow-y-auto p-4">{children}</div>
      </Drawer>
    </>
  );
}
