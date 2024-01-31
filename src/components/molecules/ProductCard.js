import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import { StarRating } from "../atoms/StarRating";
import { Link } from "react-router-dom";
import { Button } from "react-scroll";

export const ProductCard = ({ imageUrl, title, price, star, review, seq }) => {
  
  return (
    <Link to={`/product/${seq}`}>
      <SungjunCard>
        <CardImage src={imageUrl} alt="카드 이미지" />
        <HoverCardContent>
          <HoverCardTitle>★({star})</HoverCardTitle>
          <HoverCardButton variant="contained" onClick={() => console.log("안녕")}>
            <Typography sx={{fontSize : "15px", fontWeight : "bold", fontFamily : "Noto Sans"}}>➕상품 비교</Typography>
          </HoverCardButton>
        </HoverCardContent>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription> 
            {/* <img src="/images/M-user.png" width="15px" height="15px"/>  {price} */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                marginBottom : "7px",
              }}
            >
              <img
                src="/images/M-1.png"
                alt="마일리지"
                style={{ width: "20px", height: "20px", marginRight : "5px", }}
              />
              {price}
            </Typography>
          </CardDescription>
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

const HoverCardButton = styled(Button)`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(255,255,255,0.7);
  color: rgba(0,0,0,0.7);
  width: 100px;
  height: 23px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background-color: rgba(255,255,255,1);
    color: rgba(0,0,0,1);
  }
`