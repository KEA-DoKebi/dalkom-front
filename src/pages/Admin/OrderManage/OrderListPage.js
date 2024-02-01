import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import { InputBoxS } from "components/atoms/Input";
import { AdminButton } from "components/atoms/AdminCommonButton";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomSelect } from "components/atoms/AdminSelectBox";
import Search from 'components/molecules/Search';
import {
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
  "& > *:nth-child(1)": { flex: 1 }, // 주문번호
  "& > *:nth-child(2)": { flex: 2 }, // 주문일시
  "& > *:nth-child(3)": { flex: 1 }, // 수량
  "& > *:nth-child(4)": { flex: 1 }, // 주문자
  "& > *:nth-child(5)": { flex: 1 }, // 수령인
  "& > *:nth-child(6)": { flex: 1 }, // 결제금액
  "& > *:nth-child(7)": { flex: 1 }, // 주문상태
  "& > *:nth-child(8)": { flex: 1 }, // 주문상세
};

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background.paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

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

const AdminListPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("주문 목록");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState();
  const [orderStatus, setOrderStatus] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const optionList = [
    { label: "주문자" },
    { label: "수령인" },
  ]
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value); // Update orderStatus when the value changes
  };

  const [dataList, setDataList] = useState([]);
  const dataListLabels = [
    "주문번호",
    "주문일시",
    "수량",
    "주문자",
    "수령인",
    "결제금액",
    "주문상태",
    "주문상세",
  ];

  const adminGet = async (page) => {
    const res = await TokenAxios.get(`/api/order?page=${page}&size=7`);
    console.log(res.data.result.data.content);
    setDataList(res.data.result.data.content);
    console.log(res.data.result.data.totalPages);
    setTotalPages(res.data.result.data.totalPages);
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    adminGet(currentPage); // 페이지가 변경될 때 API 호출
    setSelectedMenu("주문 목록");
  }, [currentPage]);

  // Pagination에서 페이지가 변경될 때 호출되는 함수
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };
  const handleSearch = async (searchQuery) => {
    try {
      console.log(selectedValue.label);
      console.log(searchQuery);
      
      let apiUrl = "/api/order/admin/search?page=0&size=10";  // 기본 API URL
      
      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "주문자") {
        apiUrl += `&name=${searchQuery}`;
      } else if (selectedValue.label === "수령인") {
        apiUrl += `&receiverName=${searchQuery}`; 
      }
      
      const res = await TokenAxios.get(apiUrl);
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
      console.log(res.data.result.data.content);
    } catch (error) {
      console.error('Error searching admin:', error);
    }
  };

  // 상품 정보를 표시하기 위한 컴포넌트입니다.
  const OrderList = ({ order }) => {
    return (
      <ListItemStyled>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.ordrSeq}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.ordrDate}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.ordrCnt}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.receiveName}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.totalPrice}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {order.ordrState}
        </Typography>
        <IconButton onClick={handleOpenModal}>
          <InfoOutlinedIcon />
        </IconButton>
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
          <Toolbar sx={{ justifyContent: "left", width: "100%" }}>
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <Search
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onInputChange={handleSearchInputChange}
               setSelectedValue={setSelectedValue}
              optionList={optionList}
              style= {{paddingRight:60}}
            />
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
              {dataList.map((order, index) => (
                <React.Fragment key={index}>
                  <OrderList order={order} />
                  {index !== dataList.length - 1 && (
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
          <Dialog onClose={handleCloseModal} open={modalOpen} maxWidth={false}>
            <DialogContent style={{ width: 900, height: 600 }}>
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

export default AdminListPage;
