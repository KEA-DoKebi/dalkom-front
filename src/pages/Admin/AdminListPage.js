import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import {
  Divider,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AdminBar from "../../components/AdminBar";
import { Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const InputBox = styled(Input)`
  width: 30vw;
  height: 50px;
`;

const AddButton = styled(Button)`
  background-color: #fce8ef;
  color: #ec407a;
  width: 124px;
  height: 46px;
  text-align: center;
  font-weight: 500;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #fce8ef;
    color: #ec407a;
  }

  &:active {
    color: #ffffff;
    background-color: #e42a5d;
  }
`;
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

export default function AdminListPage() {
  const [selectedMenu, setSelectedMenu] = useState("관리자 목록");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("관리자 목록");
  }, []);

  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
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
            {/* 왼쪽에는 빈 공간을 만들어 가운데 정렬을 유지하고, 오른쪽에 등록 버튼을 추가합니다. */}
            <div></div>
            <InputBox
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4 }}
            />
            <AddButton variant="contained">+ 관리자 등록</AddButton>
          </Toolbar>

          <StyledList aria-label="mailbox folders">
            <ListItemStyled>
              {dataListLabels.map((label, index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ width: getColumnWidth(label) }}
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
                      sx={{ width: getColumnWidth(label) }}
                    >
                      {item[label]}
                    </Typography>
                  ))}
                  <IconButton>
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
        </Box>
      </Box>
    </Paper>
  );
}
