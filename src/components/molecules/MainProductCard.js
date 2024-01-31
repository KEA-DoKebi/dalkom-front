import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import { StarRating } from "../atoms/StarRating";
import { Link } from "react-router-dom";
import { Button } from "react-scroll";
import { productImageStore } from "store/store";
import Swal from "sweetalert2";

export const MainProductCard = ({ imageUrl, title, price, star, review, seq }) => {
  
  const {addImageList, addSeq, imageList} = productImageStore((state) => state);

  const handleAddButtonClick = () => {
    if(imageList.length < 3){
      addImageList(imageUrl);
      addSeq(seq);
    }
    else{
      Swal.fire("이미지를 3개까지만 넣을 수 있습니다!", "", "info");
    }
  }

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
