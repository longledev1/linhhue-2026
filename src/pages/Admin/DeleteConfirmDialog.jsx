import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  isDeleting,
  itemName,
  itemId,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => !isDeleting && onClose()}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{ fontWeight: 700, color: "#1e293b" }}
      >
        🚨 Xác nhận xóa vĩnh viễn?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#475569", fontSize: "14px" }}>
          Bạn đang yêu cầu xóa dữ liệu của{" "}
          <span style={{ fontWeight: 600 }}>{itemName}</span> (Mã định danh:{" "}
          <span style={{ fontStyle: "italic", fontWeight: 600 }}>{itemId}</span>
          ).
          <br />
          Hành động này sẽ gỡ bỏ hoàn toàn bản ghi trên hệ thống Database, đồng
          thời xóa vĩnh viễn toàn bộ tệp ảnh liên quan. Bạn có chắc chắn muốn
          tiếp tục?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <Button
          onClick={onClose}
          disabled={isDeleting}
          sx={{ textTransform: "none", color: "#64748b", fontWeight: 600 }}
        >
          Hủy bỏ
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant="contained"
          color="error"
          startIcon={
            isDeleting ? <CircularProgress size={16} color="inherit" /> : null
          }
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#ef4444",
            "&:hover": { bgcolor: "#dc2626" },
            minWidth: 110,
          }}
        >
          {isDeleting ? "Đang xóa..." : "Xóa vĩnh viễn"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
