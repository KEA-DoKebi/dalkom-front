import React from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import RefundBody from "components/layout/body/MyPage/RefundBody";
import { Typography } from "@mui/material";
const Refund = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>
        취소/반품/교환/환불
      </Typography>

      <RefundBody />
    </SidebarLayout>
  );
};

export default Refund;
