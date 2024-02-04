import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import { StarRating } from "../atoms/StarRating";
import { Link } from "react-router-dom";

export const MainProductCard = ({ imageUrl, title, price, star, review, seq }) => {

  return (
    <Link to={`/product/${seq}`}>
      <SungjunCard>
        <CardImage src={imageUrl} alt="카드 이미지" />
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
                marginBottom: "7px",
              }}
            >
              <img
                src="/images/M-1.png"
                alt="마일리지"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              {price}
            </Typography>
          </CardDescription>
          <CardDescription>
            <StarRating
              star={Math.round(Number(star))}
              rating={star}
            ></StarRating>
            <Typography>리뷰 : {review} 개</Typography>
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
  box-shadow: none;

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
  padding: 1vh;
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardDescription = styled.div`
  font-size: 14px;
`;
