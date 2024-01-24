import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
const StyledCarousel = styled(Carousel)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow:cover;

    .react-multiple-carousel__track {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        height: 100%;
        overflow:cover;
    }

    .react-multiple-carousel__slide {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow:cover;
    }
`;

const StyledPaper = styled(Paper)`
    height : 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
`

const BannerImage = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    width : 100%;
    height: auto;
    overflow: hidden;
`;

const Stepper = () => {
    return (
        <StyledCarousel >
            <StyledPaper 
            sx={{
            height: "100%",
            display: 'block',
            maxWidth: "100%",
            overflow: 'hidden',
          }}>
            <BannerImage src="/images/ProductListPage/sample.jpg" />

            </StyledPaper>
            <StyledPaper
            sx={{
                height: "95%",
                display: 'block',
                maxWidth: "100%",
                overflow: 'hidden',
              }}>
            <BannerImage src="/images/MainPage/dokebiBanner2.png" />

            </StyledPaper>
            <StyledPaper
            sx={{
                height: "80%",
                display: 'block',
                maxWidth: "100%",
                overflow: 'hidden',
              }}>
            <BannerImage src="/images/MainPage/dokebiBanner3.png" />

            </StyledPaper>
        </StyledCarousel>
    );
}

export default Stepper;
