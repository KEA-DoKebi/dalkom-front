import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  InputLabel,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import MuiTable from "components/molecules/MuiTable";
import DefaultLayout from "components/templete/DefaultLayout";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { ManualBody } from "../CustomerServicePage/ManualBody";

const ProductDetailPage = () => {
  const [productInfo, setProductInfo] = useState({});
  const [productReviewList, setProductReviewList] = useState([]);
  const [option, setOption] = useState({});
  const [menuItems] = useState(["상품상세", "상품평", "상품안내"]);
  const [amount, setAmount] = useState(); 
  const { productSeq, menuName } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setOption(event.target.value);
    console.log(event.target.value);
  };

  const handleCountChange = (event) => {
    const number = Number(event.target.value);
    if(number > 0 && option.amount >= number){
      setAmount(number);
    } 
    if(option.amount < number) {
      Swal.fire({
        icon: "error", // 성공 아이콘 (success, error, warning, info 중 선택)
        title: "수량은 재고보다 많이 설정할 수 없습니다",
        showConfirmButton: true, 
        confirmButtonText : "확인",
        buttonsStyling: true, 
        confirmButtonColor: 'black',
      });
      setAmount(0);
    }
  };

  // productSeq, productOptionSeq, productAmount
  const handleGoToPayment = () => {
    const selectedRowsData = [{
      productSeq : productSeq,
      productOptionSeq : option.productOptionSeq,
      productAmount : amount,
      orderCartSeq : 0,
    }]
    navigate("/payment", {state : {orderList : selectedRowsData}})
  }

  const getProductDetail = async () => {
    try {
      const res = await TokenAxios.get(`/api/product/${productSeq}`);
      console.log(res.data.result.data)
      setProductInfo(res.data.result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductReview = async () => {
    try {
      const res = await TokenAxios.get(
        `/api/review/product/${productSeq}?page=0&size=10`,
      );
      setProductReviewList(res.data.result.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  const postCartData = async (data) => {
    try {
      await TokenAxios.post("/api/cart/user", data);
      
    } catch (error) {
      console.log("Error response data:", error.response.data);
      console.log("Error stack trace:", error.stack);
    }
  };

  const handleAddToCart = () => {
    if(productInfo.price * Math.floor(amount) > Number(localStorage.getItem("mileage"))){
      Swal.fire({
        icon: "error", // 성공 아이콘 (success, error, warning, info 중 선택)
        title: "마일리지가 부족합니다",
        showConfirmButton: true, 
        confirmButtonText : "충전",
        buttonsStyling: true, 
        confirmButtonColor: 'black',
        showCancelButton: true, 
        cancelButtonText: "확인", 
        cancelButtonColor: 'black', 
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/mypage/mile")
        }
      });
    }else{
      postCartData({
        productSeq: parseInt(productSeq),
        prdtOptionSeq: option.productOptionSeq,
        amount: amount,
      });
      Swal.fire({
        icon: "success", // 성공 아이콘 (success, error, warning, info 중 선택)
        title: "장바구니에 추가되었습니다.",
        showConfirmButton: true, 
        confirmButtonText : "장바구니로 이동",
        confirmButtonColor: 'black',
        showCancelButton: true, 
        cancelButtonText: "계속 쇼핑하기", 
        cancelButtonColor: 'gray',
        reverseButtons: true,
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/cart")
        }
      });
    }
  };

  useEffect(() => {
    getProductDetail();
    getProductReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSeq]);

  return (
    <DefaultLayout>
      <ProductInfoBox>
        <Grid container>
          <Grid item xs={7.5}>
            <ProductImageContainer>
              <ProductImage src={`${productInfo.imageUrl}`} />
            </ProductImageContainer>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3.5}>
            <ProductTitleContainer>
              <h3>{productInfo.company}</h3>
              <h1 style={{ marginBottom: "5%" }}>{productInfo.name}</h1>
            </ProductTitleContainer>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <img
                src="/images/M-1.png"
                alt="마일리지"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              />
              <StyledText style={{fontSize : "30px", color : "black", fontWeight : "bold"}}>
                {productInfo.price?.toLocaleString()}
              </StyledText>
            </Typography>
            <ProductContentContainer>
            
              <FormControl fullWidth>
                <InputLabel id="product-option" style={{fontSize : "20px", color : "black", fontWeight : "bold"}}>옵션</InputLabel>
                <Select
                  labelId="product-option"
                  id="option"
                  label="옵션"
                  placeholder="옵션을 선택해주세요"
                  value={productInfo?.stockList}
                  onChange={handleChange}
                  sx={{ 
                    width: "100%",
                    height : "48px",
                    border : "1.5px solid rgba(0,0,0,0.5)",
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                >
                  {productInfo.stockList?.map((optionList) => (
                    <MenuItem value={optionList}>
                      {`${optionList.productOptionSeq}. ${optionList.detail} (남은 재고: ${optionList.amount}개)`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ marginTop: "1vh" }}>
                <FormLabel sx={{ fontSize : "20px", marginTop : "5vh", color : "black", fontWeight : "bold"}}>수량</FormLabel>
                <Input
                  type="number"
                  placeholder="수량을 입력해주세요"
                  value={amount}
                  onChange={handleCountChange}
                  sx={{
                    minHeight: "50px",
                    backgroundColor: "white",
                    border : "1.5px solid rgba(0,0,0,0.5)",
                  }}
                />
              </FormControl>
              <StyledText style={{fontSize : "20px", marginTop : "7vh", color : "black", fontWeight : "bold"}}>주문정보</StyledText>
              <PriceContainer>
                <SpaceBetweenContainer>
                  <StyledText>상품이름</StyledText>
                  <BoldText>{productInfo.name}</BoldText>
                </SpaceBetweenContainer>
                <SpaceBetweenContainer>
                  <StyledText>가격</StyledText>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      src="/images/M-1.png"
                      alt="마일리지"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                    />
                    <BoldText>
                      {(productInfo.price * Math.floor(amount))?.toLocaleString()}
                    </BoldText>
                  </Typography>
                </SpaceBetweenContainer>
                <SpaceBetweenContainer>
                  <StyledText>옵션</StyledText>
                  <BoldText>{option.detail}</BoldText>
                </SpaceBetweenContainer>
              </PriceContainer>
            </ProductContentContainer>
            <ProductButtonContainer>
              <div style={{ marginTop: "10vh" }}>
                <StyledButton variant="contained" onClick={handleGoToPayment}>즉시 구매하기</StyledButton>
                <StyledButton variant="contained" onClick={handleAddToCart}>
                  장바구니 담기
                </StyledButton>
              </div>
            </ProductButtonContainer>
          </Grid>
          {/* <Grid item xs={0.2}>
                    배송 Description으로 이동
                </Grid> */}
        </Grid>
      </ProductInfoBox>
      <ProductDescriptionBox>
        <Grid container>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={11}>
            <MenuList>
              {menuItems.map((menuItem, idx) => (
                <StyledMenuItem key={idx}>
                  <StyledNavLink
                    to={`/product/${productSeq}/${menuItem}`}
                    activeStyle={{ backgroundColor: "transparent" }}
                  >
                    {menuItem}
                  </StyledNavLink>
                </StyledMenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={12} sx={{textAlign : "center"}}>
            {menuName === "상품상세" && 
              <div dangerouslySetInnerHTML={{ __html: productInfo?.info }} />
            }
            {menuName === "상품평" && <MuiTable reviewList={productReviewList} />}
            {menuName === "상품안내" && (
                <ManualBody />
            )}
          </Grid>
        </Grid>
      </ProductDescriptionBox>
    </DefaultLayout>
  );
};

export default ProductDetailPage;

const ProductInfoBox = styled(Box)``;

const ProductDescriptionBox = styled(Box)`
  margin-top: 15vh;
`;

const ProductImageContainer = styled(Box)`
  width: 100%;
  height: 80vh;
  overflow: hidden;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductTitleContainer = styled(Box)`
  height: 8vh;
  margin-top: 2vh;
`;

const ProductContentContainer = styled(Box)`
  height: 49.8vh;
  margin-top: 5vh;
`;

const ProductButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 7vh;
  margin-top: 3vh;
`;

const PriceContainer = styled.div`
  border: 1.5px solid rgba(0,0,0,0.5);
  border-radius: 5px;
  margin-top : 5px;
  padding: 10px;
`;

const StyledText = styled.p`
  margin: 1px;
  padding: 1px;
  font-size: 16px;
  color : #00000099;
`;

const BoldText = styled(StyledText)`
  font-weight: bold;
`;

const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled(Button)`
  background-color: black;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 5px;
  height : 50px;
  font-size : 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    color: rgba(255, 255, 255, 0.8);
  }
`;

const MenuList = styled.ul`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin: 20px 0;
  padding: 0;
`;

const StyledMenuItem = styled.li`
  border: 1px solid #c2c2c2;
  list-style: none;
  text-align: center;
  flex: 1 1 auto;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 20px 0;
  text-decoration: none;
  color: black;
  font-size: 16px;

  &.active {
    background-color: transparent; // 활성화됐을 때의 스타일
  }
  &:not(.active) {
    background-color: #eeeeee; // 비활성화됐을 때의 스타일
  }
`;
