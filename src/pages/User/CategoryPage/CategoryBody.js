import { Grid, Typography, Box, Pagination, Tabs, Tab } from "@mui/material";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TokenAxios } from "apis/CommonAxios";
import { ProductCard } from "components/molecules/ProductCard";
import { BottomMenu } from "components/molecules/BottomMenu";
import { searchStore } from "store/store";

const CategoryBody = () => {
  // URL에 있는 값 가져오는 함수 (Router에 저장된 변수명으로 가져옴)
  const { categorySeq, subCategorySeq } = useParams();
  const [query] = useSearchParams();
  const searchPage = Number(query.get("page"));

  const [subCategoryLists, setSubCategoryLists] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(searchPage);
  const [tabValue, setTabValue] = useState(1);
  const [categoryNames] = useState([
    "패션/뷰티",
    "생활",
    "디지털/가전",
    "출산/유아동",
    "스포츠/레저",
    "카카오굿즈",
  ]); // 정적 상위 카테고리 배열
  const {setPage} = searchStore(state => state);


  const navigate = useNavigate();


  // 페이지 변환하게 하는 함수
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    if(subCategorySeq === undefined){
      navigate(`/category/${categorySeq}?page=${value}`);
    }else{
      navigate(`/category/${categorySeq}/sub/${subCategorySeq}?page=${value}`);
    }
    // 화면을 맨 위로 스크롤 이동
    window.scrollTo(0, 0);
  };

  const handleTabChange = (event) => {
    setTabValue(event.target.value);
    console.log(event.target.value);
  };

  // 하위 카테고리 목록 가져오는 api
  const getCategoryLists = async () => {
    try {
      if (categorySeq <= 6) {
        const res = await TokenAxios.get(`/api/category/${categorySeq}`);
        setSubCategoryLists(res.data.result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 상위 카테고리 페이지별 상품 가져오는 api
  const getMainProductLists = async () => {
    try {
      const res = await TokenAxios.get(
        `/api/product/category/${categorySeq}?page=${currentPage - 1}&size=12`,
      );
      console.log(res.data);
      setProductLists(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  // 하위 카테고리 페이지별 상품 가져오는 api
  const getSubProductLists = async () => {
    try {
      const res = await TokenAxios.get(
        `/api/product/category/detail/${subCategorySeq}?page=${currentPage - 1}&size=12`,
      );
      console.log(res.data);
      setProductLists(res.data.result.data.page.content);
      setTotalPages(res.data.result.data.page.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  // 처음 렌더링 될때 수행
  useEffect(() => {
    getCategoryLists();
    getMainProductLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySeq, currentPage]);

  // 현재 페이지가 바뀔 때 수행
  useEffect(() => {
    if (subCategorySeq === undefined) {
      getMainProductLists();
    } else {
      getSubProductLists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    getSubProductLists();
    setTabValue(Number(subCategorySeq));
    setPage("카테고리 검색결과")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategorySeq, currentPage]);

  useEffect(() => {
    setCurrentPage(searchPage || 1);
  },[searchPage])

  return (
    <StyledBox>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <StyleTypoGrapy
            onClick={getMainProductLists}
            sx={{ textAlign: "center", marginBottom: "2vh" }}
          >
            <StyledLink to={`/category/${categorySeq}?page=1`}>
              {categorySeq <= 6 && categoryNames[categorySeq - 1]}
            </StyledLink>
          </StyleTypoGrapy>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                marginBottom: "3vh",
                // 선택되지 않은 탭의 글자 색상
                ".MuiTab-root": { color: "gray" },
                // 선택된 탭의 글자 색상
                ".Mui-selected": { color: "black !important" },
                // 선택된 탭의 배경 색상
                ".MuiTabs-indicator": { backgroundColor: "black" },
              }}
            >
              {subCategoryLists.map((subCategory) => (
                <Tab
                  key={subCategory.categorySeq}
                  label={subCategory.name}
                  value={subCategory.categorySeq}
                  component={Link}
                  to={`/category/${categorySeq}/sub/${subCategory.categorySeq}?page=1`}
                />
              ))}
            </Tabs>
          </Box>
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
                  imageUrl={`${product.imageUrl}?w=300&h=300&f=webp`}
                  title={product.name}
                  price={product.price}
                  star={product.rating}
                  review={product.reviewAmount}
                  seq={product.productSeq}
                  state={product.state}
                  categorySeq={subCategorySeq}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <BottomMenu />
      <CenterPaginationContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default CategoryBody;
