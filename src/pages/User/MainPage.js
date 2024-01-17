import React, { useEffect } from "react";
import Topbar from "../../components/Topbar";
import { DefaultAxios } from "../../apis/CommonAxios";
import { CustomButton, CustomLink, Dwa, StyledDateInput } from "../../common";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {

  const navigate = useNavigate();
  // const testAxios = async() => {
  //   const res = await DefaultAxios.get("api/product/13");
  //   console.log(res.data)
  // }

  // useEffect(() => {
  //   testAxios();
  // })

  const handleBtnClick = (path) => {
    navigate(`${path}`);
  }
  
  return (
    <>
      <div style={{display : "flex"}}>
        <Topbar />
      </div>
      <div style={{display : "flex", justifyContent : "center"}}>
        <CustomButton onClick={() => handleBtnClick("/category/1")}>상품목록</CustomButton>
        <CustomButton onClick={() => handleBtnClick("/product/1")}>상품상세</CustomButton>
        <CustomButton onClick={() => handleBtnClick("/cart/1")}>장바구니</CustomButton>
        <CustomButton onClick={() => handleBtnClick("/mypage/1")}>마이페이지</CustomButton>
        <CustomButton onClick={() => handleBtnClick("/notice")}>문의페이지</CustomButton>
        <CustomButton onClick={() => handleBtnClick("/admin")}>관리자페이지</CustomButton>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="입사일을 입력하세요" />
      </DemoContainer>
    </LocalizationProvider>

      
    </>
  )
};

export default MainPage;
