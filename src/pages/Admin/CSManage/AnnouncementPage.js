import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {DefaultAxios, TokenAxios} from "apis/CommonAxios";
import {pink} from "@mui/material/colors";
import {alpha} from '@mui/material/styles';

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    List,
    ListItem,
    Pagination,
    Paper,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import {InputBoxM, InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {CustomSelect} from "components/atoms/AdminSelectBox";

const dataListLabels = ['번호', '작성일시', '작성자', '제목', '상단고정']

const itemFlexStyles = {
    "& > *:nth-child(1)": {flex: 0.5}, // 번호
    "& > *:nth-child(2)": {flex: 2}, // 작성일시
    "& > *:nth-child(3)": {flex: 2}, // 작성자
    "& > *:nth-child(4)": {flex: 2}, // 제목
    "& > *:nth-child(5)": {flex: 2}, // 상단고정
    "& > *:nth-child(6)": {flex: 0.5}, // 상세보기
    "&:before, &:after": {content: '""', flex: 0.5},
};

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background .paper;
  ${itemFlexStyles} // 공통 스타일 적용
`;

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;
  ${itemFlexStyles} // 공통 스타일 적용
`;

const PaginationContainer = styled.div`
  margin-top: 5px; /* 원하는 여백을 설정하세요 */
  display: inline-block;
  margin-top: 2%;
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
    // Define your width ranges for each column label
    const widthRanges = {
        공지번호: [0, 10],
        작성일시: [10, 30],
        작성자: [30, 40],
        제목: [40, 50],
        상단고정: [50, 60],
        주문상세: [60, 70],
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

const AnnouncementPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("공지사항");
    const {register, handleSubmit} = useForm();
    const [editorData, setEditorData] = useState("");
    const [switchState, setSwitchState] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [editNotice, setEditNotice] = useState({title: '', content: ''});
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

    // const accessToken = localStorage.getItem('accessToken');

    const pageSize = 10;

    const handleEditorChange = (event, editor) => {
        setEditorData(editor.getData());
    };

    // 스위치 변경 처리
    const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
    };

    useEffect(() => {
        // 각 페이지가 마운트될 때 selectedMenu를 업데이트
        // setSelectedMenu 함수를 호출하여 상태를 업데이트
        setSelectedMenu("공지사항");
        getNotice(currentPage); // 페이지가 변경될 때마다 API 호출
        console.log("Updated Selected Notice:", selectedNotice);
    }, [currentPage, selectedNotice]);

    // Modal의 상태를 관리하는 state
    const [writeModalOpen, setWriteModalOpen] = useState(false);
    const [lookModalOpen, setLookModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    //수정 내역 불러오기
    // const [title] = useState(`공지사항 입니다.`);
    // const [content] =
    //   useState(`안녕하세요. 소중한 고객 여러분께 알려드리는 공지사항이 있습니다. 최근의 업데이트로 인해 당사의 서비스가 더욱 원활하고 효율적으로 운영될 수 있도록 노력하고 있습니다. 새롭게 추가된 기능들과 향상된 사용자 경험을 통해 더욱 편리한 서비스를 제공하고자 합니다.
    // <br/>
    // <br/>
    //   이번 업데이트로는 보안 강화 및 속도 개선에 중점을 두었습니다.고객님들의 개인 정보를 보호하기 위해 최신 보안 기술을 도입하여 더욱 안전한 환경을 제공하고 있습니다. 또한, 서비스의 속도를 향상시켜 더 빠르고 신속한 이용이 가능하도록 조치하였습니다.
    //   <br/>
    //   <br/>
    //   우리는 항상 고객님들의 소중한 의견에 귀 기울이고 있습니다. 서비스 이용 중 발생하는 어떠한 문제나 피드백이 있다면 언제든지 고객센터를 통해 알려주시기 바랍니다. 고객님들의 의견을 토대로 더 나은 서비스를 제공하기 위해 끊임없이 노력하고 있습니다.
    //   <br/>
    //   <br/>
    //   많은 관심과 협조를 부탁드리며, 더 나은 서비스로 찾아뵙겠습니다. 감사합니다.`);

    const handleWriteOpenModal = () => {
        setWriteModalOpen(true);
    };

    const handleWriteCloseModal = () => {
        setWriteModalOpen(false);
    };

    const handleUpdateOpenModal = async (noticeSeq) => {
        try {
            const response = await TokenAxios.get(`/api/notice/${noticeSeq}`);
            setEditNotice(response.data); // 수정할 공지사항 데이터 설정
            setUpdateModalOpen(true);
        } catch (e) {
            console.error("공지사항 상세 정보 가져오기 실패:", e);
        }
    };
    const handleUpdateCloseModal = () => {
        setUpdateModalOpen(false);
        setLookModalOpen(false);
    };

    // 공지 상세 조회 (get)
    const handleLookOpenModal = async (noticeSeq) => {
        try {
            const response = await TokenAxios.get(`/api/notice/${noticeSeq}`);
            setSelectedNotice(response.data.result.data);
            console.log("Selected Notice:", response.data);
            setLookModalOpen(true);
        } catch (e) {
            console.error("공지사항 상세 정보 가져오기 실패", e);
        }
    };
    const handleLookCloseModal = () => {
        setLookModalOpen(false);
    };

    // 공지 등록 (post)
    const postNotice = async (data) => {
        data.content = editorData;
        data.state = switchState ? "Y" : "N";
        // data.adminSeq = localStorage.getItem("accessToken");

        try {
            await TokenAxios.post("/api/notice", data);
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "헉!!!",
                text: "공지 등록에 실패하였어요!",
                // footer: `${e.response.data.result.msg}`,

                footer:
                    "다시 한 번 시도해주세요",
            });
            console.log(e);
        }
        setWriteModalOpen(false);
    };


    // 공지 조회 (get)
    const getNotice = async (page) => {
        const res = await TokenAxios.get(`/api/notice?page=${page}&size=10`);
        console.log(res.data.result.data.content);
        setDataList(res.data.result.data.content);
        console.log(res.data.result.data.totalPages);
        setTotalPages(res.data.result.data.totalPages);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // 공지 수정 (put)
    const updateNotice = async () => {
        try {
            await DefaultAxios.put(`/api/notice/${editNotice.noticeSeq}`, {
                title: editNotice.title,
                content: editNotice.content,
                adminSeq: localStorage.getItem("adminSeq") // 현재 관리자의 Seq
            });
            Swal.fire("성공", "공지사항이 수정되었습니다.", "success");
            handleUpdateCloseModal();
            getNotice(); // 목록 갱신
        } catch (e) {
            console.error("공지사항 수정 실패:", e);
            Swal.fire("오류", "공지사항 수정에 실패했습니다.", "error");
        }
    };


    // 공지 삭제 (delete)
    const deleteNotice = async (noticeSeq) => {
        try {
            await DefaultAxios.delete(`/api/notice/${noticeSeq}`);
            Swal.fire("성공", "공지사항이 삭제되었습니다.", "success");
            // 삭제 후 목록 갱신
            getNotice();
            setLookModalOpen(false); // 모달 닫기
        } catch (e) {
            console.error("공지사항 삭제 실패:", e);
            Swal.fire("오류", "공지사항 삭제에 실패했습니다.", "error");
        }
    };

    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = () => {
        if (selectedNotice && selectedNotice.noticeSeq) {
            Swal.fire({
                title: "정말 삭제하시겠습니까?",
                text: "이 작업은 되돌릴 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예, 삭제하겠습니다",
                cancelButtonText: "아니요"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteNotice(selectedNotice.noticeSeq);
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

                        {/*작성하기 버튼을 누르면 Editor가 포함된 모달이 나오도록 했습니다.*/}
                        <AdminButton variant="contained" onClick={handleWriteOpenModal}>
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
                            <Typography variant="h6" fontWeight="bold">
                                상세보기
                            </Typography>
                        </ListItemStyled>
                        <Divider component="li" light/>
                        {dataList.map((notice, index) => (
                            <React.Fragment key={index}>
                                <ListItemStyled>
                                    <Typography
                                        variant="body1"
                                        sx={{width: getColumnWidth('공지번호'), textAlign: "center"}}
                                    >
                                        {index + 1 + (currentPage * pageSize)}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{width: getColumnWidth('작성일시'), textAlign: "center"}}
                                    >
                                        {formatDate(notice.createdAt)}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{width: getColumnWidth('작성자'), textAlign: "center"}}
                                    >
                                        {notice.nickname}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{width: getColumnWidth('제목'), textAlign: "center"}}
                                    >
                                        {notice.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{width: getColumnWidth('상단고정'), textAlign: "center"}}
                                    >
                                        {notice.state}
                                    </Typography>
                                    <IconButton onClick={() => handleLookOpenModal(notice.noticeSeq)}
                                                sx={{width: getColumnWidth('상단고정'), textAlign: "center"}}>
                                        <InfoOutlinedIcon/>
                                    </IconButton>
                                </ListItemStyled>
                                {index !== dataList.length - 1 && (
                                    <Divider component="li" light/>
                                )}
                            </React.Fragment>
                        ))}
                    </StyledList>
                    <PaginationContainer>
                        <Pagination
                            count={totalPages} // 총 페이지 수를 적용
                            page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
                            onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
                        />
                    </PaginationContainer>

                    {/* 공지사항 작성 모달  */}
                    <Dialog
                        onClose={handleWriteOpenModal}
                        open={writeModalOpen}
                        maxWidth={false}
                    >
                        <form onSubmit={handleSubmit((data) => {
                            postNotice(data);
                            // postNotice(data);})}>
                            // console.log(data)
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
                                    onClick={handleWriteCloseModal}
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
                                <FormControlLabel
                                    control={<Switch checked={switchState} onChange={handleSwitchChange} sx={{
                                        color: pink[600],
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: pink[600],
                                            '&:hover': {
                                                backgroundColor: alpha(pink[600], 0.08),
                                            }
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: pink[600],
                                        },
                                    }}/>}
                                    label="상단 고정"
                                />
                            </div>
                            <DialogActions
                                style={{justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}
                            >
                                <AdminButton type="submit" autoFocus onClick={handleWriteCloseModal}>
                                    Save
                                </AdminButton>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* 공지사항 수정 모달  */}
                    <Dialog
                        onClose={handleUpdateCloseModal}
                        open={updateModalOpen}
                        maxWidth={false}
                    >
                        <DialogTitle
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <CustomSelect
                                size="s"
                                sx={{marginRight: "10px" /* 추가적인 스타일 */}}
                            />
                            <InputBoxM
                                value={selectedNotice?.title}
                                onChange={(e) => setEditNotice({...editNotice, title: e.target.value})}
                                color="neutral"
                                placeholder="Text"
                                disabled={false}
                                variant="soft"
                                sx={{mb: 2, mt: 2, width: "70%"}}>
                            </InputBoxM>
                            <IconButton
                                aria-label="close"
                                onClick={handleUpdateCloseModal}
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
                                    data={selectedNotice?.content}
                                    onChange={(event, editor) => {
                                        setEditNotice({...editNotice, content: editor.getData()});
                                    }}
                                />
                            </CKEditorContainer>
                            <DialogActions
                                style={{justifyContent: "center", marginTop: "20px"}}
                            >
                                <AdminButton autoFocus onClick={updateNotice}>
                                    Save
                                </AdminButton>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>

                    {/* 공지사항 보기 모달 */}
                    <Dialog
                        onClose={handleLookOpenModal}
                        open={lookModalOpen}
                        maxWidth={false}
                    >
                        <DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleLookCloseModal}
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
                        <DialogContent style={{width: 900, height: '450px', overflowY: 'auto', overflowX: 'hidden'}}>
                            <div>
                                <Grid marginTop="2%" style={{textAlign: "center"}}>
                                    {/* <h2>공지사항 입니다.</h2> */}
                                    {selectedNotice?.title}
                                </Grid>
                                <Grid>작성일시
                                    : {formatDate(selectedNotice?.createdAt)} 작성자 {selectedNotice?.nickname}</Grid>

                                <Typography style={{marginTop: "5%"}}>
                                    {selectedNotice?.content}
                                </Typography>
                            </div>
                        </DialogContent>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            width: '100%',
                            marginBottom: '0px',
                            marginLeft: '20px',
                            marginRight: '20px'
                        }}>
                            <FormControlLabel
                                control={<Switch checked={selectedNotice?.state === 'Y'} disabled={true}
                                                 onChange={handleSwitchChange} sx={{
                                    color: pink[600],
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: pink[600],
                                        '&:hover': {
                                            backgroundColor: alpha(pink[600], 0.08),
                                        },
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: pink[600],
                                    },
                                }}/>}
                                label="상단 고정"
                            />
                        </div>

                        <DialogActions
                            style={{justifyContent: "center", marginTop: "40px", marginBottom: "30px"}}
                        >
                            <AdminButton
                                autoFocus
                                onClick={handleUpdateOpenModal}
                                style={{marginRight: "5%"}}
                            >
                                수정
                            </AdminButton>
                            <AdminButton autoFocus onClick={handleDeleteClick}>
                                삭제
                            </AdminButton>
                        </DialogActions>
                    </Dialog>

                    {/*EditorModal은 AdminComponents.js에 있는 컴포넌트 입니다.*/}
                </Box>
            </Box>
        </Paper>
    );
};

export default AnnouncementPage;
