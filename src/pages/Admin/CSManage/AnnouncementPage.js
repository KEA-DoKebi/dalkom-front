import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {DefaultAxios, TokenAxios} from "apis/CommonAxios";
import {pink} from "@mui/material/colors";
import {alpha} from "@mui/material/styles";
import {PinkSwitch} from "components/atoms/OnOffSwitch";
import Search from 'components/molecules/Search';


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
    Typography,
} from "@mui/material";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {InputBoxM} from "components/atoms/Input";
import EditorComponent from "components/atoms/Editor";

const dataListLabels = [
    "번호",
    "작성일시",
    "작성자",
    "제목",
    "상단고정",
    "상세보기",
];

const itemFlexStyles = {
    "& > *:nth-child(1)": {flex: 0.5}, // 번호
    "& > *:nth-child(2)": {flex: 2}, // 작성일시
    "& > *:nth-child(3)": {flex: 2}, // 작성자
    "& > *:nth-child(4)": {flex: 2}, // 제목
    "& > *:nth-child(5)": {flex: 2}, // 상단고정
    "& > *:nth-child(6)": {flex: 0.5}, // 상세보기
    "&:before, &:after": {content: '""', flex: 0.5},
};

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background .paper;
  ${itemFlexStyles} // 공통 스타일 적용
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

const StyledDialog = styled(Dialog)`
  z-index: 900;
`

