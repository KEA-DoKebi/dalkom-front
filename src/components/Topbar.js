import React, { useState } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { PigMoney } from "tabler-icons-react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Input from "@mui/joy/Input";
import "../font/font.css";
import { Link } from "react-router-dom";

const SubMenu = ({ subMenu, top, left, onSubMenuItemClick }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: top + 5,
        left: left + 140,
        width: "300px",
        boxShadow: "none",
        fontFamily: "H5",
        fontSize: "20px",
      }}
    >
      {subMenu.map((item, index) => (
        <div
          key={index}
          onClick={() => onSubMenuItemClick(item)}
          style={{ fontWeight: "normal" }}
        >
          {item}
        </div>
      ))}
    </Paper>
  );
};


const Topbar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subMenuPosition, setSubMenuPosition] = useState({ top: 0, left: 0 });

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

  const handleCategoryClick = (index) => {
    setSelectedCategory(selectedCategory === index ? null : index);
    setSubMenuPosition({ top: 0, left: 0 }); // Reset subMenuPosition when a category is selected.

    // 선택된 메뉴의 정보를 콘솔에 출력
    console.log('Selected Menu:', menuItems[index]);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [, setMenuPosition] = useState({ top: 0, left: 0 });

  // MenuIcon 클릭 시 실행될 함수
  const handleMenuClick = (event) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top, left });
    setMenuOpen(!menuOpen);
  };

  const handleSubMenuItemClick = (subMenuItem) => {
    console.log('Selected SubMenu:', subMenuItem);
    // 여기에서 선택한 서브 메뉴에 대한 추가적인 로직을 수행할 수 있습니다.
  };



  return (
    <AppBar
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
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={document.getElementById('menu-icon')}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            anchorOrigin={{
              vertical: 'top',  // Set the vertical origin to 'bottom'
              horizontal: 'left',
            }}
            sx={{mt:"10vh"}}
          >
            <Paper sx={{ width: "250px", height: "220px", boxShadow: "none", fontFamily: "H5", fontSize: "20px", marginLeft: "10px", letterSpacing: "1px", lineHeight: "1.5",   }}>
              {menuItems.map((item, index) => (
                <div key={index} onMouseEnter={() => handleCategoryClick(index)}>
                  {item.label}
                  {selectedCategory === index && (
                    <>
                      <SubMenu
                        subMenu={item.subMenu}
                        top={subMenuPosition.top}
                        left={subMenuPosition.left}
                        onSubMenuItemClick={handleSubMenuItemClick}
                      />
                    </>
                  )}
                </div>
              ))}
            </Paper>
          </Menu>
        </div>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontFamily: "Logo", fontSize: "40px" }}
          >
            DalKom.Shop
          </Typography>
        </Link>
        <Input
          disabled={false}
          placeholder="원하시는 상품을 검색해주세요"
          startDecorator={<SearchIcon />}
          variant="outlined"
          sx={{ width: "30vw", height: "50px", borderRadius: "50px" }}
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
