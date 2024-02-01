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
import Swal from "sweetalert2";

let currentInquirySeq = null;
const dataListLabels = ['FAQ번호', '작성일시', 'FAQ', '상세보기'];

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const StyledDialog = styled(Dialog)`
  z-index: 900;
`

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
  height: calc(70vh / 10);
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

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const FAQPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("FAQ");
    const {register, handleSubmit} = useForm();
    const [editorData, setEditorData] = useState("");
    const [dataList, setDataList] = useState([]);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [editFaq, setEditFaq] = useState({title: '', content: ''});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const [createEditorData, setCreateEditorData] = useState("");
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
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

    const pageSize = 7;

    const handleEditorChange = (event, editor) => {
        setEditorData(editor.getData());
    }

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        setSelectedMenu("FAQ");
        getFaq(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, selectedFaq]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleCreateModalOpen = () => {
        setCreateModalOpen(true);
    }

    const handleCreateModalClose = () => {
        setCreateModalOpen(false);
    }

    const handleUpdateModalOpen = async (inquirySeq) => {
        try {
            const res = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
            currentInquirySeq = inquirySeq;

            setEditFaq(res.data.result.data);
            setSelectedFaq(res.data.result.data);
            setUpdateModalOpen(true);
        } catch (e) {
            console.error("FAQ 상세 정보 불러오기 실패: ", e);
        }
    }

    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
    }

    // FAQ 등록
    const createFaq = async (data) => {
        data.content = editorData;

        try {
            await TokenAxios.post(`/api/faq`, data);
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "헉!!!",
                text: "FAQ 등록에 실패하였어요!",
                footer:
                    "다시 한 번 시도해주세요"
            });
        }
        handleCreateModalClose();
        getFaq(currentPage);
    }

    // FAQ 목록 조회
    const getFaq = async (page) => {
        const res = await TokenAxios.get(`/api/faq?page=${page}&size=${pageSize}`);
        console.log(res.data.result.data.content);
        setDataList(res.data.result.data.content);
        console.log(res.data.result.data.totalPages);
        setTotalPages(res.data.result.data.totalPages);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 업데이트
    };

    // FAQ 수정
    const updateFaq = async (data) => {
        try {
            await TokenAxios.put(`/api/faq/${currentInquirySeq}`, {
                title: editFaq.title,
                content: editFaq.content
            });
            Swal.fire("성공", "FAQ가 수정되었습니다.", "success");
            handleUpdateModalClose();
            getFaq();
        } catch (e) {
            console.error("FAQ 수정 실패: ", e);
            Swal.fire("오류", "FAQ 수정에 실패했습니다.", "error");
        }
    }

    // FAQ 삭제
    const deleteFaq = async (inquirySeq) => {
        try {
            await TokenAxios.delete(`/api/faq/${inquirySeq}`);
            Swal.fire("성공", "공지사항이 삭제되었습니다.", "success");

            getFaq();
            handleUpdateModalClose();
            // setUpdateModalOpen(false);
        } catch (e) {
            console.error("FAQ 삭제 실패:", e);
            Swal.fire("오류", "FAQ 삭제에 실패했습니다.", "error");
        }
    }

    const handleDeleteClick = () => {
        if (selectedFaq && currentInquirySeq) {
            Swal.fire({
                title: "정말 삭제하시겠습니까?",
                text: "이 작업은 되돌릴 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예, 삭제하겠습니다",
                cancelButtonText: "아니요",
                customClass: {
                    container: 'custom-swal-container'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteFaq(currentInquirySeq);
                }
            });
        }
    };

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
                        <Search
                            onSearch={handleSearch}
                            searchQuery={searchQuery}
                            onInputChange={handleSearchInputChange}
                            setSelectedValue={setSelectedValue}
                            optionList={optionList}
                        />
                        <AdminButton variant="contained" onClick={handleCreateModalOpen}>
                            작성하기
                        </AdminButton>
                    </Toolbar>

                    <Box sx={{width: "100%", height: "80%", overflowY: "auto"}}>
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

                            {/* 각 데이터 출력 부분 */}
                            {dataList.map((faq, index) => (
                                <React.Fragment key={index}>
                                    <ListItemStyled>
                                        <Typography
                                            variant="body1"
                                            sx={{width: getColumnWidth('FAQ번호'), textAlign: "center"}}
                                        >
                                            {index + 1}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{width: getColumnWidth('작성일시'), textAlign: "center"}}
                                        >
                                            {formatDate(faq.createdAt)}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{width: getColumnWidth('FAQ'), textAlign: "center"}}
                                        >
                                            {faq.title}
                                        </Typography>

                                        <IconButton onClick={() => handleUpdateModalOpen(faq.inquirySeq)}
                                                    sx={{width: getColumnWidth('상세보기'), textAlign: "center"}}>
                                            <InfoOutlinedIcon/>
                                        </IconButton>
                                    </ListItemStyled>
                                    {index !== dataList.length - 1 && (
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

                    {/* FAQ 작성 모달  */}
                    <StyledDialog
                        // 이 부분이 handleCreateModalClose가 아니라 Open이어야 다른 곳 눌러도 안 꺼진다!!!!
                        onClose={handleCreateModalOpen}
                        open={createModalOpen}
                        maxWidth={false}
                    >
                        <form onSubmit={handleSubmit((data) => {
                            createFaq(data);
                        })}
                        >
                            <DialogTitle>
                                <InputBoxM
                                    id="title"
                                    color="neutral"
                                    placeholder="Text"
                                    disabled={false}
                                    variant="soft"
                                    sx={{mb: 2, mt: 2, width: "100%"}}
                                    {...register("title")}
                                />
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCreateModalClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </DialogTitle>
                            <DialogContent
                                style={{width: 900, height: "450px", overflowY: "auto", overflowX: "hidden"}}>
                                <CKEditorContainer>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={handleEditorChange}
                                    />
                                </CKEditorContainer>
                            </DialogContent>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: '100%',
                                marginBottom: '20px',
                                marginLeft: '20px',
                                marginRight: '20px'
                            }}>
                            </div>
                            <DialogActions
                                style={{justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}
                            >
                                <AdminButton type="submit" autoFocus onClick={handleCreateModalClose}>
                                    저장
                                </AdminButton>
                            </DialogActions>
                        </form>
                    </StyledDialog>

                    {/* FAQ 수정 모달  */}
                    <StyledDialog
                        onClose={handleUpdateModalClose}
                        open={updateModalOpen}
                        maxWidth={false}
                    >
                        <form
                            onSubmit={handleSubmit((data) => {
                                updateFaq(data);
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
                                    defaultValue={selectedFaq?.title}
                                    onChange={(e) => setEditFaq({...editFaq, title: e.target.value})}
                                    color="neutral"
                                    placeholder="Text"
                                    disabled={false}
                                    variant="soft"
                                    sx={{mb: 2, mt: 2, width: "70%"}}>
                                </InputBoxM>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleUpdateModalClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </DialogTitle>
                            <DialogContent style={{width: 900, height: 550}}>
                                <CKEditorContainer>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={selectedFaq?.content}
                                        onChange={(event, editor) => {
                                            setEditFaq({...editFaq, content: editor.getData()});
                                        }}
                                    />
                                </CKEditorContainer>
                                <DialogActions
                                    style={{justifyContent: "center", marginTop: "20px"}}
                                >
                                    <AdminButton type="submit" autoFocus onClick={handleUpdateModalClose}>
                                        수정
                                    </AdminButton>
                                    <AdminButton autoFocus onClick={handleDeleteClick}>
                                        삭제
                                    </AdminButton>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </StyledDialog>
                </Box>
            </Box>
        </Paper>
    );
}

export default FAQPage;