import {React,useEffect, useState} from "react";
import SidebarLayout from "components/templete/SidebarLayout";
import { Box } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { DefaultAxios } from "apis/CommonAxios";
import { Input } from "@mui/joy";


 
const Payment = () => {
  const location = useLocation(); // Use useLocation to access location state
  const { state } = location;
  const { orderList } = state || {};
  const [receiverName,setReceiverName] =useState("");
  const [receiverAddress,setReceiverAddress] = useState("");
  const [receiverMemo , setReceiverMemo] = useState("");
  const [receiverMobileNum,setReceiverMobileNum] = useState("");

  const  [orderLists,setOrderLists] = useState([]); 

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const orderItem of orderLists) {
      totalPrice += orderItem.totalPrice;
    }

    return totalPrice;
  };

  const handlePaymentBtnClick = () => {
    Swal.fire({
      title: "정말 결제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "예",
      denyButtonText: `아니요`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title : "계정 비밀번호를 다시 입력하세요",
          input: "text",
          showDenyButton: true,
          confirmButtonText: "결제하기",
          denyButtonText: `뒤로가기`,
          preConfirm : async(password) => {
            try{
              const res = await TokenAxios.put("/api/order/authorize", {
                password : password,
              })
              if(res.data.success){
                const res = await TokenAxios.post("/api/order", {
                  receiverInfoRequest: {
                      "receiverName": "내동생",
                      "receiverAddress": "우리집",
                      "receiverMobileNum": "010-1234-5678",
                      "receiverMemo": "요청사항"
                  },
                  orderProductRequestList: [
                      {
                          "productSeq": 28,
                          "productOptionSeq": 15,
                          "productAmount": 2
                      },
                      {
                          "productSeq": 287,
                          "productOptionSeq": 3,
                          "productAmount": 2
                      },
                      {
                          "productSeq": 290,
                          "productOptionSeq": 3,
                          "productAmount": 2
                      },
                      {
                          "productSeq": 510,
                          "productOptionSeq": 3,
                          "productAmount": 2
                      }
                  ]
              })
                console.log(res.data);
              }
             
            }catch(e){
              Swal.showValidationMessage(`
                  결제에 문제가 생겼습니다!
              `);
            }
          }
        }).then((result) => {
          if(result.isDenied){
            Swal.fire("결제가 실패하였습니다", "", "info");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("결제가 실패하였습니다", "", "info");
      }
    });
  }

   

  
  useEffect(() => {
    const sendOrderRequest = async () => {
      try {
        const response = await DefaultAxios.post("/api/order/orderListPage", {
          orderList: orderList,
        });
        console.log(response.data.result.data);
        
        setOrderLists(response.data.result.data);
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
              <Grid sx={{ mb:"30px"}}container spacing={2} justifyContent="space-between">
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
                <Grid sx={{mt:"10px"}} item xs={1}></Grid>
                <Grid sx={{mt:"10px"}} item xs={1.5}>
                <Typography>수신인</Typography>
                </Grid>
                <Grid sx={{mt:"10px"}} item xs={2} >
                    <Input value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}></Input>
                </Grid>
                <Grid sx={{mt:"10px"}} item xs={7.5}></Grid>

                <Grid sx={{mt:"10px"}} item xs={1}></Grid>
                <Grid sx={{mt:"10px"}} item xs={1.5}>
                  <Typography>연락처</Typography>
                </Grid>
                <Grid sx={{mt:"10px"}} item xs={2}>
                    <Input value = {receiverMobileNum} 
                    onChange={(e) => setReceiverMobileNum(e.target.value)}></Input>
                </Grid>

                <Grid  sx={{mt:"10px"}} item xs={7.5}></Grid>

                <Grid sx={{mt:"10px"}} item xs={1}></Grid>
                <Grid sx={{mt:"10px"}} item xs={1.5}>
                  <Typography>배송지 주소</Typography>
                </Grid>
                <Grid sx={{mt:"10px"}} item xs={2}>
                <Input value = {receiverAddress} 
                    onChange={(e) => setReceiverAddress(e.target.value)}>
                      </Input>
                 </Grid>

                <Grid sx={{mt:"10px"}} item xs={7.5}></Grid>

                <Grid sx={{mt:"10px"}} item xs={1}></Grid>
                <Grid sx={{mt:"10px"}} item xs={1.5 }>
                  <Typography>배송 요청사항</Typography>
                </Grid>
                <Grid sx={{mt:"10px"}} item xs={3}>
                <Input value = {receiverMemo} 
                    onChange={(e) => setReceiverMemo(e.target.value)}></Input>
                </Grid>

                <Grid item xs={6.5}></Grid>
              </Grid>
            </tr>
          </thead>
          <tbody>
            <tr style={{ border: "1px solid black", padding: "5px" }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    {}
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
            </tr>
            {orderLists.map((orderItem, index) => (
              <tr key={index}>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Typography>{orderItem.productName}</Typography>
                    <Typography>(옵션: {orderItem.productOptionSeq})</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", marginTop: "1%" }}
                  >
                    <Typography>{orderItem.productPrice}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", marginTop: "1%" }}
                  >
                    <Typography>{orderItem.productAmount}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center", marginTop: "1%" }}
                  >
                    <Typography>
                      무료
                    </Typography>
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
                    <Typography>{orderItem.totalPrice}</Typography>
                  </Grid>
                </Grid>
              </tr>
            ))}
            
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
                    총 상품 가격 {calculateTotalPrice()} + 총 배송비 0 = 총 주문금액 {calculateTotalPrice()}
                  </h3>
                </Grid>
              </Grid>
            </td>
          </tfoot>
        </table>

        {/* Add your order information here */}
      </Box>
      <StyledBox>
        <StyledButton size="large" variant="contained" onClick={handlePaymentBtnClick}>결제하기</StyledButton>
      </StyledBox>
      
    </SidebarLayout>
  );
};

export default PaymentPage;


const StyledBox = styled(Box)`
  display : flex;
  justify-content : center;
  align-items : center;
  margin-top : 2vh;
`

const StyledButton = styled(Button)`
  background-color : black;
  color : white;
  
  

  &:hover {
    background-color : rgba(0,0,0,0.9);
    color : gray;
  }
`
