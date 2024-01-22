import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/AdminBar";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputBoxS, AdminButton } from "components/AdminComponents";
import { Box } from "@mui/system";
import {
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
    번호: "1",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "라이언",
    마일리지: 100000,
    부서: "코딩팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "2",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "어피치",
    마일리지: 10000000,
    부서: "디자인팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "3",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "무지",
    마일리지: 5000,
    부서: "영업팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "4",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "튜브",
    마일리지: 12000,
    부서: "마케팅팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "5",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "네오",
    마일리지: 0,
    부서: "기획팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "6",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "프로도",
    마일리지: 100000000,
    부서: "서비스팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "7",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "제이지",
    마일리지: 30000,
    부서: "연구팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "8",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "콘",
    마일리지: 3512300,
    부서: "경영지원팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "9",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "존",
    마일리지: 1234568979,
    부서: "고객지원팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  {
    번호: "10",
    ID: "epnjh0807@gachon.ac.kr",
    닉네임: "펭수",
    마일리지: 2357111317,
    부서: "디자인팀",
    기본배송지: "경기도 용인시 기흥구 사은로 126번길 10 110-1803",
  },
  // Add more data items as needed
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
    번호: [0, 10],
    ID: [10, 30],
    닉네임: [30, 40],
    마일리지: [40, 50],
    부서: [50, 60],
    기본배송지: [60, 90],
    삭제: [90, 100],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const ConfirmModal = ({ open, onClose, title, contents }) => {
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
            삭제
          </AdminButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const UserListPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("사용자 목록");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("사용자 목록");
  }, []);

  // Modal의 상태를 관리하는 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (ID, nickname) => {
    setModalOpen(true);
    setModalTitle(`정말 ${ID}(${nickname})님을 삭제하시겠습니까?`);
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
          justifyContent: "flex-strat",
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
            {/* 왼쪽에는 빈 공간을 만들어 가운데 정렬을 유지하고, 오른쪽에 등록 버튼을 추가합니다. */}
            {/* 이 디브 있어야 검색창 가운데에 옵니당 왜 그런지는 잘 모르겠어요,,*/}
            <div></div>
            <InputBoxS
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4, mt: 4 }}
            />
            <AdminButton variant="contained">+ 사용자 등록</AdminButton>
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
                삭제
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
                    <DeleteIcon />
                  </IconButton>
                </ListItemStyled>
                {rowIndex !== dataList.length - 1 && (
                  <Divider component="li" light />
                )}
              </React.Fragment>
            ))}
          </StyledList>

          <Pagination count={10} />

          <ConfirmModal
            open={modalOpen}
            onClose={() => closeModal()}
            title={modalTitle}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default UserListPage;
