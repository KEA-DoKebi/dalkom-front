import React, { useEffect, useState } from "react";
import AdminBar from "../../components/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  List,
  ListItem,
  Typography,
  Divider,
  IconButton,
  Pagination,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { InputBoxS } from "../../components/AdminComponents";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";

const dataList = [
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
  },
  {
    번호: "1",
    아이디: "dokebi@dkt.com",
    닉네임: "깨비",
    마일리지: 1000000,
    신청금액: 100000,
    사용자: "김영희",
    일시: "2024.01.20",
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
  //height: 48px;

  & > * {
    flex: 1;
    margin: 0 4px;
  }
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
  // Define your width ranges for each column label
  const widthRanges = {
    회원번호: [0, 10],
    아이디: [10, 28],
    닉네임: [28, 40],
    마일리지: [40, 52],
    신청금액: [52, 64],
    사용자: [64, 76],
    일시: [76, 88],
    승인: [88, 100],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const MileageHistoryPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("마일리지 승인 내역");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("마일리지 승인 내역");
  }, []);

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
            {/* 왼쪽에는 빈 공간을 만들어 가운데 정렬을 유지하고, 오른쪽에 등록 버튼을 추가합니다. */}
            {/* 이 디브 있어야 검색창 가운데에 옵니당 왜 그런지는 잘 모르겠어요,,*/}
            <div></div>
            <InputBoxS
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4 }}
            />
            <div></div>
          </Toolbar>
          <StyledList aria-label="mailbox folders">
            <ListItemStyled>
              {dataListLabels.map((label, index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ width: getColumnWidth(label) }}
                    align="center"
                  >
                    {label}
                  </Typography>
                </React.Fragment>
              ))}
              <Typography variant="h6" fontWeight="bold">
                승인/거부
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
                      align="center"
                    >
                      {item[label]}
                    </Typography>
                  ))}
                  <IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "100px",
                        backgroundColor: "#14BB38",
                      }}
                      disabled={false}
                    >
                      <CheckIcon sx={{ color: "#FFFFFF", fontSize: 30 }} />
                    </Button>
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
};

export default MileageHistoryPage;
