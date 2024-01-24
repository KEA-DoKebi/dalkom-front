import React from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import ReviewWriteBody from "components/layout/body/MyPage/ReviewWriteBody";
import { Typography } from "@mui/material";

const ReviewWrite = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 작성</Typography>

      <ReviewWriteBody />
    </SidebarLayout>
  );
};

export default ReviewWrite;
