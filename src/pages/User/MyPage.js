import React from "react";
import Bar from "../../components/Bar";
import { Box } from "@mui/system";
import { Grid, Paper, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Button, Input } from "@mui/joy";

const MyPage = () => {
  return (
    <Paper
      sx={{ display: "flex",
      flexDirection:" column",
      height: "100vh", backgroundColor: "#EEF2F6" }}
    >
      <div></div>

      <Bar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#111111",
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Grid>
            <Input sx={{ mt: 3 }} />
            <Button
              container
              direction="row"
              justifyContent="space-evenly"
              sx={{ mt: 3 }}
            >
              {" "}
              확인{" "}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
};

export default MyPage;

