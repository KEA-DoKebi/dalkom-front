import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/AdminBar";
import { InputBoxS, AdminButton } from "components/AdminComponents";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
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

const Modal = ({ open, onClose, title, contents }) => {
  const [content, setContent] = useState(contents || "");

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleSubmit = () => {
    console.log("Submitting modal content:", content);
    handleClose();
  };

  const modalDimensions = { width: 600, height: 200 };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="false">
      <DialogContent style={modalDimensions}>
        {title && (
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
          >
            {title}
          </DialogTitle>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AdminButton variant="contained" onClick={handleSubmit}>
            닫기
          </AdminButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (ID, nickname) => {
    setModalOpen(true);
    setModalTitle(`공지사항 모달`);
  };

  const closeModal = () => {
    setModalOpen(false);
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
            <AdminButton variant="contained">작성하기</AdminButton>
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
                  <IconButton onClick={() => openModal(item.ID, item.닉네임)}>
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

          <Modal
            open={modalOpen}
            onClose={() => closeModal()}
            title={modalTitle}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default FAQPage;
