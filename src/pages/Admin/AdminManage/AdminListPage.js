import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import AdminBar from "components/AdminBar";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputBoxS, AdminButton } from "components/AdminComponents";
import axios from "axios";

const dataList = [
  {
    번호: "1",
    ID: "ryan123",
    이름: "라이언",
    부서: "코딩팀",
    닉네임: "코딩라이언",
  },
  {
    번호: "2",
    ID: "apeach456",
    이름: "어피치",
    부서: "디자인팀",
    닉네임: "디자인어피치",
  },
  {
    번호: "3",
    ID: "muzi789",
    이름: "무지",
    부서: "영업팀",
    닉네임: "영업무지",
  },
  {
    번호: "4",
    ID: "tube101",
    이름: "튜브",
    부서: "마케팅팀",
    닉네임: "마케팅튜브",
  },
  {
    번호: "5",
    ID: "neo202",
    이름: "네오",
    부서: "기획팀",
    닉네임: "기획네오",
  },
  {
    번호: "6",
    ID: "frodo303",
    이름: "프로도",
    부서: "서비스팀",
    닉네임: "서비스프로도",
  },
  {
    번호: "7",
    ID: "jay404",
    이름: "제이지",
    부서: "연구팀",
    닉네임: "연구제이지",
  },
  {
    번호: "8",
    ID: "con505",
    이름: "콘",
    부서: "경영지원팀",
    닉네임: "경영콘",
  },
  {
    번호: "9",
    ID: "muzi606",
    이름: "존",
    부서: "고객지원팀",
    닉네임: "고객지원존",
  },
  {
    번호: "10",
    ID: "penguin707",
    이름: "펭수",
    부서: "디자인팀",
    닉네임: "디자인펭수",
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
    이름: [30, 50],
    부서: [50, 70],
    닉네임: [70, 90],
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

export default function AdminListPage() {
  const [selectedMenu, setSelectedMenu] = useState("관리자 목록");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("관리자 목록");
  }, []);

  // useEffect(()=>{
  //   testAxios()
  // },[])

  // const testAxios = async() => {
  //   const res = await axios.get("/data/data.json");
  //   // console.log(res.data);
  //   setDataList(res.data);

  // }

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
    //전체 화면
    <Paper sx={{ display: "flex", height: "100vh" }}>
      {/* 사이드 바 */}
      <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {/* 뒤에 배경 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#EEF2F6",
          flexGrow: 1,
        }}
      >
        {/* 이거는 써야 위에 간격이 맞더라구요 꼭 포함시키고 해주세요 */}
        <Toolbar />
        {/* 하얀 박스 입니당 <- 이 안에 작업 해주시면 됩니다! */}
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
            <AdminButton variant="contained">+ 관리자 등록</AdminButton>
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
}
