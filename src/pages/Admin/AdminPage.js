import React from "react";
import { Box } from "@mui/system";
import { Grid, Paper, Toolbar } from "@mui/material";
import AdminBar from "../../components/AdminBar";
import { Input } from "@mui/joy";

export default function AdminPage() {
  return (
    <Paper
      sx={{ display: "flex", height: "100vh", backgroundColor: "#EEF2F6" }}
    >
      <AdminBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#EEF2F6",
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
            
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}






