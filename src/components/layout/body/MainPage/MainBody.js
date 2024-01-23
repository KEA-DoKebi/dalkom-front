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
  const [productLists, setProductLists] = useState({
    clothes: [],
    life: [],
    digital: [],
    baby: [],
    sports: [],
    kakaofriends: [],
  });

  const getMainProductList = async () => {
    const res = await axios.get("/data/productData/mainPageProduct.json");
    setProductLists(res.data);
  };

  useEffect(() => {
    getMainProductList();
  }, []);

  return (
    <StyledBox>
      <Divider />
      <StyledCarousel>
        <StyledPaper sx={{ backgroundColor: "#FFF8DC" }}>
          <Link to="/cs/manual">
            <BannerImage src="/images/MainPage/dokebiBanner1.png" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#FEE300" }}>
          <Link to="/cs/manual">
            <BannerImage src="/images/MainPage/dokebiBanner2.png" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#494881" }}>
          <Link to="/cs/manual">
            <BannerImage src="/images/MainPage/dokebiBanner3.png" />
          </Link>
        </StyledPaper>
      </StyledCarousel>

      <CategoryBox>
        <StyledLink to="/catagory/fashion">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/hanger.png" />
            <Typography>패션/뷰티</Typography>
          </ImageBox>
        </StyledLink>
        <StyledLink to="/catagory/life">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/life.png" />
            <Typography>생활</Typography>
          </ImageBox>
        </StyledLink>
        <StyledLink to="/catagory/digital">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/digital.png" />
            <Typography>디지털/가전</Typography>
          </ImageBox>
        </StyledLink>
        <StyledLink to="/catagory/baby">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/baby.png" />
            <Typography>출산/유아동</Typography>
          </ImageBox>
        </StyledLink>
        <StyledLink to="/catagory/sports">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/sports.png" />
            <Typography>스포츠/레저</Typography>
          </ImageBox>
        </StyledLink>
        <StyledLink to="/catagory/kakaofriends">
          <ImageBox>
            <StyledAvartar src="/images/MainPage/kakaofriends.png" />
            <Typography>카카오굿즈</Typography>
          </ImageBox>
        </StyledLink>
      </CategoryBox>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ display: "flex", justifyContent: "center" }}>
              <TableCell align="center">상품목록</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(productLists).map(
              ([category, productList], index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Grid container spacing={1}>
                      <CenterGrid item xs={3}>
                        <StyleTypoGrapy>{category}</StyleTypoGrapy>
                      </CenterGrid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          {productList.map((product) => (
                            <Grid item xs={3} key={product.productSeq}>
                              <ProductCard
                                key={product.productSeq}
                                imageUrl={product.imageUrl}
                                title={product.productName}
                                price={product.productPrice}
                                star={product.productStar}
                                review={product.productReview}
                                seq={product.productSeq}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ),
            )}
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: black; // 호버 상태에서도 색상 유지
  }
`;

const CenterGrid = styled(Grid)`
  ${centerFlex}
`;

const StyleTypoGrapy = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

export default MainBody;
