import SidebarLayout from "components/layout/SidebarLayout";
import MileageApprovalBody from "components/layout/body/MyPage/MileageApprovalBody";
import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import MileageHistoryBody from "components/layout/body/MyPage/MileageHistoryBody";
import AddCardIcon from "@mui/icons-material/AddCard";

const Mileage = () => {
  const [mileChargeAmount, setMileChargeAmount] = useState("");

  const handleMileChargeChange = (event) => {
    // Allow only numeric input
    const sanitizedInput = event.target.value.replace(/[^0-9]/g, "");
    setMileChargeAmount(sanitizedInput);
  };

  return (
    <SidebarLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontSize: "40px", mb: "10px" }}>신청 내역</Typography>
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
              placeholder="충전하기"
              variant="standard"
              value={mileChargeAmount}
              onChange={handleMileChargeChange}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(0, 0, 0, 0.42)",
                },
                marginBottom: "10px", // TextField를 아래로 내리기
              }}
            />
          </Box>
          <Button sx={{ color: "black", mb: "10px" }}>
            <AddCardIcon />
          </Button>
        </Box>
      </div>
      <MileageApprovalBody />
      <Typography sx={{ fontSize: "40px", mt: "30px", mb: "10px" }}>
        히스토리
      </Typography>
      <MileageHistoryBody />
    </SidebarLayout>
  );
};

export default Mileage;
