import React, {useEffect, useState} from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Search from 'components/molecules/Search';

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
import {InputBoxM} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {TokenAxios} from "../../../apis/CommonAxios";
import {useForm} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

let currentInquirySeq = null;

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background.paper;
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
    const [selectedItem, setSelectedItem] = useState(null);
    const [createEditorData, setCreateEditorData] = useState("");
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const {register, handleSubmit} = useForm();
    const [editFAQ, setEditFAQ] = useState({title: '', content: ''});
    const [editModalTitle, setEditModalTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    
    const optionList = [
        { label: "FAQ제목" }
      ]
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearch = async (searchQuery) => {
        try {
          console.log(selectedValue.label);
          console.log(searchQuery);
          
          let apiUrl = `/api/faq/search?page=0&size=7`;  // 기본 API URL
          
          // 선택된 검색어에 따라 검색 조건 추가
          if (selectedValue.label === "FAQ제목") {
            apiUrl += `&title=${searchQuery}`;
          }  
          const res = await TokenAxios.get(apiUrl);
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
                    <IconButton onClick={() => {
                        currentInquirySeq = item.inquirySeq; // inquirySeq를 저장
                        setOpenEditModal(true); // 모달을 열기
                        }}>
                        <InfoOutlinedIcon/>
                    </IconButton>
                    )
                };
             });
          setDataList(mappedDataList);
          console.log(res.data.result.data.content);
        } catch (error) {
          console.error('Error searching admin:', error);
        }
      };

    const getFAQ = async (page) => {
        try {
            const res = await TokenAxios.get(`/api/faq`);
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
                            <IconButton onClick={() => {
                                currentInquirySeq = item.inquirySeq; // inquirySeq를 저장
                                setOpenEditModal(true); // 모달을 열기
                            }}>
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

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    }
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    }
    const handleCreateEditorChange = (event, editor) => {
        setCreateEditorData(editor.getData());
    }
    const handleModalTitleChange = (event) => {
        setEditModalTitle(event.target.value)
    }

    const handleDeleteClick = () => {
        if (selectedItem && currentInquirySeq) {
            faqDelete();
        }
    };

    // FAQ 생성 모달에서 저장하기 버튼을 누르면 실행하는 함수
    const faqCreate = async (data) => {
        console.log(data.title);
        data.content = createEditorData;
        console.log(data.content);
        try {
            const res = await TokenAxios.post(`/api/faq`, data);
            console.log(res.data);

            handleCloseCreateModal();
            getFAQ(currentPage);
        } catch (e) {
            console.log(e);
        }
    }

    // FAQ 수정 모달에서 수정하기 버튼을 누르면 실행되는 함수
    const faqEdit = async (data) => {
        data.title = editFAQ.title;
        data.content = editFAQ.content;
        try {
            const res = await TokenAxios.put(`/api/faq/${currentInquirySeq}`, data);
            console.log(res.data);

            handleCloseEditModal();
            getFAQ(currentPage);
        } catch (e) {
            console.log(e);
        }
    }

    const faqDelete = async () => {
        try {
            const res = await TokenAxios.delete(`/api/faq/${currentInquirySeq}`);
            console.log(res.data);

            handleCloseEditModal();
            getFAQ(currentPage);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentInquirySeq !== null) {
                    // currentInquirySeq를 문자열로 변환하여 해당 아이템에 대한 정보 가져오기
                    const response = await TokenAxios.get(`/api/inquiry/${currentInquirySeq}`);

                    setEditModalTitle(response.data.result.data.title);
                    // 가져온 정보를 state에 저장
                    setSelectedItem(response.data.result.data);
                } else {
                    console.error("Invalid inquirySeq:", currentInquirySeq);
                }
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        if (openEditModal) {
            fetchData(); // 모달이 열릴 때 데이터를 가져오는 함수 호출
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openEditModal, currentInquirySeq]);

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        getFAQ(currentPage);
        setSelectedMenu("FAQ");
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <Search
                            onSearch={handleSearch}
                            searchQuery={searchQuery}
                            onInputChange={handleSearchInputChange}
                            setSelectedValue={setSelectedValue}
                            optionList={optionList}
                        />
                        <AdminButton variant="contained" onClick={() => {setOpenCreateModal(true)}}>
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
                        onChange={(event, newPage) =>
                            handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                    />

                    {/* FAQ 작성 모달  */}
                    <Dialog
                        open={openCreateModal}
                        onClose={handleCloseCreateModal}
                        maxWidth={false}
                    >
                        <form
                            onSubmit={handleSubmit((data) => {
                                faqCreate(data);
                            })}
                        >
                            <DialogTitle
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <InputBoxM
                                    defaultValue=""
                                    id="title"
                                    color="neutral"
                                    placeholder="Text"
                                    disabled={false}
                                    variant="soft"
                                    sx={{mb: 2, mt: 2, width: "80%"}}
                                    {...register("title")}
                                />
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseCreateModal}
                                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent style={{width: 900, height: 550}}>
                                <CKEditorContainer>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={handleCreateEditorChange}
                                        data=""
                                    />
                                </CKEditorContainer>
                                <DialogActions
                                    style={{justifyContent: "center", marginTop: "20px"}}
                                >
                                    <AdminButton autoFocus type="submit">
                                        저장
                                    </AdminButton>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </Dialog>

                    {/* FAQ 수정 모달  */}
                    <Dialog
                        onClose={handleCloseEditModal}
                        open={openEditModal}
                        maxWidth={false}
                    >
                        <form
                            onSubmit={handleSubmit((data) => {
                                faqEdit(data);
                            })}
                        >
                            <DialogTitle
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <InputBoxM
                                    defaultValue={editModalTitle}
                                    onChange={handleModalTitleChange}
                                    color="neutral"
                                    placeholder="Text"
                                    disabled={false}
                                    variant="soft"
                                    sx={{mb: 2, mt: 2, width: "80%"}}>
                                </InputBoxM>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseEditModal}
                                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent style={{width: 900, height: 550}}>
                                <CKEditorContainer>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={selectedItem?.content}
                                        onChange={(event, editor) => {
                                            setEditFAQ({...editFAQ, content: editor.getData()});
                                        }}
                                    />
                                </CKEditorContainer>
                                <DialogActions
                                    style={{justifyContent: "center", marginTop: "20px"}}
                                >
                                    <AdminButton type="submit">
                                        수정
                                    </AdminButton>
                                    <AdminButton onClick={handleDeleteClick}>
                                        삭제
                                    </AdminButton>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </Dialog>
                </Box>
            </Box>
        </Paper>
    );
};

export default FAQPage;