import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { TokenAxios } from "apis/CommonAxios";
import CloseIcon from "@mui/icons-material/Close";

  const InquiryHistoryBody = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [lookModalOpen, setLookModalOpen] = useState(false);

  // 문의 상세 조회 (get)
  const handleLookOpenModal = async (inquirySeq) => {
    try {
      const response = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
      setSelectedInquiry(response.data.result.data);
     
      console.log("Selected Inquiry:", response.data);
      setLookModalOpen(true);
    } catch (e) {
      console.error("문의사항 상세 정보 가져오기 실패", e);
    }
  };

  const handleLookCloseModal = () => {
    setLookModalOpen(false);
  };

  // 문의 답변 조회 (get)
  const handleAnswerOpenModal = async (inquirySeq) => {
    try {
      const response = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
      setSelectedInquiry(response.data.result.data);
    
      console.log("Selected Inquiry:", response.data);
      setAnswerModalOpen(true);
    } catch (e) {
      console.error("문의 답변 정보 가져오기 실패", e);
    }
  };
  const handleAnswerCloseModal = () => {
    setAnswerModalOpen(false);
  };

  const inquiryHistory = async (page) => {
    try {
      const res = await TokenAxios.get(
        `/api/inquiry/user?page=${page}&size=10`,
      );
      setData(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteInquiry = async (inquirySeq) => {
    try {
      await TokenAxios.delete(`/api/inquiry/${inquirySeq}`);
      // 삭제 후 문의 내역을 다시 불러오기
      inquiryHistory(0);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    inquiryHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  const handleWaitingButtonClick = () => {
    // 대기중인 상태에서 버튼을 클릭했을 때 알림 띄우기
    Swal.fire({
      icon: "warning",
      title: "아직 답변이 등록되지 않았습니다.",
      confirmButtonColor: "black",
      confirmButtonText: "확인",
    });
  };


  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: 3 }}>문의 내역</Typography>
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
                    width: "15%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  문의 날짜
                </TableCell>
                <TableCell
                  style={{
                    width: "35%",
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
                  상세보기
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
                  <TableCell style={{ width: "15%", textAlign: "center" }}>
                    {inquiry.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell style={{ width: "35  %", textAlign: "center" }}>
                    <Typography
                      onClick={() => handleLookOpenModal(inquiry.inquirySeq)}
                      style={{ cursor: "pointer" }}
                    >
                      {inquiry.title}
                    </Typography>
                  </TableCell>

                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                  {inquiry.answerState === "Y" ? (
                        <Typography>답변완료</Typography>
                    ) : (
                      <Typography>대기중</Typography>
                    )}
                  </TableCell>
                  
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                    {inquiry.answerState === "Y" ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "gray",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                        onClick={() =>
                          handleAnswerOpenModal(inquiry.inquirySeq)
                        }
                      >
                        보기
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "gray",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                        onClick={handleWaitingButtonClick}
                      >
                        보기
                      </Button>
                    )}
                  </TableCell>
                  <TableCell style={{ width: "10%", textAlign: "center" }}>
                  <DeleteIcon  onClick={() => {
                    console.log(
                      `Try: delete inquirySeq: ${inquiry.inquirySeq}`,
                      );
                      deleteInquiry(inquiry.inquirySeq);
                      }}/>


                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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

      <Dialog
        onClose={handleLookCloseModal}
        open={lookModalOpen}
        maxWidth={false}
        width="1200px"
        sx={{
          "& .MuiDialog-paper": { borderRadius: "30px" },
        }}
      >
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleLookCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
            문의사항
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            width: 900,
            height: "450px",
            overflowY: "auto",
            overflowX: "initial",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          {/* 선택된 문의사항의 세부 내용을 표시하는 UI */}
          {selectedInquiry && (
            // <div>
            //     <Typography variant="h6" fontWeight="bold">제목</Typography>
            //     <Typography> {selectedInquiry.title}</Typography>
            //     <Typography variant="h6" fontWeight="bold" marginTop="40px">내용</Typography>
            //     <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedInquiry.content }}></Typography>
            // </div>
            <div>
              <Grid container rowSpacing={1}>
                <Grid item xs={2}>
                  <Typography
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    sx={{ textAlign: "center" }}
                  >
                    제목
                  </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textAlign: "left" }}
                  >
                    {selectedInquiry?.title || "title"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    sx={{ textAlign: "center", mt: 2 }}
                  >
                    내용
                  </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Box sx={{ maxHeight: "350px", overflowY: "auto", mt: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedInquiry?.content,
                        }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleAnswerCloseModal}
        open={answerModalOpen}
        maxWidth={false}
        width="1200px"
        sx={{
          "& .MuiDialog-paper": { borderRadius: "30px" },
        }}
      >
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleAnswerCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
            문의내용
          </Typography>
        </DialogTitle>

        <DialogContent
          style={{
            width: 900,
            height: "100px",
            overflowY: "initial",
            overflowX: "initial",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          {/* 선택된 문의사항의 세부 내용을 표시하는 UI */}
          {selectedInquiry && (
            <div>
              <Grid container rowSpacing={1}>
                <Grid item xs={2}>
                  <Typography
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    sx={{ textAlign: "center" }}
                  >
                    제목
                  </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textAlign: "left" }}
                  >
                    {selectedInquiry?.title || "title"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    sx={{ textAlign: "center", mt: 2 }}
                  >
                    내용
                  </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Box sx={{ maxHeight: "350px", overflowY: "auto", mt: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedInquiry?.content,
                        }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </div>
          )}
        </DialogContent>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="30px"
          flexDirection="column"
          height="350px"
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            문의답변
          </Typography>
          <Typography
            id="outlined-textarea"
            sx={{
              width: "80%",
              backgroundColor:
                selectedInquiry?.answerState === "Y" ? "#f0f0f0" : "#f8fafc",
            }}
          >
            {selectedInquiry?.answerContent}
          </Typography>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default InquiryHistoryBody;
