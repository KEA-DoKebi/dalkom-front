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

export default function MileageApprovalBody() {
  const [userMileData, setUserMileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('/data/PeopleManage/UserMile.json');
        setUserMileData(response.data.userMileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter rows where State is "Null"
  const filteredUserMileData = userMileData.filter((rowData) => rowData.State === "Null");

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table sx={{ width: "100%", margin: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }}> 구분 </TableCell>
              <TableCell style={{ width: "50%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }}>신청 날짜</TableCell>
              <TableCell style={{ width: "25%", textAlign: "center", fontWeight:"bold", fontSize:"15px" }}>신청 마일리지</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUserMileData.map((rowData) => (
              <TableRow
                key={rowData.Date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: "25%",textAlign: "center" }}>
                  {rowData.State === "Null" ? "대기중" : rowData.State}
                </TableCell>
                <TableCell style={{ width: "50%", textAlign: "center" }}>{rowData.Date}</TableCell>
                <TableCell style={{ width: "25%", textAlign: "center" }}>{rowData.Mile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
