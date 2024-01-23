import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "pages/User/MainPage";
import ProductList from "pages/User/ProductList";
import ProductDetail from "pages/User/ProductDetail";
import Cart from "pages/User/Cart";
import OrderList from "pages/User/MyPage/OrderList";
import SignUp from "pages/User/SignUp";
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
import ProductEditPage from "pages/Admin/ProductManage/ProductEditPage";
import ProductInquiryPage from "pages/Admin/InquiryManage/ProductInquiryPage";
import ProductListPage from "pages/Admin/ProductManage/ProductListPage";
import ProductRegisterPage from "pages/Admin/ProductManage/ProductRegisterPage";
import ShippingInfoPage from "pages/Admin/CSManage/ShippingInfoPage";
import UserListPage from "pages/Admin/UserManage/UserListPage";
import UserRegisterPage from "pages/Admin/UserManage/UserRegisterPage";
import Login from "pages/User/Login";
import { ManualPage } from "pages/User/CustomerService/ManualPage";
import { NoticePage } from "pages/User/CustomerService/NoticePage";
import { UserFAQPage } from "pages/User/CustomerService/UserFAQPage";
import Refund from "pages/User/MyPage/Refund";
import Mileage from "pages/User/MyPage/Mileage";
import Inquiry from "pages/User/MyPage/Inquiry";
import InquiryHistory from "pages/User/MyPage/InquiryHistory";
import Review from "pages/User/MyPage/Review";
import MyInfo from "pages/User/MyPage/MyInfo";
import Payment from "pages/User/Payment";
import MileageUsingPage from "pages/User/MileageUsingPage";
import OrderDetailPage from "pages/User/OrderDetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 사용자 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/category/:categorySeq" element={<ProductList />} />

        <Route path="/product/:productSeq" element={<ProductDetail />} />

        <Route path="/cart/:userSeq" element={<Cart />} />

        <Route path="/payment/:paymentSeq" element={<Payment />} />
        <Route path="/order-detail" element={<OrderDetailPage />} />
        <Route path="/milg-use" element={<MileageUsingPage />} />

        <Route path="/mypage/:userSeq">
          <Route path="/mypage/:userSeq/order/list" element={<OrderList />} />
          <Route path="/mypage/:userSeq/order/refund" element={<Refund />} />
          <Route path="/mypage/:userSeq/mile" element={<Mileage />} />
          <Route path="/mypage/:userSeq/inquiry" element={<Inquiry />} />
          <Route
            path="/mypage/:userSeq/inquiry/history"
            element={<InquiryHistory />}
          />
          <Route path="/mypage/:userSeq/review" element={<Review />} />
          <Route path="/mypage/:userSeq/myinfo" element={<MyInfo />} />
        </Route>

        <Route path="/cs">
          <Route path="/cs/manual" element={<ManualPage />} />
          <Route path="/cs/notice" element={<NoticePage />} />
          <Route path="/cs/user-faq" element={<UserFAQPage />} />
        </Route>

        {/* 관리자 */}
        <Route path="/admin">
          {/* 관리자 관리 */}
          <Route path="/admin/list" element={<AdminListPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          {/* 사용자 관리 */}
          <Route path="/admin/user">
            <Route path="/admin/user/list" element={<UserListPage />} />
            <Route path="/admin/user/register" element={<UserRegisterPage />} />
            <Route path="/admin/user/mile" element={<MileageApprovalPage />} />
            <Route
              path="/admin/user/mile/history"
              element={<MileageHistoryPage />}
            />
          </Route>

          {/* 상품 관리 */}
          <Route path="/admin/product">
            <Route path="/admin/product/list" element={<ProductListPage />} />
            <Route
              path="/admin/product/register"
              element={<ProductRegisterPage />}
            />
            <Route path="/admin/product/edit" element={<ProductEditPage />} />
            <Route
              path="/admin/product/inventory"
              element={<InventoryManagePage />}
            />
          </Route>

          {/* 주문 관리 */}
          <Route path="/admin/order/list" element={<OrderListPage />} />

          {/* 문의 관리 */}
          <Route path="/admin/inquiry">
            <Route path="/admin/inquiry/order" element={<OrderInquiryPage />} />
            <Route
              path="/admin/inquiry/payment"
              element={<PaymentInquiryPage />}
            />
            <Route
              path="/admin/inquiry/product"
              element={<ProductInquiryPage />}
            />
          </Route>

          {/* 고객센터 */}
          <Route path="/admin/cs">
            <Route
              path="/admin/cs/announcement"
              element={<AnnouncementPage />}
            />
            <Route path="/admin/cs/banner" element={<BannerManagementPage />} />
            <Route path="/admin/cs/faq" element={<FAQPage />} />
            <Route path="/admin/cs/mile" element={<MileageInfoPage />} />
            <Route path="/admin/cs/shipping" element={<ShippingInfoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
