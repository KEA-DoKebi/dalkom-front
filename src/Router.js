import { ApmRoutes } from "@elastic/apm-rum-react";
import AdminPage from "pages/Admin/AdminManage/AdminPage";
import AdminListPage from "pages/Admin/AdminManage/AdminListPage";
import AdminRegisterPage from "pages/Admin/AdminManage/AdminRegisterPage";
import AnnouncementPage from "pages/Admin/CSManage/AnnouncementPage";
import BannerManagementPage from "pages/Admin/CSManage/BannerManagementPage";
import FAQPage from "pages/Admin/CSManage/FAQPage";
import MileageInfoPage from "pages/Admin/CSManage/MileageInfoPage";
import ShippingInfoPage from "pages/Admin/CSManage/ShippingInfoPage";
import OrderInquiryPage from "pages/Admin/InquiryManage/OrderInquiryPage";
import PaymentInquiryPage from "pages/Admin/InquiryManage/PaymentInquiryPage";
import ProductInquiryPage from "pages/Admin/InquiryManage/ProductInquiryPage";
import OrderListPage from "pages/Admin/OrderManage/OrderListPage";
import ProductEditPage from "pages/Admin/ProductManage/ProductEditPage";
import ProductListPage from "pages/Admin/ProductManage/ProductListPage";
import ProductRegisterPage from "pages/Admin/ProductManage/ProductRegisterPage";
import MileageApprovalPage from "pages/Admin/UserManage/MileageApprovalPage";
import MileageHistoryPage from "pages/Admin/UserManage/MileageHistoryPage";
import UserListPage from "pages/Admin/UserManage/UserListPage";
import UserRegisterPage from "pages/Admin/UserManage/UserRegisterPage";
import Cart from "pages/User/CartPage/CartPage";
import CategoryPage from "pages/User/CategoryPage/CategoryPage";
import { ManualPage } from "pages/User/CustomerServicePage/ManualPage";
import { NoticePage } from "pages/User/CustomerServicePage/NoticePage";
import { UserFAQPage } from "pages/User/CustomerServicePage/UserFAQPage";
import MainPage from "pages/User/MainPage/MainPage";
import InquiryHistory from "pages/User/MyPage/Inquiry/InquiryHistoryPage/InquiryHistoryPage";
import Inquiry from "pages/User/MyPage/Inquiry/InquiryWritePage/InquiryWritePage";
import Mileage from "pages/User/MyPage/MileagePage/MileagePage";
import MyInfo from "pages/User/MyPage/MyInfoPage/MyInfoPage";
import OrderDetailPage from "pages/User/MyPage/Order/OrderListPage/OrderDetailPage";
import OrderList from "pages/User/MyPage/Order/OrderListPage/OrderListPage";
import Refund from "pages/User/MyPage/Order/RefundPage/RefundPage";
import Review from "pages/User/MyPage/Review/ReviewPage/ReviewPage";
import ReviewEdit from "pages/User/MyPage/Review/ReviewWritePage/ReviewEditPage";
import ReviewWrite from "pages/User/MyPage/Review/ReviewWritePage/ReviewWritePage";
import Payment from "pages/User/PaymentPage/PaymentPage";
import Login from "pages/commonPage/Login";
import SignUp from "pages/commonPage/SignUp";
import ComparisonPage from "pages/User/Camparison/ComparisonPage";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { init as initApm } from "@elastic/apm-rum";
import ProductDetailPage from "pages/User/ProductDetailPage/ProductDetailPage";
import { AuthProvider } from "./AuthContext";
import { SearchPage } from "pages/User/SearchPage/SearchPage";

import { FAQDetailPage } from "pages/User/CustomerServicePage/FAQDetailPage";
import { NoticeDetailPage } from "pages/User/CustomerServicePage/NoticeDetailPage";

import MileageInquiryPage from "pages/Admin/InquiryManage/MileageInquiryPage";
import RouteChangeTracker from "./RouteChangeTracker";

// eslint-disable-next-line no-unused-vars, no-undef
const apm = initApm({
  serviceName: "dalkom-front",
  serverUrl: process.env.REACT_APP_APM_URL,
  secretToken: process.env.REACT_APP_APM_TOKEN,
  environment: "dalkom-front",
});



