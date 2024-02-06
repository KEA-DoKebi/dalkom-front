import React, {useCallback, useEffect, useState} from "react";
import {TokenAxios} from "apis/CommonAxios";
import {Box, Button, Grid, Divider, Typography} from "@mui/material";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";

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
`;

const OrderDetailBody = () => {
    const {orderSeq} = useParams();
    const [orderList, setOrderList] = useState([]);
    const [shipInfo, setShipInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [orderDate, setOrderDate] = useState('');


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
            setOrderDate(res.data.result.data.orderDetailList[0].orderDate);
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
            <Typography sx={{fontSize: "40px", mb: 3}}>
                주문 상세 내역
            </Typography>
            <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

            <Grid container spacing={0}>
                <Grid item xs={0}></Grid>
                <Grid item xs={12}>
                    <table
                        style={{
                            border: "1px solid gray",
                            borderRadius: "20px",
                            borderCollapse: "collapse",
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <thead>
                        <tr style={{height: '50px', borderBottom: '1px solid black'}}>
                            <td style={{width: "30%", textAlign: "center"}}>
                                상품 정보
                            </td>
                            <td style={{width: "10%", textAlign: "center"}}>
                                수량
                            </td>
                            <td style={{width: "20%", textAlign: "center"}}>
                                상품 금액
                            </td>
                            <td style={{width: "20%", textAlign: "center"}}>
                                배송 상태
                            </td>
                            <td style={{width: "20%", textAlign: "center"}}>
                                후기 작성
                            </td>
                        </tr>
                        </thead>
                        <tbody>

                            {orderList.map((orderDetail) => (
                                <>
                                    <tr style={{padding: '20px'}}>
                                        <td style={{padding: "15px", display: "flex", alignItems: "center", justifyContent: "left"}}>
                                            <ProductImg src={orderDetail.imageUrl}/>
                                            <ProductInfo>
                                                <div>{`${orderDetail.productName} (${orderDetail.detail})`}</div>
                                            </ProductInfo>
                                        </td>
                                        <td style={{textAlign: "center", padding: "15px"}}>
                                            <Typography>{orderDetail.amount}</Typography>
                                        </td>
                                        <td style={{textAlign: "center" , padding: "15px"}}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center", // Flex 아이템을 가운데 정렬
                                                    width: "100%", // Typography를 td의 너비에 맞춤
                                                }}
                                            >
                                                <img
                                                    src="/images/M-1.png"
                                                    alt="마일리지"
                                                    style={{width: "20px", height: "20px", marginRight: "5px"}}
                                                />
                                                {orderDetail.totalPrice.toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td style={{textAlign: "center" , padding: "15px"}}>
                                            <Typography>{orderDetail.ordrStateName}</Typography>
                                        </td>
                                        <td style={{textAlign: "center" , padding: "15px"}}>
                                            {orderDetail.ordrState === "주문완료" && (
                                                <CustomButton
                                                    onClick={() => handleReviewButtonClick(orderDetail.ordrDetailSeq)}>
                                                    리뷰 작성
                                                </CustomButton>
                                            )}
                                            {orderDetail.ordrState !== "주문완료" && (
                                                <Typography>-</Typography>
                                            )}
                                        </td>
                                    </tr>

                                </>
                            ))}
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={0}></Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid item xs={0}></Grid>
                <Grid item xs={12}>
                    <Typography sx={{fontSize: "30px", marginTop: '50px', borderBottom: '2px solid black'}}>
                        배송지 정보
                    </Typography>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <thead>
                        <tr>
                            <td style={{width: "20%"}}></td>
                            <td style={{width: "80%"}}></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{padding: "10px"}}>
                                수신자
                            </td>
                            <td style={{padding: "10px"}}>
                                {shipInfo.receiverName}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                연락처
                            </td>
                            <td style={{padding: "10px"}}>
                                {shipInfo.receiverMobileNum}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                배송지주소
                            </td>
                            <td style={{padding: "10px"}}>
                                {shipInfo.receiverAddress}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                배송 요청사항
                            </td>
                            <td style={{padding: "10px"}}>
                                {shipInfo.receiverMemo}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={0}></Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={0}></Grid>
                <Grid item xs={12}>
                    <Typography sx={{fontSize: "30px", marginTop: '50px', borderBottom: '2px solid black'}}>
                    주문 정보
                    </Typography>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <thead>
                        <tr>
                            <td style={{width: "20%"}}></td>
                            <td style={{width: "80%"}}></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{padding: "10px"}}>
                                주문번호
                            </td>
                            <td style={{padding: "10px"}}>
                                {`DKS-${orderSeq.toString().padStart(5, '0')}`}
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                주문일자
                            </td>
                            <td style={{padding: "10px"}}>
                                <Typography>
                                    {orderDate.substring(0, 10)}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                배송비
                            </td>
                            <td style={{padding: "10px"}}>
                                무료
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>
                                최종결제 마일리지
                            </td>
                            <td style={{padding: "10px"}}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%", // Typography를 td의 너비에 맞춤
                                    }}
                                >
                                    <img
                                        src="/images/M-1.png"
                                        alt="마일리지"
                                        style={{width: "20px", height: "20px", marginRight: "5px"}}
                                    />
                                    {totalPrice.toLocaleString()}
                                </Typography>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={0}></Grid>
            </Grid>


        </Box>
    );
};

export default OrderDetailBody;


const CustomButton = styled(Button)`
    background-color: gray;
    color: white;
    height: 32px;
    &:hover {
        background-color: black;
    }
`
