import React from "react";
// import { useLocation } from 'react-router-dom';
import SidebarLayout from "components/templete/SidebarLayout";
import ReviewWriteBody from "./ReviewWriteBody";
import { Typography } from "@mui/material";

const ReviewEdit = () => {
  // const location = useLocation();
  // const review_Seq = location.state?.review_Seq
  
  // const loadOrderDetail = useCallback(async () => {
  //   try {
  //     // orderSeq가 정의되어 있는지 확인
  //     if (!orderSeq) {
  //       // orderSeq가 정의되지 않은 경우 처리 (예: 에러 페이지로 리다이렉트)
  //       console.error("OrderSeq가 정의되지 않았습니다");
  //       return;
  //     }

  //     const res = await TokenAxios.get(`/api/order/${orderSeq}`);
  //     console.log(res.data.result.data);

  //     setTotalPrice(res.data.result.data.totalPrice);
  //     setOrderList(res.data.result.data.orderDetailList);
  //     setShipInfo(res.data.result.data.receiverDetail);
  //   } catch (e) {
  //     console.error(e);
  //     // 에러 처리 (예: 에러 페이지로 리다이렉트)
  //   }
  // }, [orderSeq]);;

  return (
    <SidebarLayout>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 수정</Typography>
      <ReviewWriteBody />
    </SidebarLayout>
  );
};

export default ReviewEdit;
