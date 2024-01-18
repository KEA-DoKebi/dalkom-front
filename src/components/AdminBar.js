import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  Button,
  Paper,
} from "@mui/material";

const drawerWidth = 260;

const menuData = [
  {
    title: "관리자 관리",
    items: ["관리자 목록", "관리자 등록"],
  },
  {
    title: "사용자 관리",
    items: [
      "사용자 목록",
      "사용자 등록",
      "마일리지 승인",
      "마일리지 승인 내역",
    ],
  },
  {
    title: "상품 관리",
    items: ["상품 목록", "상품 등록", "상품 수정/삭제", "재고 관리"],
  },
  {
    title: "주문 관리",
    items: ["주문 목록"],
  },
  {
    title: "고객 문의 관리",
    items: ["상품 문의", "주문 문의", "결제 문의"],
  },
  {
    title: "고객센터",
    items: ["공지사항", "FAQ", "마일리지 안내", "배송/환불 안내", "배너 관리"],
  },
];

const MenuItem = ({ label, selectedMenu, onClick }) => (
  <ListItem sx={{ mb: -1.5 }}>
    <ListItemButton
      sx={{
        backgroundColor: selectedMenu === label ? "#FDE8EF" : "transparent",
        color: selectedMenu === label ? "#EC407A" : "#000000",
        borderRadius: "7px",
        "&:hover": {
          backgroundColor: "#FDE8EF",
          borderRadius: "7px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          color: "#EC407A",
        },
      }}
      onClick={() => onClick(label)}
    >
      <Typography>{label}</Typography>
    </ListItemButton>
  </ListItem>
);

export default function AdminBar() {
  const [selectedMenu, setSelectedMenu] = useState("관리자 목록"); // Initial selected menu

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Add any additional logic or actions you want to perform on menu click
  };

  return (
    <Paper sx={{ display: "flex", backgroundColor: "#EEF2F6" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{
                  fontFamily: "Logo",
                  color: "#000000",
                  fontSize: "24px",
                  marginRight: "16px",
                }}
              >
                DalKom.Shop
              </Typography>
            </Link>
            <Typography
              noWrap
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "100px",
                color: "#000000",
              }}
            >
              {selectedMenu}
            </Typography>
          </Box>
          <Button color="inherit" style={{ color: "#000000" }}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuData.map((menuGroup) => (
              <React.Fragment key={menuGroup.title}>
                <ListItem>
                  <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {menuGroup.title}
                  </Typography>
                </ListItem>
                {menuGroup.items.map((menuItem) => (
                  <MenuItem
                    key={menuItem}
                    label={menuItem}
                    selectedMenu={selectedMenu}
                    onClick={handleMenuClick}
                  />
                ))}
                <ListItem sx={{ mt: 3 }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Paper>
  );
}
