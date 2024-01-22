import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "../../components/AdminBar";
import { InputBoxS, AdminButton } from "../../components/AdminComponents";
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
    주문번호: "1001",
    주문일시: "2024-01-21 10:00",
    수량: 2,
    주문자: "홍길동",
    수령인: "김철수",
    결제금액: "50000 원",
    주문상태: "처리중",
  },
  {
    주문번호: "1002",
    주문일시: "2024-01-20 11:30",
    수량: 1,
    주문자: "이영희",
    수령인: "박지민",
    결제금액: "30000 원",
    주문상태: "배송준비",
  },
  {
    주문번호: "1003",
    주문일시: "2024-01-19 09:20",
    수량: 3,
    주문자: "김민준",
    수령인: "이하늘",
    결제금액: "75000 원",
    주문상태: "배송완료",
  },
  {
    주문번호: "1004",
    주문일시: "2024-01-18 15:00",
    수량: 1,
    주문자: "최우식",
    수령인: "정수정",
    결제금액: "20000 원",
    주문상태: "주문취소",
  },
  {
    주문번호: "1005",
    주문일시: "2024-01-17 17:45",
    수량: 2,
    주문자: "박보검",
    수령인: "한지민",
    결제금액: "40000 원",
    주문상태: "처리중",
  },
  {
    주문번호: "1006",
    주문일시: "2024-01-16 08:00",
    수량: 4,
    주문자: "윤아",
    수령인: "김태형",
    결제금액: "100000 원",
    주문상태: "배송준비",
  },
  {
    주문번호: "1007",
    주문일시: "2024-01-15 13:20",
    수량: 1,
    주문자: "강동원",
    수령인: "송중기",
    결제금액: "25000 원",
    주문상태: "배송완료",
  },
  {
    주문번호: "1008",
    주문일시: "2024-01-14 16:50",
    수량: 3,
    주문자: "전지현",
    수령인: "김수현",
    결제금액: "60000 원",
    주문상태: "주문취소",
  },
  {
    주문번호: "1009",
    주문일시: "2024-01-13 11:15",
    수량: 2,
    주문자: "이민호",
    수령인: "박신혜",
    결제금액: "50000 원",
    주문상태: "처리중",
  },
  {
    주문번호: "1010",
    주문일시: "2024-01-12 14:40",
    수량: 5,
    주문자: "손흥민",
    수령인: "박지성",
    결제금액: "125000 원",
    주문상태: "배송준비",
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
    주문번호: [0, 10],
    주문일시: [10, 30],
    수량: [30, 40],
    주문자: [40, 50],
    수령인: [50, 60],
    결제금액: [60, 70],
    주문상태: [70, 80],
    주문상세: [80, 100],
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

const OrderListPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("주문 목록");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("주문 목록");
  }, []);

  // Modal의 상태를 관리하는 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (ID, nickname) => {
    setModalOpen(true);
    setModalTitle(`주문상세 모달`);
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
                주문상세
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

export default OrderListPage;