const Router = () => {


  return (
    <BrowserRouter>
    <RouteChangeTracker />
      <AuthProvider>
        <ApmRoutes>
          {/* 사용자 */}

          <Route path="/" element={<MainPage />} />

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categorySeq" element={<CategoryPage />} />
          <Route
            path="/category/:categorySeq/sub/:subCategorySeq"
            element={<CategoryPage />}
          />

          <Route path="/product/:productSeq" element={<ProductDetailPage />} />
          <Route
            path="/mypage/review/write/:ordrDetailSeq"
            element={<ReviewWrite />}
          />
          <Route
            path="/mypage/review/edit/:reviewSeq"
            element={<ReviewEdit />}
          />
          <Route path="/mypage/myinfo" element={<MyInfo />} />
          <Route
            path="/product/:productSeq/:menuName"
            element={<ProductDetailPage />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage />} />
          {/* 관리자 관리 */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/list" element={<AdminListPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/order-detail/:orderSeq" element={<OrderDetailPage />} />

          <Route path="/mypage">
            <Route path="/mypage/order/list" element={<OrderList />} />
            <Route path="/mypage/order/refund" element={<Refund />} />
            <Route path="/mypage/mile" element={<Mileage />} />
            <Route path="/mypage/inquiry" element={<Inquiry />} />
            <Route
              path="/mypage/inquiry/history"
              element={<InquiryHistory />}
            />
            <Route path="/mypage/review" element={<Review />} />
            <Route path="/mypage/review/write" element={<ReviewWrite />} />
            <Route path="/mypage/review/edit" element={<ReviewEdit />} />
            <Route path="/mypage/myinfo" element={<MyInfo />} />
          </Route>

          <Route path="/cs">
            <Route path="/cs/manual" element={<ManualPage />} />
            <Route path="/cs/notice" element={<NoticePage />} />
            <Route
              path="/cs/notice/:noticeSeq"
              element={<NoticeDetailPage />}
            />
            <Route path="/cs/user-faq" element={<UserFAQPage />} />
            <Route
              path="/cs/user-faq/:inquirySeq"
              element={<FAQDetailPage />}
            />
          </Route>

          {/* 관리자 */}
          <Route path="/admin">
            {/* 관리자 관리 */}
            <Route path="/admin/list" element={<AdminListPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />

            {/* 사용자 관리 */}
            <Route path="/admin/user">
              <Route path="/admin/user/list" element={<UserListPage />} />
              <Route
                path="/admin/user/register"
                element={<UserRegisterPage />}
              />
              <Route
                path="/admin/user/mile"
                element={<MileageApprovalPage />}
              />
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
              <Route path="/admin/product/edit/:productSeq" element={<ProductEditPage />} />
            </Route>

            {/* 주문 관리 */}
            <Route path="/admin/order/list" element={<OrderListPage />} />

            {/* 문의 관리 */}
            <Route path="/admin/inquiry">
              <Route
                path="/admin/inquiry/order"
                element={<OrderInquiryPage />}
              />
              <Route
                path="/admin/inquiry/refund"
                element={<PaymentInquiryPage />}
              />
              <Route
                path="/admin/inquiry/product"
                element={<ProductInquiryPage />}
              />
              <Route
                path="/admin/inquiry/mileage"
                element={<MileageInquiryPage />}
              />
            </Route>

            {/* 고객센터 */}
            <Route path="/admin/cs">
              <Route
                path="/admin/cs/announcement"
                element={<AnnouncementPage />}
              />
              <Route
                path="/admin/cs/banner"
                element={<BannerManagementPage />}
              />
              <Route path="/admin/cs/faq" element={<FAQPage />} />
              <Route path="/admin/cs/mile" element={<MileageInfoPage />} />
              <Route path="/admin/cs/shipping" element={<ShippingInfoPage />} />
            </Route>
          </Route>
          {/* wow point */}
          <Route>
            <Route
              path="/comparison/:subCategorySeq"
              element={<ComparisonPage />}
            />
          </Route>
        </ApmRoutes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
