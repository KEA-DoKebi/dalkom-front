import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

// 좌/우 정렬 및 스타일 적용된 커스텀 버튼
const StyledButton = styled(Button)(({ left, right }) => ({
  display: "flex",
  justifyContent: `${left ? "flex-start" : right ? "flex-end" : "space-between"}`, // 좌/우 정렬
  width: "50%",
  padding: "8px 16px", // 내용 주변의 여백 조정
  maxWidth: "50%",
  color: "#000000",
}));

const TextButton = ({ left, right, to, text }) => {
  return (
    <StyledButton component={Link} to={to} left={left} right={right}>
      <span>{text}</span>
    </StyledButton>
  );
};

export default TextButton;
