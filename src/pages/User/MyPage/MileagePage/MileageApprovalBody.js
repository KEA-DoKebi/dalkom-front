import * as React from "react";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
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
import { TokenAxios } from "apis/CommonAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function MileageApprovalBody() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState([]);

    //마일리지 충전
    const mileCharge = async (chargeAmount) => {
        const result = await Swal.fire({//
            icon: "question",
            title: "마일리지를 충전하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "black",
            cancelButtonColor: "gray",
            confirmButtonText: "네",
            cancelButtonText: "아니요",
            customClass: {
                container: 'custom-swal-container'
            }
        });

        if (result.isConfirmed) {
            try {
                const res = await TokenAxios.post("/api/mileage/apply/user", chargeAmount);
                if (res.status === 200) {
                    Swal.fire({//
                        position: "center",
                        icon: "success",
                        title: "충전 신청이 완료되었습니다.",
                        showConfirmButton: true,
                        confirmButtonColor: 'black',
                        confirmButtonText: '확인',
                    });
                }
                chargeRequestHistory();
            } catch (error) {
                console.log(error.response.status)
                if(error.response.status === 409){
                    Swal.fire({//
                        position: "center",
                        icon: "error",
                        title: "충전 신청에 실패했습니다.",
                        html: "이미 진행중인 신청 내역이 존재합니다.",
                        showConfirmButton: true,
                        confirmButtonColor: 'gray',
                        confirmButtonText: '확인',
                    });
                }else{
                    Swal.fire("실패", "충전 신청에 실패했습니다.", "error");
                    Swal.fire({//
                        position: "center",
                        icon: "error",
                        title: "충전 신청에 실패했습니다.",
                        showConfirmButton: true,
                        confirmButtonColor: 'gray',
                        confirmButtonText: '확인',
                    });
                }
                // console.error("Error charging mileage:", error);
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

            <Box sx={{ display: "flex", alignItems: "baseline", mb: 3, justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "40px" }}>
                    신청 내역
                </Typography>

                <form
                    onSubmit={handleSubmit((chargeAmount) => {
                        // console.log(chargeAmount);
                        mileCharge(chargeAmount);
                    })}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            marginRight: "10px", /* TextField를 내리기 위한 추가 스타일 */
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
                            sx={{ color: "black" }}
                            onClick={mileCharge}
                        >
                            <AddCardIcon />
                        </Button>
                    </Box>
                </form>
            </Box>
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
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ width: "25%", textAlign: "center" }}
                                    >
                                        {chargeRequest.approvedState === "W"
                                            ? "대기중"
                                            : chargeRequest.approvedState === "Y"
                                                ? "승인"
                                                : chargeRequest.approvedState === "N"
                                                    ? "거부"
                                                    : ""}
                                    </TableCell>
                                    <TableCell style={{ width: "50%", textAlign: "center" }}>
                                        {chargeRequest.createdAt.substring(0, 10)}
                                    </TableCell>
                                    <TableCell style={{width: "25%", textAlign: "center"}}>
                                    {Number(chargeRequest.amount).toLocaleString()}
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
