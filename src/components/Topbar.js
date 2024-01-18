import React from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { PigMoney } from "tabler-icons-react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/joy/Input";
import "../font/font.css";
import { Link } from "react-router-dom";

const ITEM_HEIGHT = 48;

const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: "패션/뷰티",
      subMenu: ["여성", "남성", "신발", "기타", "메이크업", "향수"],
    },
    { label: "생활", subMenu: ["욕실", "주방", "반려동물", "자동차용품"] },
    {
      label: "디지털/가전",
      subMenu: ["영상가전", "생활가전", "건강가전", "주방가전"],
    },
    {
      label: "출산/유아동",
      subMenu: ["유아동의류", "분유/기저귀", "출산용품", "완구/교구"],
    },
    {
      label: "스포츠/레저",
      subMenu: ["등산", "캠핑", "낚시", "헬스", "수영", "골프", "자전거"],
    },
    { label: "카카오굿즈", subMenu: [] },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        boxShadow: "none",
        mt: "-13px",
        position: "fixed",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ justifyContent: "flex-end", maxHeight: "3vh" }}
      >
        {/* <Button sx={{ color: "black" }}>로그아웃</Button>|
        <Button sx={{ color: "black" }}>마이페이지</Button> */}
        <CustomLink
          to="/login"
          style={{ fontSize: "12px", marginRight: "5px" }}
        >
          로그아웃
        </CustomLink>
        <CustomLink to="/mypage/1" style={{ fontSize: "12px" }}>
          마이페이지
        </CustomLink>
      </Toolbar>
      <Divider />
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          <IconButton
            aria-label="menu"
            edge="start"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {menuItems.map((menuItem) => (
              <div
                key={menuItem.label}
                onMouseEnter={() => setAnchorEl(true)}
                onMouseLeave={handleClose}
              >
                <MenuItem>
                  <Typography variant="body1">{menuItem.label}</Typography>
                </MenuItem>
                {menuItem.subMenu.length > 0 && (
                  <Menu
                    id={`submenu-${menuItem.label.toLowerCase()}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {menuItem.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem}
                        selected={subItem === "Pyxis"}
                        onClick={handleClose}
                      >
                        {subItem}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>
            ))}
          </Menu>
        </div>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontFamily: "Logo", fontSize: "40px" }}
        >
          <CustomLink to="/">DalKom.Shop</CustomLink>
        </Typography>

        <Input
          disabled={false}
          placeholder="원하시는 상품을 검색해주세요"
          startDecorator={<SearchIcon />}
          variant="outlined"
          sx={{ width: "720px", height: "50px", borderRadius: "50px" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "250px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomLink to="/cart/1">
              <IconButton>
                <ShoppingCartCheckoutIcon
                  sx={{ fontSize: "40px", color: "black" }}
                />
              </IconButton>
              <Typography variant="body2">장바구니</Typography>
            </CustomLink>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomLink to="/mypage/1">
              <IconButton>
                <LocalShippingOutlinedIcon
                  sx={{ fontSize: "40px", color: "black" }}
                />
              </IconButton>
              <Typography variant="body2">배송조회</Typography>
            </CustomLink>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomLink to="/notice">
              <IconButton>
                <SupportAgentIcon sx={{ fontSize: "40px", color: "black" }} />
              </IconButton>
              <Typography variant="body2">고객센터</Typography>
            </CustomLink>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PigMoney size={48} strokeWidth={2} color={"black"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "30px" }}> 1,200,000</Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const CustomLink = styled(Link)`
  textdecoration: none;
  color: inherit;
`;

export default Topbar;
