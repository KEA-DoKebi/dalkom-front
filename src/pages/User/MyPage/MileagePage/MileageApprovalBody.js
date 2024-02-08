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
  Typography,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function MileageApprovalBody() {
  const { handleSubmit } = useForm();
  const [data, setData] = useState([]);

  const handleChargeBtnClicked = () => {
    Swal.fire({
      title: "얼마를 충전하시겠습니까?",
      input: "text",
      buttonsStyling: true,
      confirmButtonText: "충전하기",
      confirmButtonColor: "black",
      inputValidator: (value) => {
        const mileage = Number(value);
        if (!value) {
          return "금액을 입력해주세요!";
        } else if (isNaN(mileage) || mileage < 0) {
          return "유효한 금액을 입력해주세요!";
        } else if (mileage >= 3000000) {
          return "최대 2,999,999까지 충전 가능합니다.";
        }
      },
      preConfirm: async (mileage) => {
        try {
          const res = await TokenAxios.post(`/api/mileage/apply/user`, {
            amount: mileage,
          });
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "충전 신청이 완료되었습니다.",
              showConfirmButton: true,
              confirmButtonText: "확인",
              buttonsStyling: true,
              confirmButtonColor: "black",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        } catch (e) {
          if (e.response.status === 409) {
            Swal.showValidationMessage(`
                          이미 진행중인 결제내역이 존재합니다.
                        `);
          } else {
            Swal.showValidationMessage(`
                          충전에 실패하였습니다.
                        `);
          }
        }
      },
    });
  };

  //마일리지 충전
  const mileCharge = async (chargeAmount) => {
    const result = await Swal.fire({
      //
      icon: "question",
      title: "마일리지를 충전하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "gray",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await TokenAxios.post(
          "/api/mileage/apply/user",
          chargeAmount,
        );
        if (res.status === 200) {
          Swal.fire({
            //
            position: "center",
            icon: "success",
            title: "충전 신청이 완료되었습니다.",
            showConfirmButton: true,
            confirmButtonColor: "black",
            confirmButtonText: "확인",
          });
        }
        chargeRequestHistory();
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 409) {
          Swal.fire({
            //
            position: "center",
            icon: "error",
            title: "충전 신청에 실패했습니다.",
            html: "이미 진행중인 신청 내역이 존재합니다.",
            showConfirmButton: true,
            confirmButtonColor: "gray",
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            //
            position: "center",
            icon: "error",
            title: "충전 신청에 실패했습니다.",
            showConfirmButton: true,
            confirmButtonColor: "gray",
            confirmButtonText: "확인",
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
  }, [data]);

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          mb: 3,
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "40px" }}>신청 내역</Typography>

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
              marginRight: "10px" /* TextField를 내리기 위한 추가 스타일 */,
              mb: "10px",
            }}
          >
            {/* <TextField
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
                        </Button> */}
            <Button
              style={{
                backgroundColor: "gold",
                width: "120px",
                height: "50px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "black",
                borderRadius: "15px",
                margin: 0,
              }}
              onClick={handleChargeBtnClicked}
            >
              충전하기
            </Button>
          </Box>
        </form>
      </Box>
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
                  <TableCell style={{ width: "25%", textAlign: "center" }}>
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
