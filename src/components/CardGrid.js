import React from "react";
import { Grid } from "@mui/material";
import CustomCard from "./CustomCard";

const CardGrid = () => {
  // 행의 개수를 원하는 숫자로 대체하세요
  const numberOfRows = 100;

  return (
    <Grid container spacing={3} mt={5}>
      {[...Array(numberOfRows)].map((_, row) => (
        <Grid item xs={4} key={row}>
          <CustomCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
