import React from "react";
import styled from "styled-components";
import {colors} from "../../styles/commonTheme";
import signUpImage from "../../images/signUpPage.png"
import "../../font/font.css"

const Base = styled.div`
  width:1920px;
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
  flex-direction: column;
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

  position: relative;
`;

const Img_ = styled.img`
  width: 10%
  height: auto
  position: absolute;
  transform: translate(-31%, 45%);
`;

const Title_small = styled.h2`
  font-size: 30px;
  fontFamily: Logo;
`;

const Title_Large = styled.h1`
  font-size: 35px;
  fontFamily: Logo;
`;

const Container = styled.div`
  margin-left: 20%;
  margin-top: 10%;
  display: flex;
  align-items: left;
  justify-content: center;
  background-color:  ${colors.$grey100};

`;

const SignUp = () => {
  return (
    <Base>
      <Body>
        <Img>
          <Img_ src = {signUpImage} />
        </Img>
        <Container>
            <Title_small>Welcome to </Title_small>
            <Title_Large>DalKom.Shop</Title_Large>
          </Container>
      </Body>
    </Base>
  );
};

export default SignUp;
