import { Grid, Typography, Box, Pagination } from "@mui/material";
import axios from "axios";
import { ProductCard } from "components/ProductCard";
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryBody = () => {
  const [, setCategoryLists] = useState({});
  const [productLists, setProductLists] = useState([]);

  // const {} = useParams();

  const getProductLists = async () => {
    const res = await axios.get("/data/productData/categoryListProduct.json");
    console.log(res.data);
    setCategoryLists(res.data);
    setProductLists(res.data.content);
  };

  useEffect(() => {
    getProductLists();
  }, []);

  return (
    <StyledBox>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <StyleTypoGrapy sx={{textAlign : "center", marginBottom : "2vh"}}>상위 카테고리</StyleTypoGrapy>
        </Grid>
      </Grid>
      
      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <MenuList>
              <MenuItem>
                <StyledNavLink to={`/category/2`} activeStyle={{ backgroundColor: 'transparent'}}>
                    세부 카테고리 1
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/3`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 2
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/4`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 3
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/5`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 4
                </StyledNavLink>
              </MenuItem>
            </MenuList>
          </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <MenuList>
              <MenuItem>
                <StyledNavLink to={`/category/6`} activeStyle={{ backgroundColor: 'transparent'}}>
                    세부 카테고리 5
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/7`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 6
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/8`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 7
                </StyledNavLink>
              </MenuItem>
              <MenuItem>
                <StyledNavLink to={`/category/9`} activeStyle={{ backgroundColor: 'transparent'}}>
                  세부 카테고리 8
                </StyledNavLink>
              </MenuItem>
            </MenuList>
          </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      

      <Grid container spacing={1}>
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
      </Grid>

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
  margin : 0;
  padding : 0;
`;

// 메뉴 아이템 스타일
const MenuItem = styled.li`
  border: 1px solid #c2c2c2;
  list-style : none;
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
