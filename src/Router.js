import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/User/MainPage";
import ProductList from "./pages/User/ProductList";
import ProductDetail from "./pages/User/ProductDetail";
import Cart from "./pages/User/Cart";
import MyPage from "./pages/User/MyPage";
import CustomerService from "./pages/User/CustomerService";
import SignUp from "./pages/User/SignUp";
import AdminPage from "./pages/Admin/AdminPage";
import Login from "./pages/User/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category/:categorySeq" element={<ProductList />} />
        <Route path="/product/:productSeq" element={<ProductDetail />} />
        <Route path="/cart/:userSeq" element={<Cart />} />
        <Route path="/mypage/:userSeq" element={<MyPage />} />
        <Route path="/notice" element={<CustomerService />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
