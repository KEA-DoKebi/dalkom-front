import React from "react";
import DefaultLayout from "components/layout/DefaultLayout";
import CartBody from "components/layout/body/CartPage/CartBody";
import { Typography } from "@mui/material";
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
