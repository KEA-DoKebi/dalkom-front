import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProductCard } from "components/ProductCard";

// MainBody코드
const MainBody = () => {
  const [clothesProductList, setClothesProductList] = useState([]);
  const [lifesProductList, setLifesProductList] = useState([]);
  const [digitalProductList, setDigitalProductList] = useState([]);
  const [babyProductList, setBabyProductList] = useState([]);
  const [sportsProductList, setSportsProductList] = useState([]);
  const [kakaofriendsProductList, setKakaofriendsProductList] = useState([]);

  const getMainProductList = async () => {
    const res = await axios.get("/data/productData/mainPageProduct.json");
    // console.log(res.data);
    // setMainProductList(res.data);
    setClothesProductList(res.data.clothes);
    setLifesProductList(res.data.life);
    setDigitalProductList(res.data.digital);
    setBabyProductList(res.data.baby);
    setSportsProductList(res.data.sports);
    setKakaofriendsProductList(res.data.kakaofriends);
  };

  useEffect(() => {
    getMainProductList();
  }, []);

  return (
    <StyledBox>
      {/* 배너 */}
      <Divider />
      <StyledCarousel>
        <StyledPaper sx={{ backgroundColor: "#FFF8DC" }}>
          <Link to="/category/1">
            <BannerImage src="/images/MainPage/dokebiBanner1.png" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#FEE300" }}>
          <Link to="/category/1">
            <BannerImage src="/images/MainPage/dokebiBanner2.png" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#494881" }}>
          <Link to="/category/1">
            <BannerImage src="/images/MainPage/dokebiBanner3.png" />
          </Link>
        </StyledPaper>
      </StyledCarousel>

      {/* 카테고리 목록  */}
      <CategoryBox>
        <Link to="/catagory/fashion">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/hanger.png" />
            <Typography>패션/뷰티</Typography>
          </ImageBox>
        </Link>
        <Link to="/catagory/life">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/life.png" />
            <Typography>생활</Typography>
          </ImageBox>
        </Link>
        <Link to="/catagory/digital">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/digital.png" />
            <Typography>디지털/가전</Typography>
          </ImageBox>
        </Link>
        <Link to="/catagory/baby">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/baby.png" />
            <Typography>출산/유아동</Typography>
          </ImageBox>
        </Link>
        <Link to="/catagory/sports">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/sports.png" />
            <Typography>스포츠/레저</Typography>
          </ImageBox>
        </Link>
        <Link to="/catagory/kakaofriends">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/chunsik2.png" />
            <Typography>카카오굿즈</Typography>
          </ImageBox>
        </Link>
      </CategoryBox>

      {/* 카테고리별 상품 목록 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ display: "flex", justifyContent: "center" }}>
              <TableCell sx={{ fontSize: "30px", fontStyle: "bold" }}>
                상품 목록
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>의류</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {clothesProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>생활</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {lifesProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>디지털</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {digitalProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>유아</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {babyProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>스포츠</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {sportsProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
            <TableRow>
              <Grid container spacing={1}>
                <CenterGrid item xs={3}>
                  <StyleTypoGrapy>카카오프렌즈</StyleTypoGrapy>
                </CenterGrid>
                <Grid item xs={9}>
                  <Grid container spacing={3} mt={5}>
                    {kakaofriendsProductList.map((v) => {
                      return (
                        <Grid item xs={3} key={v.productNum}>
                          <ProductCard
                            imageUrl={v.imageUrl}
                            title={v.productName}
                            price={v.productPrice}
                            star={v.productStar}
                            review={v.productReview}
                            seq={v.productSeq}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
  z-index: 0;
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
  margin-bottom : 10vh;
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

const CenterGrid = styled(Grid)`
  ${centerFlex}
`;

const StyleTypoGrapy = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

export default MainBody;
