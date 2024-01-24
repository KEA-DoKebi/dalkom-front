import React from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import MyReviewBody from "components/layout/body/MyPage/MyReviewBody";
import { Typography } from "@mui/material";

const Review = () => {
  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 관리</Typography>

      <MyReviewBody />
    </SidebarLayout>
  );
};

export default Review;
