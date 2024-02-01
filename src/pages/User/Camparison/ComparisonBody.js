import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Select, MenuItem, Grid } from "@mui/material";
import "assets/font/font.css";
import { TokenAxios } from "apis/CommonAxios";
import { productImageStore } from "store/store";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { ProductReview } from "components/molecules/ProductReview";

export const ComparisonBody = () => {

  const {seqList} = productImageStore((state) => state);
  // 카테고리 페이지에서 넘어온 정보를 받아옵니다.
  const [selectedCategory] = useState("카테고리1");
  const [selectedProductSeqList, setSelectedProductSeqList] = useState(seqList);
  const [firstProductReview, setFirstProductReview] = useState();
  const [secondProductReview, setSecondProductReview] = useState();
  const [thridProductReview, setThridProductReview] = useState();



  const [subCategoryProductList, setSubCategoryProductList ] = useState([]);

  

  const {subCategorySeq} = useParams();

  const getCategoryProductLists = async() => {
    try{
      const res = await TokenAxios.get(`/api/product/category/detail/${subCategorySeq}?page=0&size=50`)
      console.log(res.data);
      setSubCategoryProductList(res.data.result.data.content);
    }catch(e){
      console.log(e);
    }
  }

  const getProductReview = async(productSeq, index) => {
    try {
      const res = await TokenAxios.get(`/api/product/compare/${productSeq}`);
      console.log(res.data.result.data);

      if(index === 0 ){
        setFirstProductReview(res.data.result.data);
      }
      else if(index === 1){
       setSecondProductReview(res.data.result.data)
      }else if(index === 2){
        setThridProductReview(res.data.result.data);
      }
      else {
        console.log("없는 인덱스 입니다.");
      }
      // setProductReviewList(prevList => {
      //   // 새로운 배열을 만들되, 이전 상태를 기반으로 합니다.
      //   const newList = [...prevList];
      //   newList[index] = res.data.result.data;
      //   return newList;
      // });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSelectChange = (event, index) => {
    console.log(event.target.value);
    getProductReview(event.target.value, index);
    // 현재 배열을 복사한다.
    const arr = [...selectedProductSeqList];
    // 특정 인덱스의 값을 업데이트한다.
    arr[index] = event.target.value;
    // 변경된 배열로 상태를 업데이트한다.
    setSelectedProductSeqList(arr);
    // splice를 쓸수 없는 이유는 배열을 직접 변경하므로 React의 상태 업데이트에는 어울리지 않는다.
  }

  useEffect(() => {
  }, [selectedProductSeqList])


  

  useEffect(() => {
    if(selectedProductSeqList.length !== 0){
      getProductReview(selectedProductSeqList[0], 0);
      getProductReview(selectedProductSeqList[1], 1);
      getProductReview(selectedProductSeqList[2], 2);
    }
    getCategoryProductLists();
  },[subCategorySeq])


  // useEffect(() => {
  //   // 더미 상품 데이터
  //   const dummyProducts = [
  //     { id: 1, name: "상품 1" },
  //     { id: 2, name: "상품 2" },
  //     { id: 3, name: "상품 3" },
  //     { id: 4, name: "상품 4" },
  //     { id: 5, name: "상품 5" },
  //     { id: 6, name: "상품 6" },
  //     { id: 7, name: "상품 7" },
  //     { id: 8, name: "상품 8" },
  //     { id: 9, name: "상품 9" },
  //     // ... 추가 상품
  //   ];

  //   // 카테고리에 따른 상품 데이터를 설정합니다.
  //   setProductOptions(dummyProducts);
  // }, [selectedCategory]);


  // 선택된 상품을 관리하는 함수
  // const handleProductSelect = (productId, selectNumber) => {
    

  //   // Review 가져오는 곳
    


  //   const selectedProduct = selectedProductInfo.find(
  //     (product) => product.id === productId
  //   );

  //   // 기존 productInfo 배열의 크기 확인 및 필요한 만큼 업데이트
  //   setProductInfo((prevInfo) => {
  //     const updatedInfo = [...prevInfo];
  //     while (updatedInfo.length < selectNumber) {
  //       updatedInfo.push(null); // 필요한 만큼 null로 초기화
  //     }
  //     updatedInfo[selectNumber - 1] = selectedProduct; // 선택한 상품 정보 업데이트
  //     return updatedInfo;
  //   });

  //   setSelectedProducts((prevSelected) => ({
  //     ...prevSelected,
  //     [selectNumber]: productId,
  //   }));
  // };

  // const ProductSelect = ({ selectNumber }) => {
  //   const info = productInfo[selectNumber - 1];

  //   // return (
      // <Box
      //   sx={{
      //     display: "flex",
      //     flexDirection: "column",
      //     alignItems: "center",
      //     marginBottom: "20px",
      //     marginRight: "2vw",
      //     marginLeft: "2vw",
      //     minHeight: "100vh",
      //   }}
      // >
      //   <Select
      //     value={selectedProducts[selectNumber] || ""}
      //     onChange={(e) => handleProductSelect(e.target.value, selectNumber)}
      //     sx={{ mx: 1, width: "15vw" }}
      //     disabled={!selectedCategory}
      //   >
      //     {subCategoryProductList.map((product) => (
      //       <MenuItem
      //         key={product.productSeq}
      //         value={product.productSeq}
      //         disabled={Object.values(selectedProducts).includes(product.productSeq)}
      //       >
      //         {product.name}
      //       </MenuItem>
      //     ))}
      //   </Select>

      //   {info && (
      //     <Box sx={{ mt: 2 }}>
      //       <img
      //         src={info.productCompareDetailDto.imageUrl}
      //         alt={info.productCompareDetailDto.productName}
      //         style={{ width: "15vw", height: "15vw" }}
      //       />
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         상품명
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.productCompareDetailDto.productName}
      //       </Typography>
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         가격
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.productCompareDetailDto.price}
      //       </Typography>
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         평점
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.rating}
      //       </Typography>
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         리뷰 수
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.reviewNum}
      //       </Typography>
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         긍정적인 리뷰
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.goodReviewSummery.split(",").map((review, index) => (
      //           <span key={index}>
      //             {review.trim()}
      //             <br />
      //           </span>
      //         ))}
      //       </Typography>
      //       <Typography
      //         sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
      //       >
      //         부정적인 리뷰
      //       </Typography>
      //       <Typography
      //         sx={{
      //           fontSize: "25px",
      //           fontWeight: "bold",
      //           color: "#000000",
      //           mb: "3vh",
      //         }}
      //       >
      //         {info.badReviewSummery.split(",").map((review, index) => (
      //           <span key={index}>
      //             {review.trim()}
      //             <br />
      //           </span>
      //         ))}
      //       </Typography>
      //     </Box>
      //   )}
      // </Box>
    // );
  // };

  // 상품 선택 셀렉트 박스를 원하는 개수만큼 생성
  // const numberOfSelectBoxes = 3; // 선택 박스의 개수
  // const selectAndInfoComponents = Array.from(
  //   { length: numberOfSelectBoxes },
  //   (_, index) => <ProductSelect key={index} selectNumber={index + 1} />
  // );
  return (
    <Paper elevation={0} sx={{ padding: 2 }}>
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: 5,
          fontFamily: "hyundai",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {selectedCategory} 상품 비교하기
      </Typography>
      <Grid container>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={2}>
          <SelectBox>
            <Select
              value={selectedProductSeqList[0]}
              onChange={(e) => handleSelectChange(e,0)}
              sx={{ width: "15vw", marginBottom : "3vh" }}
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <ProductReview info={firstProductReview} />
          </SelectBox>
          
        </Grid>
        <Grid item xs={2}>

        </Grid>
        <Grid item xs={2}>
        <SelectBox>
            <Select
              value={selectedProductSeqList[1]}
              onChange={(e) => handleSelectChange(e, 1)}
              sx={{ width: "15vw", marginBottom : "3vh" }}
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <ProductReview info={secondProductReview} />
          </SelectBox>
          
        </Grid>
        <Grid item xs={2}>

        </Grid>
        <Grid item xs={2}>
        <SelectBox>
            <Select
              value={selectedProductSeqList[2]}
              onChange={(e) => handleSelectChange(e, 2)}
              sx={{ width: "15vw", marginBottom : "3vh" }}
              // disabled={!selectedCategory}
            >
              {subCategoryProductList.map((product) => (
                <MenuItem
                  key={product.productSeq}
                  value={product.productSeq}
                  // disabled={Object.values(selectedProducts).includes(product.productSeq)}
                  // onChange={handleProductSelect}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <ProductReview info={thridProductReview} />
          </SelectBox>
          
        </Grid>
        <Grid item xs={1}>

        </Grid>
      </Grid>

      {/* <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          padding: "10px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        > */}
          {/* {selectAndInfoComponents} */}

          
        {/* </Box>
      </Box> */}
    </Paper>
  );
};


const SelectBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 2vw;
    margin-left: 2vw;
    min-height: 100vh;
`