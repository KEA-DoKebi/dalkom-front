import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {Box, Divider, IconButton, List, ListItem, Pagination, Paper, Toolbar, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "@mui/material/Modal";
import {InputBoxS} from "components/atoms/Input";
import {MuiColorChip} from "components/atoms/AdminChip";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {TokenAxios} from "../../../apis/CommonAxios";

let currentInquirySeq = null;
const dataListLabels = ['문의번호', '문의일시', '문의제목', '답변여부', '상세보기'];

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: calc(70vh / 10); // 전체 높이의 70%를 10로 나눈 값으로 레이블 행의 높이를 설정
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
    const widthRanges = {
        문의번호: [0, 10],
        문의일시: [0, 20],
        문의제목: [0, 30],
        답변여부: [0, 10],
        상세보기: [0, 20],
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;
    return `calc(${width}% - 8px)`;
};

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const ProductInquiryPage = () => {
    const [dataList, setDataList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [selectedItem, setSelectedItemData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const textareaRef = useRef(null);

    const getInquiryByCategory = async (page) => {
        try {
            const res = await TokenAxios.get(`/api/inquiry/category/34?page=${page}&size=7`);
            console.log(res.data.result.data.content);
            setTotalPages(res.data.result.data.totalPages);

            const mappedDataList = res.data.result.data.content.map((item) => {
                    return {
                        문의번호: item.inquirySeq,
                        문의일시: formatDate(item.createdAt),
                        문의제목: item.title,
                        답변여부: item.answerState === "Y" ? "completed" : "waiting",
                        상세보기: (
                            <IconButton onClick={() => handleOpenModal(item.inquirySeq)}
                                        disabled={item.answerState === "Y"}>
                                <InfoOutlinedIcon/>
                            </IconButton>
                        )
                    };
                })
            ;
            setDataList(mappedDataList);
        } catch (e) {
            console.log(e)
        }
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };
    const handleOpenModal = async (inquirySeq) => {
        console.log("inquirySeq:", inquirySeq);

        try {
            if (inquirySeq !== undefined && inquirySeq !== null) {
                currentInquirySeq = inquirySeq;

                // inquirySeq를 문자열로 변환하여 해당 아이템에 대한 정보 가져오기
                const response = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);

                // 가져온 정보를 state에 저장
                setSelectedItemData(response.data.result.data);
                setOpenModal(true);
            } else {
                console.error("Invalid inquirySeq:", inquirySeq);
            }
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };
    const handleCloseModal = () => setOpenModal(false);

    const handleModalSaveButton = async () => {
        try {
            // TextField의 내용 가져오기
            const answerContent = textareaRef.current.value;
            // 저장 요청 보내기
            const res = await TokenAxios.put(
                `/api/inquiry/${currentInquirySeq}`,
                {
                    answerContent: answerContent,
                }
            );

            console.log(res.data);

            // 모달 닫기
            handleCloseModal();
            getInquiryByCategory(currentPage);
        } catch (error) {
            // 오류 처리
            console.error("저장 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        getInquiryByCategory(currentPage);
        setSelectedMenu("상품 문의");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
                        flex: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "27px",
                        margin: "16px"
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
                            sx={{mb: 4, mt: 4, ml: "50px"}}
                        />
                        <div/>
                    </Toolbar>

                    <Box sx={{width: "100%", height: "80%", overflowY: "auto"}}>
                        <StyledList aria-label="mailbox folders">
                            {/* 라벨 및 Divider 출력 부분 */}
                            <ListItemStyled>
                                {dataListLabels.map((label, index) => (
                                    <React.Fragment key={index}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: getColumnWidth(label),
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography variant="h6" fontWeight="bold">
                                                {label}
                                            </Typography>
                                        </Box>
                                        {/* 마지막 라벨 이후에는 Divider를 추가하지 않음 */}
                                        {index !== dataListLabels.length - 1 && (
                                            // <Divider orientation="vertical" flexItem light/>
                                            <Divider component="li" light/>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ListItemStyled>
                            <Divider component="li" light/>

                            {/* 각 데이터 출력 부분 */}
                            {dataList.map((item, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    <ListItemStyled>
                                        {dataListLabels.map((label, colIndex) => (
                                            <React.Fragment key={colIndex}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        width: getColumnWidth(label),
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {label === "답변여부" ? (
                                                        <MuiColorChip status={item["답변여부"]}/>
                                                    ) : (
                                                        <Typography variant="body1">
                                                            {item[label]}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                {/* 마지막 데이터 이후에는 Divider를 추가하지 않음 */}
                                                {colIndex !== dataListLabels.length - 1 && (
                                                    // <Divider orientation="vertical" flexItem light/>
                                                    <Divider component="li" light/>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </ListItemStyled>
                                    {/* 마지막 데이터 이후에는 Divider를 추가하지 않음 */}
                                    {rowIndex !== dataList.length - 1 && (
                                        <Divider component="li" light/>
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
                        <Pagination
                            count={totalPages} // 총 페이지 수를 적용
                            page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                            onChange={(event, newPage) =>
                                handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                        />
                    </Box>

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
                                    <Typography>{selectedItem?.title || "title"}</Typography>
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
                                    <Typography>{selectedItem?.content || "content"}</Typography>
                                </Grid>

                                <Grid item xs={12} style={{height: "20"}}></Grid>
                            </Grid>

                            <TextField
                                id="outlined-textarea"
                                defaultValue={selectedItem?.answerContent}
                                label={selectedItem?.answerContent ? "" : "답변을 입력해주세요."}
                                maxrows={4}
                                rows={4}
                                multiline
                                inputRef={textareaRef}  // ref를 설정
                                sx={{mb: 4, width: "100%", backgroundColor: "#f8fafc"}}
                            />
                            <AdminButton variant="contained" onClick={handleModalSaveButton}>저장</AdminButton>
                        </ModalBoxStyled>
                    </Modal>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProductInquiryPage;
