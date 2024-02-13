import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/commonTheme";
import signUpImage from "assets/images/signUpPage.png";
import "assets/font/font.css";
import BasicDatePicker from "components/atoms/BasicDatePicker";
import { DefaultAxios } from "apis/CommonAxios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@mui/material";

const Base = styled.div`
  width: 1920px;
  height: 1080px;
  border-radius: 7px;
  background-color: ${colors.yellow_2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  width: auto;
  height: 800px;
  display: flex;
  padding-right: 5%;
  position: relative; 
  justify-content: flex-start;
  background-color: ${colors.white};
  border-radius: 20px;
  border: 1px solid;
  overflow: hidden;
`;

const Img = styled.div`
  width: 500px;
  height: 800px;
  background-color: ${colors.yellow_1};
`;

const Img2 = styled.img`
  width: 65%;
  height: auto;
  position: absolute;
  transform: translate(-36%, 50%);
`;

const TitleSmall = styled.h2`
  font-size: 30px;
  fontfamily: Logo;
  line-height: 35px;
`;

const TitleLarge = styled.h1`
  font-size: 35px;
  fontfamily: Logo;
  line-height: 35px;
`;

const Container = styled.div`
  margin-left: 5%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* 추가: 요소를 수직으로 가운데 정렬 */
  gap: 10px;
  margin-bottom: 7px;
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [joinedDate, setJoinedDate] = useState(null);
  const [isShowPw, setShowPwState] = useState(false);

  const password = watch("password");
  const comfirmPassword = watch("confirmPassword");

  const toggleHidePassword = () => {
    setShowPwState(!isShowPw);
  };

  const handleDateSelect = (date) => {
    // 여기서 date는 선택된 날짜 정보입니다.
    // 이 정보를 외부 API로 전송하거나, 다른 컴포넌트로 전달하는 등의 로직을 구현할 수 있습니다.
    setJoinedDate(date);
  };

  const navigate = useNavigate();

  const signUp = async (data) => {
    console.log(data);
    try {
      const res = await DefaultAxios.post("/api/user/sign-up", data);
      if (res.data.message === "회원가입 성공") {
        Swal.fire({
          //
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          showConfirmButton: true,
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (e) {
      // console.log(e);
      Swal.fire({
        //
        icon: "error",
        title: "회원가입에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
        footer: "등록된 임직원이 아닙니다.",
      });
    }
  };

  useEffect(() => {
    if (password && comfirmPassword && password !== comfirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, comfirmPassword, setError, clearErrors]);

  return (
    <Base>
      <Body>
        <Img>
          <Img2 src={signUpImage} />
        </Img>
        <Container>
          <TitleWrapper>
            <TitleSmall>Welcome to</TitleSmall>&nbsp;
            <TitleLarge>DalKom.Shop</TitleLarge>
          </TitleWrapper>
          <form
            onSubmit={handleSubmit((data) => {
              data.joinedAt = joinedDate;
              signUp(data);
            })}
          >
            <InputWrapper>
              <StyleTextField
                id="empId"
                label="사원번호"
                variant="outlined"
                placeholder="사원번호를 입력하세요."
                {...register("empId")}
              />
              <StyleTextField
                id="email"
                label="이메일"
                variant="outlined"
                placeholder="이메일을 입력하세요."
                {...register("email")}
              />
              <StyleTextField
                id="name"
                label="이름"
                variant="outlined"
                placeholder="이름을 입력하세요."
                {...register("name")}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <StyleTextField
                  id="password"
                  label="비밀번호"
                  type={isShowPw ? "text" : "password"}
                  variant="outlined"
                  placeholder="비밀번호를 입력하세요."
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
                <Icon onClick={toggleHidePassword}>
                  {isShowPw ? <FaEyeSlash /> : <FaEye />}
                </Icon>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <StyleTextField
                  id="confirmPassword"
                  label="비밀번호 확인"
                  type={isShowPw ? "text" : "password"}
                  variant="outlined"
                  placeholder="비밀번호를 다시 입력하세요."
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                />
                <Icon onClick={toggleHidePassword}>
                  {isShowPw ? <FaEyeSlash /> : <FaEye />}
                </Icon>
              </div>
              <StyleTextField
                id="nickname"
                label="닉네임"
                variant="outlined"
                placeholder="닉네임을 입력하세요."
                {...register("nickname")}
              />
              <BasicDatePicker onDateSelect={handleDateSelect} />
              <StyleTextField
                id="address"
                label="주소"
                variant="outlined"
                placeholder="주소를 입력하세요."
                {...register("address")}
              />
              {password === comfirmPassword ? (
                <CustomButton type="submit" variant="contained">
                  회원가입
                </CustomButton>
              ) : (
                <CustomButton disabled>회원가입</CustomButton>
              )}
            </InputWrapper>
          </form>
        </Container>
      </Body>
    </Base>
  );
};

export default SignUp;

const StyleTextField = styled(TextField)`
  width: 525px;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
  background-color: #fbfcfe;
`;

const Icon = styled.div`
  position: absolute;
  top: 20px;
  bottom: 0px;
  left: 93%;
  height: 30px;
  cursor: pointer;
`;
