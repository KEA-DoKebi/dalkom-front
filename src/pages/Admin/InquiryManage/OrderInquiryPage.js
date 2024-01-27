import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {Box, Divider, IconButton, List, ListItem, Pagination, Paper, Toolbar, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "@mui/material/Modal";
import AdminBar from "components/organisms/AdminBar";
import {MuiColorChip} from "components/atoms/AdminChip";
import {InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import axios from "axios";

const mockData = {
    제목: "안녕하세요. 문의글입니다.",
    내용: "문의 내용테스트 글 입니다.문의 내용테스트 글  내용테스트 글 입니다.",
    사진: "src/images/benefit.png",
};

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background .paper;
`;

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
  background-color: white; // 백그라운드 색상 추
  border-radius: 10px; // 모서리 둥글게
  border: 2px solid white; // 테두리를 흰색으로 변경
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
    // Define your width ranges for each column label
    const widthRanges = {
        문의번호: [0, 10],
        문의일시: [0, 10],
        문의제목: [0, 50],
        답변여부: [0, 10],
        상세보기: [0, 15],
        // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;

    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const OrderInquiryPage = () => {
    const [dataList, setDataList] = useState([]);
    const [dataListLabels, setDataListLabels] = useState([]);


    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("");

    const getInquiryByCategory = async () => {
        // 배송 문의 카테고리는 35번
        const res = await axios.get("/api/inquiry/category/35?page=0&size=10");
        console.log(res.data.result.data.content);

        const mappedDataList = res.data.result.data.content.map(item => ({
            '문의번호': item.inquirySeq,
            '문의일시': item.createdAt,
            '문의제목': item.title,
            '답변여부': item.answerState === 'Y' ? 'completed' : 'waiting',
        }));

        setDataList(mappedDataList);

        const newLabels = Object.keys(mappedDataList[0]);
        setDataListLabels(newLabels);
    };

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        getInquiryByCategory();
        setSelectedMenu("주문 문의");
    }, []);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Paper sx={{display: "flex", height: "100vh"}}>
            {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
            <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    backgroundColor: "#EEF2F6",
                    flexGrow: 1,
                }}
            >
                <Toolbar/>
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
                    <Toolbar sx={{justifyContent: "space-between", width: "100%"}}>
                        {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
                        <div/>
                        <InputBoxS
                            color="neutral"
                            disabled={false}
                            startDecorator={<SearchIcon/>}
                            placeholder="Search"
                            variant="soft"
                            sx={{mb: 4, mt: 4}}
                        />
                        <div/>
                    </Toolbar>

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
                            <Typography variant="h6" fontWeight="bold">
                                주문문의
                            </Typography>
                        </ListItemStyled>
                        <Divider component="li" light/>
                        {dataList.map((item, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <ListItemStyled>
                                    {dataListLabels.map((label, colIndex) =>
                                        label === "답변여부" ? (
                                            // 재고에 대한 스핀박스 렌더링
                                            <MuiColorChip
                                                status={item["답변여부"]}
                                            />
                                        ) : (
                                            // 다른 데이터는 Typography로 렌더링
                                            <Typography
                                                variant="body1"
                                                key={colIndex}
                                                sx={{
                                                    width: getColumnWidth(label),
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item[label]}
                                            </Typography>
                                        ),
                                    )}

                                    <IconButton onClick={handleOpenModal}>
                                        <InfoOutlinedIcon/>
                                    </IconButton>
                                </ListItemStyled>
                                {rowIndex !== dataList.length - 1 && (
                                    <Divider component="li" light/>
                                )}
                            </React.Fragment>
                        ))}
                    </StyledList>

                    <Pagination count={10}/>

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
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
                                    <Typography>{mockData.제목}</Typography>
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
                                    <Typography>{mockData.내용.repeat(100)}</Typography>
                                </Grid>

                                <Grid item xs={12} style={{height: "20"}}></Grid>
                            </Grid>

                            <TextField
                                id="outlined-textarea"
                                label="문의답변을 입력하세요"
                                placeholder="Placeholder"
                                maxrows={4}
                                rows={4}
                                multiline
                                sx={{mb: 4, width: "100%", backgroundColor: "#f8fafc"}}
                            />
                            <AdminButton variant="contained">저장</AdminButton>
                        </ModalBoxStyled>
                    </Modal>
                </Box>
            </Box>
        </Paper>
    );
};

export default OrderInquiryPage;
