import { Grid, Pagination } from '@mui/material';
import { TokenAxios } from 'apis/CommonAxios';
import { MainProductCard } from 'components/molecules/MainProductCard';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';


export const SearchBody = () => {

  const [query] = useSearchParams();
  const [productDataList, setProductDataList]= useState([]);
  
  const searchKeyword = query.get("searchKeyword");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getSearchItems = async() => {
    const res = await TokenAxios.get(`/api/product/search?page=${currentPage-1}&size=12&name=${searchKeyword}`)
    console.log(res.data);
    setProductDataList(res.data.result.data.content);
    setTotalPages(res.data.result.data.totalPages)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // 화면을 맨 위로 스크롤 이동
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getSearchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage])

  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <h1 style={{textAlign : "center"}}>{`${searchKeyword} 검색결과`}</h1>
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
        <Grid item xs={12} style={{display : "flex", justifyContent : "center"}}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
        </Grid>
    </Grid>
  )
}
