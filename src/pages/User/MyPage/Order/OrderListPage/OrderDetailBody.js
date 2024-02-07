import React, {useCallback, useEffect, useState} from "react";
import {TokenAxios} from "apis/CommonAxios";
import {
    Box,
    Button,
    Grid,
    Divider,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableContainer
} from "@mui/material";
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
            <Divider sx={{ borderBottomWidth: 3 }} color={"black"}/>

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
                                            <div>
                                                {orderDetail.productName} {orderDetail.detail !== 'default' && `(${orderDetail.detail})`}
                                            </div>
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
                                        {/* 주문 상태가 '구매확정(15)'인 경우만 리뷰 작성 가능 */}
                                        {orderDetail.ordrState === "15" && (
                                            <CustomButton
                                                onClick={() => handleReviewButtonClick(orderDetail.ordrDetailSeq)}>
                                                리뷰 작성
                                            </CustomButton>
                                        )}
                                        {orderDetail.ordrState !== "15" && (
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
                    <Typography sx={{fontSize: "30px", marginTop: '50px'}}>
                        배송지 정보
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 3 }} color={"black"}/>

                    <TableContainer style={{ maxHeight: "none" }}>
                        <Table sx={{ width: "100%", margin: "auto" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        수신인
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        <Typography>
                                            {shipInfo.receiverName}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        연락처
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        <Typography>
                                            {shipInfo.receiverMobileNum}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        배송지 주소
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        <Typography>
                                            {shipInfo.receiverAddress}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        배송 요청사항
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        <Typography>
                                            {shipInfo.receiverMemo}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={0}></Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={0}></Grid>
                <Grid item xs={12}>
                    <Typography sx={{fontSize: "30px", marginTop: '50px'}}>
                        주문 정보
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 3 }} color={"black"}/>
                    <TableContainer style={{ maxHeight: "none" }}>
                        <Table sx={{ width: "100%", margin: "auto" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        주문번호
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        {`DKS-${orderSeq.toString().padStart(5, '0')}`}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        주문일자
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        <Typography>
                                            {orderDate.substring(0, 10)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        배송비
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
                                        무료
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: "20%", textAlign: "left", fontWeight: "bold", fontSize: "15px"}}>
                                        최종결제 마일리지
                                    </TableCell>
                                    <TableCell style={{width: "80%", textAlign: "left"}}>
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
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={0}></Grid>
            </Grid>


        </Box>
    );
};

export default OrderDetailBody;


const CustomButton = styled(Button)`
    background-color: black;
    color: white;
    height: 32px;
    &:hover {
        background-color: gray;
    }
`

