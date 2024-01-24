import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { Paper } from "@mui/material";

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

export default function RefundBody() {
  const [rows, setRows] = useState([]); // 상품 데이터 상태를 빈 배열로 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/PeopleManage/MyRefund.json");
        // 데이터 변환 과정에서 상태 값을 확인하여 문자열 변환
        const RefundData = response.data.RefundData.map((item) => ({
          name: item.productName,
          option: item.option,
          imageUrl: item.imageUrl,
          type: item.type,
          state: item.state === "Y" ? "완료" : "처리중",
          RefundDate: item.Date,
        }));
        setRows(RefundData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper
      elevation={0}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <TableContainer>
        <Table
          sx={{ border: "1px solid", borderColor: "#e0e0e0", margin: "auto" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                상품명(옵션)
              </TableCell>
              <TableCell
                style={{
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                신청일자
              </TableCell>
              <TableCell
                style={{
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                구분
              </TableCell>
              <TableCell
                style={{
                  width: "25%",
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
                      style={{ width: "25%", alignItems: "center" }}
                    >
                      <ProductInfo>
                        <Img src={row.imageUrl} />
                        <TextContainer>
                          <div>{row.name}</div>
                          <div style={{ marginTop: "4px" }}>{row.option}</div>
                        </TextContainer>
                      </ProductInfo>
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {row.RefundDate}
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {row.type}
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {row.state}
                    </TableCell>
                  </StyledTableRow>
                ))
              : [...Array(4)].map((_, index) => (
                  <StyledTableRow key={`empty-${index}`}>
                    <TableCell
                      colSpan={4}
                      style={{ height: "110px", borderBottom: "none" }}
                    />
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}