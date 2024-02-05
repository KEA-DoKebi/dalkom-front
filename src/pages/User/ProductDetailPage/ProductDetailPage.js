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
import { NavLink, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

const ProductDetailPage = () => {
  const [productInfo, setProductInfo] = useState({});
  const [productReviewList, setProductReviewList] = useState([]);
  const [option, setOption] = useState({});
  const [menuItems] = useState(["상품상세", "상품평", "상품안내"]);
  // const [prdtOptionSeq, setPrdtOptionSeq] = useState(); // 초기값은 15로 설정
  const [amount, setAmount] = useState(0); // 초기값은 3으로 설정
  const { productSeq, menuName } = useParams();

  const handleChange = (event) => {
    setOption(event.target.value);
    console.log(event.target.value);
    // const selectedOption = event.target.value;
    // setPrdtOptionSeq(selectedOption);
  };

  const handleCountChange = (event) => {
    const number = Number(event.target.value);
    setAmount(number);
  };

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
        `/api/review/product/${productSeq}?page=0&size=3`,
      );
      setProductReviewList(res.data.result.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  const postCartData = async (data) => {
    console.log(data);

    try {
      await TokenAxios.post("/api/cart/user", data);
      // console.log(res.data);
    } catch (error) {
      console.log("Error response data:", error.response.data);
      console.log("Error stack trace:", error.stack);
    }
  };

  const handleAddToCart = () => {
    // You can modify cartData here before passing it to cartCreate
    postCartData({
      productSeq: parseInt(productSeq),
      prdtOptionSeq: option.productOptionSeq,
      amount: amount,
    });
    Swal.fire({
      icon: "success", // 성공 아이콘 (success, error, warning, info 중 선택)
      title: "장바구니에 추가되었습니다!",
      showConfirmButton: true, // 확인 버튼 감추기
      confirmButtonText : "확인",
    });
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
            <ProductContentContainer>
              <FormControl fullWidth>
                <InputLabel id="product-option">옵션</InputLabel>
                <Select
                  labelId="product-option"
                  id="option"
                  label="옵션"
                  value={productInfo?.stockList}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  {productInfo.stockList?.map((optionList) => (
                    <MenuItem value={optionList}>
                      {`${optionList.productOptionSeq}. ${optionList.detail} (남은 재고: ${optionList.amount}개)`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <PriceContainer>
                <SpaceBetweenContainer>
                  <h3> 상품가격</h3>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0",
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
                    <BoldText style={{ fontSize: "20px" }}>
                      {productInfo.price}
                    </BoldText>
                  </Typography>
                </SpaceBetweenContainer>
              </PriceContainer>

              <FormControl sx={{ marginTop: "1vh" }}>
                <FormLabel sx={{ fontSize: "20px" }}>수량</FormLabel>
                <Input
                  type="number"
                  placeholder="수량을 입력해주세요"
                  value={amount}
                  onChange={handleCountChange}
                  sx={{
                    minHeight: "50px",
                    backgroundColor: "white",
                  }}
                />
              </FormControl>
              <PriceContainer>
                <h3 style={{ marginBottom: "1vh", marginTop: "0.5vh" }}>
                  {" "}
                  주문정보
                </h3>
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
                      {productInfo.price * Math.floor(amount)}
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
                <StyledButton variant="contained">즉시 구매하기</StyledButton>
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
          {menuName === "상품상세" &&
            productInfo?.productImageUrlList?.map((productImage) => (
              <ProductImageContainer key={productImage}>
                <ProductImage src={productImage} />
              </ProductImageContainer>
            ))}
          {menuName === "상품평" && <MuiTable reviewList={productReviewList} />}
          {menuName === "상품안내" && (
            <ShippingImageContainer>
              <ShippingInfoImage src="/images/ProductDetailPage/info.png" />
            </ShippingImageContainer>
          )}

          {/* {productInfo.productImageUrlList.map((productImage) => (
                    <ProductImageContainer>
                        <ProductImage src={productImage}/>
                    </ProductImageContainer>
                ))} */}
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

const ShippingImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
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
  height: 55vh;
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
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-top: 5vh;
  padding: 10px;
`;

const StyledText = styled.p`
  margin: 1px;
  padding: 1px;
  font-size: 20px;
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

const ShippingInfoImage = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
`;
