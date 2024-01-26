import { Grid, Typography, Box, Pagination } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

const CategoryBody = () => {
  const [subCategoryLists, ] = useState([]);
  const [, ] = useState([]);
  const { categorySeq } = useParams();

  
  const [categoryLists] = useState([
    { categorySeq: 1, categoryName: "패션/뷰티" },
    { categorySeq: 2, categoryName: "생활" },
    { categorySeq: 3, categoryName: "디지털/가전" },
    { categorySeq: 4, categoryName: "출산/유아동" },
    { categorySeq: 5, categoryName: "스포츠/레저" },
    { categorySeq: 6, categoryName: "카카오굿즈" },
  ]);
  

  // const getCategoryLists = async () => {
  //   try{
  //     const res = await DefaultAxios.get(`/api/category/${categorySeq}`);
  //     setSubCategoryLists(res.data.result.data);
  //   }catch(e){
  //     console.log(e);
  //   }
    
  // };

  // const getProductLists = async() => {
  //   if(categorySeq < 7){
  //     const res = await TokenAxios.get(`/api/product/category/${categorySeq}?page=0&size=10`)
  //     setProductLists(res.data.result.data);
  //   }
  //   else{
  //     const res = await TokenAxios.get(`/api/product/category/detail/${categorySeq}?page=0&size=2`);
  //     setProductLists(res.data.result.data);
  //   }
  // }

  // if(categorySeq < 7){
  //   useEffect(() => {
  //     getCategoryLists();
  //     getProductLists();
  //   }, [categorySeq])
  // }
  // else{
  //   useEffect(() => {
  //     getProductLists();
  //   },[categorySeq]);
  // }
  
  return (
    <StyledBox>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <StyleTypoGrapy sx={{ textAlign: "center", marginBottom: "2vh" }}>
            {categoryLists[`${categorySeq-1}`].categoryName}
          </StyleTypoGrapy>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <MenuList>
            {subCategoryLists.map((subCategory) => (
              <MenuItem>
                <StyledNavLink
                  to={`/category/${subCategory.categorySeq}`}
                  activeStyle={{ backgroundColor: "transparent" }}
                >
                  {subCategory.name}
                </StyledNavLink>
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      {/* <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {productLists.map((product) => (
              <Grid item xs={3} key={product.productSeq}>
                <ProductCard
                  key={product.productSeq}
                  imageUrl={product.productImage}
                  title={product.productName}
                  price={product.productPrice}
                  star={product.productStar}
                  review={product.productReviewCount}
                  seq={product.productSeq}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> */}

      <CenterPaginationContainer>
        <Pagination count={10} />
      </CenterPaginationContainer>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  margin: 0;
`;

const CenterPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const StyleTypoGrapy = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

// 메뉴 리스트 스타일
const MenuList = styled.ul`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin: 0;
  padding: 0;
`;

// 메뉴 아이템 스타일
const MenuItem = styled.li`
  border: 1px solid #c2c2c2;
  list-style: none;
  text-align: center;
  flex: 1 1 auto;
`;

// NavLink 스타일
const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 20px 0;
  text-decoration: none;
  color: black;
  font-size: 16px;
  &.active {
    background-color: transparent; // 활성화됐을 때의 스타일
  }
  &:not(.active) {
    background-color: #eeeeee; // 비활성화됐을 때의 스타일
  }
`;

export default CategoryBody;
