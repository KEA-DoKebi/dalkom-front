import { Grid, Pagination } from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import { MainProductCard } from "components/molecules/MainProductCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBody = () => {
  const [query] = useSearchParams();
  const [productDataList, setProductDataList] = useState([]);

  const searchKeyword = query.get("searchKeyword");
  const searchPage = Number(query.get("page"));
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(searchPage);
  const navigate = useNavigate();

  const getSearchItems = async() => {
    try {
      const res = await TokenAxios.get(`/api/product/search/main?page=${currentPage-1}&size=12&name=${searchKeyword}`);
      console.log(res); // 비동기 작업이 완료된 후에 로그 출력
      setProductDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // 화면을 맨 위로 스크롤 이동
    window.scrollTo(0, 0);
    navigate(`/search?searchKeyword=${searchKeyword}&page=${value}`);
  };

  useEffect(() => {
    setCurrentPage(searchPage || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage, searchKeyword]);

  useEffect(() => {
    getSearchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1
          style={{ textAlign: "center" }}
        >{`${searchKeyword.split("?")[0]} 검색결과`}</h1>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Grid container spacing={3}>
          {productDataList?.map((product, idx) => (
            <Grid item xs={3} key={idx}>
              <MainProductCard
                key={idx}
                imageUrl={product.imageUrl}
                title={product.name}
                price={product.price}
                star={product.rating}
                review={product.reviewAmount}
                seq={product.productSeq}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};
