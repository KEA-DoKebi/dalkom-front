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
};

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
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
  background-color: white;
  border-radius: 10px;
  border: 2px solid white;
`;

const getColumnWidth = (label) => {
    const widthRanges = {
        문의번호: [0, 10],
        문의일시: [0, 20],
        문의제목: [0, 40],
        답변여부: [0, 10],
        상세보기: [0, 10],
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;
    return `calc(${width}% - 8px)`;
};

const OrderInquiryPage = () => {
    const [dataList, setDataList] = useState([]);
    const [dataListLabels, setDataListLabels] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [selectedItem, setSelectedItemData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const getInquiryByCategory = async () => {
        const res = await axios.get("/api/inquiry/category/35?page=0&size=10");
        console.log(res.data.result.data.content);

        const mappedDataList = res.data.result.data.content.map((item) => ({
                문의번호: item.inquirySeq,
                문의일시: item.createdAt,
                문의제목: item.title,
                답변여부: item.answerState === "Y" ? "completed" : "waiting",
                상세보기: (
                    <IconButton onClick={() => handleOpenModal(item.inquirySeq)}>
                        <InfoOutlinedIcon/>
                    </IconButton>
                )
            }))
        ;
        setDataList(mappedDataList);
        const newLabels = Object.keys(mappedDataList[0]);
        setDataListLabels(newLabels);
    };

    const handleOpenModal = async (inquirySeq) => {
        console.log("inquirySeq:", inquirySeq);

        try {
            if (inquirySeq !== undefined && inquirySeq !== null) {
                // inquirySeq를 문자열로 변환하여 해당 아이템에 대한 정보 가져오기
                const response = await axios.get(`/api/inquiry/${inquirySeq}`);
                const selectedItemData = response.data.result.data;

                // 가져온 정보를 state에 저장
                setSelectedItemData(selectedItemData);
                setOpenModal(true);
            } else {
                console.error("Invalid inquirySeq:", inquirySeq);
            }
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        getInquiryByCategory();
        setSelectedMenu("주문 문의");
    }, []);

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

                    {/*<StyledList aria-label="mailbox folders">*/}
                    {/*    <ListItemStyled>*/}
                    {/*        {dataListLabels.map((label, index) => (*/}
                    {/*            <React.Fragment key={index}>*/}
                    {/*                <Typography*/}
                    {/*                    variant="h6"*/}
                    {/*                    fontWeight="bold"*/}
                    {/*                    sx={{ textAlign: "center" }}*/}
                    {/*                >*/}
                    {/*                    {label}*/}
                    {/*                </Typography>*/}
                    {/*            </React.Fragment>*/}
                    {/*        ))}*/}
                    {/*        <Typography variant="h6" fontWeight="bold">*/}
                    {/*            상품문의*/}
                    {/*        </Typography>*/}
                    {/*    </ListItemStyled>*/}
                    {/*    <Divider component="li" light />*/}
                    {/*    {dataList.map((item, rowIndex) => (*/}
                    {/*        <React.Fragment key={rowIndex}>*/}
                    {/*            <ListItemStyled>*/}
                    {/*                {dataListLabels.map((label, colIndex) =>*/}
                    {/*                    label === "답변여부" ? (*/}
                    {/*                        // 재고에 대한 스핀박스 렌더링*/}
                    {/*                        <MuiColorChip*/}
                    {/*                            status={*/}
                    {/*                                item["답변여부"] === "대기중"*/}
                    {/*                                    ? "waiting"*/}
                    {/*                                    : "completed"*/}
                    {/*                            }*/}
                    {/*                        />*/}
                    {/*                    ) : (*/}
                    {/*                        // 다른 데이터는 Typography로 렌더링*/}
                    {/*                        <Typography*/}
                    {/*                            variant="body1"*/}
                    {/*                            key={colIndex}*/}
                    {/*                            sx={{*/}
                    {/*                                textAlign: "center",*/}
                    {/*                            }}*/}
                    {/*                        >*/}
                    {/*                            {item[label]}*/}
                    {/*                        </Typography>*/}
                    {/*                    ),*/}
                    {/*                )}*/}

                    {/*                <IconButton onClick={handleOpenModal}>*/}
                    {/*                    <InfoOutlinedIcon />*/}
                    {/*                </IconButton>*/}
                    {/*            </ListItemStyled>*/}
                    {/*            {rowIndex !== dataList.length - 1 && (*/}
                    {/*                <Divider component="li" light />*/}
                    {/*            )}*/}
                    {/*        </React.Fragment>*/}
                    {/*    ))}*/}
                    {/*</StyledList>*/}

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
