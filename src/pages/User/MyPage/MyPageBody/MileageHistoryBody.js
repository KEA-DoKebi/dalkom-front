import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";

export default function MileageHistoryBody() {
    const [mileageHistoryList, setMileageHistoryList] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Axios.get('/data/PeopleManage/UserMileHistory.json');
          setMileageHistoryList(response.data.mileageHistroyList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <Paper variant="outlined">
        <TableContainer style={{ maxHeight: 500 }}> {/* maxHeight 스타일 추가 */}
          <Table sx={{ width: "100%", margin: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }} >구분</TableCell>
                <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }}>날짜</TableCell>
                <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }} >변동</TableCell>
                <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }}>잔액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(
                mileageHistoryList.map((row) => (
                  <TableRow key={row.mileageHistorySeq}>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>{row.type}</TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>{row.changeDate}</TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>{row.amount}</TableCell>
                    <TableCell style={{ width: "25%", textAlign: "center" }}>{row.balance}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
  
