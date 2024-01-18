import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Paper } from "@mui/material";
import CustomCard from "../../../CustomCard";
import styled from "@emotion/styled";
import BannerCard from "../../../BannerCard";
const MainBody = () => {
  
  return (
    <div>
      <StyledCarousel>
        <StyledPaper>
            <StyledGrid container spacing={3}>
                <BannerCard item xs={4}/>
                <Grid item xs={1}></Grid>
                <BannerCard item xs={4}/>
                <Grid item xs={1}></Grid>
                <BannerCard item xs={4}/>
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
