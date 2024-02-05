import React, { useState, useEffect, useCallback } from "react";
import { TokenAxios } from "apis/CommonAxios";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Typography
} from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


const ProductImg = styled.img`
width:50px;
height 50px;
object-fit: cover;
display: block;
margin-left: 60px;
margin-right : 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderDetailBody = () => {
  const { orderSeq } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const navigate = useNavigate();

  const loadOrderDetail = useCallback(async () => {
    try {
      // orderSeq가 정의되어 있는지 확인
      if (!orderSeq) {
        // orderSeq가 정의되지 않은 경우 처리 (예: 에러 페이지로 리다이렉트)
        console.error("OrderSeq가 정의되지 않았습니다");
        return;
      }

      const res = await TokenAxios.get(`/api/order/${orderSeq}`);
      console.log(res.data.result.data);

      setTotalPrice(res.data.result.data.totalPrice);
      setOrderList(res.data.result.data.orderDetailList);
      setShipInfo(res.data.result.data.receiverDetail);
    } catch (e) {
      console.error(e);
      // 에러 처리 (예: 에러 페이지로 리다이렉트)
    }
  }, [orderSeq]);
  useEffect(() => {
    const fetchData = async () => {
      await loadOrderDetail();
    };
    fetchData();
  }, [orderSeq, loadOrderDetail]);

  const handleReviewButtonClick = (orderDetailSeq) => {
    navigate(`/mypage/review/write/${orderDetailSeq}`, {
      state: { orderDetailSeq: orderDetailSeq }
    });
  };

  return (
    <Box>
      <Typography sx={{fontSize: "40px",}}>
        주문 상세 내역
      </Typography>
      <table
        style={{
          marginTop: "2%",
          paddingRight: "10%",
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
          height: "auto",
        }}
      >
        <thead>
          <tr>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              <Grid container spacing={0}>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    상품 정보
                  </Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    주문일자
                  </Typography>
                </Grid>


                <Grid item xs={1.5} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>수량</Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    주문금액
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={1.5}
                  style={{ textAlign: "center", paddingLeft: "10px" }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    배송상태
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={1.5}
                  style={{ textAlign: "center", paddingLeft: "10px" }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                   후기작성
                  </Typography>
                </Grid>
              </Grid>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Grid
              container
              spacing={0}
              style={{ display : "flex", alignItems : "center", marginTop : "2vh" }}
            >
              {orderList.map((orderDetail) => (
                <>
                  <Grid
                    item
                    xs={4}
                    sx={{display : "flex", alignItems : "center", margin : "0.3vh 0"}}
                  >   
                    <ProductImg src={orderDetail.imageUrl} />
                    <ProductInfo>
                      <div>{`${orderDetail.productName} (${orderDetail.detail})`}</div>
                    </ProductInfo>

                      {/* 
                    {orderDetail.productName}
                    {orderDetail.optionSeq} */}
                    
                  </Grid>
                  <Grid item xs={1.5} style={{ display : "flex", alignItems : "center", justifyContent : "center" }}>
                    <Typography>
                      {orderDetail.orderDate.substring(0, 10)}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ display : "flex", alignItems : "center", justifyContent : "center" }}>
                    <Typography>{orderDetail.amount}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ display : "flex", justifyContent : "center" }}>
                  <div>
                    <Typography
                        variant="body1"
                        sx={{
                          display : "flex",
                          alignItems : "center",
                        }}
                      >
                        <img
                          src="/images/M-1.png"
                          alt="마일리지"
                          style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        />
                        {orderDetail.totalPrice.toLocaleString()}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={1.5}
                    style={{ display : "flex", alignItems : "center", justifyContent : "center" }}
                  >
                    <Typography>{orderDetail.ordrStateName}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center", paddingLeft: "10px" }}>
                    <CustomButton onClick={() => handleReviewButtonClick(orderDetail.ordrDetailSeq)}>
                      리뷰 작성
                    </CustomButton>
                    {/* <Link to={`/mypage/review/write/${orderDetail.ordrDetailSeq}`} state={{ orderDetailSeq: orderDetail.ordrDetailSeq }}>
                    리뷰작성
                    </Link> */}
                  </Grid>
                </>
              ))}
            </Grid>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <Grid container spacing={0}>
              <Grid item xs={6} >
                <StyledH3 style={{borderRight : "1px solid black"}} >배송지정보</StyledH3>
              </Grid>
              <Grid item xs={6} style={{margin : 0}}>
                <StyledH3>주문 정보</StyledH3>
              </Grid>
              <Grid item xs={6} style={{fontSize : "20px", padding : "3vh 0", lineHeight : "60px", borderRight : "1px solid black"}}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>이름</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    {shipInfo.receiverName}
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>연락처</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    {shipInfo.receiverMobileNum}
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>배송지 주소</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    {shipInfo.receiverAddress}
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>배송 요청사항</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    {shipInfo.receiverMemo}
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} style={{fontSize : "20px", padding : "3vh 0", lineHeight : "60px"}}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>주문번호</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    {orderSeq}
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>상품합계</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    
                    <Typography
                        variant="body1"
                        sx={{
                          display : "flex",
                          alignItems : "center",
                          marginTop : "1.15vh",
                          fontSize : "20px"
                        }}
                      >
                        <img
                          src="/images/M-1.png"
                          alt="마일리지"
                          style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        />
                        {totalPrice.toLocaleString()}
                      </Typography>
                    
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>배송비합계</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                    배송비 무료
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                  <Grid item xs={2}>
                    <b>최종결제금액</b>
                  </Grid>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={3}>
                  <div>
                    <Typography
                        variant="body1"
                        sx={{
                          display : "flex",
                          alignItems : "center",
                          marginTop : "1.15vh",
                          fontSize : "20px"
                        }}
                      >
                        <img
                          src="/images/M-1.png"
                          alt="마일리지"
                          style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        />
                        {totalPrice.toLocaleString()}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3}>

                  </Grid>
                </Grid>
                
              </Grid>
            </Grid>
          </tr>
          {/* <tr>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid
                item
                xs={12}
              >
                <StyledH3>주문 정보</StyledH3>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>상품 합계</Typography>
              </Grid>
              <Grid item xs={3}>
              <div>
                    <Typography
                        variant="body1"
                        sx={{
                          display : "flex",
                          alignItems : "center",
                        }}
                      >
                        <img
                          src="/images/M-1.png"
                          alt="마일리지"
                          style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        />
                        {totalPrice.toLocaleString()}
                      </Typography>
                    </div>
              </Grid>

              <Grid item xs={6.5}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>배송비 합계</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>배송비 무료</Typography>
              </Grid>

              <Grid item xs={6.5}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>최종 결제 금액</Typography>
              </Grid>
              <Grid item xs={3}>
              <div>
                    <Typography
                        variant="body1"
                        sx={{
                          display : "flex",
                          alignItems : "center",
                        }}
                      >
                        <img
                          src="/images/M-1.png"
                          alt="마일리지"
                          style={{ width: "20px", height: "20px", marginRight: "5px" }}
                        />
                        {totalPrice.toLocaleString()}
                      </Typography>
                    </div>
                <Typography>{totalPrice} 마일리지</Typography>
              </Grid>

              <Grid item xs={6.5}></Grid>

              <Grid item xs={8}></Grid>
            </Grid>
          </tr> */}
        </tfoot>
      </table>
      <div style={{display : "flex", justifyContent : "center", marginTop : "2vh"}}>
      <Pagination count={10} page={1}/>
      </div>
      {/* Add your order information here */}
    </Box>
  );
};

export default OrderDetailBody;


const CustomButton = styled(Button)`
  background-color : black;
  color : white;
  height : 32px;
`

const StyledH3 = styled.h3`
  border-top : 1px solid black;
  border-bottom : 1px solid black;
  padding : 2vh 0;
  text-align : center;
`