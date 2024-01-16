import React from "react";
import styled from "styled-components";
import {colors} from "../../styles/commonTheme";
import signUpImage from "../../images/signUpPage.png"

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


const SignUp = () => {
  return (
    <Base>
      <Body>
        <Img>
          <Img_ src = {signUpImage} />
        </Img>
      </Body>
    </Base>
  );
};

export default SignUp;
