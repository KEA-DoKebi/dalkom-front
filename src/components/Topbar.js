import React from "react";
import {
  Button,
  Divider,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Input } from "@mui/joy";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import "../font/font.css";

const Topbar = () => {
  return (
    <Box sx={{ width: "100%", height: "120px" }}>
      <Box sx={{ height: "30px" }}>
        <Grid
          container
          justifyContent="flex-end"
          direction="row"
          alignItems="center"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "100px",
            }}
          >
            <Button sx={{ color: "black", width: "80px" }}>
              <Typography variant="h8">로그아웃</Typography>
            </Button>
            |
            <Button sx={{ color: "black", width: "80px" }}>
              <Typography variant="h8">마이페이지</Typography>
            </Button>
          </div>
        </Grid>
      </Box>
      <Divider sx={{ height: "1px", color: "#000000" }} />
      <Box sx={{ height: "80px" }}>
        <Grid
          container
          justifyContent="space-evenly"
          direction="row"
          alignItems="center"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton>
              <MenuIcon sx={{ fontSize: "40px", color: "black" }} />
            </IconButton>
          </div>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{
                  fontFamily: "Logo",
                  color: "#000000",
                  fontSize: "40px",
                }}
              >
                DalKom.Shop
              </Typography>
            </Link>
          </div>
          <div>
            <Input
              startDecorator={<SearchIcon />}
              sx={{ height: "50px", width: "550px", borderRadius: "100px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row", // 변경
              alignItems: "center",
              justifyContent: "space-around", // 변경
              width: "250px", // 변경
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton>
                <ShoppingCartCheckoutIcon
                  sx={{ fontSize: "40px", color: "black" }}
                />
              </IconButton>
              <Typography variant="body2">장바구니</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton>
                <LocalShippingOutlinedIcon
                  sx={{ fontSize: "40px", color: "black" }}
                />
              </IconButton>
              <Typography variant="body2">배송조회</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton>
                <SupportAgentIcon sx={{ fontSize: "40px", color: "black" }} />
              </IconButton>
              <Typography variant="body2">고객센터</Typography>
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
              <IconButton>
                <AttachMoneyIcon sx={{ fontSize: "40px", color: "black" }} />
              </IconButton>
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
        </Grid>
      </Box>
      <Divider sx={{color: "#000000"}}/>
    </Box>
  );
};

export default Topbar;
