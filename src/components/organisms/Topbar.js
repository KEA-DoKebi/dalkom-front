import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Input from "@mui/joy/Input";
import "assets/font/font.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TokenAxios } from "apis/CommonAxios";

const SubMenu = ({ subMenu, categorySeq }) => {
  return (
    <Paper
      sx={{
        width: "300px",
        boxShadow: "none",
        fontFamily: "H5",
        fontSize: "20px",
      }}
    >
      {subMenu.map((item, index) => (
        <div
          key={item.seq}
          // onClick={() => onSubMenuItemClick(item.title)}
          style={{ fontWeight: "normal", marginRight : "60px" }}
        >
          <CustomLink to={`/category/${categorySeq}/sub/${item.seq}?page=1`}>
            <CustomText>{item.title}</CustomText> 
          </CustomLink>
        </div>
      ))}
    </Paper>
  );
};

const Topbar = () => {
  const [subMenuPosition ] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const [mileage, setMileage] = useState(0);
  const location = useLocation();
  

  const menuItems = [
    {
      label: "패션/뷰티",
      seq: 1,
      subMenu: [
        { title: "여성", seq: 7 },
        { title: "남성", seq: 8 },
        { title: "신발", seq: 9 },
        { title: "기타", seq: 10 },
        { title: "메이크업", seq: 11 },
        { title: "향수", seq: 12 },
      ],
    },
    {
      label: "생활",
      seq: 2,
      subMenu: [
        { title: "욕실", seq: 13 },
        { title: "주방", seq: 14 },
        { title: "반려동물", seq: 15 },
        { title: "자동차용품", seq: 16 },
      ],
    },
    {
      label: "디지털/가전",
      seq: 3,
      subMenu: [
        { title: "영상가전", seq: 17 },
        { title: "생활가전", seq: 18 },
        { title: "건강가전", seq: 19 },
        { title: "주방가전", seq: 20 },
      ],
    },
    {
      label: "출산/유아동",
      seq: 4,
      subMenu: [
        { title: "유아동의류", seq: 21 },
        { title: "분유/기저귀", seq: 22 },
        { title: "출산용품", seq: 23 },
        { title: "완구/교구", seq: 24 },
      ],
    },
    {
      label: "스포츠/레저",
      seq: 5,
      subMenu: [
        { title: "등산", seq: 25 },
        { title: "캠핑", seq: 26 },
        { title: "낚시", seq: 27 },
        { title: "헬스", seq: 28 },
        { title: "수영", seq: 29 },
        { title: "골프", seq: 30 },
        { title: "자전거", seq: 31 },
      ],
    },
    {
      label: "카카오굿즈",
      seq: 6,
      subMenu: [{ title: "카카오굿즈", seq: 32 }],
    },
  ];

  
  

  const [menuOpen, setMenuOpen] = useState(false);
  const [, setMenuPosition] = useState({ top: 0, left: 0 });

  // MenuIcon 클릭 시 실행될 함수
  const handleMenuClick = (event) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top, left });
    setMenuOpen(!menuOpen);
  };

  const logout = async() => {
    try{
      const res = await TokenAxios.post(`/api/user/logout`);
      console.log(res.data);
    }catch(e){
      console.log(e);
    }

  }

  const handleSearchBar = (e) => {
    if (e.key === 'Enter') {
      const searchKeyword = e.target.value
      console.log(e.target.value);
      navigate(`/search?searchKeyword=${searchKeyword}&page=1`)
      console.log('검색 실행:', searchKeyword);
    }
   
  }


  // const handleSubMenuIteClick = (categorySeq ,subMenu) => {
  //   navigate(`/category/${categorySeq}/sub/${subMenu.seq}`)
  //   // 여기에서 선택한 서브 메뉴에 대한 추가적인 로직을 수행할 수 있습니다.
  // };

  const handleLogout = (event) => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  const getMileage = async() => {
    const res = await TokenAxios("/api/mileage/user");
    setMileage(res.data.result.data);
    localStorage.setItem("mileage", res.data.result.data);
  }

  useEffect(() => {
    getMileage();
  },[location.pathname])

  return (
    <AppBar
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        boxShadow: "none",
        mt: "-25px",
        position: "fixed",
      }}
    >
        <Toolbar
            variant="dense"
            sx={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                maxHeight: "5vh",
                marginTop: "0.5vh"
            }}
        >
            {/* <Button sx={{ color: "black" }}>로그아웃</Button>|
            <Button sx={{ color: "black" }}>마이페이지</Button> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "200px",
                    marginRight: "8vh"
                }}
            >
                <CustomLink
                    to="/login"
                    style={{
                        display: "flex",
                        fontSize: "15px",
                        color: "gray",
                        marginRight: "10px",
                    }}
                    onClick={handleLogout}
                >
                    로그아웃
                </CustomLink>
                <CustomLink
                    to="/mypage/order/list"
                    style={{
                        fontSize: "15px",
                        color: "gray",
                    }}
                >
                    마이페이지
                </CustomLink>
            </div>
        </Toolbar>
        <Toolbar sx={{
            justifyContent: "space-between",
            height: "100px",
            minHeight: "100px",
            maxHeight: "110px",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
            paddingTop: "0px",
            paddingBottom: "10px",
        }}>
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
            anchorEl={document.getElementById("menu-icon")}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            anchorOrigin={{
              vertical: "top", // Set the vertical origin to 'bottom'
              horizontal: "left",
            }}
            sx={{ mt: "10vh"}}
          >
            <Paper
              sx={{
                width: "275px",
                height: "1200px",
                boxShadow: "none",
                fontFamily: "H5",
                marginLeft: "10px",
                lineHeight: "3",
              }}
            >
              {menuItems.map((item, index) => (
                <div style={{marginBottom : "30px"}}>
                  <div
                    key={index}
                  >
                    <CategoryText>{`${item.label}`}</CategoryText> 
                  </div>
                  <div style={{textAlign : "center"}}>
                      <SubMenu
                        subMenu={item.subMenu}
                        top={subMenuPosition.top}
                        left={subMenuPosition.left}
                        categorySeq={item.seq}
                      />
                  </div>
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
          onKeyDown={(e) =>handleSearchBar(e)}
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
              justifyContent : "center",
            }}
          >
            <CustomLink to="/cart">
                <IconButton>
                    <img
                        src="/images/cart.svg"
                        alt="장바구니"
                        style={{ width: '36px', height: '36px' }}
                    />
                </IconButton>
                <Typography>장바구니</Typography>
            </CustomLink>
          </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
          >
            <CustomLink to="/mypage/order/list">
                <IconButton>
                    <img
                      src="/images/delivery.svg"
                      alt="배송조회"
                      style={{ width: '36px', height: '36px' }}
                    />
                </IconButton>
                <Typography>배송조회</Typography>
            </CustomLink>
            </div>
            <div
                style={{
                    display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomLink to="/cs/notice">
                <IconButton>
                    <img
                        src="/images/cs.svg"
                        alt="고객센터"
                        style={{ width: '36px', height: '36px' }}
                    />
                </IconButton>
                <Typography>고객센터</Typography>
            </CustomLink>
            </div>
        </div>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "200px",
                marginRight: "8vh"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to = "/mypage/mile">
              <img
                src="/images/M-user.png"
                alt="유저 마일리지"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "30px" }}>
              {mileage.toLocaleString()}
            </Typography>
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

const CategoryText = styled.div`
  font-size: 15px;
  line-height: 3;
  font-weight: bold;
`;

const CustomText = styled(Typography)`
  font-size : 15px;
  line-height : 3;
  
  &:hover {
    color: blue;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

// 큰 div박스 1개에 작은 div박스 두개 넣은 다음에 눌렀을 때 
/* 
  일단 왼쪽 div박스에 상위 카테고리 목록 쫙뿌리고
  오른쪽 div박스에는 하위 카테고리 목록 쫙 뿌리자.
  
*/

export default Topbar;
