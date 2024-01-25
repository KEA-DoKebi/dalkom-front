import React, { useEffect } from "react";
import styled from "styled-components";
import LoginPage from "assets/images/LoginPage.jpg";
import character from "assets/images/character.png";
import "assets/font/font.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import { DefaultAxios } from "apis/CommonAxios";
import StyledSwitchLabels from "components/atoms/SwitchLabels";
import FloatingLabelInput from "components/molecules/FloatingLabelInput";
import TextButton from "components/atoms/TextButton";

const Base = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${LoginPage});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const Body = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

const Img = styled.img`
  width: 10%;
  height: auto;
  position: absolute;
  transform: translate(32%, -95%);
`;

const Text = styled.h1`
  font-size: 60px;
  fontfamily: Logo;
  margin: 0;
  text-align: center;
`;

const Find = styled.div`
  display: flex;
`;

const CustomButton = muiStyled(Button)({
  backgroundColor: "#FFD465", // 배경색
  color: "#000000", // 글씨색
  "&:hover": {
    backgroundColor: "#FFD465", // 클릭 시의 배경색
  },
  width: "150px", // 너비
  height: "50px", // 높이
  fontSize: "20px",
  alignSelf: "center",
});

const Login = () => {
  const textAxios = async () => {
    const res = await DefaultAxios.post("/api/user/login", {
      email: "example075@example.com",
      password: "1234qwer!",
    });

    console.log(res.data);
  };

  useEffect(() => {
    textAxios();
  }, []);

  return (
    <Base>
      <Body>
        <Img src={character} />
        <Text>DalKom.Shop</Text>
        <StyledSwitchLabels />
        <FloatingLabelInput
          inputType="text"
          label="이메일"
          placeholder="이메일를 입력하세요"
        />
        <FloatingLabelInput
          inputType="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
        />
        <Find>
          <TextButton left to="/signUp" text="회원가입" />
          <TextButton right to="/signUp" text="이메일 | 비밀번호 찾기" />
        </Find>
        <CustomButton variant="contained" component={Link} to="/">
          로그인
        </CustomButton>
      </Body>
    </Base>
  );
};

export default Login;
