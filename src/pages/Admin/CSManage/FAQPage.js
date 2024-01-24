import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/AdminBar";
import {
  AdminButton,
  InputBoxS,
  InputBoxM,
  CustomSelect,
} from "../../../components/atoms/CKEditor";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
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

const dataList = [
  {
    FAQ번호: "F001",
    작성일시: "2024-01-01 10:00",
    카테고리: "상품",
    FAQ: "상품은 어떻게 주문하나요?",
  },
  {
    FAQ번호: "F002",
    작성일시: "2024-01-02 11:00",
    카테고리: "주문",
    FAQ: "주문 취소는 어떻게 하나요?",
  },
  {
    FAQ번호: "F003",
    작성일시: "2024-01-03 12:00",
    카테고리: "결제",
    FAQ: "결제 방법에는 어떤 것들이 있나요?",
  },
  {
    FAQ번호: "F004",
    작성일시: "2024-01-04 13:00",
    카테고리: "상품",
    FAQ: "상품의 재고가 언제 업데이트 되나요?",
  },
  {
    FAQ번호: "F005",
    작성일시: "2024-01-05 14:00",
    카테고리: "결제",
    FAQ: "카드 결제 시 오류가 발생하는 경우 어떻게 해야 하나요?",
  },
  {
    FAQ번호: "F006",
    작성일시: "2024-01-06 15:00",
    카테고리: "주문",
    FAQ: "주문 후 배송 기간은 얼마나 걸리나요?",
  },
  {
    FAQ번호: "F007",
    작성일시: "2024-01-07 16:00",
    카테고리: "상품",
    FAQ: "상품에 대한 추가 정보를 어디서 볼 수 있나요?",
  },
  {
    FAQ번호: "F008",
    작성일시: "2024-01-08 17:00",
    카테고리: "결제",
    FAQ: "결제 시 사용할 수 있는 할인 쿠폰은 어떻게 받나요?",
  },
  {
    FAQ번호: "F009",
    작성일시: "2024-01-09 18:00",
    카테고리: "주문",
    FAQ: "주문한 상품을 다른 주소로 변경할 수 있나요?",
  },
  {
    FAQ번호: "F010",
    작성일시: "2024-01-10 19:00",
    카테고리: "상품",
    FAQ: "상품 평가는 어떻게 하나요?",
  },
];

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background.paper;
`;

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

const dataListLabels = Object.keys(dataList[0]);

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
  // Define your width ranges for each column label
  const widthRanges = {
    FAQ번호: [0, 10],
    작성일시: [10, 20],
    카테고리: [20, 30],
    FAQ: [30, 60],
    보기: [60, 70],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const FAQPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("FAQ");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("FAQ");
  }, []);

  // Modal의 상태를 관리하는 state
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [lookModalOpen, setLookModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [title] = useState(`FAQ 자주 올라오는 질문 입니다.`);
  const [content] = useState(`<p>상품은 어떻게 주문하나요?</p>
    <p>상품을 주문하는 과정은 간단하며 다음 단계를 따라주시면 됩니다.</p>
    <p>제품 선택: 웹사이트 또는 앱을 통해 원하는 상품을 찾아주세요. 제품 페이지에서 옵션과 가격을 확인하고, 필요한 경우 리뷰와 평가도 참고하세요.</p>
    <p>장바구니에 담기: 상품 페이지에서 "장바구니에 담기" 버튼을 클릭하세요. 장바구니에서는 주문 내역을 확인하고 필요한 경우 수량을 조절할 수 있습니다.</p>
    <p>주문 정보 입력: 주문을 계속하기 전에 배송 정보, 연락처, 결제 정보 등을 입력해주세요. 주문 전에 입력한 정보를 정확히 확인하고 수정이 필요한 경우 수정해주세요.</p>
    <p>결제: 주문 정보를 확인한 후, 원하는 결제 방법을 선택하세요. 신용카드, 무통장 입금, 페이팔 등 다양한 결제 옵션이 제공됩니다.</p>
    <p>주문 완료: 결제가 완료되면 주문 확인 이메일이 발송됩니다. 주문 상태와 추적 번호를 확인하며 배송 상황을 추적할 수 있습니다.</p>
    <p>배송 및 수령: 주문한 상품은 배송까지의 일정을 확인하고, 배송이 완료되면 안전하게 상품을 수령하세요.</p>`);

  const handleWriteOpenModal = () => {
    setWriteModalOpen(true);
  };

  const handleWriteCloseModal = () => {
    setWriteModalOpen(false);
  };

  const handleUpdateOpenModal = () => {
    setUpdateModalOpen(true);
  };
  const handleUpdateCloseModal = () => {
    setUpdateModalOpen(false);
    setLookModalOpen(false);
  };

  const handleLookOpenModal = () => {
    setLookModalOpen(true);
  };
  const handleLookCloseModal = () => {
    setLookModalOpen(false);
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
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <div />
            <InputBoxS
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4, mt: 4 }}
            />
            <AdminButton variant="contained" onClick={handleWriteOpenModal}>
              작성하기
            </AdminButton>
          </Toolbar>

          <StyledList aria-label="mailbox folders">
            <ListItemStyled>
              {dataListLabels.map((label, index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ width: getColumnWidth(label), textAlign: "center" }}
                  >
                    {label}
                  </Typography>
                </React.Fragment>
              ))}
              <Typography variant="h6" fontWeight="bold">
                보기
              </Typography>
            </ListItemStyled>
            <Divider component="li" light />
            {dataList.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <ListItemStyled>
                  {dataListLabels.map((label, colIndex) => (
                    <Typography
                      variant="body1"
                      key={colIndex}
                      sx={{ width: getColumnWidth(label), textAlign: "center" }}
                    >
                      {item[label]}
                    </Typography>
                  ))}
                  <IconButton onClick={handleLookOpenModal}>
                    <InfoOutlinedIcon />
                  </IconButton>
                </ListItemStyled>
                {rowIndex !== dataList.length - 1 && (
                  <Divider component="li" light />
                )}
              </React.Fragment>
            ))}
          </StyledList>

          <Pagination count={10} />

          {/* FAQ 작성 모달  */}
          <Dialog
            onClose={handleWriteCloseModal}
            open={writeModalOpen}
            maxWidth={false}
          >
            <DialogTitle
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomSelect
                size="s"
                sx={{ marginRight: "10px" /* 추가적인 스타일 */ }}
              />
              <InputBoxM
                color="neutral"
                placeholder="Text"
                disabled={false}
                variant="soft"
                sx={{ mb: 2, mt: 2, width: "70%" }}
              />
            </DialogTitle>
            <DialogContent style={{ width: 900, height: 550 }}>
              <CKEditorContainer>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>공지를 작성하세요</p>"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    // 원하는 작업 수행
                  }}
                />
              </CKEditorContainer>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "20px" }}
              >
                <AdminButton autoFocus onClick={handleWriteCloseModal}>
                  Save
                </AdminButton>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/* FAQ 수정 모달  */}
          <Dialog
            onClose={handleUpdateCloseModal}
            open={updateModalOpen}
            maxWidth={false}
          >
            <DialogTitle
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomSelect
                size="s"
                sx={{ marginRight: "10px" /* 추가적인 스타일 */ }}
              />
              <InputBoxM
                value={title}
                color="neutral"
                placeholder="Text"
                disabled={false}
                variant="soft"
                sx={{ mb: 2, mt: 2, width: "70%" }}
              />
            </DialogTitle>
            <DialogContent style={{ width: 900, height: 550 }}>
              <CKEditorContainer>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    // 원하는 작업 수행
                  }}
                />
              </CKEditorContainer>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "20px" }}
              >
                <AdminButton autoFocus onClick={handleWriteCloseModal}>
                  Save
                </AdminButton>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/* FAQ 보기 모달 */}
          <Dialog
            onClose={handleLookCloseModal}
            open={lookModalOpen}
            maxWidth={false}
          >
            <DialogContent style={{ width: 900, height: 600 }}>
              <div>
                <Grid marginTop="2%" style={{ textAlign: "center" }}>
                  <h2>FAQ 자주 올라오는 질문 입니다.</h2>
                </Grid>
                <Grid>
                  작성일시 : 2024-01-22 | 작성자 라이언 | 카테고리: 상품
                </Grid>

                <Typography style={{ marginTop: "5%" }}>
                  Q: 상품은 어떻게 주문하나요?
                  <br />
                  <br />
                  A: 상품을 주문하는 과정은 간단하며 다음 단계를 따라주시면
                  됩니다.
                  <br />
                  <br />
                  제품 선택: 웹사이트 또는 앱을 통해 원하는 상품을 찾아주세요.
                  제품 페이지에서 옵션과 가격을 확인하고, 필요한 경우 리뷰와
                  평가도 참고하세요.
                  <br />
                  <br />
                  장바구니에 담기: 상품 페이지에서 "장바구니에 담기" 버튼을
                  클릭하세요. 장바구니에서는 주문 내역을 확인하고 필요한 경우
                  수량을 조절할 수 있습니다.
                  <br />
                  <br />
                  주문 정보 입력: 주문을 계속하기 전에 배송 정보, 연락처, 결제
                  정보 등을 입력해주세요. 주문 전에 입력한 정보를 정확히
                  확인하고 수정이 필요한 경우 수정해주세요.
                  <br />
                  <br />
                  결제: 주문 정보를 확인한 후, 원하는 결제 방법을 선택하세요.
                  신용카드, 무통장 입금, 페이팔 등 다양한 결제 옵션이
                  제공됩니다.
                  <br />
                  <br />
                  주문 완료: 결제가 완료되면 주문 확인 이메일이 발송됩니다. 주문
                  상태와 추적 번호를 확인하며 배송 상황을 추적할 수 있습니다.
                  <br />
                  <br />
                  배송 및 수령: 주문한 상품은 배송까지의 일정을 확인하고, 배송이
                  완료되면 안전하게 상품을 수령하세요.
                  <br />
                </Typography>
              </div>
              <div>
                <DialogActions
                  style={{ justifyContent: "center", marginTop: "40px" }}
                >
                  <AdminButton
                    autoFocus
                    onClick={handleUpdateOpenModal}
                    style={{ marginRight: "5%" }}
                  >
                    수정
                  </AdminButton>
                  <AdminButton autoFocus onClick={handleLookCloseModal}>
                    삭제
                  </AdminButton>
                </DialogActions>
              </div>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Paper>
  );
};

export default FAQPage;
