import React, { useEffect, useState } from "react";
import AdminBar from "components/organisms/AdminBar";
import { TokenAxios } from "apis/CommonAxios";
import Search from 'components/molecules/Search';

import {
  Paper,
  Box,
  Toolbar,
  List,
  ListItem,
  Typography,
  Divider,
  Pagination,
} from "@mui/material";
import styled from "styled-components";
import { OXButton } from "components/atoms/OXButton";
import Swal from "sweetalert2";

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
  "& > *:nth-child(1)": { width: "5%" }, // 번호
  "& > *:nth-child(2)": { width: "15%" }, // 이메일
  "& > *:nth-child(3)": { width: "15%" }, // 닉네임
  "& > *:nth-child(4)": { width: "13%" }, // 마일리지
  "& > *:nth-child(5)": { width: "13%" }, // 신청금액
  "& > *:nth-child(6)": { width: "15%" }, // 사용자
  "& > *:nth-child(7)": { width: "15%" }, // 일시
  "& > *:nth-child(8)": { width: "5%" }, // 승인/거부
  "&:before, &:after": { content: '""', width : "2%" },
};


const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;



const ListItemLabelStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 11);
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 11); // 전체 높이의 70%를 11로 나눈 값
  padding: 12px;
  ${itemFlexStyles}// 공통 스타일 적용
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};


const MileageApprovalPage = () => {
  const dataListLabels = [
    "번호",
    "이메일",
    "닉네임",
    "마일리지",
    "신청금액",
    "사용자",
    "일시",
    "승인/거부",
  ];
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("마일리지 승인");
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");


  const pageSize = 7;

  const optionList = [
    { label: "이메일" },
    { label: "닉네임" },
    { label: "사용자" },
  ]
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // 마일리지 신청내역 조회(대기중 상태만) (get)
  const getMileageApply = async (page) => {
    const res = await TokenAxios.get(
      `/api/mileage/apply/wait?page=${page}&size=${pageSize}`,
    );
    setDataList(res.data.result.data.content);
    setTotalPages(res.data.result.data.totalPages);
  };

  // 마일리지 승인 여부 변경 (put)
  const updateApplyState = async (milgApplySeq, approvedState) => {
    try {
      const res = await TokenAxios.put(`/api/mileage/apply/${milgApplySeq}`, {
        approvedState,
      });
      if (res.status === 200) {
        Swal.fire("성공", "상태를 변경했습니다.", "success");
        getMileageApply(currentPage);
      } else {
        throw new Error("API response error");
      }
    } catch (e) {
      console.error("상태 변경 실패", e);
      Swal.fire("실패", "상태를 변경할 수 없습니다.", "error");
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트

    if (searchQuery.trim() !== "") {
        handleSearch(searchQuery);
    } else {
        // 검색어가 없는 경우 전체 데이터에 대한 페이징 수행
        getMileageApply(newPage);
    }

  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = async (searchQuery) => {
    try {
      
      let apiUrl = `/api/mileage/apply/search?${currentPage}&size=${pageSize}`;  // 기본 API URL
      
      // 선택된 검색어에 따라 검색 조건 추가
      if (selectedValue.label === "ID") {
        apiUrl += `&email=${searchQuery}`;
      } else if (selectedValue.label === "닉네임") {
        apiUrl += `&nickname=${searchQuery}`;
      } else if (selectedValue.label === "사용자") {
        apiUrl += `name&=${searchQuery}`;
      }  
      
      const res = await TokenAxios.get(apiUrl);
      setDataList(res.data.result.data.content);
      setTotalPages(res.data.result.data.totalPages);
      console.log(res.data.result.data.content);
    } catch (error) {
      console.error('Error searching admin:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
        getMileageApply(currentPage);
    }
    setSelectedMenu("마일리지 승인");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage,searchQuery]);

  const ApplyList = ({ apply, index }) => {
    const handleSelect = async (state) => {
      await updateApplyState(apply.milgApplySeq, state);
      // 데이터를 다시 불러오거나 UI를 업데이트하는 로직
    };
    return (
      <ListItemStyled>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {index + 1 + currentPage * pageSize}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {apply.email}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {apply.nickname}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {Number(apply.balance).toLocaleString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {Number(apply.amount).toLocaleString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {apply.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {formatDate(apply.createdAt)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          <OXButton onSelect={handleSelect}></OXButton>
        </Typography>
      </ListItemStyled>
    );
  };

  return (
    <Paper sx={{ display: "flex" }} elevation={0}>
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
            flex: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              height: "10vh",
              width: "100%",
            }}
          >
            <Search
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onInputChange={handleSearchInputChange}
               setSelectedValue={setSelectedValue}
              optionList={optionList}
            />
          </Toolbar>
          <Box sx={{ width: "100%", height: "73.6vh", overflowY: "auto" }}>
            <StyledList aria-label="mailbox folders">
              <ListItemLabelStyled>
                {dataListLabels.map((label, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      align="center"
                    >
                      {label}
                    </Typography>
                  </React.Fragment>
                ))}
              </ListItemLabelStyled>
              <Divider component="li" />
              {dataList.map((apply, index) => (
                <React.Fragment key={index}>
                  <ApplyList apply={apply} index={index} />
                  {index !== dataList.length && (
                    <Divider component="li" light />
                  )}
                </React.Fragment>
              ))}
            </StyledList>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {/* 페이지네이션 섹션 */}
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={(event, newPage) =>
                handlePageChange(event, newPage - 1)
              }
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MileageApprovalPage;
