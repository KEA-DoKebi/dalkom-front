import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Typography,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";

export default function MileageHistoryBody() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const mileageHistory = async (page) => {
    try {
      const res = await TokenAxios.get(
        `/api/mileage/history/user?page=${page}&size=10`,
      );
      setData(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    mileageHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", my: 3, mb: 3 }}>히스토리</Typography>
      <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TableContainer style={{ maxHeight: "none" }}>
          {" "}
          <Table sx={{ width: "100%", margin: "auto" }}>
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
                  상태
                </TableCell>
                <TableCell
                  style={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  날짜
                </TableCell>
                <TableCell
                  style={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  변동
                </TableCell>
                <TableCell
                  style={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  잔액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length !== 0 ? (
                data.map((mileHistory) => (
                  <TableRow key={mileHistory.mileageHistorySeq}>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {mileHistory.typeName}
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {mileHistory.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {Number(mileHistory.amount).toLocaleString()}
                    </TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>
                      {Number(mileHistory.balance).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={6} style={{ textAlign: "center", borderBottom : "none" }}>
                    <Typography variant="h6" sx={{mt : 1}} >
                      마일리지 내역이 없습니다.
                    </Typography>
                  </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {data.length !== 0 && (
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
