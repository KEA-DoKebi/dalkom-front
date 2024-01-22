import React from "react";
import DefaultLayout from "components/layout/DefaultLayout";
import CartBody from "../../components/layout/body/CartPage/CartBody";
import '../../font/font.css'
const Cart = () => {
  return (
      <DefaultLayout>
        장바구니
        <CartBody />

      </DefaultLayout>
  );
};

export default Cart;
