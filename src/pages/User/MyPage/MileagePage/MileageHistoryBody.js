import * as React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
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

export default function MileageHistoryBody() {
  const [mileageHistoryList, setMileageHistoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "/data/PeopleManage/UserMileHistory.json",
        );
        setMileageHistoryList(response.data.mileageHistroyList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper>
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
              {mileageHistoryList.map((row) => (
                <TableRow key={row.mileageHistorySeq}>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {row.type}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {row.changeDate}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {row.amount}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {row.balance}
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
