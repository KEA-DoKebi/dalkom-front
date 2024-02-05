import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {
    Box,
    Divider,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Select, {selectClasses} from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {TokenAxios} from "apis/CommonAxios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const mapOrderState = (stateCode) => {
    switch (stateCode) {
        case "11":
            return "주문확인";
        case "12":
            return "배송준비";
        case "13":
            return "배송시작";
        case "14":
            return "배송완료";
        case "15":
            return "구매확정";
        case "21":
            return "주문취소";
        case "31":
            return "반품접수";
        case "32":
            return "반송시작";
        case "33":
            return "반송완료";
        case "34":
            return "반품완료";
        case "41":
            return "환불";
        default:
            return "";
    }
};

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  //max-height: auto;
  overflow-y: auto; // 항목이 4개를 초과하면 스크롤 생성
`;

const StyledTableRow = styled(TableRow)`
  height: 110px; // 원하는 행의 높이로 설정
`;

export default function OrderListBody() {
    const [order, setOrder] = useState([]);
    const [filterPeriod, setFilterPeriod] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    
    const orderList = useCallback(async (page) => {
        try {
            const res = await TokenAxios.get(`/api/order/user?page=${page}&size=6`);
            console.log(res);
            const allOrders = res.data.result.data.content;
            setTotalPages(res.data.result.data.totalPages);

            const filteredOrders =
                filterPeriod === "all"
                    ? allOrders
                    : allOrders.filter((order) =>
                        isWithinPeriod(order.ordrDate, filterPeriod),
                    );

            setOrder(filteredOrders);
        } catch (e) {
            console.error("Error fetching order list:", e);
        }
    }, [filterPeriod]);

    useEffect(() => {
        orderList(currentPage);
    }, [filterPeriod, orderList, currentPage]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    const isWithinPeriod = (orderDate, period) => {
        // orderDate와 period 형식에 따라 적절한 체크 로직 작성
        // 예: 주문일자가 period 이후이고, (orderDate > period) 일 경우 true 반환
        // 아래는 예시 코드이며, 실제 체크 로직에 맞게 수정
        const orderDateObject = new Date(orderDate);
        const today = new Date();

        switch (period) {
            case "1month":
                return (
                    today.getMonth() === orderDateObject.getMonth() &&
                    today.getFullYear() === orderDateObject.getFullYear()
                );
            case "3months":
                // 예시: 3개월 이내 주문일자
                return (
                    today >= orderDateObject &&
                    today.getMonth() - orderDateObject.getMonth() <= 3 &&
                    today.getFullYear() === orderDateObject.getFullYear()
                );
            case "6months":
                // 예시: 6개월 이내 주문일자
                return (
                    today >= orderDateObject &&
                    today.getMonth() - orderDateObject.getMonth() <= 6 &&
                    today.getFullYear() === orderDateObject.getFullYear()
                );
            default:
                return false;
        }
    };

    // 주문 상세 아이콘을 누르면 Link를 사용하지 않고 URL에 파라미터를 담고 이동하도록 수정
    const handleOrderDetailOpen = async (ordrSeq) => {
        window.location.href = `/order-detail/${ordrSeq}?orderSeq=${ordrSeq}`;
    };

    return (
        <Paper elevation={0}>
            <Typography sx={{fontSize: "40px",}}>
                주문 목록 / 배송 조회
            </Typography>
            <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

            <Paper elevation={0}>
                <Select
                    placeholder="전체"
                    indicator={<KeyboardArrowDown/>}
                    sx={{
                        width: 150,
                        margin: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #E3E3E3",
                        [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                                transform: "rotate(-180deg)",
                            },
                        },
                    }}
                >
                    <Option value="all" onClick={() => setFilterPeriod("all")}>
                        전체
                    </Option>
                    <Option value="1month" onClick={() => setFilterPeriod("1month")}>
                        1달
                    </Option>
                    <Option value="3months" onClick={() => setFilterPeriod("3months")}>
                        3개월
                    </Option>
                    <Option value="6months" onClick={() => setFilterPeriod("6months")}>
                        6개월
                    </Option>
                </Select>
            </Paper>

            <Paper
                elevation={0}
                style={{display: "flex", width: "100%"}}
            >
                <TableContainer>
                    <Table
                        sx={{
                            border: "1px solid",
                            borderColor: "#e0e0e0",
                            borderRadius: "4px",
                            width: "auto",
                            height: "100%",
                            margin: "10px",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문정보
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문일자
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문번호
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    금액
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    상태
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                    }}
                                >
                                    주문 상세
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {order.map((order) => (
                                <StyledTableRow key={order.orderSeq}>
                                    {/*주문 정보*/}
                                    <TableCell style={{textAlign: "center"}}>
                                        {order.orderTitle}
                                    </TableCell>

                                    {/*주문 일자*/}
                                    <TableCell style={{textAlign: "center"}}>
                                        {order.ordrDate.substring(0, 10)}
                                    </TableCell>

                                    {/*주문 번호*/}
                                    <TableCell style={{textAlign: "center"}}>
                                            {order.ordrSeq}
                                    </TableCell>

                                    {/*금액*/}
                                    <TableCell style={{textAlign: "center"}}>
                                        {order.totalPrice}
                                    </TableCell>

                                    {/*상태*/}
                                    <TableCell style={{textAlign: "center"}}>
                                        {mapOrderState(order.ordrState)}
                                    </TableCell>

                                    {/*주문 상세*/}
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => handleOrderDetailOpen(order.ordrSeq)}>
                                                <InfoOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2.5%"
                }}
            >
                <Pagination
                    count={totalPages} // 총 페이지 수를 적용
                    page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                    onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                />
            </Box>
        </Paper>
    );
}
