import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "styled-components";

export const ProductReview = ({ info }) => {
  console.log(info);

  return (
    <div>
      {info && (
        <Box sx={{ mt: 2 }}>
          <img
            src={info.productCompareDetailDto.imageUrl}
            alt={info.productCompareDetailDto.productName}
            style={{ width: "15vw", height: "15vw" }}
          />
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555", marginTop: "2vw" }}
          >
            상품명
          </Typography>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.productCompareDetailDto.productName}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            가격
          </Typography>
          <StyledTypoGraphy style={{fontWeight : "bold", color : "#203461"}}>
            {Number(info.productCompareDetailDto.price).toLocaleString()}
          </StyledTypoGraphy>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            평점
          </Typography>
          <StyledTypoGraphy style={{color : "gold"}}>
            {info.rating}
          </StyledTypoGraphy>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            리뷰 수
          </Typography>
          <StyledTypoGraphy style={{color : "#F6A0BD"}}>
            {info.reviewNum}
          </StyledTypoGraphy>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            평점이 높은 리뷰
          </Typography>
          <StyledTypoGraphy style={{color : "#00E676"}}>
            {/*{info.goodReviewSummery.split(",").map((review, index) => (*/}
            {/*  <span key={index}>*/}
            {/*    <div dangerouslySetInnerHTML={{ __html: review.trim() }} />*/}
            {/*    /!* {review.trim()} *!/*/}
            {/*    <br />*/}
            {/*  </span>*/}
            {/*))}*/}
            {info.goodReviewSummery}
          </StyledTypoGraphy>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            평점이 낮은 리뷰
          </Typography>
          <StyledTypoGraphy style={{color : "#F44336"}}>
            {/*{info.badReviewSummery.split(",").map((review, index) => (*/}
            {/*  <span key={index}>*/}
            {/*    <div dangerouslySetInnerHTML={{ __html: review.trim() }} />*/}
            {/*    <br />*/}
            {/*  </span>*/}
            {/*))}*/}
            {info.badReviewSummery}
          </StyledTypoGraphy>
        </Box>
      )}
    </div>
  );
};

const StyledTypoGraphy = styled(Typography)`
  font-size: 25px;
  color: "#00000099";
  margin-bottom: 3vh;
`
