import React from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import ReviewDetailBody from "./ReviewDetailBody";
import { Typography } from "@mui/material";

const ReviewEdit = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 확인</Typography>
      <ReviewDetailBody />
    </SidebarLayout>
  );
};

export default ReviewEdit;
