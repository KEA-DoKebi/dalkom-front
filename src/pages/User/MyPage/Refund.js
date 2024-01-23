import React from "react";
import DefaultLayout from "components/layout/DefaultLayout";
import RefundBody from "components/layout/body/MyPage/RefundBody";
import { Typography } from "@mui/material";
const Refund = () => {
  return (
      <DefaultLayout>
        <Typography sx={{fontSize: "40px", ml:"15vw", mb:"3vh"}}>

          취소/반품/교환/환불
        </Typography>
        
        <RefundBody />

      </DefaultLayout>
  );
};

export default Refund;
