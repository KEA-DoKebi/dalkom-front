import React from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import ReviewEditBody from "./ReviewEditBody";
import { Typography } from "@mui/material";

const ReviewEdit = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 수정</Typography>
      <ReviewEditBody />
    </SidebarLayout>
  );
};

export default ReviewEdit;
