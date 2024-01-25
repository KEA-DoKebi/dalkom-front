import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import "assets/font/font.css";

const menuData = [
  {
    title: "MY 쇼핑",
    items: [{ label: "주문목록/배송조회" }, { label: "취소/교환/반품/환불" }],
  },
  {
    title: "마일리지",
    items: [{ label: "마일리지 조회/충전하기" }],
  },
  {
    title: "MY 활동",
    items: [
      { label: "문의하기" },
      { label: "문의 내역" },
      { label: "리뷰관리" },
    ],
  },
  {
    title: "나의 회원 정보",
    items: [{ label: "개인정보 확인/수정" }],
  },
];

const MenuItem = ({ label, selectedMenu, onClick }) => (
  <ListItem sx={{ ml: -2, mb: -1.5 }}>
    <ListItemButton onClick={() => onClick(label)}>
      <Typography sx={{ fontSize: "20px" }}>{label}</Typography>
    </ListItemButton>
  </ListItem>
);

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState("주문목록/배송조회");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

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
                <MenuItem
                  key={menuItem.label}
                  label={menuItem.label}
                  selectedMenu={selectedMenu}
                  onClick={handleMenuClick}
                />
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
