import React, { useEffect, useState } from "react";
import AdminBar from "../../components/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  Dialog,
  DialogTitle,
  Grid,
  DialogContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { AdminButton, CustomSelect } from "../../components/AdminComponents";
import { height, width } from "@mui/system";
import { heIL } from "@mui/x-date-pickers";

const OrderListPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("주문 목록");
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(""); // Initialize orderStatus state

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value); // Update orderStatus when the value changes
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("주문 목록");
  }, []);

  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
      {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
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
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <AdminButton onClick={handleOpenModal}>상품상세</AdminButton>
          <Dialog onClose={handleCloseModal} open={modalOpen} maxWidth={false}>
            <DialogContent style={{ width: 900, height: 800 }}>
              <div>
                <Grid container spacing={2} marginTop="2%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문자 정보
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>김주혜</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>010-5432-9943</Typography>
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold" }}>
                      수령인
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>김주혜</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>010-5432-9943</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginTop="0.5%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    {/* 배송지 정보와 배송 요청 사항 */}
                    <Typography style={{ fontWeight: "bold" }}>
                      배송지 정보
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>경기도 고양시 덕양구</Typography>
                  </Grid>
                  <Grid item xs={1.8} marginLeft={"6%"}>
                    <Typography style={{ fontWeight: "bold" }}>
                      배송 요청 사항
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>"문앞에 두고 가세요"</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginTop="0.5%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문번호
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>1</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop="0.5%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold" }}>
                      주문일시
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>2024-01-21</Typography>
                  </Grid>
                </Grid>

                <table
                  style={{
                    marginLeft: "15%",
                    marginTop: "2%",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "80%",
                    height: "auto",
                    borderRadius: "10px", // 테두리를 둥글게 만드는 부분
                  }}
                >
                  <thead>
                    <tr>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={7} style={{ textAlign: "center" }}>
                          <Typography style={{ fontWeight: "bold" }}>
                            주문 상품
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography style={{ fontWeight: "bold" }}>
                            옵션
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: "center" }}>
                          <Typography style={{ fontWeight: "bold" }}>
                            수량
                          </Typography>
                        </Grid>
                      </Grid>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={7} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            [루이까또즈] 우븐 숄 머플러 인디라 와인 SA-2HW362WI
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            사이즈 - Free
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            1
                          </Typography>
                        </Grid>
                      </Grid>
                    </tr>
                    <tr>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={7} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            [루이까또즈] 우븐 숄 머플러 인디라 와인 SA-2HW362WI
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            사이즈 - Free
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ fontSize: "14px", marginTop: "2%" }}
                          >
                            1
                          </Typography>
                        </Grid>
                      </Grid>
                    </tr>
                  </tbody>
                </table>

                <Grid container spacing={2} marginTop="1%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold" }}>
                      결제 금액
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>39,600원</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop="1%">
                  <Grid item xs={1}>
                    {" "}
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography style={{ fontWeight: "bold", marginTop: "8%" }}>
                      주문 상태
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl>
                      <InputLabel>주문 상태</InputLabel>
                      <CustomSelect
                        value={orderStatus}
                        onChange={handleOrderStatusChange}
                        size="s"
                      ></CustomSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "40px" }}
              >
                <AdminButton autoFocus onClick={handleCloseModal}>
                  Save
                </AdminButton>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderListPage;
