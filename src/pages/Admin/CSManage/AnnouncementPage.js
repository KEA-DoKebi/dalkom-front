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
    공지번호: "N001",
    작성일시: "2024-01-10 09:00",
    작성자: "홍길동",
    공지사항제목: "새로운 기능 업데이트 안내",
    상단고정: "Y",
  },
  {
    공지번호: "N002",
    작성일시: "2024-01-11 10:20",
    작성자: "이영희",
    공지사항제목: "시스템 점검 안내",
    상단고정: "N",
  },
  {
    공지번호: "N003",
    작성일시: "2024-01-12 11:30",
    작성자: "김철수",
    공지사항제목: "신규 서비스 런칭",
    상단고정: "Y",
  },
  {
    공지번호: "N004",
    작성일시: "2024-01-13 12:40",
    작성자: "박지민",
    공지사항제목: "사용자 인터페이스 개선 안내",
    상단고정: "N",
  },
  {
    공지번호: "N005",
    작성일시: "2024-01-14 13:50",
    작성자: "김민주",
    공지사항제목: "이용 약관 변경 공지",
    상단고정: "N",
  },
  {
    공지번호: "N006",
    작성일시: "2024-01-15 14:00",
    작성자: "최영호",
    공지사항제목: "보안 업데이트 안내",
    상단고정: "Y",
  },
  {
    공지번호: "N007",
    작성일시: "2024-01-16 15:10",
    작성자: "한지아",
    공지사항제목: "회원 혜택 개편 안내",
    상단고정: "N",
  },
  {
    공지번호: "N008",
    작성일시: "2024-01-17 16:20",
    작성자: "윤대리",
    공지사항제목: "모바일 앱 버전 업데이트",
    상단고정: "Y",
  },
  {
    공지번호: "N009",
    작성일시: "2024-01-18 17:30",
    작성자: "김과장",
    공지사항제목: "고객 지원 팀 운영 시간 변경",
    상단고정: "N",
  },
  {
    공지번호: "N010",
    작성일시: "2024-01-19 18:40",
    작성자: "이사장",
    공지사항제목: "연말 정산 관련 공지",
    상단고정: "Y",
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
    공지번호: [0, 10],
    작성일시: [10, 30],
    작성자: [30, 40],
    공지사항제목: [40, 50],
    상단고정: [50, 60],
    주문상세: [60, 70],
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

const AnnouncementPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("공지사항");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("공지사항");
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
                상세보기
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

export default AnnouncementPage;
