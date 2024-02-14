import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { TokenAxios } from "apis/CommonAxios";
import { MainProductCard } from "components/molecules/MainProductCard";
import { searchStore } from "store/store";

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

  const { setPage } = searchStore((state) => state);

  const getMainProductList = async () => {
    const res = await TokenAxios.get("/api/product/category/main?page=0&size=8");
    console.log(res.data);
    setProductLists(res.data);
  };

  const [categoryLists] = useState([
    {
      categorySeq: 1,
      categoryName: "패션/뷰티",
      categoryNameEng: "Fashion / Beauty",
    },
    { categorySeq: 2, categoryName: "생활", categoryNameEng: "LifeStyle" },
    { categorySeq: 3, categoryName: "디지털/가전", categoryNameEng: "Digital" },
    { categorySeq: 4, categoryName: "출산/유아동", categoryNameEng: "Kids" },
    { categorySeq: 5, categoryName: "스포츠/레저", categoryNameEng: "Sports" },
    { categorySeq: 6, categoryName: "카카오굿즈", categoryNameEng: "KaKao" },
  ]);

  useEffect(() => {
    getMainProductList();
    setPage("메인 검색결과");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledBox>
      <StyledCarousel data-cy="carousel">
        <StyledPaper sx={{ backgroundColor: "#FFF8DC" }} data-cy="carousel-item-1">
          <Link to="/cs/manual">
            <BannerImage src="/images/MainPage/dokebiBanner4.png" data-cy="banner-image-1" />
          </Link>
        </StyledPaper>

        <StyledPaper sx={{ backgroundColor: "#ffd1d2" }} data-cy="carousel-item-2">
          <Link to="/cs/manual">
            <BannerImage src="/images/MainPage/dokebiBanner5.png" data-cy="banner-image-2" />
          </Link>
        </StyledPaper>
      </StyledCarousel>

      <CategoryBox data-cy="category-box">
        {categoryLists.map((category, index) => (
          <StyledLink
            key={category.categorySeq}
            to={`/category/${category.categorySeq}?page=1`}
            data-cy={`category-link-${index}`}
          >
            <ImageBox data-cy={`category-image-box-${index}`}>
              <StyledAvartar
                src={`/images/MainPage/category${category.categorySeq}.png`}
                data-cy={`category-avatar-${index}`}
              />
              <Typography data-cy={`category-name-${index}`}>{category.categoryName}</Typography>
            </ImageBox>
          </StyledLink>
        ))}
      </CategoryBox>

      <TableContainer>
        <Table data-cy="product-table">
          <TableBody>
            {Object.entries(productLists).map(
              ([categoryKey, productList], index) => {
                const categoryInfo = categoryLists.find(
                  (c) => c.categoryName === categoryKey,
                );
                const categoryNameEng = categoryInfo
                  ? categoryInfo.categoryNameEng
                  : "";

                return (
                  <TableRow key={index} data-cy={`product-row-${index}`}>
                    <StyledTableCell data-cy={`product-cell-${index}`}>
                      <Grid container spacing={1} data-cy={`product-grid-${index}`}>
                        <Grid item xs={0.5}></Grid>
                        <CenterGrid item xs={3}>
                          <StyleTypoGrapy>
                            {categoryNameEng} <br /> {categoryKey}
                          </StyleTypoGrapy>
                        </CenterGrid>
                        <StyledGrid item xs={8}>
                          <Grid container spacing={3}>
                            {productList.map((product, idx) => (
                              <Grid item xs={3} key={product.productSeq} data-cy={`product-card-${idx+1}`}>
                                <MainProductCard 
                                  key={product.productSeq}
                                  // imageUrl={product.imageUrl.replace('d3tilqrki7dfvu.cloudfront.net', 'dalkom-image.s3.ap-northeast-2.amazonaws.com')} // S3
                                  // imageUrl={product.imageUrl} // 그냥 CDN
                                  imageUrl={`${product.imageUrl}?w=300&h=300&f=webp`} // 포맷팅
                                  title={product.name}
                                  price={Number(product.price).toLocaleString()}
                                  star={product.rating}
                                  review={product.reviewAmount}
                                  seq={product.productSeq}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </StyledGrid>
                      </Grid>
                    </StyledTableCell>
                  </TableRow>
                );
              },
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
  margin-top: -5vh;
`;

const StyledPaper = styled(Paper)`
  ${centerFlex}
  box-shadow: none;

`;

const BannerImage = styled.img`
  ${centerFlex}
  height : 400px;
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
  border-radius: 30px;
  //border: 1px solid gray;

  & img {
    width: 60%;
    height: 60%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: black; // 호버 상태에서도 색상 유지
  }
`;

const StyledGrid = styled(Grid)`
  padding: 15px;
  //border: 1px solid black;
`;

const CenterGrid = styled(Grid)`
  ${centerFlex}
  align-items: flex-start;
  //border : 1px solid black;
`;

const StyleTypoGrapy = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const StyledTableCell = styled(TableCell)({
  paddingTop: "4vh",
  paddingBottom: "2vh",
});

export default MainBody;

