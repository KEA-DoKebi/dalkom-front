import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Box, Divider, Grid, IconButton, List, ListItem, Pagination, Typography} from "@mui/material";
import {TokenAxios} from "../../../apis/CommonAxios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "@mui/material/Modal";

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background.paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const dataListLabels = ['번호', '제목', '등록일'];

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

const ModalBoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 800px;

  padding-left: 150px;
  padding-right: 150px;
  padding-bottom: 10px;

  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid white;
`;

const ModalTitleContentContainer = styled.div`
  border: 5px solid #ddd;
  padding: 1%;
`;

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
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  border-color: gray;
  min-height: 50vh;
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
    // Define your width ranges for each column label
    const widthRanges = {
        번호: [0, 10],
        제목: [10, 30],
        등록일: [30, 50]
        // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;

    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const FaqItem = ({faq, index, onClick}) => {
    return (
        <ListItemStyled onClick={() => onClick(faq)}>
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
                {faq.title}
            </Typography>
            <Typography
                variant="body1"
                sx={{width: getColumnWidth('등록일'), textAlign: "center"}}
            >
                {formatDate(faq.createdAt)}
            </Typography>
        </ListItemStyled>
    )
};

export const FAQBody = () => {
    const [dataList, setDataList] = useState([]);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const pageSize = 10;

    const handleFaqClick = async (inquirySeq) => {
        try {
            const res = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
            setSelectedFaq(res.data.result.data);
            setModalOpen(true);
        } catch (e) {
            console.error(e);
        }
    }

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const getFAQ = async (page) => {
        try {
            const res = await TokenAxios.get(`/api/faq?page=${page}&size=10`);
            setTotalPages(res.data.result.data.totalPages);
            setDataList(res.data.result.data.content);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getFAQ(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <Main>
            <TopField>FAQ</TopField>
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
                    {dataList.map((faq, index) => (
                        <React.Fragment key={index}>
                            <FaqItem
                                faq={faq}
                                index={index + (currentPage * pageSize)}
                                onClick={() => handleFaqClick(faq.inquirySeq)}
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
                    onChange={(event, newPage) =>
                        handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                />
            </PaginationContainer>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                maxWidth={false}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalBoxStyled>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{mt: 4, mr: 4}}
                        style={{position: "absolute", right: 0, top: 0}}
                    >
                        <HighlightOffIcon></HighlightOffIcon>
                    </IconButton>

                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant="h6" fontWeight="bold" sx={{mb: 2}}>
                                제목
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            {/*<Text*/}
                            <ModalTitleContentContainer>
                                <Typography>{selectedFaq?.title}</Typography>
                            </ModalTitleContentContainer>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" fontWeight="bold" sx={{mb: 2}}>
                                내용
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            style={{
                                height: "600px",
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            <ModalTitleContentContainer>
                                <Typography>{selectedFaq?.content}</Typography>
                            </ModalTitleContentContainer>
                        </Grid>
                    </Grid>
                </ModalBoxStyled>
            </Modal>
        </Main>
    );
};
