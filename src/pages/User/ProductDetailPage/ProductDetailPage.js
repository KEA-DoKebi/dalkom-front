import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "components/templete/DefaultLayout";
import styled, { createGlobalStyle } from "styled-components";
import RighteousRegular from "assets/font/Righteous-Regular.woff";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SelectOptions from "components/atoms/SelectOptions";
import Button from "@mui/material/Button";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Stepper from "components/molecules/Stepper";
import { TokenAxios } from "apis/CommonAxios";


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Righteous';
    src: local('Righteous'), url(${RighteousRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Righteous', sans-serif;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyTop = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -1%;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 65vw;
  height: 80vh;
`;

const ProductInfo = styled.div`
  width: 33vw;
  height: 80vh;
  justify-content: center;
`;

const InfoDetail = styled.div`
  margin-top: 25%;
  margin-left: 10%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ScrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }
};

const ScrollIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 2vw;
  margin-top: 3%;
`;

const TextL = styled.h1`
  font-size: 30px;
  margin-top: -2%;
`;

const Text = styled.h2`
  font-size: 20px;
`;

const TextS = styled.h3`
  font-size: 15px;
  margin-top: -2%;
`;

const ProductRate = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 5px;
  }
`;

const CustomButton = styled(Button)`
  && {
    width: 150px; // 너비
    height: 40px; // 높이
    background-color: #000000;
    color: #ffffff;
    border-radius: 10px;
    margin-bottom: 10px;

    &:hover {
      background-color: #000000;
    }
  }
`;

const BodyMiddle = styled.div`
  width: 100%;
  height: 100%;
`;

const BodyBottom = styled.div`
  width: 100%;
  height: 100%;
`;



const ProductDetail = () => {

  const { productSeq } = useParams();

  // SelectOptions 컴포넌트에서 받아온 prdtOptionSeq 상태 및 업데이트 함수
  const [prdtOptionSeq, setPrdtOptionSeq] = useState(15); // 초기값은 15로 설정

  // 페이지에서 입력한 amount 상태 및 업데이트 함수
  const [amount, setAmount] = useState(3); // 초기값은 3으로 설정

   
  const cartDataCreate = async (data) =>{
    try{
      const res = await TokenAxios.post("/api/cart/user", data);
      console.log(res.data);
    } catch (error) {
      console.log("Error response data:", error.response.data);
      console.log("Error stack trace:", error.stack);
    }
  }

  const handleAddToCart = () => {
    // You can modify cartData here before passing it to cartCreate
    cartDataCreate({
      productSeq: parseInt(productSeq),
      prdtOptionSeq: prdtOptionSeq,
      amount: amount,
    });
  };
  return (
    <>
      <GlobalStyle />
      <DefaultLayout>
        <Body>
          <BodyTop>
            <ImgContainer>
              <Stepper />
            </ImgContainer>
            <ProductInfo>
              <InfoDetail>
                <TextL>Apple</TextL>
                <TextL>Iphone 15</TextL>
                <ProductRate>
                  <TextS>5.0</TextS>
                  <StarBorderIcon sx={{ fontSize: 18 }} />
                  <TextS>(14 reviews)</TextS>
                </ProductRate>
                <Text>300,000 마일리지</Text>
                <SelectOptions  
                  prdtOptionSeq={prdtOptionSeq}
                  setPrdtOptionSeq={setPrdtOptionSeq} />
                <CustomButton variant="contained">구매하기</CustomButton>
                <CustomButton variant="contained" onClick={handleAddToCart}>장바구니에 담기</CustomButton>
              </InfoDetail>
            </ProductInfo>
            <ScrollIconDiv>
              <RateReviewOutlinedIcon
                onClick={() => ScrollToSection("reviewSection")}
              />
              <LocalShippingOutlinedIcon
                onClick={() => ScrollToSection("deliverySection")}
              />
            </ScrollIconDiv>
          </BodyTop>
          <BodyMiddle id="reviewSection">
            <TextL>Riview</TextL>
          </BodyMiddle>
          <BodyBottom id="deliverySection">
            <TextL>배송안내</TextL>
          </BodyBottom>
        </Body>
      </DefaultLayout>
    </>
  );
};

export default ProductDetail;
