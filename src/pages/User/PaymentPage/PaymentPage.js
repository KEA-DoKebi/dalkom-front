import {React,useEffect} from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import { Box } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { TokenAxios } from "apis/CommonAxios";
import { DefaultAxios } from "apis/CommonAxios";

const Payment = () => {
  const location = useLocation(); // Use useLocation to access location state
  const { state } = location;
  const { orderList } = state || {};

  console.log(orderList);
  
  useEffect(() => {
    const sendOrderRequest = async () => {
      try {
        const response = await DefaultAxios.post("/api/order/orderListPage", {
          orderList: orderList,
        });

        console.log(response.data);
        // Handle the response as needed
      } catch (error) {
        console.error("주문 데이터 전송 실패:", error);
        console.log("자세한 오류 응답:", error.response); // 자세한 오류 응답 기록
      }
    };

    if (orderList && orderList.length > 0) {
      // Only send the request if orderList is not empty
      sendOrderRequest();
    }
  }, [orderList]);

  return (
    <SidebarLayout>
      {/* Content Next to Sidebar */}
      <Box style={{ marginTop: "5%" }}>
        <Typography variant="h3" gutterBottom>
          주문서 작성
        </Typography>
        <table
          style={{
            marginTop: "2%",
            paddingRight: "10%",
            border: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
            height: "auto",
          }}
        >
          <thead>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    borderBottom: "2px solid black",
                    marginLeft: "1.4%",
                  }}
                >
                  <h3>배송지정보</h3>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>이름</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>배송지 이름</Typography>
                </Grid>

                <Grid item xs={7.5}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>연락처</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>010-1234-5678</Typography>
                </Grid>

                <Grid item xs={7.5}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>배송지 주소</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>경기도 고양시 덕양구</Typography>
                </Grid>

                <Grid item xs={7.5}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>배송 요청사항</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>배송 전 연락 바랍니다.</Typography>
                </Grid>

                <Grid item xs={6.5}></Grid>
              </Grid>
            </tr>
          </thead>
          <tbody>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    상품 정보
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    상품 가격
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    상품 수량
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>배송비</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", paddingLeft: "10px" }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    최종가격
                  </Typography>
                </Grid>
              </Grid>
            </td>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography>갤럭시 s24</Typography>
                  <Typography>(옵션: 블랙)</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>배송비 무료</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    textAlign: "center",
                    paddingLeft: "10px",
                    marginTop: "1%",
                  }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
              </Grid>
            </tr>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography>갤럭시 s24</Typography>
                  <Typography>(옵션: 블랙)</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>배송비 무료</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    textAlign: "center",
                    paddingLeft: "10px",
                    marginTop: "1%",
                  }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
              </Grid>
            </tr>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography>갤럭시 s24</Typography>
                  <Typography>(옵션: 블랙)</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>1</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>배송비 무료</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    textAlign: "center",
                    paddingLeft: "10px",
                    marginTop: "1%",
                  }}
                >
                  <Typography>1,000,000</Typography>
                </Grid>
              </Grid>
            </tr>
          </tbody>
          <tfoot>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12}>
                  <h3>
                    총 상품 가격 3,000,000 + 총 배송비 0 = 총 주문금액 3,000,000
                  </h3>
                </Grid>
              </Grid>
            </td>
          </tfoot>
        </table>

        {/* Add your order information here */}
      </Box>
    </SidebarLayout>
  );
};

export default Payment;
