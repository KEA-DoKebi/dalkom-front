import {
    Box,
    Button,
    IconButton, Pagination,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {TokenAxios} from "apis/CommonAxios";

const InquiryHistoryBody = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

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
                                        {inquiry.createdAt.substring(1, 10)}
                                    </TableCell>
                                    <TableCell style={{width: "50%", textAlign: "center"}}>
                                        {inquiry.title}
                                    </TableCell>
                                    <TableCell style={{width: "10%", textAlign: "center"}}>
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
                                    <TableCell style={{width: "10%", textAlign: "center"}}>
                                        <IconButton onClick={() => {
                                            console.log(`Try: delete inquirySeq: ${inquiry.inquirySeq}`);
                                            deleteInquiry(inquiry.inquirySeq);
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
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

        </Paper>
    );
};

export default InquiryHistoryBody;
