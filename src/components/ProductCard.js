import React from "react";
import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import { StarRating } from "./StarRating";
import { Link } from "react-router-dom";

export const ProductCard = ({ imageUrl, title, price, star, review, seq }) => {
  return (
    <Link to={`/product/${seq}`}>
      <SungjunCard>
        <CardImage src={imageUrl} alt="카드 이미지" />
        <HoverCardContent>
          <HoverCardTitle>★({star})</HoverCardTitle>
        </HoverCardContent>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{price}원</CardDescription>
          <CardDescription>
            <StarRating
              star={Math.round(Number(star))}
              rating={star}
            ></StarRating>
            <Typography>리뷰 : {review}</Typography>
          </CardDescription>
        </CardContent>
      </SungjunCard>
    </Link>
  );
};

const SungjunCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 175px;
  object-fit: cover;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardDescription = styled.div`
  font-size: 14px;
`;

const HoverCardContent = styled.div`
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
  transition: opacity 0.1s ease; /* 투명도 변경 시 부드럽게 변화하도록 설정 */

  &:hover {
    opacity: 1;
  }
`;

const HoverCardTitle = styled(Typography)`
  color: gold;
  font-size: 24px;
  font-weight: bold;
`;
