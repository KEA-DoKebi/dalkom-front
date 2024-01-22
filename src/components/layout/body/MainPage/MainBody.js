import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Avatar, Typography, Divider } from "@mui/material";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
// import KaKaoFriendsImage from "/images/kakaofriends/webp"

// MainBody코드
const MainBody = () => {
  return (
    <StyledBox>
      {/* 배너 */}
      <Divider />
      <StyledCarousel>
        <StyledPaper sx={{ backgroundColor: "#F5F7FB" }}>
          <Link to="/category/1">
            <BannerImage src="/images/MainPage/kakaofriends.webp" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#F0CD4C" }}>
          <Link to="/category/1">
            <BannerImage src="/images/MainPage/kakao2.jpeg" />
          </Link>
        </StyledPaper>
      </StyledCarousel>
      
      {/* 카테고리 목록  */}
      <CategoryBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/hanger.png" />
          <Typography>패션/뷰티</Typography>
        </ImageBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/life.png" />
          <Typography>생활</Typography>
        </ImageBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/digital.png" />
          <Typography>디지털/가전</Typography>
        </ImageBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/baby.png" />
          <Typography>출산/유아동</Typography>
        </ImageBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/sports.png" />
          <Typography>스포츠/레저</Typography>
        </ImageBox>
        <ImageBox>
          <StyledAvartar src="/images/MainPage/chunsik2.png" />
          <Typography>카카오굿즈</Typography>
        </ImageBox>
      </CategoryBox>
    </StyledBox>
  );
};

const centerFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled(Box)`
  margin: 0;
`;

const StyledCarousel = styled(Carousel)`
  justify-content: center;
  align-items: center;
  z-index : 0;
`;

const StyledPaper = styled(Paper)`
  ${centerFlex}
`;

const BannerImage = styled.img`
  ${centerFlex}
  height : 300px;
`;

const CategoryBox = styled(Box)`
  ${centerFlex}
`;

const ImageBox = styled(Box)`
  ${centerFlex}
  flex-direction : column;
`;

const StyledAvartar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 25px 50px;
  background-color: #f5f7fb;
  border: 1px solid gray;
`;

export default MainBody;
