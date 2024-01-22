import React, { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Manual from "./Manual";
import { Link } from "react-router-dom/dist";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 9%;
  margin-right: 9%;
  align-items: center;
  margin-top: -8vh;
  margin-bottom: 30px;
`;

const TextL = styled.h1`
  font-size: 30px;
`;

const Choice = styled.div`
  display: flex;
  gap: 5px;
  background-color: #f8fafc;
  border-radius: 50px;
  border: 1px solid;
  padding: 0 20px;
`;

const StyledButton = styled(Button)`
  color: #000000;
  font-size: 20px;
  margin-left: 5px;
  margin-eight: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

<<<<<<< HEAD:src/pages/User/CustomerService.js

// CustomerService 컴포넌트에서 Body 부분 수정
const CustomerService = () => {
    const [activeButton, setActiveButton] = useState("이용안내");
  
    // const handleButtonClick = (menuButton) => {
    //   setActiveButton(menuButton);
    // };
  
    return (
      <DefaultLayout>
        <Top>
          <TextL>고객센터</TextL>
          <Choice>
            <StyledButton>
              <Link to="/manual">이용안내</Link> 
            </StyledButton>
            <StyledButton>
              <Link to="/notice">공지사항</Link>
            </StyledButton>
            <StyledButton>
              FAQ
            </StyledButton>
          </Choice>
        </Top>
        <Body>
          <Manual active={activeButton === "이용안내"}/>
          
        </Body>
      </DefaultLayout>
    );
=======
const Content2 = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  /* Content2에 해당하는 스타일 */
`;

const Content3 = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  /* Content3에 해당하는 스타일 */
`;

// CustomerService 컴포넌트에서 Body 부분 수정
const CustomerService = () => {
  const [activeButton, setActiveButton] = useState("이용안내");

  const handleButtonClick = (button) => {
    setActiveButton(button);
>>>>>>> 794ff9cf6560d0e5c3793b39c4e7eb6933397f9b:src/components/CustomerService.js
  };

  return (
    <DefaultLayout>
      <Top>
        <TextL>고객센터</TextL>
        <Choice>
          <StyledButton onClick={() => handleButtonClick("이용안내")}>
            이용안내
          </StyledButton>
          <StyledButton onClick={() => handleButtonClick("공지사항")}>
            공지사항
          </StyledButton>
          <StyledButton onClick={() => handleButtonClick("FAQ")}>
            FAQ
          </StyledButton>
        </Choice>
      </Top>
      <Body>
        <Manual active={activeButton === "이용안내"}>이용안내 내용</Manual>
        <Content2 active={activeButton === "공지사항"}>공지사항 내용</Content2>
        <Content3 active={activeButton === "FAQ"}>FAQ 내용</Content3>
      </Body>
    </DefaultLayout>
  );
};

export default CustomerService;
