import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Pagination,
  Paper,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AdminBar from "components/organisms/AdminBar";
import { MuiColorChip } from "components/atoms/AdminChip";
import { AdminButton, AdminButton2 } from "components/atoms/AdminCommonButton";
import { TokenAxios } from "../../../apis/CommonAxios";
import Search from "components/molecules/Search";
import Swal from "sweetalert2";

let currentInquirySeq = null;

const pageSize = 10;

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
  "& > *:nth-child(1)": { width: "5%" }, // 번호
  "& > *:nth-child(2)": { width: "40%" }, // 제목
  "& > *:nth-child(3)": { width: "20%" }, // 일시
  "& > *:nth-child(4)": { width: "20%" }, // 상태
  "& > *:nth-child(5)": { width: "10%" }, // 작성
  "&:before, &:after": { content: '""', width: "2%" },
};

const StyledDialog = styled(Dialog)`
  z-index: 900;
`;

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const ListItemLabelStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 11);
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 11); // 전체 높이의 70%를 11로 나눈 값
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const OrderInquiryPage = () => {
  const dataListLabels = ["번호", "제목", "일시", "상태", "답변"];
  const [dataList, setDataList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [selectedItem, setSelectedItemData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const textareaRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const categorySeq = 35;
  const optionList = [{ label: "문의제목" }];

  //get
  const getInquiryByCategory = async (page) => {
    try {
      const res = await TokenAxios.get(
        `/api/inquiry/category/${categorySeq}/?page=${page}&size=${pageSize}`,
      );
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  // 검색
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = async (searchQuery) => {
    try {
      console.log(selectedValue.label);
      console.log(searchQuery);

      let apiUrl = `/api/inquiry/category/${categorySeq}/search?page=${currentPage}&size=7`; // 기본 API URL

      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "문의제목") {
        apiUrl += `&title=${searchQuery}`;
      }
      const res = await TokenAxios.get(apiUrl);
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
      console.log(res.data.result.data.content);
    } catch (error) {
      console.error("Error searching admin:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트

    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      // 검색어가 없는 경우 전체 데이터에 대한 페이징 수행
      getInquiryByCategory(newPage);
    }
  };

  const handleOpenModal = async (inquirySeq) => {
    console.log("inquirySeq:", inquirySeq);

    try {
      if (inquirySeq !== undefined && inquirySeq !== null) {
        currentInquirySeq = inquirySeq;

        // inquirySeq를 문자열로 변환하여 해당 아이템에 대한 정보 가져오기
        const response = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);

        // 가져온 정보를 state에 저장
        setSelectedItemData(response.data.result.data);
        setOpenModal(true);
      } else {
        console.error("Invalid inquirySeq:", inquirySeq);
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleModalSaveButton = async () => {
    try {
      // TextField의 내용 가져오기
      const answerContent = textareaRef.current.value;
      // 저장 요청 보내기
      await TokenAxios.put(`/api/inquiry/${currentInquirySeq}`, {
        answerContent: answerContent,
      });

      // 모달 닫기
      handleCloseModal();
      Swal.fire({
        //
        icon: "success",
        title: "주문 문의에 대한 답변이<br> 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: "black",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          // 답변 저장 후 성공적으로 처리되면 데이터를 새로고침
          getInquiryByCategory(currentPage).then(() => {
            // 필요한 경우 페이지를 새로 고침하지 않고도 UI를 업데이트하기 위해 상태를 업데이트할 수 있습니다.
            console.log("Data refreshed after saving the answer.");
          });
        }
      });
    } catch (error) {
      // 오류 처리
      console.error("저장 중 오류 발생:", error);
      Swal.fire({
        //
        icon: "error",
        title: "답변 등록에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
      });
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      getInquiryByCategory(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const InquiryList = ({ inquiry, index }) => {
    return (
      <ListItemStyled>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {index + 1 + currentPage * pageSize}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {inquiry.title}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {formatDate(inquiry.createdAt)}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {inquiry.answerStateName}
        </Typography>
          <div style={{display: "flex", justifyContent: "center"}}>
            <AdminButton2 onClick={() => handleOpenModal(inquiry.inquirySeq)}>
              보기
            </AdminButton2>
          </div>
      </ListItemStyled>
  );
  };

  return (
    <Paper sx={{display: "flex", minHeight:"100vh" }} elevation={0}>
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
          <Toolbar
            sx={{
              justifyContent: "space-between",
              height: "10vh",
              width: "100%",
            }}
          >
            <Search
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onInputChange={handleSearchInputChange}
              setSelectedValue={setSelectedValue}
              optionList={optionList}
            />
          </Toolbar>
          {dataList.length > 0 ? (
          <Box sx={{ width: "100%", height: "73.6vh", overflowY: "auto" }}>
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
              {dataList.map((inquiry, index) => (
                <React.Fragment key={index}>
                  <InquiryList inquiry={inquiry} index={index} />
                  {index !== dataList.length && (
                    <Divider component="li" light />
                  )}
                </React.Fragment>
              ))}
            </StyledList>
          </Box>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
              표시할 목록이 없습니다.
            </Typography>
          )}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {totalPages > 0 && (
                <Pagination
                  count={totalPages}
                  page={currentPage + 1}
                  onChange={(event, newPage) =>
                    handlePageChange(event, newPage - 1)
                  }
                />
              )}
          </Box>

          <StyledDialog
            onClose={handleCloseModal}
            open={openModal}
            maxWidth={false}
            sx={{
              overflowX: "initial",
              "& .MuiDialog-paper": {
                borderRadius: "30px",
              },
            }}
          >
            <DialogTitle
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textAlign: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
                문의
              </Typography>
            </DialogTitle>
            <DialogContent
              style={{
                width: 1200,
                height: "370px",
                overflowY: "initial",
                overflowX: "initial",
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <div>
                <Grid container rowSpacing={1}>
                  <Grid item xs={2}>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      sx={{ textAlign: "center" }}
                    >
                      제목
                    </Typography>
                  </Grid>
                  <Grid item xs={9.5}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ textAlign: "left" }}
                    >
                      {selectedItem?.title || "title"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      sx={{ textAlign: "center", mt: 2 }}
                    >
                      내용
                    </Typography>
                  </Grid>
                  <Grid item xs={9.5}>
                    <Box
                      sx={{ maxHeight: "350px", overflowY: "auto", mt: 0.5 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "left" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedItem?.content,
                          }}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                id="outlined-textarea"
                defaultValue={selectedItem?.answerContent}
                label={
                  selectedItem?.answerState === "Y"
                    ? ""
                    : "답변을 입력해주세요."
                }
                rows={4}
                multiline
                disabled={selectedItem?.answerContent} // 답변이 완료된 경우 비활성화
                inputRef={textareaRef}
                sx={{
                  width: "80%",
                  backgroundColor:
                    selectedItem?.answerState === "Y" ? "#f0f0f0" : "#f8fafc",
                }}
              />
            </Box>
            <DialogActions
              style={{
                justifyContent: "center",
                marginTop: "40px",
                marginBottom: "30px",
              }}
            >
              {!selectedItem?.answerContent && (
                <AdminButton autoFocus onClick={handleModalSaveButton}>
                  저장
                </AdminButton>
              )}
            </DialogActions>
          </StyledDialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderInquiryPage;
