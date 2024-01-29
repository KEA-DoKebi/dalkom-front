import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    Pagination,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import AdminBar from "components/organisms/AdminBar";
import {InputBoxM, InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {TokenAxios} from "../../../apis/CommonAxios";

let currentInquirySeq = null;

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

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
        FAQ번호: [0, 20],
        작성일시: [20, 40],
        FAQ: [40, 70],
        상세보기: [70, 90],
        // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;

    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const FAQPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("FAQ");
    const [dataList, setDataList] = useState([]);
    const [dataListLabels, setDataListLabels] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [selectedItem, setSelectedItemData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const getFAQ = async (page) => {
        try {
            console.log(page);
            const res = await TokenAxios.get(`/api/faq`);
            console.log(res.data.result.data.content);
            setTotalPages(res.data.result.data.totalPages);

            const mappedDataList = res.data.result.data.content.map((item) => {
                    const date = new Date(item.createdAt);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
                    const day = date.getDate();

                    return {
                        FAQ번호: item.inquirySeq,
                        작성일시: `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`,
                        FAQ: item.title,
                        상세보기: (
                            <IconButton onClick={() => handleOpenModal(item.inquirySeq)}>
                                <InfoOutlinedIcon/>
                            </IconButton>
                        )
                    };
                })
            ;
            setDataList(mappedDataList);
        } catch (e) {
            console.log(e)
        } finally {
            const newLabels = [
                "FAQ번호",
                "작성일시",
                "FAQ",
                "상세보기"
            ];
            setDataListLabels(newLabels);
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
                console.log(response.data);
                const selectedItemData = response.data.result.data;
                console.log(selectedItem);

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
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        getFAQ(currentPage);
        setSelectedMenu("FAQ");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [title] = useState(`FAQ 자주 올라오는 질문 입니다.`);
    const [content] = useState(`<p>상품은 어떻게 주문하나요?</p>
    <p>상품을 주문하는 과정은 간단하며 다음 단계를 따라주시면 됩니다.</p>
    <p>제품 선택: 웹사이트 또는 앱을 통해 원하는 상품을 찾아주세요. 제품 페이지에서 옵션과 가격을 확인하고, 필요한 경우 리뷰와 평가도 참고하세요.</p>
    <p>장바구니에 담기: 상품 페이지에서 "장바구니에 담기" 버튼을 클릭하세요. 장바구니에서는 주문 내역을 확인하고 필요한 경우 수량을 조절할 수 있습니다.</p>
    <p>주문 정보 입력: 주문을 계속하기 전에 배송 정보, 연락처, 결제 정보 등을 입력해주세요. 주문 전에 입력한 정보를 정확히 확인하고 수정이 필요한 경우 수정해주세요.</p>
    <p>결제: 주문 정보를 확인한 후, 원하는 결제 방법을 선택하세요. 신용카드, 무통장 입금, 페이팔 등 다양한 결제 옵션이 제공됩니다.</p>
    <p>주문 완료: 결제가 완료되면 주문 확인 이메일이 발송됩니다. 주문 상태와 추적 번호를 확인하며 배송 상황을 추적할 수 있습니다.</p>
    <p>배송 및 수령: 주문한 상품은 배송까지의 일정을 확인하고, 배송이 완료되면 안전하게 상품을 수령하세요.</p>`);

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
                        <AdminButton variant="contained" onClick={handleOpenModal}>
                            작성하기
                        </AdminButton>
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
                        </ListItemStyled>
                        <Divider component="li" light/>
                        {dataList.map((item, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <ListItemStyled>
                                    {dataListLabels.map((label, colIndex) => (
                                        <Typography
                                            variant="body1"
                                            key={colIndex}
                                            sx={{width: getColumnWidth(label), textAlign: "center"}}
                                        >
                                            {item[label]}
                                        </Typography>
                                    ))}
                                </ListItemStyled>
                                {rowIndex !== dataList.length - 1 && (
                                    <Divider component="li" light/>
                                )}
                            </React.Fragment>
                        ))}
                    </StyledList>

                    <Pagination
                        count={totalPages} // 총 페이지 수를 적용
                        page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                        onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                    />

                    {/* FAQ 작성 모달  */}
                    <Dialog
                        onClose={handleCloseModal}
                        open={openModal}
                        maxWidth={false}
                    >
                        <DialogTitle
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <InputBoxM
                                color="neutral"
                                defaultValue={selectedItem?.title}
                                placeholder="Text"
                                disabled={false}
                                variant="soft"
                                sx={{mb: 2, mt: 2, width: "80%"}}
                            />
                        </DialogTitle>
                        <DialogContent style={{width: 900, height: 550}}>
                            <CKEditorContainer>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // data="<p>공지를 작성하세요</p>"
                                    data={selectedItem?.content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({event, editor, data});
                                        // 원하는 작업 수행
                                    }}
                                />
                            </CKEditorContainer>
                            <DialogActions
                                style={{justifyContent: "center", marginTop: "20px"}}
                            >
                                <AdminButton autoFocus onClick={handleCloseModal}>
                                    Save
                                </AdminButton>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </Box>
            </Box>
        </Paper>
    );
};

export default FAQPage;
