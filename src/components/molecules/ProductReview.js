import { Box, Typography } from "@mui/material";
import React from "react";

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
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
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
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.productCompareDetailDto.price}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            평점
          </Typography>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.rating}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            리뷰 수
          </Typography>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.reviewNum}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            긍정적인 리뷰
          </Typography>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.goodReviewSummery.split(",").map((review, index) => (
              <span key={index}>
                {review.trim()}
                <br />
              </span>
            ))}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
          >
            부정적인 리뷰
          </Typography>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000000",
              mb: "3vh",
            }}
          >
            {info.badReviewSummery.split(",").map((review, index) => (
              <span key={index}>
                {review.trim()}
                <br />
              </span>
            ))}
          </Typography>
        </Box>
      )}
    </div>
  );
};
