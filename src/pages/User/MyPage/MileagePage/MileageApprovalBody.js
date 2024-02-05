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
import AddCardIcon from "@mui/icons-material/AddCard";
import { TokenAxios } from "apis/CommonAxios";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

export default function MileageApprovalBody() {
  const { register, handleSubmit, setValue } = useForm();
  const [ data, setData] = useState([]);
  const [existingRequest, setExistingRequest] = useState(false);

  //마일리지 충전
   const mileCharge = async (chargeAmount) => {
    try {
      // 이미 신청 내역이 하나 이상 있는지 확인
      if (data.length > 0) {
        setExistingRequest(true);
        return;
      }

      const res = await TokenAxios.post(
        "/api/mileage/apply/user",
        chargeAmount
      );
      console.log(res.chargeAmount);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (chargeAmount) => {
    try {
      await mileCharge(chargeAmount);

      // 이미 신청 내역이 하나 이상 있다면 Swal 알림 띄우기
      if (existingRequest) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "신청 내역이 존재합니다!",
          showConfirmButton: false,
          timer: 1500,
        });
        setExistingRequest(false); // 상태 초기화
      }

      await chargeRequestHistory();
      setValue("amount", "");
    } catch (e) {
      console.log(e);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontSize: "40px", mb: "10px" }}>신청 내역</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                id="amount"
                placeholder="충전하기"
                variant="standard"
                {...register("amount")}
              />
            </Box>
            <Button
              type="submit"
              sx={{ color: "black", mb: "10px" }}
              onClick={mileCharge}
            >
              <AddCardIcon />
            </Button>
          </Box>
        </form>
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
