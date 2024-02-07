import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "components/molecules/Search";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Pagination,
  Paper,
  Toolbar,
  Typography,
  Grid
} from "@mui/material";
import AdminBar from "components/organisms/AdminBar";
import { InputBoxXL } from "components/atoms/Input";
import { AdminButton, AdminButton2 } from "components/atoms/AdminCommonButton";
import { TokenAxios } from "../../../apis/CommonAxios";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import EditorComponent from "components/atoms/Editor";

let currentInquirySeq = null;

const itemFlexStyles = {
  "& > *:nth-child(1)": { width: "5%" }, // 번호
  "& > *:nth-child(2)": { width: "30%" }, // 작성일시
  "& > *:nth-child(3)": { width: "56%" }, // FAQ
  "& > *:nth-child(4)": { width: "5%" }, // 상세보기
  "&:before, &:after": { content: '""', width: "2%" },
};

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
const StyledDialog = styled(Dialog)`
  z-index: 900;
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const FAQPage = () => {
  const dataListLabels = ["번호", "작성일시", "FAQ", "상세보기"];
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("FAQ");
  const { register, handleSubmit, setValue, trigger } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const pageSize = 10;

  const optionList = [{ label: "FAQ제목" }];
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  const handleSearch = async (searchQuery) => {
    try {
      let apiUrl = `/api/faq/search?${currentPage}&size=${pageSize}`; // 기본 API URL

      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "FAQ제목") {
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

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [lookModalOpen, setLookModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleUpdateModalOpen = async (faqSeq) => {
    setSelectedFaq(selectedFaq);
    setUpdateModalOpen(true);
    setLookModalOpen(false);
  }

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  const handleLookModalOpen = async (inquirySeq) => {
    try {
      const res = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
      currentInquirySeq = inquirySeq;

      // setEditFaq(res.data.result.data);
      setSelectedFaq(res.data.result.data);
      setLookModalOpen(true);
    } catch (e) {
      console.error("FAQ 상세 정보 불러오기 실패: ", e);
    }
  };

  const handleLookModalClose = () => {
    setLookModalOpen(false);
  };

  // FAQ 등록
  const createFaq = async (data) => {
    data.content = editorContent;

    try {
      await TokenAxios.post(`/api/faq`, data);
      Swal.fire({//
        position: "center",
        icon: "success",
        title: "FAQ 등록이 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
      });
    } catch (e) {
      Swal.fire({
        position: "center",
        title: "FAQ 등록에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
      });
    }
    handleCreateModalClose();
    getFaq(currentPage);
  };

  // FAQ 목록 조회
  const getFaq = async (page) => {
    const res = await TokenAxios.get(`/api/faq?page=${page}&size=${pageSize}`);
    setDataList(res.data.result.data.content);
    setTotalPages(res.data.result.data.totalPages);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      // 검색어가 없는 경우 전체 데이터에 대한 페이징 수행
      getFaq(newPage);
    }
  };

  // FAQ 수정
  const updateFaq = async () => {
    try {
      await TokenAxios.put(`/api/faq/${currentInquirySeq}`, {
        title: selectedFaq.title,
        content: selectedFaq.content,
      });
      Swal.fire({//
        icon: "success",
        title: "FAQ 수정이 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
      }).then(() => {
        handleUpdateModalClose();
        getFaq(currentPage);
      });
    } catch (e) {
      console.error("FAQ 수정 실패: ", e);
      Swal.fire({//
        icon: "error",
        title: "FAQ 수정에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'gray',
        confirmButtonText: '확인',
      });
    }
  };

  // FAQ 삭제
  const deleteFaq = async (inquirySeq) => {
    try {
      await TokenAxios.delete(`/api/faq/${inquirySeq}`);
      Swal.fire({//
        icon: "success",
        title: "FAQ가 삭제되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
      }).then(() => {
        getFaq();
        handleLookModalClose();
        // setUpdateModalOpen(false);
      });
    } catch (e) {
      console.error("FAQ 삭제 실패:", e);
      Swal.fire({//
        icon: "error",
        title: "FAQ 삭제에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'gray',
        confirmButtonText: '확인',
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedFaq && currentInquirySeq) {
      Swal.fire({
        title: "삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
        cancelButtonColor: 'gray',
        cancelButtonText: '취소',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFaq(currentInquirySeq);
        }
      });
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      getFaq(currentPage);
    }
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("FAQ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery, selectedFaq]);

  const FAQList = ({ faq, index }) => {
    return (
      <ListItemStyled>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {index + 1 + currentPage * pageSize}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {formatDate(faq.createdAt)}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {faq.title}
        </Typography>
        <AdminButton2
          onClick={() => handleLookModalOpen(faq.inquirySeq)}
        >
          보기
        </AdminButton2>
      </ListItemStyled>
    );
  };

  return (
    <Paper sx={{ display: "flex" }} elevation={0}>
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
            <AdminButton variant="contained" onClick={handleCreateModalOpen}>
              작성하기
            </AdminButton>
          </Toolbar>

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
              {dataList.map((faq, index) => (
                <React.Fragment key={index}>
                  <FAQList faq={faq} index={index} />
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

          {/* FAQ 작성 모달  */}
          <StyledDialog
            // 이 부분이 handleCreateModalClose가 아니라 Open이어야 다른 곳 눌러도 안 꺼진다!!!!
            onClose={handleCreateModalClose}
            open={createModalOpen}
            maxWidth={false}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "30px",
              },
            }}
          >
            <form
              onSubmit={handleSubmit((data) => {
                createFaq(data);
              })}
            >
              <DialogTitle
                style={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <IconButton
                  aria-label="close"
                  onClick={handleCreateModalClose}
                  sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
                  FAQ
                </Typography>
                <InputBoxXL
                  id="title"
                  color="neutral"
                  placeholder="FAQ 제목을 입력해주세요."
                  disabled={false}
                  variant="soft"
                  sx={{ mb: 2, mt: 3, width: "100%" }}
                  {...register("title")}
                />
              </DialogTitle>
              <DialogContent
                style={{
                  width: 1200,
                  height: "450px",
                  overflowY: "initial",
                  overflowX: "hidden",
                  marginLeft: 20, marginRight: 20
                }}
              >
                <EditorComponent
                  onContentChange={handleEditorContentChange}
                  id="content"
                  data=""
                  placeholder="FAQ 내용을 입력해주세요."
                  value={editorContent}
                  onChange={(event, editor) => {
                    setValue("content", editor.getData());
                    trigger("content");
                    console.log("content");
                  }}
                  maxWidth={false}
                />
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <AdminButton
                  type="submit"
                  autoFocus
                  onClick={handleCreateModalClose}
                >
                  작성
                </AdminButton>
              </DialogActions>
            </form>
          </StyledDialog>

          {/* FAQ 수정 모달  */}
          <StyledDialog
            onClose={handleUpdateModalClose}
            open={updateModalOpen}
            maxWidth={false}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "30px",
              },
            }}
          >
            <DialogTitle style={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", marginTop: 20, marginLeft: 20, marginRight: 20 }}>
              <IconButton
                aria-label="close"
                onClick={handleUpdateModalClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
              >
                <CloseIcon />
              </IconButton>
              <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
                FAQ
              </Typography>

              <InputBoxXL
                id="title"
                value={selectedFaq?.title}
                onChange={(e) =>
                  setSelectedFaq({ ...selectedFaq, title: e.target.value })
                }
                color="neutral"
                placeholder="FAQ 제목을 입력해주세요."
                disabled={false}
                variant="soft"
                sx={{ mb: 2, mt: 2, width: "100%" }}
              ></InputBoxXL>
            </DialogTitle >

            <DialogContent style={{ width: 1200, height: "450px", overflowY: "initial", overflowX: "hidden", marginLeft: 20, marginRight: 20 }}>
              <EditorComponent
                onContentChange={(content) => setSelectedFaq({ ...selectedFaq, content: content })}
                placeholder="FAQ 내용을 입력해주세요."
                id="content"
                value={selectedFaq?.content}
                onChange={(event, editor) => {
                  setValue("content", editor.getData());
                  trigger("content");
                  console.log("content");
                }}
              />
            </DialogContent>

            <DialogActions
              style={{ justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}
            >
              <AdminButton autoFocus onClick={updateFaq}>
                저장
              </AdminButton>
            </DialogActions>
          </StyledDialog>

          {/* FAQ 보기 모달  */}
          <StyledDialog
            onClose={handleLookModalClose}
            open={lookModalOpen}
            maxWidth={false}
            sx={{
              overflowX: "initial",
              "& .MuiDialog-paper": {
                borderRadius: "30px",
              },
            }}
          >
            <DialogTitle style={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", marginTop: 20, marginBottom: 20 }}>
              <IconButton
                aria-label="close"
                onClick={handleLookModalClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
              >
                <CloseIcon />
              </IconButton>
              <Typography style={{ fontWeight: "bold", fontSize: "28px" }}>
                FAQ
              </Typography>
            </DialogTitle>
            <DialogContent
              style={{
                width: 1200,
                height: "450px",
                overflowY: "initial",
                overflowX: "initial",
                marginLeft: 20, marginRight: 20
              }}>
              <div>
                <Grid container rowSpacing={1}>
                  <Grid item xs={2}>
                    <Typography style={{fontSize: "20px", fontWeight: "bold"}} sx={{ textAlign: "center" }}>
                      제목
                    </Typography>
                  </Grid>
                  <Grid item xs={9.5}>
                    <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "left" }}>
                      {selectedFaq?.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography style={{fontSize: "20px", fontWeight: "bold"}} sx={{ textAlign: "center", mt: 2 }}>
                      내용
                    </Typography>
                  </Grid>
                  <Grid item xs={9.5}>
                    <Box sx={{ maxHeight: "350px", overflowY: "auto", mt: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                        <div dangerouslySetInnerHTML={{ __html: selectedFaq?.content }} />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions
              style={{
                justifyContent: "center",
                marginTop: "40px",
                marginBottom: "30px",
              }}
            >
              <AdminButton
                autoFocus
                onClick={handleUpdateModalOpen}
                style={{ marginRight: "3%" }}
              >
                수정
              </AdminButton>
              <AdminButton autoFocus onClick={handleDeleteClick}>
                삭제
              </AdminButton>
            </DialogActions>
          </StyledDialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default FAQPage;