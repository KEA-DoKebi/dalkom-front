import * as React from "react";
import {useEffect, useState} from "react";
import {
    Box,
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
import {TokenAxios} from "apis/CommonAxios";

const getMileHistoryTypeText = (type) => {
    switch (type) {
        case "0":
            return "지급";
        case "1":
            return "충전";
        case "2":
            return "사용";
        case "3":
            return "취소";
        case "4":
            return "반품";
        case "5":
            return "환불";
        default:
            return "알 수 없음";
    }
};

export default function MileageHistoryBody() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const mileageHistory = async (page) => {
        try {
            const res = await TokenAxios.get(`/api/mileage/history/user?page=${page}&size=10`);
            setData(res.data.result.data.content);
            setTotalPages(res.data.result.data.totalPages);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        mileageHistory(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    return (
        <Paper elevation={0}>
            <Typography sx={{fontSize: "40px", mt: "30px", mb: "10px"}}>히스토리</Typography>

            <Paper variant="outlined">
                <TableContainer style={{maxHeight: "none"}}>
                    {" "}
                    {/* maxHeight 스타일 추가 */}
                    <Table sx={{width: "100%", margin: "auto"}}>
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
                                    상태
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
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                        {getMileHistoryTypeText(mileHistory.type)}
                                    </TableCell>
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                        {mileHistory.createdAt.substring(0, 10)}
                                    </TableCell>
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                        {mileHistory.amount}
                                    </TableCell>
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                        {mileHistory.balance}
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
}
