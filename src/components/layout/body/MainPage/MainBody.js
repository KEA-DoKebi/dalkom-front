import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import KaKaoFriendsImage from "/images/kakaofriends/webp"

// MainBody코드
const MainBody = () => {

  return (
    <div>
      <StyledCarousel>   

        <StyledPaper sx={{backgroundColor : "#F5F7FB"}}>
            <Link to="/category/1">
              <BannerImage src="/images/MainPage/kakaofriends.webp"/>
            </Link>
        </StyledPaper>

        <StyledPaper sx={{backgroundColor : "#F0CD4C"}}>
            <Link to="/category/1">
              <BannerImage src="/images/MainPage/kakao2.jpeg"/>
            </Link>
        </StyledPaper>

      </StyledCarousel>
      
    </div>
  );
};

const StyledCarousel = styled(Carousel)`  
  justify-content: center;
  align-items: center;
  margin-top: 5px; /* Carousel 상단 여백 조절 */
`;

const StyledPaper = styled(Paper)`
  display: flex;
  height: 350px;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled.img`
  display : flex;
  justify-content: center;
  height : 300px;
`


export default MainBody;