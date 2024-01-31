import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Select, MenuItem } from "@mui/material";
import "assets/font/font.css";
import { TokenAxios } from "apis/CommonAxios";
import { productImageStore } from "store/store";
import { useParams } from "react-router-dom";

export const ComparisonBody = () => {
  // 카테고리 페이지에서 넘어온 정보를 받아옵니다.
  const [selectedCategory] = useState("카테고리1");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [productInfo, setProductInfo] = useState([]);


  const [subCategoryProductList, setSubCategoryProductList ] = useState([]);

  const {} = productImageStore((state) => state);

  const {subCategorySeq} = useParams();

  const getCategoryProductLists = async() => {
    const res = await TokenAxios(`/api/product/category/detail/${subCategorySeq}?page=0&size=50`)
    console.log(res.data);
    setSubCategoryProductList(res.data.result.data.content);
  }

  const selectedProductInfo = [
    {
      id: 1,
      name: "상품 1",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 10000,
      rating: 4.5,
      reviewCount: 100,
      positiveReviews:
        "가볍다, 튼튼하다, 가볍다, 튼튼하다, 가볍다, 튼튼하다, 가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    {
      id: 2,
      name: "상품 2",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 8000,
      rating: 4.0,
      reviewCount: 80,
      positiveReviews: "가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    {
      id: 3,
      name: "상품 3",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 12000,
      rating: 4.8,
      reviewCount: 120,
      positiveReviews: "가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    {
      id: 4,
      name: "상품 1",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 10000,
      rating: 4.5,
      reviewCount: 100,
      positiveReviews: "가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    {
      id: 5,
      name: "상품 2",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 8000,
      rating: 4.0,
      reviewCount: 80,
      positiveReviews: "가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    {
      id: 6,
      name: "상품 3",
      imageUrl:
        "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/4242bfd38b474e3db4e62fa7923ca013/dokebi-image-storage/mainpage%2Ffashion1.jpg",
      price: 12000,
      rating: 4.8,
      reviewCount: 120,
      positiveReviews: "가볍다, 튼튼하다",
      negativeReviews: "투박하다, 딱딱하다",
    },
    // 추가 상품 정보들도 추가할 수 있습니다.
  ];

  useEffect(() => {
    getCategoryProductLists();
  },[subCategorySeq])


  useEffect(() => {
    // 더미 상품 데이터
    const dummyProducts = [
      { id: 1, name: "상품 1" },
      { id: 2, name: "상품 2" },
      { id: 3, name: "상품 3" },
      { id: 4, name: "상품 4" },
      { id: 5, name: "상품 5" },
      { id: 6, name: "상품 6" },
      { id: 7, name: "상품 7" },
      { id: 8, name: "상품 8" },
      { id: 9, name: "상품 9" },
      // ... 추가 상품
    ];

    // 카테고리에 따른 상품 데이터를 설정합니다.
    setProductOptions(dummyProducts);
  }, [selectedCategory]);


  // 선택된 상품을 관리하는 함수
  const handleProductSelect = (productId, selectNumber) => {
    console.log(productId);
    const selectedProduct = selectedProductInfo.find(
      (product) => product.id === productId
    );

    // 기존 productInfo 배열의 크기 확인 및 필요한 만큼 업데이트
    setProductInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      while (updatedInfo.length < selectNumber) {
        updatedInfo.push(null); // 필요한 만큼 null로 초기화
      }
      updatedInfo[selectNumber - 1] = selectedProduct; // 선택한 상품 정보 업데이트
      return updatedInfo;
    });

    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [selectNumber]: productId,
    }));
  };

  const ProductSelect = ({ selectNumber }) => {
    const info = productInfo[selectNumber - 1];

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
          marginRight: "2vw",
          marginLeft: "2vw",
          minHeight: "100vh",
        }}
      >
        <Select
          value={selectedProducts[selectNumber] || ""}
          onChange={(e) => handleProductSelect(e.target.value, selectNumber)}
          sx={{ mx: 1, width: "15vw" }}
          disabled={!selectedCategory}
        >
          {subCategoryProductList.map((product) => (
            <MenuItem
              key={product.productSeq}
              value={product.productSeq}
              disabled={Object.values(selectedProducts).includes(product.productSeq)}
            >
              {product.name}
            </MenuItem>
          ))}
        </Select>
        {/* {info && ( */}
          <Box sx={{ mt: 2 }}>
            <img
              src={info.imageUrl}
              alt={info.name}
              style={{ width: "15vw", height: "15vw" }}
            />
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              상품명
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.name}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              가격
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.price}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              평점
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.rating}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              리뷰 수
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.reviewCount}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              긍정적인 리뷰
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.positiveReviews.split(",").map((review, index) => (
                <span key={index}>
                  {review.trim()}
                  <br />
                </span>
              ))}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", color: "#555555" }}
            >
              부정적인 리뷰
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000000",
                mb: "3vh",
              }}
            >
              {info.negativeReviews.split(",").map((review, index) => (
                <span key={index}>
                  {review.trim()}
                  <br />
                </span>
              ))}
            </Typography>
          </Box>
        {/* )} */}
      </Box>
    );
  };

  // 상품 선택 셀렉트 박스를 원하는 개수만큼 생성
  const numberOfSelectBoxes = 3; // 선택 박스의 개수
  const selectAndInfoComponents = Array.from(
    { length: numberOfSelectBoxes },
    (_, index) => <ProductSelect key={index} selectNumber={index + 1} />
  );
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

      <Box
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
          }}
        >
          {selectAndInfoComponents}
        </Box>
      </Box>
    </Paper>
  );
};
