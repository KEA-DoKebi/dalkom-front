import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import { StarRating } from "../atoms/StarRating";
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
  position: relative; /* 이 부분 추가 */

  &:hover {
    transform: translateY(-8px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
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
  right: 0; /* 오른쪽 끝까지 확장되도록 */
  bottom: 0; /* 아래쪽 끝까지 확장되도록 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* 투명도 조정 */
  opacity: 0; /* 초기에는 투명하게 */
  transition: opacity 0.3s ease-in-out; /* 투명도 변경 시 부드럽게 변화하도록 설정 */
  z-index: 10; /* 다른 컨텐츠 위에 오도록 z-index 설정 */

  ${SungjunCard}:hover & {
    opacity: 1; /* SungjunCard에 호버할 때만 보이도록 */
  }
`;

const HoverCardTitle = styled(Typography)`
  color: gold;
  font-size: 24px;
  font-weight: bold;
`;
