import React from "react";
import CartBody from "./CartBody";
import { Typography } from "@mui/material";
import DefaultLayout from "components/templete/DefaultLayout";
const Cart = () => {
  return (
      <DefaultLayout>
        <Typography sx={{fontSize: "40px", ml:"100px", mb:"10px"}}>

        장바구니
        </Typography>
        
        <CartBody />

      </DefaultLayout>
  );
};

export default Cart;
