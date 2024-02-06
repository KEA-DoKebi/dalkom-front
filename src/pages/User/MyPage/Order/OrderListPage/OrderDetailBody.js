import React, {useCallback, useEffect, useState} from "react";
import {TokenAxios} from "apis/CommonAxios";
import {Box, Button, Grid, Divider, Typography} from "@mui/material";
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { display } from "@mui/system";

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
const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  display: block;
  margin-left: 60px;
  margin-right: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderDetailBody = () => {
    const {orderSeq} = useParams();
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
            state: {orderDetailSeq: orderDetailSeq}
        });
    };

    return (
        <Box>
            <Typography sx={{ fontSize: "40px", mb: 3 }}>
                주문 상세 내역
            </Typography>
            <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>
            <Paper elevation={0}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}>
                <TableContainer style={{ maxHeight: "none", display: "flex", flexDirection: "column" }}>
                    {" "}
                    <Table sx={{ width: "100%", margin: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        width: "20%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    상품 정보
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: "16%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문일자
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: "16%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문번호
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: "16%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문금액
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: "16%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    배송상태
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: "16%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    후기작성
                                </TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderList.map((orderDetail) => (
                            <TableRow key={orderDetail.orderSeq}>
                                {/*상품 정보*/}
                                <TableCell style={{ textAlign: "center", display: "flex" }}>
                                    <ProductImg src={orderDetail.imageUrl} />
                                    <ProductInfo>
                                        <div>{`${orderDetail.productName}`}</div>
                                        <div>{`(${orderDetail.detail})`}</div>
                                    </ProductInfo>
                                </TableCell>
                                {/*주문 일자*/}
                                <TableCell style={{ textAlign: "center" }}>
                                    {orderDetail.orderDate.substring(0, 10)}
                                </TableCell>

                                {/*주문 번호*/}
                                <TableCell style={{ textAlign: "center" }}>
                                    <Typography>{`DOK${orderDetail.ordrDetailSeq.toString().padStart(5, '0')}`}
                                </Typography>
                                </TableCell>

                                {/*주문금액*/}
                                <TableCell style={{ textAlign: "center" }}>
                                    {orderDetail.totalPrice.toLocaleString()} 마일리지
                                </TableCell>

                                {/*배송상태*/}
                                <TableCell style={{ textAlign: "center" }}>
                                    {orderDetail.ordrStateName}
                                </TableCell>

                                {/*후기작성*/}
                                <TableCell style={{ textAlign: "center" }}>
                                    {orderDetail.ordrState === "주문완료" && (
                                        <CustomButton onClick={() => handleReviewButtonClick(orderDetail.ordrDetailSeq)}>
                                            리뷰 작성
                                        </CustomButton>
                                    )}
                                    {orderDetail.ordrState !== "주문완료" && (
                                        <Typography>리뷰 작성 불가</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>


                    <Table sx={{ width: "100%", margin: "auto", marginTop: "3vh", display: "flex", flexDirection: "row" }}>
                        <Table>
                        <Typography sx={{ fontSize: "30px", mb: 3, marginTop: "3vh", marginLeft: "1vw" }}>
                            배송지 정보
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3, width: '70%' }} color={"black"}/>
                        <Grid item xs={6} style={{
                            fontSize: "20px",
                            padding: "3vh 0",
                            lineHeight: "60px",
                        }}>
                            <Grid container spacing={0}>
                                <Grid item xs={1.5}/>
                                <Grid item xs={4}>
                                    <b>이름</b>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    {shipInfo.receiverName}
                                </Grid>
                                

                                <Grid item xs={1.5}/>
                                <Grid item xs={4}>
                                    <b>연락처</b>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    {shipInfo.receiverMobileNum}
                                </Grid>

                                
                                <Grid item xs={1.5}/>
                                <Grid item xs={4}>
                                    <b>배송지 주소</b>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    {shipInfo.receiverAddress}
                                </Grid>

                                <Grid item xs={1.5}/>
                                <Grid item xs={4.5}>
                                    <b>배송 요청사항</b>
                                </Grid>
                                <Grid item xs={1}>
                                <Grid item xs={5}>
                                    {shipInfo.receiverMemo}
                                </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                        </Table>

                        <Table>
                        <Typography sx={{ fontSize: "30px", mb: 3, marginTop: "3vh", marginLeft: "1vw" }}>
                            결제 정보
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3, width: '70%' }} color={"black"}/>

                        </Table>

                    </Table>
                </TableContainer>
            </Paper>

        </Box>
    );
};

export default OrderDetailBody;