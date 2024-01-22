import React from "react";
import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import FokerCard from "../assets/images/card.jpg";

const BannerCard = () => {
  return (
    <SungjunCard>
      <CardImage src={FokerCard} alt="카드 이미지" />
      <CardContent>
        <CardTitle>카드 제목</CardTitle>
      </CardContent>
    </SungjunCard>
  );
};

const SungjunCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative; /* 상대 위치 설정 */

  &:hover {
    transform: translateY(-8px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85); /* 검정색, 투명도 조절 가능 */
  opacity: 0; /* 초기에는 투명하게 */
  transition: opacity 0.7s ease; /* 투명도 변경 시 부드럽게 변화하도록 설정 */

  &:hover {
    opacity: 1;
  }
`;

const CardTitle = styled(Typography)`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export default BannerCard;
