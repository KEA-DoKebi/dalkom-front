import * as React from "react";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import {TokenAxios} from "apis/CommonAxios";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

export default function MileageApprovalBody() {
    const {register, handleSubmit} = useForm();
    const [data, setData] = useState([]);

    //마일리지 충전
    const mileCharge = async (chargeAmount) => {
        const result = await Swal.fire({
            title: "충전하시겠습니까?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예, 충전하겠습니다",
            cancelButtonText: "아니요",
            customClass: {
                container: 'custom-swal-container'
            }
        });

        if (result.isConfirmed) {
            try {
                const res = await TokenAxios.post("/api/mileage/apply/user", chargeAmount);
                if (res.status === 200) {
                    Swal.fire("성공", "상태를 변경했습니다.", "success");
                }
                chargeRequestHistory();
            } catch (error) {
                console.error("Error charging mileage:", error);
                Swal.fire("실패", "충전 신청에 실패했습니다.", "error");
            }
        }
    };

    //마일리지 신청 내역
    const chargeRequestHistory = async () => {
        try {
            const res = await TokenAxios.get("/api/mileage/apply/user?page=0&size=5");
            setData(res.data.result.data.content);
            console.log(res.data.result.data.content);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        chargeRequestHistory();
    }, []);

    return (
        <Paper elevation={0}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>

                <Typography sx={{fontSize: "40px", mb: "10px"}}>신청 내역</Typography>

                <form
                    onSubmit={handleSubmit((chargeAmount) => {
                        // console.log(chargeAmount);
                        mileCharge(chargeAmount);
                    })}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            marginRight: "10px" /* TextField를 내리기 위한 추가 스타일 */,
                            mb: "10px"
                        }}
                    >
                        <TextField
                            id="amount"
                            placeholder="충전하기"
                            variant="standard"
                            {...register("amount")}
                        />
                        <Button
                            type="submit"
                            sx={{color: "black"}}
                            onClick={mileCharge}
                        >
                            <AddCardIcon/>
                        </Button>
                    </Box>
                </form>
            </div>
            <Paper variant="outlined">
                <TableContainer>
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
                                    {" "}
                                    신청 상태{" "}
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
                            {data.map((chargeRequest) => (
                                <TableRow
                                    key={chargeRequest.requestSeq}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{width: "25%", textAlign: "center"}}
                                    >
                                        {chargeRequest.approvedState === "W"
                                            ? "대기중"
                                            : chargeRequest.approvedState === "Y"
                                                ? "승인"
                                                : chargeRequest.approvedState === "N"
                                                    ? "거부"
                                                    : ""}
                                    </TableCell>
                                    <TableCell style={{width: "50%", textAlign: "center"}}>
                                        {chargeRequest.createdAt.substring(0, 10)}
                                    </TableCell>
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                        {chargeRequest.amount}
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
