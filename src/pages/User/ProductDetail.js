import React from "react";
import DefaultLayout from "components/layout/DefaultLayout";
import styled, { createGlobalStyle } from "styled-components";
import RighteousRegular from "assets/font/Righteous-Regular.woff";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SelectOptions from "components/SelectOptions";
import Button from '@mui/material/Button';
import Stepper from "components/Stepper";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

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
  flex-direction: row;
  height: 100vh;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 65vw;
  max-height: 70vh;
  
`;

const ProductInfo = styled.div`
  width: 33vw;
  height: 70vh;
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
      behavior: "smooth"
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
    color: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 10px;

    &:hover {
      background-color: #000000;
    }
  }
`;


const ProductDetail = () => {
  return (
    <>
      <GlobalStyle />
      <DefaultLayout>
        <Body>
          <ImgContainer>
            <Stepper />
          </ImgContainer>
          <ProductInfo>
            <InfoDetail>
              <TextL>Apple</TextL>
              <TextL>Iphone 15</TextL>
              <ProductRate>
                <TextS>5.0</TextS>
                < StarBorderIcon sx={{ fontSize: 18 }} />
                <TextS>(14 reviews)</TextS>
              </ProductRate>
              <Text>300,000 마일리지</Text>
              <SelectOptions />
              <CustomButton variant="contained">구매하기</CustomButton>
              <CustomButton variant="contained">장바구니에 담기</CustomButton >
            </InfoDetail>
          </ProductInfo>
          <ScrollIconDiv>
            <RateReviewOutlinedIcon onClick={() => ScrollToSection('reviewSection')} />
            <LocalShippingOutlinedIcon onClick={() => ScrollToSection('deliverySection')} />
          </ScrollIconDiv>
        </Body>

        <div id="reviewSection">
          <TextL>Riview</TextL>
        </div>

        <div id="deliverySection">
          <TextL>배송안내</TextL>
        </div>

      </DefaultLayout>
    </>
  );
};

export default ProductDetail;
