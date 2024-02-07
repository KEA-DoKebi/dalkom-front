import { React, useEffect, useState } from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import { Box, Button } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultAxios } from "apis/CommonAxios";
import DaumPostcode from "react-daum-postcode";
import { CustomButton } from "common";
import { Input } from "@mui/joy";
import Swal from "sweetalert2";
import { TokenAxios } from "apis/CommonAxios";
import { styled } from "styled-components";

const Payment = () => {
  const location = useLocation(); // Use useLocation to access location state
  const { state } = location;
  const { orderList } = state || {};
  const [receiverName, setReceiverName] = useState("");
  const [receiverMobileNum, setReceiverMobileNum] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverDetailAddress, setReceiverDetailAddress] = useState("");
  const [receiverMemo, setReceiverMemo] = useState("");
  const [openDaumAddress, setOpenDaumAddress] = useState(false);

  const [orderPageLists, setOrderPageLists] = useState([]);

  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const orderItem of orderPageLists) {
      totalPrice += orderItem.totalPrice;
    }

    return totalPrice;
  };

  const handlePaymentBtnClick = () => {
    if (calculateTotalPrice() > Number(localStorage.getItem("mileage"))) {
      Swal.fire({
        icon: "error", // 성공 아이콘 (success, error, warning, info 중 선택)
        title: "마일리지가 부족합니다",
        showConfirmButton: true,
        confirmButtonText: "충전",
        buttonsStyling: true,
        confirmButtonColor: "black",
        showCancelButton: true,
        cancelButtonText: "확인",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/mypage/mile");
        }
      });
    } else {
      if (
        receiverName.replace(/ /gi, "") &&
        receiverAddress.replace(/ /gi, "") &&
        receiverMemo.replace(/ /gi, "") &&
        receiverMobileNum.replace(/ /gi, "")
      ) {
        Swal.fire({
          title: "결제 하시겠습니까?",
          showDenyButton: true,
          buttonsStyling: true,
          confirmButtonText: "확인",
          confirmButtonColor: "black",
          denyButtonText: `취소`,
          denyButtonColor: "gray",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire({
              title: "계정 비밀번호를 입력하세요",
              input: "password",
              showDenyButton: true,
              buttonsStyling: true,
              confirmButtonText: "결제하기",
              confirmButtonColor: "black",
              denyButtonText: `뒤로가기`,
              denyButtonColor: "gray",
              preConfirm: async (password) => {
                try {
                  const res = await TokenAxios.post("/api/order/authorize", {
                    password: password,
                  });
                  if (res.data.success) {
                    try {
                      const res = await TokenAxios.post("/api/order", {
                        receiverInfoRequest: {
                          receiverName: receiverName,
                          receiverAddress:
                            receiverAddress + receiverDetailAddress,
                          receiverMobileNum: receiverMobileNum,
                          receiverMemo: receiverMemo,
                        },

                        orderProductRequestList: orderList,
                      });

                      if (res.data.success) {
                        localStorage.setItem("mileage", res.data.result.data);
                        setOrderPageLists([]);
                        setReceiverName("");
                        setReceiverMobileNum("");
                        setReceiverAddress("");
                        setReceiverDetailAddress("");
                        setReceiverMemo("");
                        Swal.fire({
                          //
                          icon: "success",
                          title: "결제가 완료되었습니다.",
                          showConfirmButton: true,
                          confirmButtonText: "확인",
                          buttonsStyling: true,
                          confirmButtonColor: "black",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/mypage/order/list");
                          }
                        });
                      }
                    } catch (e) {
                      Swal.showValidationMessage(`
                          결제에 실패했습니다.
                        `);
                    }
                  }
                } catch (e) {
                  Swal.showValidationMessage(`
                      정보가 일치하지 않습니다.
                  `);
                }
              },
            }).then((result) => {
              if (result.isDenied) {
                Swal.fire({
                  icon: "error",
                  title: "결제에 실패했습니다.",
                  showConfirmButton: true,
                  confirmButtonText: "확인",
                  confirmButtonColor: "black",
                });
              }
            });
          } else if (result.isDenied) {
            Swal.fire({
              icon: "error",
              title: "결제에 실패했습니다.",
              showConfirmButton: true,
              confirmButtonText: "확인",
              confirmButtonColor: "black",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "정보가 입력되지 않았습니다.",
          showConfirmButton: true,
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        });
      }
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 5) {
      setReceiverName(value);
    }
  };

  // 정규식 적용
  const handleTelChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setReceiverMobileNum(e.target.value);
    }
  };

  useEffect(() => {
    const sendOrderRequest = async () => {
      try {
        const response = await DefaultAxios.post("/api/order/orderListPage", {
          orderList: orderList,
        });
        console.log(response.data.result.data);
        console.log("uselocation 으로 넘겨온값 출력");
        console.log(orderList);

        setOrderPageLists(response.data.result.data);
        // Handle the response as needed

        const resMileage = await TokenAxios.get(`/api/mileage/user`);
        localStorage.setItem("mileage", resMileage.data.result.data);
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

  // 전화번호 자동으로 - 넣어주는 코드
  useEffect(() => {
    if (receiverMobileNum.length === 10) {
      setReceiverMobileNum(
        receiverMobileNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      );
    }
    if (receiverMobileNum.length === 13) {
      setReceiverMobileNum(
        receiverMobileNum
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      );
    }
  }, [receiverMobileNum]);

  // component 로 분리해서 값을 넣고 싶음
  const DaumAddressComponent = () => {
    const handle = {
      clickButton: () => {
        setOpenDaumAddress((current) => !current);
      },
      selectAddress: (data) => {
        console.log(`
          주소: ${data.address},
          우편번호: ${data.zonecode}
        `);
        setOpenDaumAddress(false);
        setReceiverAddress(`${data.address} ${data.zonecode}`);
      },
    };

    return (
      <div>
        <SearchAddressButton onClick={handle.clickButton}>
          주소찾기
        </SearchAddressButton>
        {openDaumAddress && (
          <DaumPostcode
            onComplete={handle.selectAddress}
            autoClose={false}
            defaultQuery="가천대역"
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 3333,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <SidebarLayout>
      {/* Content Next to Sidebar */}
      <Box style={{ marginTop: "5%" }}>
        <Typography variant="h3" gutterBottom>
          주문서 작성
        </Typography>

        <Box sx={{ borderRadius: "20px", overflow: "hidden" }}>
          <table
            style={{
              marginTop: "1%",
              paddingRight: "10%",
              borderCollapse: "collapse",
              width: "100%",
              height: "auto",
            }}
          >
            <thead>
              <tr>
                <Grid
                  sx={{ mb: "30px", borderBottom: "1px solid gray" }}
                  container
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ textAlign: "center", marginBottom: "1%" }}
                    >
                      주문 정보
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    justifyContent="space-between"
                    sx={{ marginTop: "2%", marginBottom: "2%" }}
                  >
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Typography>
                        수신인<StyledStar>*</StyledStar>
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ marginBottom: "1%" }}>
                      <CustomInput
                        variant="soft"
                        value={receiverName}
                        onChange={handleNameChange}
                        sx={{
                          backgroundColor: "white",
                          border: "1.5px solid rgba(0,0,0,0.5)",
                        }}
                      ></CustomInput>
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Typography>
                        연락처<StyledStar>*</StyledStar>
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ marginBottom: "1%" }}>
                      <CustomInput
                        variant="soft"
                        value={receiverMobileNum}
                        onChange={handleTelChange}
                        sx={{
                          backgroundColor: "white",
                          border: "1.5px solid rgba(0,0,0,0.5)",
                        }}
                      ></CustomInput>
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Typography>
                        배송지 주소<StyledStar>*</StyledStar>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Input
                        variant="soft"
                        value={receiverAddress}
                        sx={{
                          marginRight: "10px",
                          width: "420px",
                          backgroundColor: "white",
                          border: "1.5px solid rgba(0,0,0,0.5)",
                        }}
                      />
                      <DaumAddressComponent />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Typography>상세 주소</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <CustomInput
                        variant="soft"
                        value={receiverDetailAddress}
                        onChange={(e) =>
                          setReceiverDetailAddress(e.target.value)
                        }
                        sx={{
                          backgroundColor: "white",
                          border: "1.5px solid rgba(0,0,0,0.5)",
                        }}
                      ></CustomInput>
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1%",
                      }}
                    >
                      <Typography>
                        배송 요청사항<StyledStar>*</StyledStar>
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ marginBottom: "1%" }}>
                      <CustomInput
                        variant="soft"
                        value={receiverMemo}
                        onChange={(e) => setReceiverMemo(e.target.value)}
                        sx={{
                          backgroundColor: "white",
                          border: "1.5px solid rgba(0,0,0,0.5)",
                        }}
                      ></CustomInput>
                    </Grid>
                    <Grid item xs={3}></Grid>
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
                  sx={{ borderBottom: "1px solid gray" }}
                >
                  <Grid
                    item
                    xs={3}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      상품명
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>옵션</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>가격</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>수량</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      배송비
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", marginBottom: "1.5%" }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      최종가격
                    </Typography>
                  </Grid>
                </Grid>
              </tr>
              {orderPageLists.map((orderItem, index) => (
                <tr key={index}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{
                      marginTop: "0.1%",
                      pb: "1%",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography>{orderItem.productName}</Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography>
                        {orderItem.productOptionDetail === "default"
                          ? "-"
                          : orderItem.productOptionDetail}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "center" }}>
                      <Typography>
                        {orderItem.productPrice?.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography>{orderItem.productAmount}</Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography>무료</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "center" }}>
                      <Typography>
                        {orderItem.totalPrice?.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ mt: "0.5%" }}
                >
                  <Grid item xs={12}>
                    <h3>
                      총 상품 가격 {calculateTotalPrice()?.toLocaleString()} +
                      총 배송비 0 = 총 주문금액{" "}
                      {calculateTotalPrice()?.toLocaleString()}
                    </h3>
                  </Grid>
                </Grid>
              </td>
            </tfoot>
          </table>
        </Box>

        {/* Add your order information here */}
      </Box>
      <StyledBox>
        <StyledButton
          size="large"
          variant="contained"
          onClick={handlePaymentBtnClick}
        >
          결제하기
        </StyledButton>
      </StyledBox>
    </SidebarLayout>
  );
};

export default Payment;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
`;

const StyledButton = styled(Button)`
  background-color: black;
  color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    color: gray;
  }
`;
const SearchAddressButton = styled(CustomButton)`
  font-size: 11px;
`;
const CustomInput = styled(Input)`
  width: 500px;
`;

const StyledStar = styled.span`
  color: red;
`;
