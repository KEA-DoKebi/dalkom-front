import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import { AdminButton } from "components/atoms/AdminCommonButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomSelect } from "components/atoms/AdminSelectBox";
import CloseIcon from '@mui/icons-material/Close';
import Search from 'components/molecules/Search';
import {
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import Swal from "sweetalert2";

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
  "& > *:nth-child(1)": { flex: 1 }, // 주문번호
  "& > *:nth-child(2)": { flex: 1 }, // 주문일시
  "& > *:nth-child(3)": { flex: 0.5 }, // 수량
  "& > *:nth-child(4)": { flex: 1 }, // 주문자
  "& > *:nth-child(5)": { flex: 1 }, // 수령인
  "& > *:nth-child(6)": { flex: 1 }, // 결제금액
  "& > *:nth-child(7)": { flex: 1.5 }, // 주문상태
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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const AdminListPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("주문 목록");
  const [dataList, setDataList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState();
  const [orderState, setOrderState] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const pageSize =7;
  const optionList = [
    { label: "주문자" },
    { label: "수령인" },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = async (searchQuery) => {
    try {
      let apiUrl = `/api/order/admin/search?page=${currentPage}&size=${pageSize}`;  // 기본 API URL
      
      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "주문자") {
        apiUrl += `&name=${searchQuery}`;
      } else if (selectedValue.label === "수령인") {
        apiUrl += `&receiverName=${searchQuery}`; 
      }
      
      const res = await TokenAxios.get(apiUrl);
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (error) {
      console.error('Error searching admin:', error);
    }
  }
  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("주문 목록");
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      adminOrderGet(currentPage);
    }
     // 페이지가 변경될 때 API 호출
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage,searchQuery]);

  const adminOrderGet = async (page) => {
    const res = await TokenAxios.get(`/api/order?page=${page}&size=${pageSize}`);
    setDataList(res.data.result.data.content);
    setTotalPages(res.data.result.data.totalPages);
  };
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

   

  // 주문 상세 조회 (get)
  const handleOpenModal = async (order) => {
    try {
      const res = await TokenAxios.get(`/api/order/${order.ordrSeq}`);
      console.log("Selected Order:", res.data);
      setSelectedOrder({
        detailList: res.data.result.data.orderDetailList,
        receiverDetail: res.data.result.data.receiverDetail,
        totalPrice: res.data.result.data.totalPrice,
        orderSeq: order.ordrSeq,
        orderDate: order.ordrDate,
        orderName: order.name,
      });
      setOrderState(order.ordrState);
      setModalOpen(true);
    } catch (e) {
      console.error("주문 상세 정보 가져오기 실패", e);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOrderStateChange = (event) => {
    setOrderState(event.target.value); // Update orderStatus when the value changes
    // updateState(selectedOrder.orderSeq, event.target.value);
  };

   
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    // Add more options as needed
  ];

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
  const handleSaveClick = () => {
    if (selectedOrder && orderState) {
      updateState(selectedOrder.orderSeq, orderState);
      handleCloseModal();
    } else {
      console.log("주문 정보 또는 상태가 없습니다.")
    }
  }

  
  

  // Pagination에서 페이지가 변경될 때 호출되는 함수
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트

    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
  } else {
      // 검색어가 없는 경우 전체 데이터에 대한 페이징 수행
      adminOrderGet(newPage);
  }
  };
  

  // 전체 주문 조회 (get)
  const adminGet = async (page) => {
    const res = await TokenAxios.get(`/api/order?page=${page}&size=${pageSize}`);
    console.log(res.data.result.data.content);
    setDataList(res.data.result.data.content);
    console.log(res.data.result.data.totalPages);
    setTotalPages(res.data.result.data.totalPages);
  };

  // 주문 상태 변경
  const updateState = async (orderSeq, newState) => {
    try {
      const res = await TokenAxios.put(`/api/order/${orderSeq}/state`, { orderState: newState });
      if (res.status === 200) {
        Swal.fire("성공", "상태를 변경했습니다.", "success");
        adminGet(currentPage);
      } else {
        throw new Error('API response error');
      }
    } catch (e) {
      console.error("상태 변경 실패", e)
      Swal.fire("실패", "상태를 변경할 수 없습니다.", "error")
    }
  }

    
  const OrderList = ({ order, index }) => {
    return (
      <ListItemStyled>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {index + 1 + (currentPage * pageSize)}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {formatDate(order.ordrDate)}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {order.ordrCnt}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {order.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {order.receiveName}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {order.totalPrice}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", ml: "10px" }}>
          {order.ordrStateName}
        </Typography>
        <IconButton onClick={() => handleOpenModal(order)} sx={{ textAlign: "center" }}>
          <InfoOutlinedIcon />
        </IconButton>
      </ListItemStyled>
    );
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      adminGet(currentPage);
    }
    setSelectedMenu("주문 목록");
  },[currentPage,searchQuery,handleSearch]);

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
            <Search
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onInputChange={handleSearchInputChange}
              setSelectedValue={setSelectedValue}
              optionList={optionList}
              style={{ paddingRight: 60 }}
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
                  <OrderList order={order} index={index} />
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

          <Dialog onClose={handleCloseModal} open={modalOpen} maxWidth={false} style={{ borderRadius: "30px" }}
            PaperProps={{ sx: { borderRadius: "30px" } }} >
            <DialogTitle style={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", marginTop: "10px" }}>
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
              >
                <CloseIcon />
              </IconButton>
              주문 상세 정보
            </DialogTitle>
            {selectedOrder && (
              <DialogContent style={{ width: 1200, height: 650, overflowY: "initial" }} >
                <div>
                  <Grid container spacing={2} marginTop="2%">
                    <Grid item xs={1}>
                      {" "}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ fontWeight: "bold" }}>
                        주문자
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>{selectedOrder.orderName}</Typography>
                    </Grid>
                    <Grid item xs={2.5}>
                    </Grid>
                    <Grid item xs={1.8}>
                      <Typography style={{ fontWeight: "bold" }}>
                        주문 상태
                      </Typography>
                    </Grid>
                    <Grid item xs={1.2}>
                      <CustomSelect
                        options={options}
                        value={orderState}
                        onChange={handleOrderStateChange}
                        size="xs"
                      ></CustomSelect>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography> </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop="0.5%">
                    <Grid item xs={1}>
                      {" "}
                    </Grid>
                    <Grid item xs={2}>
                      {/* 배송지 정보와 배송 요청 사항 */}
                      <Typography style={{ fontWeight: "bold" }}>
                        주문 번호
                      </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                      <Typography>{selectedOrder.orderSeq}</Typography>
                    </Grid>
                    <Grid item xs={1.8} marginLeft={"6%"}>
                      <Typography style={{ fontWeight: "bold" }}>
                        주문 일시
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formatDate(selectedOrder.orderDate)}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop="0.5%">
                    <Grid item xs={1}>
                      {" "}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ fontWeight: "bold" }}>
                        수령인
                      </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                      <Typography>{selectedOrder.receiverDetail.receiverName}</Typography>
                    </Grid>
                    <Grid item xs={1.8} marginLeft={"6%"}>
                      <Typography style={{ fontWeight: "bold" }}>
                        수령인 연락처
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{selectedOrder.receiverDetail.receiverMobileNum}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} marginTop="0.5%">
                    <Grid item xs={1}>
                      {" "}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ fontWeight: "bold" }}>
                        배송지 정보
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{selectedOrder.receiverDetail.receiverAddress}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop="0.5%">
                    <Grid item xs={1}>
                      {" "}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ fontWeight: "bold" }}>
                        배송 요청 사항
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{selectedOrder.receiverDetail.receiverMemo}</Typography>
                    </Grid>
                  </Grid>


                  <table
                    style={{
                      marginLeft: "5%",
                      marginTop: "5%",
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      width: "90%",
                      height: "auto",
                      borderRadius: "30px", // 테두리를 둥글게 만드는 부분
                    }}
                  >
                    <thead>
                      <tr>
                        <Grid
                          container
                          spacing={2}
                          justifyContent="space-between"
                        >
                          <Grid item xs={5} style={{ textAlign: "center" }}>
                            <Typography style={{ fontWeight: "bold" }}>
                              주문 상품
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: "center" }}>
                            <Typography style={{ fontWeight: "bold" }}>
                              옵션
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: "center" }}>
                            <Typography style={{ fontWeight: "bold" }}>
                              수량
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "center" }}>
                            <Typography style={{ fontWeight: "bold" }}>
                              마일리지
                            </Typography>
                          </Grid>
                        </Grid>
                      </tr>
                    </thead>
                    <Box sx={{ height: "100px", maxHeight: "100px", overflowY: "auto", width: "100%" }}>

                      <tbody sx={{ height: "100px", maxHeight: "100px", overflowY: "auto" }}>
                        {selectedOrder.detailList.map((detail, index) => (
                          <tr key={index}>
                            <Grid container spacing={2} justifyContent="space-between" style={{ width: "1100px"}}>
                              <Grid item xs={5} style={{ textAlign: "center" }}>
                                <Typography style={{ fontSize: "14px", marginTop: "2%" }}>
                                  {detail.productName}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} style={{ textAlign: "center" }}>
                                <Typography style={{ fontSize: "14px", marginTop: "2%" }}>
                                  {detail.detail === "default" ? "-" : detail.detail}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} style={{ textAlign: "center" }}>
                                <Typography style={{ fontSize: "14px", marginTop: "2%" }}>
                                  {detail.amount}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} style={{ textAlign: "center" }}>
                                <Typography style={{ fontSize: "14px", marginTop: "2%" }}>
                                  {detail.totalPrice}
                                </Typography>
                              </Grid>
                            </Grid>
                          </tr>
                        ))}
                      </tbody>
                    </Box>
                  </table>

                  <Grid container spacing={2} marginTop="2%">
                    <Grid item xs={8.5}>
                      {" "}
                    </Grid>
                    <Grid item xs={1.5}>
                      <Typography style={{ marginTop: "2%", fontWeight: "bold" }}>
                        결제 금액
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{selectedOrder.totalPrice}</Typography>
                    </Grid>
                  </Grid>

                </div>
                <DialogActions
                  style={{ justifyContent: "center", marginTop: "60px" }}
                >
                  <AdminButton autoFocus onClick={handleSaveClick}>
                    저장
                  </AdminButton>
                </DialogActions>
              </DialogContent>
            )}
          </Dialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminListPage;