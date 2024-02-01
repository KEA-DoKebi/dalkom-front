import * as React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";

export default function MileageHistoryBody() {
  const [data, setData] = useState([]);

  const mileageHistory = async () => {
    try {
      const res = await TokenAxios.get("/api/mileage/history/user");
      setData(res.data.result.data.content);
      console.log(res.data.result.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    mileageHistory();
  }, []);

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mt: "30px", mb: "10px" }}>
        히스토리
      </Typography>

      <Paper variant="outlined">
        <TableContainer style={{ maxHeight: 500 }}>
          {" "}
          {/* maxHeight 스타일 추가 */}
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
              {data.map((mileHistory) => (
                <TableRow key={mileHistory.mileageHistorySeq}>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {mileHistory.type}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {mileHistory.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {mileHistory.amount}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {mileHistory.balance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}
