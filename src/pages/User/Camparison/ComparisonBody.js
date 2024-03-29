import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Select, MenuItem, Grid } from "@mui/material";
import "assets/font/font.css";
import { TokenAxios } from "apis/CommonAxios";
import { productImageStore } from "store/store";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { ProductReview } from "components/molecules/ProductReview";

export const ComparisonBody = () => {
  const { seqList } = productImageStore((state) => state);
  // 카테고리 페이지에서 넘어온 정보를 받아옵니다.
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductSeqList, setSelectedProductSeqList] = useState(seqList);
  const [firstProductReview, setFirstProductReview] = useState();
  const [secondProductReview, setSecondProductReview] = useState();
  const [thridProductReview, setThridProductReview] = useState();
  const [subCategoryProductList, setSubCategoryProductList] = useState([]);

  const { subCategorySeq } = useParams();

  const getCategoryProductLists = async () => {
    try {
      const res = await TokenAxios.get(
        `/api/product/category/detail/${subCategorySeq}?page=0&size=50`,
      );
      setSubCategoryProductList(res.data.result.data.page.content);
      setSelectedCategory(res.data.result.data.categoryName);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductReview = async (productSeq, index) => {
    try {
      const res = await TokenAxios.get(`/api/product/compare/${productSeq}`);
      console.log(res.data.result.data);

      if (index === 0) {
        setFirstProductReview(res.data.result.data);
      } else if (index === 1) {
        setSecondProductReview(res.data.result.data);
      } else if (index === 2) {
        setThridProductReview(res.data.result.data);
      } else {
        console.log("없는 인덱스 입니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectChange = (event, index) => {
    console.log(event.target.value);
    getProductReview(event.target.value, index);
    // 현재 배열을 복사한다.
    const arr = [...selectedProductSeqList];
    // 특정 인덱스의 값을 업데이트한다.
    arr[index] = event.target.value;
    // 변경된 배열로 상태를 업데이트한다.
    setSelectedProductSeqList(arr);
    // splice를 쓸수 없는 이유는 배열을 직접 변경하므로 React의 상태 업데이트에는 어울리지 않는다.
  };

  useEffect(() => {
    if (selectedProductSeqList.length !== 0) {
      getProductReview(selectedProductSeqList[0], 0);
      getProductReview(selectedProductSeqList[1], 1);
      getProductReview(selectedProductSeqList[2], 2);
    }
    getCategoryProductLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategorySeq]);

  return (
    <Paper elevation={0} sx={{ padding: 2 }} data-cy="comparison-body">
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: 5,
          fontFamily: "hyundai",
          fontSize: "30px",
          fontWeight: "900",
        }}
        data-cy="comparison-title"
      >
        {selectedCategory} 상품 비교하기
      </Typography>
      <Grid container>
        <Grid item xs={2} ></Grid>
        <Grid item xs={2} data-cy="select-box-1">
          <SelectBox>
            <Select
              value={selectedProductSeqList[0]}
              onChange={(e) => handleSelectChange(e, 0)}
              sx={{ width: "15vw", marginBottom: "3vh" }}
              data-cy="product-select-1"
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  data-cy={`product-option-1-${product.productSeq}`}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </SelectBox>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} data-cy="select-box-2">
          <SelectBox>
            <Select
              value={selectedProductSeqList[1]}
              onChange={(e) => handleSelectChange(e, 1)}
              sx={{ width: "15vw", marginBottom: "3vh" }}
              data-cy="product-select-2"
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  data-cy={`product-option-2-${product.productSeq}`}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </SelectBox>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} data-cy="select-box-3">
          <SelectBox>
            <Select
              value={selectedProductSeqList[2]}
              onChange={(e) => handleSelectChange(e, 2)}
              sx={{ width: "15vw", marginBottom: "3vh" }}
              data-cy="product-select-3"
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  data-cy={`product-option-3-${product.productSeq}`}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </SelectBox>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <ProductReview info={firstProductReview} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <ProductReview info={secondProductReview} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <ProductReview info={thridProductReview} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Paper>
  );
};

const SelectBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 2vw;
  margin-left: 2vw;
  //min-height: 100vh;
`;