const formatDate = (dateString) => {
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const AnnouncementPage = () => {
    const {register, handleSubmit, setValue, trigger} = useForm();
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("공지사항");
    const [switchState, setSwitchState] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [editNotice, setEditNotice] = useState({title: "", content: ""});
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [editorContent, setEditorContent] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [currentNoticeSeq, setCurrentNoticeSeq] = useState(null);

    const optionList = [
        {label: "작성자"},
        {label: "제목"},
    ]
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // const accessToken = localStorage.getItem('accessToken');

    const handleEditorContentChange = (content) => {
        setEditorContent(content);
    };

    const pageSize = 10;

    // 스위치 변경 처리
    const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
    };
    const handleSearch = async (searchQuery) => {
        try {
            console.log(selectedValue.label);
            console.log(searchQuery);

            let apiUrl = "/api/notice/search?page=0&size=10";  // 기본 API URL

            // 선택된 검색어에 따라 검색 조건 추가
            if (selectedValue.label === "작성자") {
                apiUrl += `&nickname=${searchQuery}`;
            } else if (selectedValue.label === "제목") {
                apiUrl += `&title=${searchQuery}`;
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

    const handleUpdateOpenModal = async () => {
        try {
            const response = await TokenAxios.get(`/api/notice/${currentNoticeSeq}`);
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
            setCurrentNoticeSeq(noticeSeq);
            console.log("currentNoticeSeq:", currentNoticeSeq);
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
        data.content = editorContent;
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

                footer: "다시 한 번 시도해주세요",
            });
            console.log(e);
        }
        setWriteModalOpen(false);
    };

    // 공지 조회 (get)
    const getNotice = async (page) => {
        const res = await TokenAxios.get(
            `/api/notice?page=${page}&size=${pageSize}`,
        );
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
            await DefaultAxios.put(`/api/notice/${currentNoticeSeq}`, {
                // title: editNotice.title,
                title: "임시 업데이트 타이틀",
                // content: editNotice.content,
                content: "임시 업데이트 컨텐트",
                // adminSeq: localStorage.getItem("adminSeq"), // 현재 관리자의 Seq
                adminSeq: 1,
                state: selectedNotice.state
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
    const deleteNotice = async () => {
        try {
            await DefaultAxios.delete(`/api/notice/${currentNoticeSeq}`);
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
        if (selectedNotice && currentNoticeSeq) {
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
                    deleteNotice();
                }
            });
        }
    };

    const [state, setState] = React.useState({
        option: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
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
                        {/*작성하기 버튼을 누르면 Editor가 포함된 모달이 나오도록 했습니다.*/}
                        <AdminButton variant="contained" onClick={handleWriteOpenModal}>
                            작성하기
                        </AdminButton>
                    </Toolbar>

                    <Box sx={{width: "100%", height: "80%", overflowY: "auto"}}>
                        <StyledList aria-label="mailbox folders">
                            <ListItemLabelStyled>
                                {dataListLabels.map((label, index) => (
                                    <React.Fragment key={index}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{textAlign: "center"}}
                                        >
                                            {label}
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </ListItemLabelStyled>
                            <Divider component="li" light/>
                            {dataList.map((notice, index) => (
                                <React.Fragment key={index}>
                                    <ListItemStyled>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {index + 1 + currentPage * pageSize}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {formatDate(notice.createdAt)}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {notice.nickname}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {notice.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {notice.state}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleLookOpenModal(notice.noticeSeq)}
                                            sx={{
                                                textAlign: "center",
                                            }}
                                        >
                                            <InfoOutlinedIcon/>
                                        </IconButton>
                                    </ListItemStyled>
                                    {index !== dataList.length && (
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

                    {/* 공지사항 작성 모달  */}
                    <StyledDialog
                        onClose={handleWriteOpenModal}
                        open={writeModalOpen}
                        maxWidth={false}
                    >
                        <form
                            onSubmit={handleSubmit((data) => {
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
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </DialogTitle>
                            <DialogContent
                                style={{
                                    width: 900,
                                    height: "450px",
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                }}
                            >
                                <EditorComponent
                                    onContentChange={handleEditorContentChange}
                                    id="content"
                                    data=""
                                    placeholder="공지 내용을 입력해주세요."
                                    onChange={(event, editor) => {
                                        setValue("content", editor.getData());
                                        trigger("content");
                                        console.log("content");
                                    }}
                                />
                            </DialogContent>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginLeft: "20px",
                                    marginRight: "20px",
                                }}
                            >
                                <PinkSwitch
                                    sx={{mr: 2}}
                                    label="상단고정"
                                    onChange={handleChange}
                                />
                            </div>
                            <DialogActions
                                style={{
                                    justifyContent: "center",
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <AdminButton
                                    type="submit"
                                    autoFocus
                                    onClick={handleWriteCloseModal}
                                >
                                    Save
                                </AdminButton>
                            </DialogActions>
                        </form>
                    </StyledDialog>

                    {/* 공지사항 수정 모달  */}
                    <StyledDialog
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
                            <InputBoxM
                                value={selectedNotice?.title}
                                onChange={(e) =>
                                    setEditNotice({...editNotice, title: e.target.value})
                                }
                                color="neutral"
                                placeholder="Text"
                                disabled={false}
                                variant="soft"
                                sx={{mb: 2, mt: 2, width: "70%"}}
                            ></InputBoxM>
                            <IconButton
                                aria-label="close"
                                onClick={handleUpdateCloseModal}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent style={{width: 900, height: 550}}>
                            <EditorComponent
                                onContentChange={handleEditorContentChange}
                                placeholder="공지 내용을 입력해주세요."
                                id="content"
                                data={selectedNotice?.content}
                                onChange={(event, editor) => {
                                    setValue("content", editor.getData());
                                    trigger("content");
                                    console.log("content");
                                }}
                            />
                            <DialogActions
                                style={{justifyContent: "center", marginTop: "20px"}}
                            >
                                <AdminButton autoFocus onClick={updateNotice}>
                                    Save
                                </AdminButton>
                            </DialogActions>
                        </DialogContent>
                    </StyledDialog>

                    {/* 공지사항 보기 모달 */}
                    <StyledDialog
                        onClose={handleLookOpenModal}
                        open={lookModalOpen}
                        maxWidth={false}
                    >
                        <DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleLookCloseModal}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent
                            style={{
                                width: 900,
                                height: "450px",
                                overflowY: "auto",
                                overflowX: "hidden",
                            }}
                        >
                            <div>
                                <Grid marginTop="2%" style={{textAlign: "center"}}>
                                    {/* <h2>공지사항 입니다.</h2> */}
                                    {selectedNotice?.title}
                                </Grid>
                                <Grid>
                                    작성일시 : {formatDate(selectedNotice?.createdAt)} 작성자{" "}
                                    {selectedNotice?.nickname}
                                </Grid>

                                <Typography style={{marginTop: "5%"}}>
                                    {selectedNotice?.content}
                                </Typography>
                            </div>
                        </DialogContent>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "0px",
                                marginLeft: "20px",
                                marginRight: "20px",
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={selectedNotice?.state === "Y"}
                                        disabled={true}
                                        onChange={handleSwitchChange}
                                        sx={{
                                            color: pink[600],
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: pink[600],
                                                "&:hover": {
                                                    backgroundColor: alpha(pink[600], 0.08),
                                                },
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                                {
                                                    backgroundColor: pink[600],
                                                },
                                        }}
                                    />
                                }
                                label="상단 고정"
                            />
                        </div>

                        <DialogActions
                            style={{
                                justifyContent: "center",
                                marginTop: "40px",
                                marginBottom: "30px",
                            }}
                        >
                            <AdminButton autoFocus onClick={handleUpdateOpenModal} style={{marginRight: "5%"}}>
                                수정
                            </AdminButton>
                            <AdminButton autoFocus onClick={handleDeleteClick}>
                                삭제
                            </AdminButton>
                        </DialogActions>
                    </StyledDialog>

                    {/*EditorModal은 AdminComponents.js에 있는 컴포넌트 입니다.*/}
                </Box>
            </Box>
        </Paper>
    );
};

export default AnnouncementPage;
