import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import { AdminButton } from "components/atoms/AdminCommonButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import mileageIcon from "./배경제거M-admin.png"; // 컴포넌트와 같은 디렉토리에 있는 경우
import Search from 'components/molecules/Search';

import {
  Box,
  Divider,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import { Link, useNavigate } from "react-router-dom";

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background.paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
  "& > *:nth-child(1)": { flex: 0.5 }, // 상품번호
  "& > *:nth-child(2)": { flex: 1.5 }, // 이미지
  "& > *:nth-child(3)": { flex: 3 }, // 이름
  "& > *:nth-child(4)": { flex: 1.5 }, // 제조사
  "& > *:nth-child(5)": { flex: 1 }, // 옵션
  "& > *:nth-child(6)": { flex: 1.5 }, // 가격
  "& > *:nth-child(7)": { flex: 0.5 }, // 상품상세
};

const ListItemLabelStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(
    70vh / 10
  ); // 전체 높이의 70%를 10로 나눈 값으로 레이블 행의 높이를 설정
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 8); // 전체 높이의 70%를 8로 나눈 값
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const ProductListPage = () => {

  const navigate = useNavigate();

  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("상품 목록");
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const pageSize = 10;

  const [dataList, setDataList] = useState([]);
  const dataListLabels = [
    "상품 번호",
    "이미지",
    "이름",
    "제조사",
    "옵션",
    "가격",
    "상품 상세",
  ];
  const optionList = [
    { label: "이름" },
    { label: "제조사" },
  ]
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const productGet = async (page) => {
    const res = await TokenAxios.get(`/api/product?page=${page}&size=${pageSize}`);
    setDataList(res.data.result.data.content);
    setTotalPages(res.data.result.data.totalPages);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery, currentPage);
    } else {
      productGet(currentPage);
    }
    setSelectedMenu("마일리지 승인");
  },[currentPage,searchQuery,handleSearch]);

  

  // Pagination에서 페이지가 변경될 때 호출되는 함수
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery,newPage);
  } else {
      // 검색어가 없는 경우 전체 데이터에 대한 페이징 수행
      productGet(newPage);
  }
  };
  
  const handleSearch = async (searchQuery) => {
    try {
      console.log(selectedValue.label);
      console.log(searchQuery);
      
      let apiUrl = `/api/product/search?${currentPage}&size=${pageSize}`;  // 기본 API URL
      
      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "이름") {
        apiUrl += `&name=${searchQuery}`;
      } else if (selectedValue.label === "제조사") {
        apiUrl += `&company=${searchQuery}`;
      }  
      const res = await TokenAxios.get(apiUrl);
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (error) {
      console.error('Error searching admin:', error);
    }
  };

  // 상품 정보를 표시하기 위한 컴포넌트입니다.
  const ProductItem = ({ product, index }) => {
    return (
      <ListItemStyled>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
        {index + 1 + (currentPage * pageSize)}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "62px", height: "62px" }} // 이미지 크기를 62x62으로 조정
          />
        </div>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {product.company}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {product.optionDetail}
        </Typography>
        <Typography
          variant="body1" sx={{ textAlign: "left", marginLeft: "10px" }}>
            <div style={{ marginLeft: "70px" }}>
              <img
                src={mileageIcon}
                alt="마일리지"
                style={{ width: "15px", height: "15px", marginRight: "10px" }}
              />
              {product.price.toLocaleString()}
            </div>
        </Typography>
        <Link
          to={`/admin/product/edit`}
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Link>
      </ListItemStyled>
    );
  };

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
            flex: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <Search
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onInputChange={handleSearchInputChange}
               setSelectedValue={setSelectedValue}
              optionList={optionList}
            />
            <AdminButton 
              variant="contained" 
              onClick={() => {navigate("/admin/product/register")}}
            >
              등록하기
            </AdminButton>
          </Toolbar>
          <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
            <StyledList aria-label="mailbox folders">
              <ListItemLabelStyled>
                {dataListLabels.map((label, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ textAlign: "center" }}
                    >
                      {label}
                    </Typography>
                  </React.Fragment>
                ))}
              </ListItemLabelStyled>
              <Divider component="li" />
              {dataList.map((product, index) => (
                <React.Fragment key={index}>
                  <ProductItem product={product} index={index} />
                  {index !== dataList.length && (
                    <Divider component="li" light />
                  )}
                </React.Fragment>
              ))}
            </StyledList>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {/* 페이지네이션 섹션 */}
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={(event, newPage) =>
                handlePageChange(event, newPage - 1)
              }
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductListPage;
