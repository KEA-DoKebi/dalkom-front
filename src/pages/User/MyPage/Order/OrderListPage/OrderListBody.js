import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import {useNavigate} from "react-router-dom";

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

export default function OrderListBody() {
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();

  //const pageSize = 10;
  const orderList = async (page) => {
    try {
      const res = await TokenAxios.get(`/api/order/user?page=${page}&size=10`);
      setTotalPages(res.data.result.data.totalPages);
      setOrder(res.data.result.data.content);
      console.log(res.data.result.data)
    } catch (e) {
      console.error("Error fetching order list:", e);
    }
  };

  useEffect(() => {
    orderList(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  // 주문 상세 아이콘을 누르면 Link를 사용하지 않고 URL에 파라미터를 담고 이동하도록 수정
  const handleOrderDetailOpen = async (ordrSeq) => {
    navigate(`/order-detail/${ordrSeq}?orderSeq=${ordrSeq}`);
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: 3 }}>
        주문 목록 / 배송 조회
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TableContainer style={{ maxHeight: "none", textAlign : "center" }}>
          {" "}
          <Table sx={{ width: "100%", margin: "auto"}}>
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
                  주문정보
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
                  금액
                </TableCell>

                <TableCell
                  style={{
                    width: "16%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  상태
                </TableCell>

                <TableCell
                  style={{
                    width: "16%",
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
              {order.length !== 0 ? (
                order?.map((order) => (
                  <TableRow key={order.orderSeq}>
                    {/*주문 정보*/}
                    <TableCell style={{ textAlign: "center" }}>
                      {order.orderTitle}
                    </TableCell>
  
                    {/*주문 일자*/}
                    <TableCell style={{ textAlign: "center" }}>
                      {order.ordrDate.substring(0, 10)}
                    </TableCell>
  
                    {/*주문 번호*/}
                    <TableCell style={{ textAlign: "center" }}>
                      {`DKS-${order.ordrSeq.toString().padStart(5, "0")}`}
                    </TableCell>
  
                    {/*금액*/}
                    <TableCell style={{ textAlign: "center" }}>
                      {Number(order.totalPrice).toLocaleString()}
                    </TableCell>
  
                    {/*상태*/}
                    <TableCell style={{ textAlign: "center" }}>
                      {mapOrderState(order.ordrState)}
                    </TableCell>
  
                    {/*주문 상세*/}
  
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "gray",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                        onClick={() => handleOrderDetailOpen(order.ordrSeq)}
                      >
                        보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ): (
                <TableCell colSpan={6} style={{ textAlign: "center", borderBottom : "none" }}>
                  <Typography variant="h6" sx={{mt : 3}} >
                    주문 내역이 없습니다.
                  </Typography>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {order.length !== 0 && (
        <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2.5%",
        }}
      >
        <Pagination
          count={totalPages} // 총 페이지 수를 적용
          page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
          onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
        />
      </Box>
      )}

      
    </Paper>
  );
}
