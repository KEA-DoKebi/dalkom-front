import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Pagination,
    Typography
} from "@mui/material";
import {TokenAxios} from 'apis/CommonAxios';
import CloseIcon from '@mui/icons-material/Close';

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background .paper;
`;

const dataListLabels = ['번호', '제목', '등록일'];

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
        등록일: [30, 50],
        // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;

    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const PaginationContainer = styled.div`
  display: flex;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  align-items: center;
  flex-direction: column;
`;

const TopField = styled.h1`
  font-size: 30px;
  margin-left: 4%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 70%;
  height: auto;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  border-color: gray;
  min-height: 50vh;
`;

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const NoticeItem = ({notice, isFixed, index, onClick}) => {
    // 상단에 고정시킬 공지 스타일
    const fixedStyle = {
        backgroundColor: isFixed ? 'lightgrey' : '',
        fontWeight: isFixed ? 'bold' : 'normal'
    };

    return (
        <ListItemStyled style={fixedStyle} onClick={() => onClick(notice)}>
            <Typography
                variant="body1"
                sx={{width: getColumnWidth('번호'), textAlign: "center"}}
            >
                {index + 1}
            </Typography>
            <Typography
                variant="body1"
                sx={{width: getColumnWidth('제목'), textAlign: "center"}}
            >
                {notice.title}
            </Typography>
            <Typography
                variant="body1"
                sx={{width: getColumnWidth('등록일'), textAlign: "center"}}
            >
                {formatDate(notice.createdAt)}
            </Typography>
        </ListItemStyled>
    );
}

export const NoticeBody = () => {
    const [dataList, setDataList] = useState([]); // 공지 목록 상태
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지의 상세 정보 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [modalOpen, setModalOpen] = useState(false);

    const fixedNotices = dataList.filter(notice => notice.state === 'Y');
    const regularNotices = dataList.filter(notice => notice.state !== 'Y');

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice); // 선택된 공지의 상세 정보 설정
        setModalOpen(true); // 모달 창 열기
    };

    // const handleOpenModal = () => {
    //   setModalOpen(true);
    // };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const pageSize = 10;

    // 공지 목록 조회
    const getNotice = async (page) => {
        const res = await TokenAxios.get(`/api/notice?page=${page}&size=10`);
        console.log(res.data.result.data.content);
        setDataList(res.data.result.data.content);
        console.log(res.data.result.data.totalPages);
        setTotalPages(res.data.result.data.totalPages);
    };

    useEffect(() => {
        getNotice(currentPage); // 페이지가 변경될 때마다 API 호출
    }, [currentPage]);

    // 페이지 변경 처리
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Main>
            <TopField>공지사항</TopField>
            <Body>
                <StyledList aria-label="mailbox folders">
                    <ListItemStyled>
                        {dataListLabels.map((label, index) => (
                            <React.Fragment key={index}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{width: getColumnWidth(label), textAlign: "center"}}
                                >
                                    {label}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </ListItemStyled>
                    <Divider component="li" light/>
                    {fixedNotices.concat(regularNotices).map((notice, index) => (
                        <React.Fragment key={index}>
                            <NoticeItem
                                notice={notice}
                                isFixed={notice.state === 'Y'}
                                index={index + (currentPage * pageSize)}
                                onClick={handleNoticeClick} // 공지사항 클릭 이벤트 연결
                            />
                            {index !== dataList.length - 1 && (
                                <Divider component="li" light/>
                            )}
                        </React.Fragment>
                    ))}
                </StyledList>
            </Body>
            <PaginationContainer>
                <Pagination
                    count={totalPages} // 총 페이지 수를 적용
                    page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                    onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                />
            </PaginationContainer>

            <Dialog onClose={handleCloseModal} open={modalOpen} maxWidth={false}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{width: 900, height: 600}}>
                    {selectedNotice && (
                        <div>
                            <Grid marginTop="2%" style={{textAlign: "center"}}>
                                {selectedNotice.title}
                            </Grid>
                            <Grid>작성일시 : {formatDate(selectedNotice.createdAt)} 작성자 {selectedNotice.nickname}</Grid>
                            <Typography style={{marginTop: "5%"}}>
                                {selectedNotice.content}
                            </Typography>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Main>
    );
}