import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { productImageStore } from "store/store";
import { styled } from "styled-components";

export const BottomMenu = () => {
  const { imageList, seqList, deleteImage, deleteSeq, subCategorySeq } =
    productImageStore((state) => state);

  const navigate = useNavigate();

  const handleDeleteBtnClicked = (imageUrl, seq) => {
    deleteImage(imageUrl);
    deleteSeq(seq);
  };

  const handleCompareBtnClicked = () => {
    navigate(`/comparison/${subCategorySeq}`);
  };

  return (
    <StyledPopUpContainer>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: "0.5vh", textAlign: "center", padding: "20px" }}>
          <StyledPopUpTitle>상품 비교하기</StyledPopUpTitle>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <ImageContainer>
            <StyledImage
              src={imageList[0] ? imageList[0] : "/images/defaultImage.png"}
            />
            <DeleteButton
              className="delete-btn"
              onClick={() => {
                handleDeleteBtnClicked(imageList[0], seqList[0]);
              }}
            >
              X
            </DeleteButton>
          </ImageContainer>
        </Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={3}>
          <ImageContainer>
            <StyledImage
              src={imageList[1] ? imageList[1] : "/images/defaultImage.png"}
            />
            <DeleteButton
              className="delete-btn"
              onClick={() => {
                handleDeleteBtnClicked(imageList[1], seqList[1]);
              }}
            >
              X
            </DeleteButton>
          </ImageContainer>
        </Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={3}>
          <ImageContainer>
            <StyledImage
              src={imageList[2] ? imageList[2] : "/images/defaultImage.png"}
            />
            <DeleteButton
              className="delete-btn"
              onClick={() => {
                handleDeleteBtnClicked(imageList[2], seqList[2]);
              }}
            >
              X
            </DeleteButton>
          </ImageContainer>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "1.5vh", marginBottom: "1.5vh" }}>
          <StyledButton variant="contained" onClick={handleCompareBtnClicked}>
            비교하기
          </StyledButton>
        </Grid>
      </Grid>
    </StyledPopUpContainer>
  );
};

const StyledPopUpContainer = styled(Box)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 30%;
  min-width: 700px;
  min-height: 150px;
  background-color: white;
  //border: 1px solid gray;
  border-radius: 0.5vh;
  z-index: 15;
  margin-bottom: 0.5vh;
  margin-right: 0.5vh;
  box-shadow: 1px 1px 5px 1.5px darkgrey;
`;

const StyledPopUpTitle = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
`;

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted gray;
  text-align: center;
  border-radius: 10px;

  &:hover .delete-btn {
    display: block;
  }
`;

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
`;

const StyledButton = styled(Button)`
  background-color: black;
  color: white;

  &:hover {
    background-color: gray;
  }
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  background-color: red;
  color: white;
  width: 25px;
  height: 25px;
  min-width: 25px;
  padding: 0;
  font-size: 12px;
  line-height: 25px;

  &:hover {
    background-color: darkred;
  }
`;
