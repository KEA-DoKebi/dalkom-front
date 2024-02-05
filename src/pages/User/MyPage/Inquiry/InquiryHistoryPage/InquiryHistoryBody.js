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
import { TokenAxios } from "apis/CommonAxios";

const InquiryHistoryBody = () => {
  const [data, setData] = useState([]);

  const inquoryHistory = async () => {
    try {
      const res = await TokenAxios.get("/api/inquiry/user");
      setData(res.data.result.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteInquiry = async (inquirySeq) => {
    try {
      await TokenAxios.delete(`/api/inquiry/${inquirySeq}`);
      // 삭제 후 문의 내역을 다시 불러오기
      inquoryHistory();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    inquoryHistory();
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
              {data.map((inquiry) => (
                <TableRow key={inquiry.inquirySeq}>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    {inquiry.category}
                  </TableCell>
                  <TableCell style={{ width: "20%", textAlign: "center" }}>
                    {inquiry.createdAt.substring(1,10)}
                  </TableCell>
                  <TableCell style={{ width: "50%", textAlign: "center" }}>
                    {inquiry.title}
                  </TableCell>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    {inquiry.answerState === "Y" ? (
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
                    <IconButton onClick={() => 
                      {
                        console.log(`Try: delete inquirySeq: ${inquiry.inquirySeq}`);
                        deleteInquiry(inquiry.inquirySeq);
                      }}>
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
