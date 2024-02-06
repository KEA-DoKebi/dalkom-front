import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
} from "@mui/material";
import AdminBar from "components/organisms/AdminBar";
import { InputBoxM } from "components/atoms/Input";
import { AdminButton } from "components/atoms/AdminCommonButton";
import { TokenAxios } from "../../../apis/CommonAxios";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

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

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const FAQPage = () => {
  const dataListLabels = ["번호", "일시", "FAQ", "보기"];
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("FAQ");
  const { register, handleSubmit } = useForm();
  const [editorData, setEditorData] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [editFaq, setEditFaq] = useState({ title: "", content: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const pageSize = 10;

  const optionList = [{ label: "FAQ제목" }];
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
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

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleUpdateModalOpen = async (inquirySeq) => {
    try {
      const res = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
      currentInquirySeq = inquirySeq;

      setEditFaq(res.data.result.data);
      setSelectedFaq(res.data.result.data);
      setUpdateModalOpen(true);
    } catch (e) {
      console.error("FAQ 상세 정보 불러오기 실패: ", e);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  // FAQ 등록
  const createFaq = async (data) => {
    data.content = editorData;

    try {
      await TokenAxios.post(`/api/faq`, data);
    } catch (e) {
      Swal.fire({
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
  const updateFaq = async (data) => {
    try {
      await TokenAxios.put(`/api/faq/${currentInquirySeq}`, {
        title: editFaq.title,
        content: editFaq.content,
      });
      Swal.fire({//
        icon: "success",
        title: "FAQ 수정이 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
    }).then(() => {
        handleUpdateModalClose();
        getFaq();
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
        handleUpdateModalClose();
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
  }, [currentPage, selectedFaq]);

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
        <KeyboardDoubleArrowRightIcon
          onClick={() => handleUpdateModalOpen(faq.inquirySeq)}
          sx={{ textAlign: "center" }}
        />
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
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <div sx={{ marginLeft: "10px" }}>
              <Search
                onSearch={handleSearch}
                searchQuery={searchQuery}
                onInputChange={handleSearchInputChange}
                setSelectedValue={setSelectedValue}
                optionList={optionList}
              />
            </div>

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
            onClose={handleCreateModalOpen}
            open={createModalOpen}
            maxWidth={false}
          >
            <form
              onSubmit={handleSubmit((data) => {
                createFaq(data);
              })}
            >
              <DialogTitle>
                <InputBoxM
                  id="title"
                  color="neutral"
                  placeholder="Text"
                  disabled={false}
                  variant="soft"
                  sx={{ mb: 2, mt: 2, width: "100%" }}
                  {...register("title")}
                />
                <IconButton
                  aria-label="close"
                  onClick={handleCreateModalClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent
                style={{
                  width: 900,
                  height: "450px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <CKEditorContainer>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleEditorChange}
                  />
                </CKEditorContainer>
              </DialogContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  marginBottom: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              ></div>
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
                  저장
                </AdminButton>
              </DialogActions>
            </form>
          </StyledDialog>

          {/* FAQ 수정 모달  */}
          <StyledDialog
            onClose={handleUpdateModalClose}
            open={updateModalOpen}
            maxWidth={false}
          >
            <form
              onSubmit={handleSubmit((data) => {
                updateFaq(data);
              })}
            >
              <DialogTitle
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <InputBoxM
                  defaultValue={selectedFaq?.title}
                  onChange={(e) =>
                    setEditFaq({ ...editFaq, title: e.target.value })
                  }
                  color="neutral"
                  placeholder="Text"
                  disabled={false}
                  variant="soft"
                  sx={{ mb: 2, mt: 2, width: "70%" }}
                ></InputBoxM>
                <IconButton
                  aria-label="close"
                  onClick={handleUpdateModalClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent style={{ width: 900, height: 550 }}>
                <CKEditorContainer>
                  <CKEditor
                    editor={ClassicEditor}
                    data={selectedFaq?.content}
                    onChange={(event, editor) => {
                      setEditFaq({ ...editFaq, content: editor.getData() });
                    }}
                  />
                </CKEditorContainer>
                <DialogActions
                  style={{ justifyContent: "center", marginTop: "20px" }}
                >
                  <AdminButton
                    type="submit"
                    autoFocus
                    onClick={handleUpdateModalClose}
                  >
                    수정
                  </AdminButton>
                  <AdminButton autoFocus onClick={handleDeleteClick}>
                    삭제
                  </AdminButton>
                </DialogActions>
              </DialogContent>
            </form>
          </StyledDialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default FAQPage;
