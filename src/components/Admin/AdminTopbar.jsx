import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Divider,
  Avatar,
} from "@mui/material";
import { LuMenu, LuBell } from "react-icons/lu";

export default function AdminTopbar({
  sidebarWidth,
  onDrawerToggle,
  primaryColor,
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        bgcolor: "white",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <IconButton
          color="default"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <LuMenu size={24} />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ color: "#334155", fontWeight: 600, fontSize: "18px" }}
        >
          Hệ thống Quản trị Nội dung
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <LuBell size={22} style={{ color: "#64748b" }} />
            </Badge>
          </IconButton>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: primaryColor,
                width: 36,
                height: 36,
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              AD
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 600,
                display: { xs: "none", sm: "block" },
              }}
            >
              Hải Long
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
