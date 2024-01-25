import React from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import ReviewWriteBody from "./ReviewWriteBody";
import { Typography } from "@mui/material";

const ReviewEdit = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 수정</Typography>
      <ReviewWriteBody />
    </SidebarLayout>
  );
};

export default ReviewEdit;
