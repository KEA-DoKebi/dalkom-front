import React from "react";
import { Link, useLocation } from "react-router-dom";
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
    items: [
      { label: "관리자 목록", path: "/admin/list" },
      {
        label: "관리자 등록",
        path: "/admin/register",
      },
    ],
  },
  {
    title: "사용자 관리",
    items: [
      {
        label: "사용자 목록",
        path: "/admin/user/list",
          
      },
      {
        label: "사용자 등록",
        path: "/admin/user/register",
      },
      {
        label: "마일리지 승인",
        path: "/admin/user/mile",
      },
      {
        label: "마일리지 승인 내역",
        path: "/admin/user/mile/history",
      },
    ],
  },
  {
    title: "상품 관리",
    items: [
      {
        label: "상품 목록",
        path: "/admin/product/list",
      },
      {
        label: "상품 등록",
        path: "/admin/product/register",
      },
      {
        label: "상품 수정/삭제",
        path: "/admin/product/edit",
      },
      {
        label: "재고 관리",
        path: "/admin/product/inventory",
      },
    ],
  },
  {
    title: "주문 관리",
    items: [
      {
        label: "주문 목록",
        path: "/admin/order/list",
      },
    ],
  },
  {
    title: "고객 문의 관리",
    items: [
      {
        label: "상품 문의",
        path: "/admin/inquiry/product",
      },
      {
        label: "주문 문의",
        path: "/admin/inquiry/order",
      },
      {
        label: "결제 문의",
        path: "/admin/inquiry/payment",
      },
    ],
  },
  {
    title: "고객센터",
    items: [
      {
        label: "공지사항",
        path: "/admin/cs/announcement",
      },
      { label: "FAQ", path: "/admin/cs/faq", },
      {
        label: "마일리지 안내",
        path: "/admin/cs/mile",
      },
      {
        label: "배송/환불 안내",
        path: "/admin/cs/shipping",
      },
      {
        label: "배너 관리",
        path: "/admin/cs/banner",
      },
    ],
  },
];
const MenuItem = ({ label, path }) => {
  const location = useLocation();
  const isSelected = location.pathname === path;

  return (
    <ListItem sx={{ mb: -1.5 }}>
      <ListItemButton
        sx={{
          backgroundColor: isSelected ? "#FDE8EF" : "transparent",
          color: isSelected ? "#EC407A" : "#000000",
          borderRadius: "7px",
          "&:hover": {
            backgroundColor: "#FDE8EF",
            borderRadius: "7px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            color: "#EC407A",
          },
        }}
        component={Link}
        to={path}
      >
        <Typography>{label}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

function AdminBar() {
  const location = useLocation();
  const selectedMenu = menuData
    .flatMap((group) => group.items)
    .find((item) => item.path === location.pathname)?.label;

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
                    key={menuItem.label}
                    label={menuItem.label}
                    path={menuItem.path}
                  />
                ))}
                <ListItem sx={{ mt: 3 }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main"></Box>
    </Paper>
  );
}

export default AdminBar;