import React, { useState } from "react";
import styled from "styled-components";
import LoginPage from "assets/images/LoginPage.jpg";
import character from "assets/images/character.png";
import "assets/font/font.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import { DefaultAxios } from "apis/CommonAxios";
import TextField from "@mui/material/TextField";
import StyledSwitchLabels from "components/atoms/SwitchLabels";
import TextButton from "components/atoms/TextButton";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

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
  const { register, handleSubmit } = useForm();
  const [mode, setMode] = useState("user");

  const navigate = useNavigate();

  const handleModeChange = (isAdmin) => {
    setMode(isAdmin ? "admin" : "user");
  };

  const signIn = async (data) => {
    try {
      if (mode === "user") {
        const res = await DefaultAxios.post("api/user/login", data);
        console.log(res.data.result.data);
        const tokenData = res.data.result.data;
        localStorage.setItem("accessToken", tokenData.accessToken);
        localStorage.setItem("mileage", tokenData.mileage);
        navigate("/");
      } else {
        const res = await DefaultAxios.post("api/admin/login", data);
        const tokenData = res.data.result.data;
        localStorage.setItem("accessToken", tokenData.accessToken);
        localStorage.setItem("role", tokenData.role);
        navigate("/admin/list");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "헉!!!",
        text: "로그인에 실패하였어요!",
        // footer: `${e.response.data.result.msg}`,

        footer:
          "자세한 이유는 백엔드의 에러 코드가 전부 구현됐을 때에 알 수 있습니다!",
      });
      console.log(e);
    }
  };

  return (
    <Base>
      <Body>
        <Img src={character} />
        <Text>DalKom.Shop</Text>
        <form
          onSubmit={handleSubmit((data) => {
            signIn(data);
          })}
        >
          <StyledSwitchLabels
            isAdminMode={mode === "admin"}
            onModeChange={handleModeChange}
          />
          <InputWrapper>
            <StyleTextField
              id="email"
              label="이메일"
              variant="outlined"
              placeholder="이메일을 입력하세요."
              {...register("email")}
            />
            <StyleTextField
              id="password"
              label="비밀번호"
              variant="outlined"
              placeholder="비밀번호를 입력하세요."
              type={"password"}
              {...register("password")}
            />
          </InputWrapper>

          <Find>
            <TextButton left to="/signUp" text="회원가입" />
            <TextButton right to="/signUp" text="이메일 | 비밀번호 찾기" />
          </Find>
          <CenterDiv>
            <CustomButton type="submit" variant="contained">
              로그인
            </CustomButton>
          </CenterDiv>
        </form>
      </Body>
    </Base>
  );
};

export default Login;

const StyleTextField = styled(TextField)`
  width: 525px;
  background-color: #fbfcfe;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* 추가: 요소를 수직으로 가운데 정렬 */
  gap: 10px;
  margin-bottom: 7px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 추가: 요소를 수직으로 가운데 정렬 */
`;
