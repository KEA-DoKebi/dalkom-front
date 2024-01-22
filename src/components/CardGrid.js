import React from "react";
import { Card, Grid } from "@mui/material";
import styled from "@emotion/styled";
import FokerCard from "assets/images/card.jpg";

const CardGrid = () => {
  // 행의 개수를 원하는 숫자로 대체하세요
  const numberOfRows = 100;

  return (
    <Grid container spacing={3} mt={5}>
      {[...Array(numberOfRows)].map((_, row) => (
        <Grid item xs={4} key={row}>
          <Card>
            <CardImage src={FokerCard} alt="카드 이미지" />
            <CardContent>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명</CardDescription>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// 카드 콘텐츠를 위한 스타일드 컴포넌트
const CardImage = styled.img`
  width: 100%;
  height: 150px; /* 필요에 따라 높이 조절하세요 */
  object-fit: cover;
`;

const CardContent = styled.div`
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

export default CardGrid;
