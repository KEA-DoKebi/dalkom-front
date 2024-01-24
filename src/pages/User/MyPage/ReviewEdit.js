import React from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import ReviewWriteBody from "components/layout/body/MyPage/ReviewWriteBody";
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
