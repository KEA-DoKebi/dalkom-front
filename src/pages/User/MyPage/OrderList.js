import React, { useState } from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import OrderListBody from "components/layout/body/MyPage/OrderListBody";
import { Typography, FormControl, Select, MenuItem, Box } from "@mui/material";

const OrderList = () => {
  const [orderStatus, setOrderStatus] = useState(""); // 선택된 주문 상태를 관리하는 상태

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <SidebarLayout>
      <Box sx={{ display: "flex", flexDirection: "column", mb: "3vh" }}>
        <Typography sx={{ fontSize: "40px", mb: "20px" }}>
          주문 목록 / 배송 조회
        </Typography>

        {/* SelectBox 추가 */}
        <FormControl
          sx={{
            mb: 3,
            maxWidth: 120,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Select
            labelId="order-status-select-label"
            id="order-status-select"
            value={orderStatus}
            size="small"
            sx={{
              justifyContent: "flex-end",
            }}
            onChange={handleStatusChange}
          >
            <MenuItem value={"all"}>전체</MenuItem>
            <MenuItem value={"processing"}>처리중</MenuItem>
            <MenuItem value={"shipped"}>배송중</MenuItem>
            <MenuItem value={"delivered"}>배송완료</MenuItem>
          </Select>
        </FormControl>

        <OrderListBody />
      </Box>
    </SidebarLayout>
  );
};

export default OrderList;
