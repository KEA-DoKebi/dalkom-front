import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import "assets/font/font.css";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const menuData = [
  {
    title: "MY 쇼핑",
    items: [{ label: "주문목록/배송조회", to : "/mypage/order/list" }, { label: "취소/교환/반품/환불", to : "/mypage/order/refund"  }],
  },
  {
    title: "마일리지",
    items: [{ label: "마일리지 조회/충전하기", to : "/mypage/mile" }],
  },
  {
    title: "MY 활동",
    items: [
      { label: "문의하기", to : "/mypage/inquiry" },
      { label: "문의 내역", to : "/mypage/inquiry/history" },
      { label: "리뷰관리", to : "/mypage/review" },
    ],
  },
  {
    title: "나의 회원 정보",
    items: [{ label: "개인정보 확인/수정", to : "/mypage/myinfo" }],
  },
];

const MenuItem = ({ label, selectedMenu, onClick }) => (
  <ListItem sx={{marginLeft : "15px"}}>
      <Typography sx={{ fontSize: "20px" }}>{label}</Typography>
  </ListItem>
);

const Sidebar = () => {

  return (
    <Box
      sx={{
        width: "260px",
        height: "100%",
        ml: 3,
        border: "1px solid #ccc",
        borderRadius: "7px",
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuData.map((menuGroup) => (
            <React.Fragment key={menuGroup.title}>
              <ListItem>
                <Typography style={{ fontWeight: "bold", fontSize: "30px" }}>
                  {menuGroup.title}
                </Typography>
              </ListItem>
              {menuGroup.items.map((menuItem) => (
                <CustomLink to={menuItem.to}>
                  <MenuItem
                    key={menuItem.label}
                    label={menuItem.label}
                  />
                </CustomLink>
              ))}
              <ListItem sx={{ mt: 5 }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

const CustomLink = styled(Link)`
  text-decoration : none;
  color : black;
`
