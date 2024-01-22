import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  ListItemButton,
  Paper,
} from "@mui/material";
import Manual from "pages/User/Manual";
import Notice from "pages/User/Notice"; // Import your components as needed

import styled from "styled-components";

const Choice = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 5px;
  background-color: #f8fafc;
  border-radius: 50px;
  border: 1px solid;
  padding: 0 20px;
  align-items: center;
  white-space: nowrap;
  & > button {
    flex: 1; // Equal width for each button
  }
`;

const drawerWidth = "100%";

const menuData = [
  {
    items: [
      { label: "이용안내", path: "/manual", component: Manual },
      { label: "공지사항", path: "/notice", component: Notice },
      { label: "FAQ", path: "/FAQ", component: Manual },
    ],
  },
];

const MenuItem = ({ label, selectedMenu, onClick, path }) => (
  <ListItemButton
    sx={{
      backgroundColor: selectedMenu === label ? "#FDE8EF" : "transparent",
      color: selectedMenu === label ? "#EC407A" : "#000000",
      borderRadius: "7px",
      "&:hover": {
        backgroundColor: "#FFD465",
        borderRadius: "7px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        color: "#000000",
      },
    }}
    onClick={() => {
      onClick(label);
    }}
    component={Link}
    to={path}
  >
    <Typography
      sx={{
        fontSize: selectedMenu === label ? "1.2em" : "1em",
        fontWeight: selectedMenu === label ? "bold" : "normal",
      }}
    >{label}</Typography>
  </ListItemButton>
);


export default function CustomerServiceMenu({ selectedMenu, setSelectedMenu }) {
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Add any additional logic or actions you want to perform on menu click
  };

  return (
    <Paper sx={{ display: "flex", backgroundColor: "#EEF2F6" }}>
      {/* ... (이전 코드 생략) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Choice>
              {menuData.map((menuGroup) => (
                <React.Fragment key={menuGroup.title}>
                  {menuGroup.items.map((menuItem) => (
                    <MenuItem
                      key={menuItem.label}
                      label={menuItem.label}
                      selectedMenu={selectedMenu}
                      onClick={handleMenuClick}
                      path={menuItem.path}
                    />
                  ))}
                </React.Fragment>
              ))}
            </Choice>
          </List>
        </Box>
      </Drawer>
      <Box component="main"></Box>
    </Paper>
  );
}