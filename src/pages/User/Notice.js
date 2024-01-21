import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import DefaultLayout from "../../components/layout/DefaultLayout";
import CustomerServiceMenu from "../../components/CustomerServiceMenu";
import {
  Divider,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 9%;
  margin-right: 9%;
  align-items: center;
  margin-top: -8vh;
  margin-bottom: 30px;

`;

const TextL = styled.h1`
  font-size: 30px;
`;

const dataList = [
    {
      번호: "1",
      제목: "안녕하세요. 공지사합입니다.",
      등록일: "2024.01.01",
    },
    {
      번호: "2",
      제목: "안녕하세요. 공지사합입니다.",
      등록일: "2024.01.01",
    },
    {
      번호: "3",
      제목: "안녕하세요. 공지사합입니다.",
      등록일: "2024.01.01",
    },
    {
      번호: "4",
      제목: "안녕하세요. 공지사합입니다.",
      등록일: "2024.01.01",
    },
    {
      번호: "5",
      제목: "안녕하세요. 공지사합입니다.",
      등록일: "2024.01.01",
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
      제목: [10, 30],
      등록일: [10, 10],
      // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;
  
    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
  };

  export default function Notice() {
    const [selectedMenu, setSelectedMenu] = useState("공지사항");
    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        setSelectedMenu("공지사항");
      }, []);

      return(
        <DefaultLayout>
          <Top>
            <TextL>고객센터</TextL>
            <CustomerServiceMenu />
          </Top>
        </DefaultLayout>
      )
  }