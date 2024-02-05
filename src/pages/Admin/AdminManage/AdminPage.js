import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import { Box, Paper, Toolbar, Typography, Grid } from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import BarChart from "./BarChart";
import CardContent from "@mui/material/CardContent";
import PolarAreaChart from "./PolarAreaChart";
import BasicTable from "./BasicTable";

const AdminPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("관리자 대시보드");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalMonthlyPrice, setTotalMonthlyPrice] = useState("");
  const [totalDailyPrice, setTotalDailyPrice] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const prepareChartData = (monthlyData) => {
    const labels = monthlyData.map((item) => item.month);
    const data = monthlyData.map((item) => item.monthlyPrice);

    setChartData({
      labels,
      datasets: [
        {
          label: "월별 누적 판매 금액",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    const adminGet = async () => {
      const res = await TokenAxios.get(`/api/admin/dashboard`);
      setTotalPrice(res.data.result.data.totalMileage);
      setTotalMonthlyPrice(res.data.result.data.totalMonthlyMileage);
      setTotalDailyPrice(res.data.result.data.totalDailyMileage);
      prepareChartData(res.data.result.data.monthlyPriceList);
      setProductData(res.data.result.data.monthlyProductList.content);
      setCategoryData(res.data.result.data.monthlyCategoryList);
    };

    adminGet();
  }, []);

  return (
    <Paper sx={{ display: "flex" }}>
      <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
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
          justifyContent="center"
          alignItems="center"
          sx={{
            flex: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={3}>
              <StyleCardContent
                sx={{
                  backgroundColor: "#ffb2c2",
                }}
              >
                <StyleTypography>누적 판매금액</StyleTypography>
                <StylePriceTypography>
                  {Number(totalPrice).toLocaleString()}
                </StylePriceTypography>
              </StyleCardContent>
            </Grid>
            <Grid item xs={3}>
              <StyleCardContent
                sx={{
                  backgroundColor: "#a0d0f5",
                }}
              >
                <StyleTypography>월간 누적 판매금액</StyleTypography>
                <StylePriceTypography>
                  {Number(totalMonthlyPrice).toLocaleString()}
                </StylePriceTypography>
              </StyleCardContent>
            </Grid>
            <Grid item xs={3}>
              <StyleCardContent
                sx={{
                  backgroundColor: "#abdfdf",
                }}
              >
                <StyleTypography>금일 누적 판매금액</StyleTypography>
                <StylePriceTypography>
                  {Number(totalDailyPrice).toLocaleString()}
                </StylePriceTypography>
              </StyleCardContent>
            </Grid>
            <Grid item xs={1.5}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={6}>
              <StyleTitleTypography>월별 누적 판매 금액</StyleTitleTypography>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  minWidth: "200px",
                  maxHeight: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BarChart chartData={chartData} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <StyleTitleTypography>카테고리별 판매 수량</StyleTitleTypography>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  minWidth: "200px",
                  maxHeight: "400px",
                }}
              >
                <PolarAreaChart categories={categoryData} />
              </div>
            </Grid>
            <Grid item xs={1.5}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={9}>
              <StyleTitleTypography>월간 인기 상품 Top 5</StyleTitleTypography>
              <div style={{ width: "100%", height: "auto", marginTop: "10px" }}>
                <BasicTable productData={productData} />
              </div>
            </Grid>
            <Grid item xs={1.5}></Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

const StyleCardContent = styled(CardContent)`
  height: 100px;
  border-radius: 10px;
`;

const StyleTypography = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
`;

const StylePriceTypography = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
`;

const StyleTitleTypography = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export default AdminPage;
