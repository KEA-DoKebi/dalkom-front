import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from 'components/molecules/Search';
import { Box, Divider, IconButton, List, ListItem, Pagination, Paper, Toolbar, Typography, } from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";

// 각 항목에 대한 공통 스타일을 설정합니다.
const itemFlexStyles = {
    "& > *:nth-child(1)": { flex: 0.5 }, // 번호
    "& > *:nth-child(2)": { flex: 2 }, // ID
    "& > *:nth-child(3)": { flex: 2 }, // 닉네임
    "& > *:nth-child(4)": { flex: 2 }, // 마일리지
    "& > *:nth-child(5)": { flex: 2 }, // 기본배송지
    "& > *:nth-child(6)": { flex: 0.5 }, // 삭제
    "&:before, &:after": { content: '""', flex: 0.5 },
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
  height: calc(70vh / 14);
  padding: 12px;
  ${itemFlexStyles} // 공통 스타일 적용
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 11); // 전체 높이의 70%를 11로 나눈 값
  padding: 12px;
  ${itemFlexStyles} // 공통 스타일 적용
`;

const AdminListPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("관리자 목록");
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 관리
    const [totalPages, setTotalPages] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [dataList, setDataList] = useState([]);
    const dataListLabels = ["번호", "ID", "이름", "부서", "닉네임", "삭제"];
    const optionList = [
        { label: "이름" },
        { label: "ID" },
        { label: "부서" },
        { label: "닉네임" }
    ]

    const pageSize = 10;

    const adminGet = async (page) => {
        const res = await TokenAxios.get(`/api/admin?page=${page}&size=${pageSize}`);
        setDataList(res.data.result.data.content);
        setTotalPages(res.data.result.data.totalPages);
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleDeleteAdmin = async (adminSeq) => {
        // 사용자 삭제 API 호출
        try {
            await TokenAxios.delete(`/api/admin/${adminSeq}`);
            // 삭제 후 목록 갱신
            adminGet(currentPage);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleSearch = async (searchQuery) => {
        try {
            console.log(selectedValue.label);
            console.log(searchQuery);

            let apiUrl = "/api/admin/search?page=0&size=10";  // 기본 API URL

            // 선택된 검색어에 따라 검색 조건 추가
            if (selectedValue.label === "이름") {
                apiUrl += `&name=${searchQuery}`;
            } else if (selectedValue.label === "ID") {
                apiUrl += `&adminId=${searchQuery}`;
            } else if (selectedValue.label === "부서") {
                apiUrl += `&depart=${searchQuery}`;
            } else if (selectedValue.label === "닉네임") {
                apiUrl += `&nickname=${searchQuery}`;
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
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        adminGet(currentPage); // 페이지가 변경될 때 API 호출
        setSelectedMenu("관리자 목록");
    }, [currentPage]);

    // Pagination에서 페이지가 변경될 때 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    const AdminList = ({ admin, index }) => {
        return (
            <ListItemStyled>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {index + 1 + (currentPage * pageSize)}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {admin.adminId}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {admin.name}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {admin.depart}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {admin.nickname}
                </Typography>
                <IconButton
                    onClick={() => handleDeleteAdmin(admin.adminSeq)}
                    sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }} // 호버 효과 제거
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemStyled>
        );
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
                        flex: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "27px",
                        margin: "16px",
                    }}
                >
                    <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
                        <Search
                            onSearch={handleSearch}
                            searchQuery={searchQuery}
                            onInputChange={handleSearchInputChange}
                            setSelectedValue={setSelectedValue}
                            optionList={optionList}
                        />
                    </Toolbar>
                    <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
                        <StyledList aria-label="mailbox folders">
                            <ListItemLabelStyled>
                                {dataListLabels.map((label, index) => (
                                    <React.Fragment key={index}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ textAlign: "center" }}
                                        >
                                            {label}
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </ListItemLabelStyled>
                            <Divider component="li" />
                            {dataList.map((admin, index) => (
                                <React.Fragment key={index}>
                                    <AdminList admin={admin} index={index} />
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

export default AdminListPage;



