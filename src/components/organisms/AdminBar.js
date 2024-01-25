import React from "react";
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
import AdminListPage from "pages/Admin/AdminManage/AdminListPage";
import AdminRegisterPage from "pages/Admin/AdminManage/AdminRegisterPage";
import AnnouncementPage from "pages/Admin/CSManage/AnnouncementPage";
import BannerManagementPage from "pages/Admin/CSManage/BannerManagementPage";
import FAQPage from "pages/Admin/CSManage/FAQPage";
import InventoryManagePage from "pages/Admin/ProductManage/InventoryManagePage";
import MileageApprovalPage from "pages/Admin/UserManage/MileageApprovalPage";
import MileageHistoryPage from "pages/Admin/UserManage/MileageHistoryPage";
import MileageInfoPage from "pages/Admin/CSManage/MileageInfoPage";
import OrderInquiryPage from "pages/Admin/InquiryManage/OrderInquiryPage";
import OrderListPage from "pages/Admin/OrderManage/OrderListPage";
import PaymentInquiryPage from "pages/Admin/InquiryManage/PaymentInquiryPage";
import ProductInquiryPage from "pages/Admin/InquiryManage/ProductInquiryPage";
import ProductListPage from "pages/Admin/ProductManage/ProductListPage";
import ProductRegisterPage from "pages/Admin/ProductManage/ProductRegisterPage";
import ShippingInfoPage from "pages/Admin/CSManage/ShippingInfoPage";
import UserListPage from "pages/Admin/UserManage/UserListPage";
import UserRegisterPage from "pages/Admin/UserManage/UserRegisterPage";
import ProductEditPage from "pages/Admin/ProductManage/ProductEditPage";

const drawerWidth = 260;

const menuData = [
  {
    title: "관리자 관리",
    items: [
      { label: "관리자 목록", path: "/admin/list", component: AdminListPage },
      {
        label: "관리자 등록",
        path: "/admin/register",
        component: AdminRegisterPage,
      },
    ],
  },
  {
    title: "사용자 관리",
    items: [
      {
        label: "사용자 목록",
        path: "/admin/user/list",
        component: UserListPage,
      },
      {
        label: "사용자 등록",
        path: "/admin/user/register",
        component: UserRegisterPage,
      },
      {
        label: "마일리지 승인",
        path: "/admin/user/mile",
        component: MileageApprovalPage,
      },
      {
        label: "마일리지 승인 내역",
        path: "/admin/user/mile/history",
        component: MileageHistoryPage,
      },
    ],
  },
  {
    title: "상품 관리",
    items: [
      {
        label: "상품 목록",
        path: "/admin/product/list",
        component: ProductListPage,
      },
      {
        label: "상품 등록",
        path: "/admin/product/register",
        component: ProductRegisterPage,
      },
      {
        label: "상품 수정/삭제",
        path: "/admin/product/edit",
        component: ProductEditPage,
      },
      {
        label: "재고 관리",
        path: "/admin/product/inventory",
        component: InventoryManagePage,
      },
    ],
  },
  {
    title: "주문 관리",
    items: [
      {
        label: "주문 목록",
        path: "/admin/order/list",
        component: OrderListPage,
      },
    ],
  },
  {
    title: "고객 문의 관리",
    items: [
      {
        label: "상품 문의",
        path: "/admin/inquiry/product",
        component: ProductInquiryPage,
      },
      {
        label: "주문 문의",
        path: "/admin/inquiry/order",
        component: OrderInquiryPage,
      },
      {
        label: "결제 문의",
        path: "/admin/inquiry/payment",
        component: PaymentInquiryPage,
      },
    ],
  },
  {
    title: "고객센터",
    items: [
      {
        label: "공지사항",
        path: "/admin/cs/announcement",
        component: AnnouncementPage,
      },
      { label: "FAQ", path: "/admin/cs/faq", component: FAQPage },
      {
        label: "마일리지 안내",
        path: "/admin/cs/mile",
        component: MileageInfoPage,
      },
      {
        label: "배송/환불 안내",
        path: "/admin/cs/shipping",
        component: ShippingInfoPage,
      },
      {
        label: "배너 관리",
        path: "/admin/cs/banner",
        component: BannerManagementPage,
      },
    ],
  },
];

const MenuItem = ({ label, selectedMenu, onClick, path }) => (
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
      onClick={() => {
        onClick(label);
      }}
      component={Link} // Link 컴포넌트를 사용하여 페이지 간의 이동 처리
      to={path}
    >
      <Typography>{label}</Typography>
    </ListItemButton>
  </ListItem>
);

function AdminBar({ selectedMenu, setSelectedMenu }) {
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
                {menuGroup.items.map((menuItem, itemIndex) => (
                  <MenuItem
                    key={menuItem.label} // 또는 다른 고유한 속성 사용
                    label={menuItem.label}
                    selectedMenu={selectedMenu}
                    onClick={handleMenuClick}
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