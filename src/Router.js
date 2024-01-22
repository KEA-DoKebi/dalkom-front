import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/User/MainPage";
import ProductList from "./pages/User/ProductList";
import ProductDetail from "./pages/User/ProductDetail";
import Cart from "./pages/User/Cart";
import MyPage from "./pages/User/MyPage";
import SignUp from "./pages/User/SignUp";
import AdminListPage from "./pages/Admin/AdminListPage";
import AdminRegisterPage from "./pages/Admin/AdminRegisterPage";
import AnnouncementPage from "./pages/Admin/AnnouncementPage";
import BannerManagementPage from "./pages/Admin/BannerManagementPage";
import FAQPage from "./pages/Admin/FAQPage";
import InventoryManagePage from "./pages/Admin/InventoryManagePage";
import MileageApprovalPage from "./pages/Admin/MileageApprovalPage";
import MileageHistoryPage from "./pages/Admin/MileageHistoryPage";
import MileageInfoPage from "./pages/Admin/MileageInfoPage";
import OrderInquiryPage from "./pages/Admin/OrderInquiryPage";
import OrderListPage from "./pages/Admin/OrderListPage";
import PaymentInquiryPage from "./pages/Admin/PaymentInquiryPage";
import ProductEditPage from "./pages/Admin/ProductEditPage";
import ProductInquiryPage from "./pages/Admin/ProductInquiryPage";
import ProductListPage from "./pages/Admin/ProductListPage";
import ProductRegisterPage from "./pages/Admin/ProductRegisterPage";
import ShippingInfoPage from "./pages/Admin/ShippingInfoPage";
import UserListPage from "./pages/Admin/UserListPage";
import UserRegisterPage from "./pages/Admin/UserRegisterPage";
import Login from "./pages/User/Login";
import { ManualPage } from "./pages/User/CustomerService/ManualPage";
import { NoticePage } from "./pages/User/CustomerService/NoticePage";
import { UserFAQPage } from "./pages/User/CustomerService/UserFAQPage";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 사용자 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/category/:categorySeq" element={<ProductList />} />
        <Route path="/product/:productSeq" element={<ProductDetail />} />
        <Route path="/cart/:userSeq" element={<Cart />} />
        <Route path="/mypage/:userSeq" element={<MyPage />} />
        <Route path="/admin-list" element={<AdminListPage />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/banner-management" element={<BannerManagementPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/inventory-management" element={<InventoryManagePage />} />
        <Route path="/mile-approval" element={<MileageApprovalPage />} />
        <Route path="/mile-history" element={<MileageHistoryPage />} />
        <Route path="/mile-info" element={<MileageInfoPage />} />
        <Route path="/order-inquiry" element={<OrderInquiryPage />} />
        <Route path="/order-list" element={<OrderListPage />} />
        <Route path="/payment-inquiry" element={<PaymentInquiryPage />} />
        <Route path="/product-edit" element={<ProductEditPage />} />
        <Route path="/product-inquiry" element={<ProductInquiryPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/product-register" element={<ProductRegisterPage />} />
        <Route path="/shipping-info" element={<ShippingInfoPage />} />
        <Route path="/user-list" element={<UserListPage />} />
        <Route path="/user-register" element={<UserRegisterPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/manual" element={<ManualPage />} />
        <Route path = "/notice" element={<NoticePage />} />
        <Route path = "/user-faq" element={<UserFAQPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
