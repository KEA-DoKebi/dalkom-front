import React, { useState, useEffect , useCallback} from "react";
import { TokenAxios } from "apis/CommonAxios";
import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;

`;

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

  const location = useLocation();
  const orderSeq = location.state?.orderSeq;
  const [orderList, setOrderList] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

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


  return (
    <Box style={{ marginTop: "5%" }}>
      <Typography variant="h3" gutterBottom>
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
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2.5} style={{ textAlign: "center" }}>
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
                  <Typography style={{ fontWeight: "bold" }}>
                    주문번호
                  </Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    수량
                  </Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    주문금액
                  </Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center", paddingLeft: "10px" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    배송상태
                  </Typography>
                </Grid>

                <Grid item xs={1.5} style={{ textAlign: "center", paddingLeft: "10px" }}>
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



            <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '5px' }}>
              {orderList.map((orderDetail) => (
                <>
                  <Grid item xs={2.5} style={{ textAlign: "center", height: "5vh" }}>
                    <Typography>
                      <ProductDiv>
                        <ProductImg src={orderDetail.imageUrl} />
                        <ProductInfo>
                          <div>{orderDetail.productName}</div>
                          <div>{orderDetail.optionSeq}</div>
                        </ProductInfo>
                      </ProductDiv>

                      {/* 
                    {orderDetail.productName}
                    {orderDetail.optionSeq} */}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <Typography>{orderDetail.orderDate.substring(0, 10)}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <Typography>{orderDetail.ordrDetailSeq}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <Typography>{orderDetail.amount}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <Typography>{orderDetail.totalPrice}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center", paddingLeft: "10px" }}>
                    <Typography>{orderDetail.ordrState}</Typography>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center", paddingLeft: "10px" }}>
                    <Link to={`/mypage/review/write/${orderDetail.ordrDetailSeq}`} state={{ orderDetailSeq: orderDetail.ordrDetailSeq }}>
                    리뷰작성
                    </Link>
                  </Grid>
                </>
              ))}
            </Grid>
          </tr>
        </tbody>
        <tfoot>
          <tr>

            <Grid container spacing={2} justifyContent="space-between">
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  borderBottom: "2px solid black",
                  borderTop: "2px solid black",
                  marginLeft: "1.4%",
                  marginTop: "3%",
                }}
              >
                <h3>배송지정보</h3>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>이름</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{shipInfo.receiverName}</Typography>
              </Grid>

              <Grid item xs={7.5}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>연락처</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{shipInfo.receiverMobileNum}</Typography>
              </Grid>

              <Grid item xs={7.5}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>배송지 주소</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{shipInfo.receiverAddress}</Typography>
              </Grid>

              <Grid item xs={7.5}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>배송 요청사항</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{shipInfo.receiverMemo}</Typography>
              </Grid>

              <Grid item xs={6.5}></Grid>
            </Grid>
          </tr>
          <tr>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  borderBottom: "2px solid black",
                  marginLeft: "1.4%",
                  marginTop: "1%",
                }}
              >
                <h3>주문 정보</h3>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1.5}>
                <Typography>상품 합계</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{totalPrice} 마일리지</Typography>
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
                <Typography>{totalPrice} 마일리지</Typography>
              </Grid>

              <Grid item xs={6.5}></Grid>

              <Grid item xs={8}></Grid>
            </Grid>
          </tr>
        </tfoot>
      </table>

      {/* Add your order information here */}
    </Box>
  );
};

export default OrderDetailBody;
