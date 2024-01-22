import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "../../components/AdminBar";
import {
  InputBoxS,
  MuiColorChip,
  AdminButton,
} from "../../components/AdminComponents";
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
    문의번호: "1001",
    문의일시: "2024-01-21 10:30",
    문의글:
      "주문문의주문문의주문문의주문문의주문문의주문문의주문문의주문문의주문문의주문문의",
    답변여부: "대기중",
  },
  {
    문의번호: "1002",
    문의일시: "2024-01-20 15:20",
    문의글: "제품 교환 가능한가요?",
    답변여부: "대기중",
  },
  {
    문의번호: "1003",
    문의일시: "2024-01-19 13:45",
    문의글: "환불 절차를 알고 싶습니다.",
    답변여부: "대기중",
  },
  {
    문의번호: "1004",
    문의일시: "2024-01-18 17:00",
    문의글: "제품 사용 방법 문의합니다.",
    답변여부: "대기중",
  },
  {
    문의번호: "1005",
    문의일시: "2024-01-17 09:30",
    문의글: "주문 취소하고 싶습니다.",
    답변여부: "대기중",
  },
  {
    문의번호: "1006",
    문의일시: "2024-01-16 12:10",
    문의글: "배송 지연에 대한 문의",
    답변여부: "대기중",
  },
  {
    문의번호: "1007",
    문의일시: "2024-01-15 11:25",
    문의글: "색상 변경 가능한가요?",
    답변여부: "완료",
  },
  {
    문의번호: "1008",
    문의일시: "2024-01-14 14:55",
    문의글: "결제 수단 변경을 원합니다.",
    답변여부: "완료",
  },
  {
    문의번호: "1009",
    문의일시: "2024-01-13 16:40",
    문의글: "회원 정보 수정 관련 문의",
    답변여부: "완료",
  },
  {
    문의번호: "1010",
    문의일시: "2024-01-12 18:20",
    문의글: "추가 주문 관련 문의드립니다.",
    답변여부: "완료",
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
    문의번호: [0, 10],
    문의일시: [0, 10],
    문의글: [0, 50],
    답변여부: [0, 10],
    상세보기: [0, 10],
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

const OrderInquiryPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("주문 문의");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("주문 문의");
  }, []);

  // Modal의 상태를 관리하는 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (ID, nickname) => {
    setModalOpen(true);
    setModalTitle(`주문문의 모달`);
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
            <div />
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
                주문문의
              </Typography>
            </ListItemStyled>
            <Divider component="li" light />
            {dataList.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <ListItemStyled>
                  {dataListLabels.map((label, colIndex) =>
                    label === "답변여부" ? (
                      // 재고에 대한 스핀박스 렌더링
                      <MuiColorChip
                        status={
                          item["답변여부"] === "대기중"
                            ? "waiting"
                            : "completed"
                        }
                      />
                    ) : (
                      // 다른 데이터는 Typography로 렌더링
                      <Typography
                        variant="body1"
                        key={colIndex}
                        sx={{
                          width: getColumnWidth(label),
                          textAlign: "center",
                        }}
                      >
                        {item[label]}
                      </Typography>
                    ),
                  )}

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

export default OrderInquiryPage;
