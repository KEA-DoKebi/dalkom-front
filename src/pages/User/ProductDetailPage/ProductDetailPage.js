import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { TokenAxios } from 'apis/CommonAxios'
import MuiTable from 'components/molecules/MuiTable'
import DefaultLayout from 'components/templete/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import Swal from "sweetalert2";



const ProductDetailPage = () => {

    const [productInfo, setProductInfo] = useState({});
    const [productReviewList, setProductReviewList] = useState([]);
    const [option, setOption] = useState();
    const [menuItems,] = useState(["상품상세", "상품평", "상품안내"]);
    const [prdtOptionSeq, setPrdtOptionSeq] = useState("15"); // 초기값은 15로 설정
    const [amount, setAmount] = useState(3); // 초기값은 3으로 설정
    const {productSeq, menuName} = useParams();
    

    const handleChange = (event) => {
      console.log(event.target);
      
      const selectedOption = event.target.value;
      setPrdtOptionSeq(selectedOption);
    };

  const getProductDetail = async() => {
    try{
        const res = await TokenAxios.get(`/api/product/${productSeq}`);
        console.log(res.data.result.data);
        setProductInfo(res.data.result.data);
    }catch(e){
      console.log(e);
    } 
  }

  const getProductReview = async() => {
    try{
        const res = await TokenAxios.get(`/api/review/product/${productSeq}?page=0&size=3`);
        console.log(res.data.result.data);
        setProductReviewList(res.data.result.data.content);
    }catch(e){
        console.log(e);
    }
  }

  const postCartData = async (data) =>{
    try{
      const res = await TokenAxios.post("/api/cart/user", data);
      console.log(res.data);
    } catch (error) {
      console.log("Error response data:", error.response.data);
      console.log("Error stack trace:", error.stack);
    }
  }

  const handleAddToCart = () => {
    // You can modify cartData here before passing it to cartCreate
    postCartData({
      productSeq: parseInt(productSeq),
      prdtOptionSeq: prdtOptionSeq,
      amount: amount,
    });
    Swal.fire({
      icon: 'success', // 성공 아이콘 (success, error, warning, info 중 선택)
      title: '장바구니에 추가되었습니다!',
      showConfirmButton: false, // 확인 버튼 감추기
      timer: 1500 // 1.5초 후에 모달이 자동으로 사라짐
    });
  };

  useEffect(() => {
    getProductDetail();
    getProductReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productSeq])

  return (
    <DefaultLayout>
        <ProductInfoBox>
            <Grid container>
                <Grid item xs={8.5}>
                    <ProductImageContainer>
                        <ProductImage src={`${productInfo.imageUrl}`} />
                    </ProductImageContainer>
                </Grid>
                <Grid item xs={0.5}>

                </Grid>
                <Grid item xs={3}>
                    <ProductTitleContainer>
                        <h3>{productInfo.company}</h3>
                        <h1 style={{marginBottom : "5%"}}>
                            {productInfo.name}
                        </h1>
                        <p style={{margin : "5% 0"}}>{productInfo.info}</p>
                    </ProductTitleContainer>
                    <ProductContentContainer>
                        <FormControl fullWidth>
                            <InputLabel id="product-option">옵션</InputLabel>
                            <Select 
                                labelId="product-option"
                                id="option"
                                label="옵션"
                                value={option}
                                onChange={handleChange}
                                sx={{width : "100%"}}
                            >
                                {productInfo.stockList?.map((option) => (
                                    <MenuItem value={option.productOptionSeq}>
                                        {`${option.detail} (남은 재고: ${option.amount}개)`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <PriceContainer>
                            <h4 style={{marginBottom : "3vh", marginTop : 0}}> 상품가격</h4>
                            <SpaceBetweenContainer>
                                    <p style={{margin : 0, padding : 0}}>소비자가</p>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textAlign: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom : "7px",
                                            fontWeight : "bold"
                                        }}
                                        >
                                        <img
                                            src="/images/M-1.png"
                                            alt="마일리지"
                                            style={{ width: "20px", height: "20px", marginRight : "5px", }}
                                        />
                                        {productInfo.price}
                                    </Typography>
                            </SpaceBetweenContainer>
                        </PriceContainer>

                        <PriceContainer>
                            <h4 style={{marginBottom : "3vh", marginTop : 0}}> 주문정보</h4>
                            <SpaceBetweenContainer>
                                    <p style={{margin : 0, padding : 0}}>소비자가</p>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textAlign: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom : "7px",
                                            fontWeight : "bold"
                                        }}
                                        >
                                        <img
                                            src="/images/M-1.png"
                                            alt="마일리지"
                                            style={{ width: "20px", height: "20px", marginRight : "5px", }}
                                        />
                                        {productInfo.price}
                                    </Typography>
                            </SpaceBetweenContainer>
                        </PriceContainer>


                    </ProductContentContainer>
                    <ProductButtonContainer>
                        <div style={{marginTop : "10vh"}}>
                            <StyledButton variant='contained'>즉시 구매하기</StyledButton>
                            <StyledButton variant='contained' onClick={handleAddToCart}>장바구니 담기</StyledButton>
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
                <Grid item xs={0.5}>
                    
                </Grid>
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
                {menuName === "상품상세" && (
                        productInfo?.productImageUrlList?.map((productImage) => (
                            <ProductImageContainer key={productImage}> 
                                <ProductImage src={productImage}/>
                            </ProductImageContainer>
                        ))
                    )}
                {menuName === "상품평" && (
                            <MuiTable reviewList={productReviewList}/>
                        )}
                {menuName === "상품안내" && (
                            <ProductImageContainer> 
                                <ShippingInfoImage src="/images/ProductDetailPage/info.png"/>
                            </ProductImageContainer>
                        )}
                
               
                {/* {productInfo.productImageUrlList.map((productImage) => (
                    <ProductImageContainer>
                        <ProductImage src={productImage}/>
                    </ProductImageContainer>
                ))} */}
            </Grid>
        </ProductDescriptionBox>
    </DefaultLayout>
  )
}

export default ProductDetailPage;


const ProductInfoBox = styled(Box)`

`

const ProductDescriptionBox = styled(Box)`
    margin-top : 15vh;

`

const ProductImageContainer = styled(Box)`
    width : 100%;
    height : 100%;
    overflow : hidden;
    text-align : center;   
`

const ProductImage = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
`

const ProductTitleContainer = styled(Box)`
    height : 15vh;
    margin-top : 10vh;
`

const ProductContentContainer = styled(Box)`
    height : 55vh;
    margin-top : 5vh;
`

const ProductButtonContainer = styled(Box)`
    height : 15vh;
    margin-top : 5vh;
`

const PriceContainer = styled.div`
    border : 1px solid black;
    border-radius : 20px; 
    margin-top : 5vh; 
    padding : 10px;
`

const SpaceBetweenContainer = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    margin : 0; 
    padding : 0;
`

const StyledButton = styled(Button)`
   background-color : black; 
   border-radius : 10px; 
   width : 100%; 
   margin-bottom : 5px;

   &:hover{
     background-color : rgba(0,0,0,0.9);
     color : rgba(255,255,255,0.8);
   }
`

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
    width : 80%;
    height : 100%;
    object-fit : cover;
`