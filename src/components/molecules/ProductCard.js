import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import { StarRating } from "../atoms/StarRating";
import { Link } from "react-router-dom";
import { Button } from "react-scroll";
import { productImageStore } from "store/store";
import Swal from "sweetalert2";

export const ProductCard = ({ imageUrl, title, price, star, review, seq, categorySeq, state }) => {
  
  const {addImageList, addSeq, imageList, seqList, subCategorySeq, setSubCategorySeq} = productImageStore((state) => state);

  const handleAddButtonClick = () => {
    console.log("카드에서 받아오는 카테고리" + categorySeq);
    console.log("상태에서 받아오는 카테고리" + subCategorySeq);

    if (!seqList.includes(seq)) {
      if (subCategorySeq === 0 || categorySeq === subCategorySeq) {
        if (imageList.length < 3) {
          addImageList(imageUrl);
          addSeq(seq);
          setSubCategorySeq(categorySeq);
        } else {
          Swal.fire({
            //
            position: "center",
            icon: "warning",
            title: "비교 상품은 3개까지만<br> 담을 수 있습니다.",
            showConfirmButton: true,
            confirmButtonColor: "black",
            confirmButtonText: "확인",
          });
        }
      } else {
        Swal.fire({
          //
          position: "center",
          icon: "warning",
          title: "같은 카테고리의 상품만<br> 담을 수 있습니다.",
          showConfirmButton: true,
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        });
      }
    }
  };

  return (
    <Link to={`/product/${seq}/상품상세`} data-cy={`product-card-link-${seq}`}>
      <SungjunCard data-cy={`product-card-${seq}`}>
        <CardImage src={imageUrl} alt="카드 이미지"/>
        <HoverCardContent data-cy={`hover-content-${seq}`}>
          <HoverCardTitle data-cy={`hover-title-${seq}`}>★ {(star ?? 0).toFixed(1)}</HoverCardTitle>
          <HoverCardButton 
            variant="contained" 
            onClick={handleAddButtonClick}
            data-cy={`compare-btn-${seq}`}  
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                lineHeight: "normal",
              }}
              data-cy={`compare-text-${seq}`}
            >
              ➕ 상품 비교
            </Typography>
          </HoverCardButton>
        </HoverCardContent>
        <CardContent data-cy={`card-content-${seq}`}>
          <CardTitle data-cy={`card-title-${seq}`}>{title}</CardTitle>
          <CardDescription data-cy={`card-description-price-${seq}`}>
            {state === "Y" ? 
            (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "7px",
                }}
                data-cy={`card-price-${seq}`}
              >
                <img
                  src="/images/M-1.png"
                  alt="마일리지"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                  data-cy={`card-mileage-icon-${seq}`}
                />
                {Number(price).toLocaleString()}
              </Typography>
            ) 
            :
            <div>
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
            <Typography sx={{color: "gray", textDecoration:"line-through"}}> {Number(price).toLocaleString()} </Typography>
            <span style={{fontSize : "15px", marginLeft : "3px"}}>(품절)</span>
          </Typography>
          </div>  
          }
          </CardDescription>
          <CardDescription data-cy={`card-description-rating-${seq}`}>
            <StarRating
              star={Math.round(Number(star))}
              rating={star}
              data-cy={`star-rating-${seq}`}
            ></StarRating>
            <Typography data-cy={`review-count-${seq}`}>리뷰 : {review}</Typography>
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
  background-color: rgba(255, 255, 255, 0.7);
  color: rgba(0, 0, 0, 0.7);
  width: 100px;
  height: 23px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }
`;
