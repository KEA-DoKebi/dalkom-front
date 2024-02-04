import React from "react";
import DefaultLayout from "./DefaultLayout";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom/dist";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 9%;
  margin-right: 9%;
  align-items: center;
  margin-top: -1vh;
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
`;

// Link 컴포넌트를 위한 별도의 스타일드 컴포넌트
const StyledLink = styled(Link)`
  color: #000000; // 링크 색상을 검은색으로 설정
  text-decoration: none; // 링크 밑줄 제거

  &:visited {
    color: #000000; // 방문한 링크 색상을 검은색으로 유지
  }

  &:hover, &:active {
    color: #000000; // 링크 마우스 오버나 클릭 시 색상을 검은색으로 유지
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

// CustomerService 컴포넌트에서 Body 부분 수정
export const CustomerServiceLayout = ({ children }) => {
  // const [activeButton, setActiveButton] = useState("이용안내");

  return (
    <DefaultLayout>
      <Top>
        <TextL>고객센터</TextL>
        <Choice>
          <StyledButton>
            <StyledLink to="/cs/manual">이용안내</StyledLink>
          </StyledButton>
          <StyledButton>
            <StyledLink to="/cs/notice">공지사항</StyledLink>
          </StyledButton>
          <StyledButton>
            <StyledLink to="/cs/user-faq">FAQ</StyledLink>
          </StyledButton>
        </Choice>
      </Top>
      <Body>{children}</Body>
    </DefaultLayout>
  );
};
