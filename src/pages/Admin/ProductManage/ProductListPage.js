import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import {InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import mileageIcon from "./배경제거M-admin.png"; // 컴포넌트와 같은 디렉토리에 있는 경우
import {Box, Divider, IconButton, List, ListItem, Pagination, Paper, Toolbar, Typography,} from "@mui/material";
import {TokenAxios} from "apis/CommonAxios";
import {Link} from "react-router-dom";

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background.paper;
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;

  & > *:nth-child(1) {
    flex: 0.5;
  }

  /* 상품 번호 */

  & > *:nth-child(2) {
    flex: 1.5;
  }

  /* 이미지 */

  & > *:nth-child(3) {
    flex: 3;
  }

  /* 이름 */

  & > *:nth-child(4) {
    flex: 1.5;
  }

  /* 제조사 */

  & > *:nth-child(5) {
    flex: 1;
  }

  /* 옵션 */

  & > *:nth-child(6) {
    flex: 1.5;
  }

  /* 가격 */

  & > *:nth-child(7) {
    flex: 0.5;
    justify-content: center;
    display: flex;
  }

  /* 상품 상세 */

  &:before,
  &:after {
    content: "";
    flex: 0.5;
  }
`;

const ProductListPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("상품 목록");
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 관리
    const [totalPages, setTotalPages] = useState();

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

    const productGet = async (page) => {
        const res = await TokenAxios.get(`/api/product?page=${page}&size=7`);
        console.log(res.data.result.data.content);
        setDataList(res.data.result.data.content);
        console.log(res.data.result.data.totalPages);
        setTotalPages(res.data.result.data.totalPages);
    };

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        productGet(currentPage); // 페이지가 변경될 때 API 호출
        setSelectedMenu("상품 목록");
    }, [currentPage]);

    // Pagination에서 페이지가 변경될 때 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    // 상품 정보를 표시하기 위한 컴포넌트입니다.
    const ProductItem = ({product}) => {
        return (
            <ListItemStyled>
                <Typography variant="body1" sx={{textAlign: "center"}}>
                    {product.productSeq}
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
                        style={{width: "70px", height: "70px"}} // 이미지 크기를 70x70으로 조정
                    />
                </div>
                <Typography variant="body1" sx={{textAlign: "center"}}>
                    {product.name}
                </Typography>
                <Typography variant="body1" sx={{textAlign: "center"}}>
                    {product.company}
                </Typography>
                <Typography variant="body1" sx={{textAlign: "center"}}>
                    {product.optionDetail}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={mileageIcon}
                        alt="마일리지"
                        style={{width: "20px", height: "20px", marginRight: "10px"}}
                    />
                    {product.price.toLocaleString()}
                </Typography>

                <Link to={`/admin/product/edit`} style={{textDecoration: "none"}}>
                    <IconButton>
                        <InfoOutlinedIcon/>
                    </IconButton>
                </Link>
            </ListItemStyled>
        );
    };

    return (
        <Paper sx={{display: "flex", height: "100vh"}}>
            {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
            <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    backgroundColor: "#EEF2F6",
                    flexGrow: 1,
                }}
            >
                <Toolbar/>
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
                    <Toolbar sx={{justifyContent: "space-between", width: "100%"}}>
                        {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
                        <div/>
                        <InputBoxS
                            color="neutral"
                            disabled={false}
                            startDecorator={<SearchIcon/>}
                            placeholder="Search"
                            variant="soft"
                            sx={{mb: 4, mt: 4, ml: "50px"}}
                        />
                        <AdminButton variant="contained">등록하기</AdminButton>
                    </Toolbar>

                    <StyledList aria-label="mailbox folders">
                        <ListItemStyled>
                            {dataListLabels.map((label, index) => (
                                <React.Fragment key={index}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{textAlign: "center"}}
                                    >
                                        {label}
                                    </Typography>
                                </React.Fragment>
                            ))}
                        </ListItemStyled>
                        <Divider component="li"/>
                        {dataList.map((product, index) => (
                            <React.Fragment key={index}>
                                <ProductItem product={product}/>
                                {index !== dataList.length - 1 && (
                                    <Divider component="li" light/>
                                )}
                            </React.Fragment>
                        ))}
                    </StyledList>

                    <Pagination
                        count={totalPages} // 총 페이지 수를 적용
                        page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                        onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default ProductListPage;
