import React from "react";
import styled from "styled-components";

import { colors } from "styles/commonTheme";
import signUpImage from "assets/images/signUpPage.png"
import "assets/font/font.css"
import FloatingLabelInput from "components/FloatingLabelInput"
import AddressField from "components/AddressField";
import BasicDatePicker from "components/BasicDatePicker";
import StyledButton from "components/StyledButton";

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
  width: 1300px;
  height: 800px;
  display: flex;

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
  width: 10%
  height: auto
  position: absolute;
  transform: translate(-31%, 45%);
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

const SignUp = () => {
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
          <InputWrapper>
            <FloatingLabelInput
              inputType="email"
              label="이메일"
              placeholder="이메일를 입력하세요"
            />
            <FloatingLabelInput
              inputType="text"
              label="닉네임"
              placeholder="닉네임를 입력하세요"
            />
            <FloatingLabelInput
              inputType="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
            />
            <FloatingLabelInput
              inputType="password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
            />
            <FloatingLabelInput
              inputType="text"
              label="이름"
              placeholder="이름을 입력하세요."
            />
            <FloatingLabelInput
              inputType="text"
              label="사원번호"
              placeholder="사원번호를 입력하세요"
            />
            <BasicDatePicker />
            <AddressField />
            <StyledButton />
          </InputWrapper>
        </Container>
      </Body>
    </Base>
  );
};

export default SignUp;
