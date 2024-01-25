import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";

const Img = styled.img`
  width: 70px;
  height: auto;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 12px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  max-height: 550px; // 4개 항목의 높이에 맞춤
  overflow-y: auto; // 항목이 4개를 초과하면 스크롤 생성
`;

const StyledTableRow = styled(TableRow)`
  height: 110px; // 원하는 행의 높이로 설정
`;

export default function OrderListBody() {
  const [rows, setRows] = useState([]); // 상품 데이터 상태를 빈 배열로 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/PeopleManage/MyOrder.json");
        // 데이터 변환 과정에서 상태 값을 확인하여 문자열 변환
        const OrderData = response.data.OrderData.map((item) => ({
          name: item.productName,
          option: item.option,
          imageUrl: item.imageUrl,
          state: item.state,
          orderDate: item.Date,
          orderSeq: item.OrderSeq,
          price: item.productPrice,
        }));
        setRows(OrderData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const [orderStatus, setOrderStatus] = useState(""); // 선택된 주문 상태를 관리하는 상태

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: "20px" }}>
        주문 목록 / 배송 조회
      </Typography>

      {/* SelectBox 추가 */}
      <FormControl
        sx={{
          mb: 3,
          maxWidth: 120,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Select
          labelId="order-status-select-label"
          id="order-status-select"
          value={orderStatus}
          size="small"
          sx={{
            justifyContent: "flex-end",
          }}
          onChange={handleStatusChange}
        >
          <MenuItem value={"all"}>전체</MenuItem>
          <MenuItem value={"processing"}>처리중</MenuItem>
          <MenuItem value={"shipped"}>배송중</MenuItem>
          <MenuItem value={"delivered"}>배송완료</MenuItem>
        </Select>
      </FormControl>

      <Paper
        elevation={0}
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <TableContainer>
          <Table
            sx={{
              border: "1px solid",
              borderColor: "#e0e0e0",
              borderRadius: "4px",
              width: "100vw",
              margin: "auto",
            }}
          >
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
                  상품명(옵션)
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  주문일자
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  주문번호
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  금액
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  상태
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0
                ? rows.map((row, index) => (
                    <StyledTableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        <ProductInfo>
                          <Img src={row.imageUrl} alt="Product" />
                          <TextContainer>
                            <div>{row.name}</div>
                            <div style={{ marginTop: "4px" }}>{row.option}</div>
                          </TextContainer>
                        </ProductInfo>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.orderDate}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.orderSeq}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.price}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.state}
                        {row.state === "배송완료" && (
                          <Button
                            variant="contained"
                            size="small"
                            style={{
                              alignSelf: "flex-end",
                              border: "1px solid",
                              backgroundColor: "#e0e0e0",
                              width: "auto",
                              height: "30px",
                              margin: "20px",
                              color: "black",
                            }}
                          >
                            후기 작성
                          </Button>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))
                : [...Array(4)].map((_, index) => (
                    <StyledTableRow key={`empty-${index}`}>
                      <TableCell
                        colSpan={5}
                        style={{ height: "110px", borderBottom: "none" }}
                      />
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}
