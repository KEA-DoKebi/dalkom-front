import * as React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Axios from "axios";
import AddCardIcon from "@mui/icons-material/AddCard";

export default function MileageApprovalBody() {
  const [userMileData, setUserMileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/data/PeopleManage/UserMile.json");
        setUserMileData(response.data.userMileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [mileChargeAmount, setMileChargeAmount] = useState("");

  const handleMileChargeChange = (event) => {
    // Allow only numeric input
    const sanitizedInput = event.target.value.replace(/[^0-9]/g, "");
    setMileChargeAmount(sanitizedInput);
  };

  // Filter rows where State is "Null"
  const filteredUserMileData = userMileData.filter(
    (rowData) => rowData.State === "Null",
  );

  return (
    <Paper elevation={0}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontSize: "40px", mb: "10px" }}>신청 내역</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              marginRight: "10px" /* TextField를 내리기 위한 추가 스타일 */,
            }}
          >
            <TextField
              placeholder="충전하기"
              variant="standard"
              value={mileChargeAmount}
              onChange={handleMileChargeChange}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(0, 0, 0, 0.42)",
                },
                marginBottom: "10px", // TextField를 아래로 내리기
              }}
            />
          </Box>
          <Button sx={{ color: "black", mb: "10px" }}>
            <AddCardIcon />
          </Button>
        </Box>
      </div>
      <Paper variant="outlined">
        <TableContainer>
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
                  {" "}
                  구분{" "}
                </TableCell>
                <TableCell
                  style={{
                    width: "50%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  신청 날짜
                </TableCell>
                <TableCell
                  style={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  신청 마일리지
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserMileData.map((rowData) => (
                <TableRow
                  key={rowData.Date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "25%", textAlign: "center" }}
                  >
                    {rowData.State === "Null" ? "대기중" : rowData.State}
                  </TableCell>
                  <TableCell style={{ width: "50%", textAlign: "center" }}>
                    {rowData.Date}
                  </TableCell>
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
                    {rowData.Mile}
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
