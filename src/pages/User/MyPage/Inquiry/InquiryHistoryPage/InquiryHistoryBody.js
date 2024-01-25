import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";

const InquiryHistoryBody = () => {
  const [InquiryList, setInquiryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/data/Inquiry/MyInquiry.json");
        setInquiryList(response.data.InquiryList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mt: "30px", mb: "10px" }}>
        문의 내역
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
                    width: "10%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  카테고리
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  문의 날짜
                </TableCell>
                <TableCell
                  style={{
                    width: "50%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  제목
                </TableCell>
                <TableCell
                  style={{
                    width: "10%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  상태(상세)
                </TableCell>
                <TableCell
                  style={{
                    width: "10%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  삭제
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {InquiryList.map((row) => (
                <TableRow key={row.inquirySeq}>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    {row.category}
                  </TableCell>
                  <TableCell style={{ width: "20%", textAlign: "center" }}>
                    {row.createDate}
                  </TableCell>
                  <TableCell style={{ width: "50%", textAlign: "center" }}>
                    {row.title}
                  </TableCell>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    {row.answerState === "Y" ? (
                      <Button variant="contained" color="success">
                        답변 완료
                      </Button>
                    ) : (
                      <Button variant="contained" color="warning">
                        대기중
                      </Button>
                    )}
                  </TableCell>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
};

export default InquiryHistoryBody;
