import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Paper, Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

// MainBody코드
const MainBody = () => {

  const bannerCardData = [
    { image: "", title: "제목 1" },
    { image: "이미지2의 경로", title: "제목 2" },
    { image: "이미지3의 경로", title: "제목 3" },
    // 필요에 따라 더 추가하세요
  ];

  return (
    <div>
      <StyledCarousel>
      <StyledPaper>
          <StyledGrid container spacing={3}>
            {bannerCardData.map((card, index) => (
              <BannerCard key={index} item xs={4} image={card.image} title={card.title} />
            ))}
          </StyledGrid>
        </StyledPaper>


        <StyledPaper>
            <StyledGrid container spacing={3}>
                <BannerCard item xs={4}/>
                <Grid item xs={1}></Grid>
                <BannerCard item xs={4}/>
                <Grid item xs={1}></Grid>
                <BannerCard item xs={4}/>
            </StyledGrid>
        </StyledPaper>
      </StyledCarousel>
    </div>
  );
};

const StyledCarousel = styled(Carousel)`
    height : 500px;  
    justify-content: center;
  align-items: center;
  margin-top: 5px; /* Carousel 상단 여백 조절 */
`;

const StyledPaper = styled(Paper)`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export default MainBody;

// BannerCard 이미지를 
const BannerCard = ({ image, title }) => {
  return (
    <SungjunCard>
      <CardImage src={image} alt="카드 이미지" />
      <CardContent>
        <CardTitle>{title}</CardTitle>
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
    opacity : 1;
  }
`;

const CardTitle = styled(Typography)`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;