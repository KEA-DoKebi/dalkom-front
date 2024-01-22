import React from "react";
import SidebarLayout from "components/layout/SidebarLayout";
import { Box, Button } from "@mui/material";
import { Grid,  Typography } from "@mui/material";

const OrderDetailPage = () => {
  return (
    <SidebarLayout>
      {/* Content Next to Sidebar */}
      <Box style={{ marginTop: "5%" }}>
        <Typography variant="h3" gutterBottom>
          주문 상세 내역
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
              <td style={{ border: "1px solid black", padding: "5px" }}>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      상품 정보
                    </Typography>
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문일자
                    </Typography>
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문번호
                    </Typography>
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문금액
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", paddingLeft: "10px" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      배송상태
                    </Typography>
                  </Grid>
                </Grid>
              </td>
            </tr>
          </thead>
          <tbody>
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
                  <Typography>2024-01-11</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>11</Typography>
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
                  <Typography>
                    배송준비
                    <Button>리뷰작성</Button>
                  </Typography>
                </Grid>
              </Grid>
            </tr>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography>갤럭시 버즈</Typography>
                  <Typography>(옵션: 흰색)</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>2024-01-11</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>15</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>200,000</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  <Typography>
                    배송준비
                    <Button>리뷰작성</Button>
                  </Typography>
                </Grid>
              </Grid>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    borderBottom: "2px solid black",
                    borderTop: "2px solid black",
                    marginLeft: "1.4%",
                    marginTop: "3%",
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
            <tr>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    borderBottom: "2px solid black",
                    marginLeft: "1.4%",
                    marginTop: "1%",
                  }}
                >
                  <h3>주문 정보</h3>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>상품 합계</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>49,000 마일리지</Typography>
                </Grid>

                <Grid item xs={6.5}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>배송비 합계</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>배송비 무료</Typography>
                </Grid>

                <Grid item xs={6.5}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={1.5}>
                  <Typography>최종 결제 금액</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>49,000 마일리지</Typography>
                </Grid>

                <Grid item xs={6.5}></Grid>

                <Grid item xs={8}></Grid>
              </Grid>
            </tr>
          </tfoot>
        </table>

        {/* Add your order information here */}
      </Box>
    </SidebarLayout>
  );
};

 

export default OrderDetailPage;
