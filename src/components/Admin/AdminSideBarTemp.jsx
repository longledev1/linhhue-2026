import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  LuLayoutDashboard,
  LuBuilding2,
  LuCompass,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import { FiLayers, FiPlusSquare, FiHome } from "react-icons/fi";

export default function AdminSidebar({ primaryColor }) {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState({
    apartment: true,
    house: false,
    land: false,
  });

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenu((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const menuConfig = [
    {
      title: "Tổng quan",
      path: "/admin/dashboard",
      icon: <LuLayoutDashboard size={20} />,
      isDropdown: false,
    },
    {
      title: "Quản lý Căn hộ",
      key: "apartment",
      icon: <LuBuilding2 size={20} />,
      isDropdown: true,
      children: [
        {
          title: "Danh sách căn hộ",
          path: "/admin/apartments",
          icon: <FiLayers size={16} />,
        },
        {
          title: "Thêm căn hộ mới",
          path: "/admin/apartments/create",
          icon: <FiPlusSquare size={16} />,
        },
      ],
    },
    {
      title: "Quản lý Nhà ở",
      key: "house",
      icon: <FiHome size={20} />,
      isDropdown: true,
      children: [
        {
          title: "Danh sách nhà ở",
          path: "/admin/houses",
          icon: <FiLayers size={16} />,
        },
        {
          title: "Thêm nhà ở mới",
          path: "/admin/houses/create",
          icon: <FiPlusSquare size={16} />,
        },
      ],
    },
    {
      title: "Quản lý Đất đai",
      key: "land",
      icon: <LuCompass size={20} />,
      isDropdown: true,
      children: [
        {
          title: "Danh sách đất đai",
          path: "/admin/lands",
          icon: <FiLayers size={16} />,
        },
        {
          title: "Thêm đất mới",
          path: "/admin/lands/create",
          icon: <FiPlusSquare size={16} />,
        },
      ],
    },
  ];

  return (
    <Box sx={{ height: "100%", bgcolor: "#1c1c1a", color: "#ffff" }}>
      <Toolbar sx={{ justifyContent: "center", py: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: primaryColor, letterSpacing: "1px" }}
        >
          NSG REALTY
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <List sx={{ px: 1.5, py: 2 }}>
        {menuConfig.map((item) => {
          if (!item.isDropdown) {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "8px",
                    bgcolor: isActive ? `${primaryColor}20` : "transparent",
                    color: isActive ? primaryColor : "inherit",
                    "& .MuiListItemIcon-root": {
                      color: isActive ? primaryColor : "darkgray",
                    },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          }

          const isMenuOpen = openSubMenu[item.key];
          return (
            <Box key={item.key} sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => toggleSubMenu(item.key)}
                sx={{
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <ListItemIcon sx={{ color: "darkgray", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                />
                {isMenuOpen ? (
                  <LuChevronUp size={18} />
                ) : (
                  <LuChevronDown size={18} />
                )}
              </ListItemButton>

              <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 3, mt: 0.5 }}>
                  {item.children.map((child) => {
                    const isChildActive = location.pathname === child.path;
                    return (
                      <ListItemButton
                        key={child.title}
                        component={Link}
                        to={child.path}
                        sx={{
                          borderRadius: "6px",
                          mb: 0.5,
                          bgcolor: isChildActive ? primaryColor : "transparent",
                          color: isChildActive ? "white" : "inherit",
                          "& .MuiListItemIcon-root": {
                            color: isChildActive ? "white" : "gray",
                          },
                          "&:hover": {
                            bgcolor: isChildActive
                              ? primaryColor
                              : "rgba(255,255,255,0.03)",
                            opacity: 0.9,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.title}
                          primaryTypographyProps={{
                            fontSize: "13px",
                            fontWeight: isChildActive ? 600 : 400,
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
