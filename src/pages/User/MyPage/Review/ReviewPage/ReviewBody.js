import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Button,
  Stack,
  Typography, // Import Stack for horizontal layout
} from "@mui/material";
import styled from "styled-components";
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

export default function OrderListBody() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/PeopleManage/MyReview.json");
        const orderData = response.data.OrderData.map((item) => ({
          ReviewSeq: item.ReviewSeq,
          productName: item.productName,
          option: item.option,
          ReviewDate: item.ReviewDate,
          star: item.star,
          content: item.content,
          imageUrl: item.imageUrl,
        }));
        setRows(orderData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 관리</Typography>

      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TableContainer>
          <Table
            sx={{
              border: "1px solid",
              borderColor: "#e0e0e0",
              margin: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  상품명(옵션)
                </TableCell>
                <TableCell
                  sx={{
                    width: "70%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  내용
                </TableCell>
                <TableCell sx={{ width: "5%" }} />{" "}
                {/* For the edit and delete buttons */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0
                ? rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: "flex-start" }}>
                        <ProductInfo>
                          <Img src={row.imageUrl} alt="Product" />
                          <TextContainer>
                            <div>{row.productName}</div>
                            <div style={{ marginTop: "4px" }}>{row.option}</div>
                          </TextContainer>
                        </ProductInfo>
                      </TableCell>
                      <TableCell>
                        <div>{row.ReviewDate}</div>
                        <Rating
                          name="read-only"
                          value={row.star}
                          readOnly
                          size="small"
                        />
                        <div>{row.content}</div>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row">
                          <Button sx={{ color: "#000000", padding: "0px" }}>
                            수정
                          </Button>
                          |
                          <Button sx={{ color: "#000000", padding: "0px" }}>
                            삭제
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                : [...Array(4)].map((_, index) => (
                    <TableRow
                      key={`empty-${index}`}
                      sx={{ height: "110px", borderBottom: "none" }}
                    >
                      <TableCell colSpan={5} />
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}
