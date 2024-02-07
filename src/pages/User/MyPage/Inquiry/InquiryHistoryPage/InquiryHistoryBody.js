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
} from "@mui/material";
import Swal from 'sweetalert2'
import React, {useEffect, useState} from "react";
import {TokenAxios} from "apis/CommonAxios";
import CloseIcon from "@mui/icons-material/Close";

let currentNoticeSeq = 1;
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
            currentNoticeSeq = inquirySeq;
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
            currentNoticeSeq = inquirySeq;
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
            const res = await TokenAxios.get(`/api/inquiry/user?page=${page}&size=10`);
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
            icon: 'warning',
            title: '답변이 등록되지 않았습니다',
            text: '조금만 기다려주세요 :)',
            confirmButtonText: '확인'
        });
    };
    
    const handleAnsweredButtonClick = () => {
        // 답변이 완료된 상태에서 버튼을 클릭했을 때 모달 열기
        setLookModalOpen(true);
    };

    
    return (
        <Paper elevation={0}>
            <Typography sx={{ fontSize: "40px", mb: 3}}>
                문의 내역
            </Typography>
            <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

           <Paper elevation={0}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}>
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
                                    <TableCell style={{width: "10%", textAlign: "center"}}>
                                        {inquiry.category}
                                    </TableCell>
                                    <TableCell style={{width: "20%", textAlign: "center"}}>
                                        {inquiry.createdAt.substring(0, 10)}
                                    </TableCell>
                                    <TableCell style={{ width: "50%", textAlign: "center" }}>
                                        <Typography onClick={() => handleLookOpenModal(inquiry.inquirySeq)} style={{ cursor: "pointer" }}>
                                            {inquiry.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{width: "10%", textAlign: "center"}}>
                                        {inquiry.answerState === "Y" ? (
                                           <Button
                                           variant="contained"
                                           color="success"
                                           size="small"
                                           sx={{
                                               backgroundColor: 'success',
                                               width: '74px'
                                           }}
                                           onClick={() => handleAnswerOpenModal(inquiry.inquirySeq)} 
                                       >
                                           답변완료
                                       </Button>
                                        ) : (
                                            <Button
                                           variant="contained"
                                           color="warning"
                                           size="small"
                                           sx={{
                                               backgroundColor: 'warning',
                                               width: '74px'
                                           }}
                                           onClick={handleWaitingButtonClick} 
                                       >
                                           대기중
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell style={{width: "10%", textAlign: "center"}}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                backgroundColor: 'gray',
                                                '&:hover': {
                                                    backgroundColor: 'black',
                                                },
                                            }}
                                            onClick={() => { 
                                                console.log(`Try: delete inquirySeq: ${inquiry.inquirySeq}`);
                                                 deleteInquiry(inquiry.inquirySeq);
                                             }}
                                        >
                                            삭제하기
                                        </Button>
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
                    marginTop: "2.5%"
                }}
            >
                <Pagination
                    count={totalPages} // 총 페이지 수를 적용
                    page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                    onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                />
            </Box>

            <Dialog onClose={handleLookCloseModal} open={lookModalOpen} maxWidth={false} width="1200px" sx={{ "& .MuiDialog-paper": { borderRadius: "30px" } }}>
                <DialogTitle>
                    <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", mt: 2, mb: 2 }}>문의사항</Typography>
                    <IconButton aria-label="close" onClick={handleLookCloseModal} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent 
                    style={{
                        width: 900,
                        height: "450px",
                        overflowY: "initial",
                        overflowX: "initial",
                        marginLeft: 40, marginRight:40
                    }}>
                    {/* 선택된 문의사항의 세부 내용을 표시하는 UI */}
                    {selectedInquiry && (
                        <div>
                            <Typography variant="h6" fontWeight="bold">제목</Typography>
                            <Typography> {selectedInquiry.title}</Typography>
                            <Typography variant="h6" fontWeight="bold" marginTop="40px">내용</Typography>
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedInquiry.content }}></Typography>
                        </div>
                    )}
                </DialogContent>
            </Dialog>


            <Dialog onClose={handleAnswerCloseModal} open={answerModalOpen} maxWidth={false} width="1200px" sx={{ "& .MuiDialog-paper": { borderRadius: "30px" } }}>
                <DialogTitle>
                    <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", mt: 2, mb: 2 }}>문의답변</Typography>
                    <IconButton aria-label="close" onClick={handleAnswerCloseModal} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent 
                    style={{
                        width: 900,
                        height: "450px",
                        overflowY: "initial",
                        overflowX: "initial",
                        marginLeft: 40, marginRight:40
                    }}>
                    {/* 선택된 문의사항의 세부 내용을 표시하는 UI */}
                    {selectedInquiry && (
                        <div>
                            <Typography>담당자: {selectedInquiry.nickname}</Typography>
                            <Typography>답변일: {selectedInquiry.answeredAt}</Typography>   
                            <Typography variant="h6" fontWeight="bold" marginTop="40px">답변 내용</Typography>
                            <Typography>{selectedInquiry.answerContent}</Typography>
                            
                               
                        </div>
                    )}
                </DialogContent>
            </Dialog>



        </Paper>
    );
};

export default InquiryHistoryBody;
