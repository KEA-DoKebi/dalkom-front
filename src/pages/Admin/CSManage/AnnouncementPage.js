import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AdminButton,
  InputBoxS,
  InputBoxM,
  CustomSelect,
} from "../../../components/atoms/AdminComponents";
import AdminBar from "../../../components/organisms/AdminBar";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
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

const dataList = [
  {
    공지번호: "N001",
    작성일시: "2024-01-10 09:00",
    작성자: "홍길동",
    공지사항제목: "새로운 기능 업데이트 안내",
    상단고정: "Y",
  },
  {
    공지번호: "N002",
    작성일시: "2024-01-11 10:20",
    작성자: "이영희",
    공지사항제목: "시스템 점검 안내",
    상단고정: "N",
  },
  {
    공지번호: "N003",
    작성일시: "2024-01-12 11:30",
    작성자: "김철수",
    공지사항제목: "신규 서비스 런칭",
    상단고정: "Y",
  },
  {
    공지번호: "N004",
    작성일시: "2024-01-13 12:40",
    작성자: "박지민",
    공지사항제목: "사용자 인터페이스 개선 안내",
    상단고정: "N",
  },
  {
    공지번호: "N005",
    작성일시: "2024-01-14 13:50",
    작성자: "김민주",
    공지사항제목: "이용 약관 변경 공지",
    상단고정: "N",
  },
  {
    공지번호: "N006",
    작성일시: "2024-01-15 14:00",
    작성자: "최영호",
    공지사항제목: "보안 업데이트 안내",
    상단고정: "Y",
  },
  {
    공지번호: "N007",
    작성일시: "2024-01-16 15:10",
    작성자: "한지아",
    공지사항제목: "회원 혜택 개편 안내",
    상단고정: "N",
  },
  {
    공지번호: "N008",
    작성일시: "2024-01-17 16:20",
    작성자: "윤대리",
    공지사항제목: "모바일 앱 버전 업데이트",
    상단고정: "Y",
  },
  {
    공지번호: "N009",
    작성일시: "2024-01-18 17:30",
    작성자: "김과장",
    공지사항제목: "고객 지원 팀 운영 시간 변경",
    상단고정: "N",
  },
  {
    공지번호: "N010",
    작성일시: "2024-01-19 18:40",
    작성자: "이사장",
    공지사항제목: "연말 정산 관련 공지",
    상단고정: "Y",
  },
];
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
  background-color: background.paper;
`;

const dataListLabels = Object.keys(dataList[0]);

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
    공지번호: [0, 10],
    작성일시: [10, 30],
    작성자: [30, 40],
    공지사항제목: [40, 50],
    상단고정: [50, 60],
    주문상세: [60, 70],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const AnnouncementPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("공지사항");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("공지사항");
  }, []);

  // Modal의 상태를 관리하는 state
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [lookModalOpen, setLookModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  //수정 내역 불러오기
  const [title] = useState(`공지사항 입니다.`);
  const [content] =
    useState(`안녕하세요. 소중한 고객 여러분께 알려드리는 공지사항이 있습니다. 최근의 업데이트로 인해 당사의 서비스가 더욱 원활하고 효율적으로 운영될 수 있도록 노력하고 있습니다. 새롭게 추가된 기능들과 향상된 사용자 경험을 통해 더욱 편리한 서비스를 제공하고자 합니다.
  <br/>
  <br/>
    이번 업데이트로는 보안 강화 및 속도 개선에 중점을 두었습니다.고객님들의 개인 정보를 보호하기 위해 최신 보안 기술을 도입하여 더욱 안전한 환경을 제공하고 있습니다. 또한, 서비스의 속도를 향상시켜 더 빠르고 신속한 이용이 가능하도록 조치하였습니다.
    <br/>
    <br/>
    우리는 항상 고객님들의 소중한 의견에 귀 기울이고 있습니다. 서비스 이용 중 발생하는 어떠한 문제나 피드백이 있다면 언제든지 고객센터를 통해 알려주시기 바랍니다. 고객님들의 의견을 토대로 더 나은 서비스를 제공하기 위해 끊임없이 노력하고 있습니다.
    <br/>
    <br/>
    많은 관심과 협조를 부탁드리며, 더 나은 서비스로 찾아뵙겠습니다. 감사합니다.`);

  const handleWriteOpenModal = () => {
    setWriteModalOpen(true);
  };

  const handleWriteCloseModal = () => {
    setWriteModalOpen(false);
  };

  const handleUpdateOpenModal = () => {
    setUpdateModalOpen(true);
  };
  const handleUpdateCloseModal = () => {
    setUpdateModalOpen(false);
    setLookModalOpen(false);
  };

  const handleLookOpenModal = () => {
    setLookModalOpen(true);
  };
  const handleLookCloseModal = () => {
    setLookModalOpen(false);
  };

  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
      {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
      <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#EEF2F6",
          flexGrow: 1,
        }}
      >
        <Toolbar />
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
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <div />
            <InputBoxS
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4, mt: 4 }}
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
                    sx={{ width: getColumnWidth(label), textAlign: "center" }}
                  >
                    {label}
                  </Typography>
                </React.Fragment>
              ))}
              <Typography variant="h6" fontWeight="bold">
                상세보기
              </Typography>
            </ListItemStyled>
            <Divider component="li" light />
            {dataList.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <ListItemStyled>
                  {dataListLabels.map((label, colIndex) => (
                    <Typography
                      variant="body1"
                      key={colIndex}
                      sx={{ width: getColumnWidth(label), textAlign: "center" }}
                    >
                      {item[label]}
                    </Typography>
                  ))}
                  <IconButton onClick={handleLookOpenModal}>
                    <InfoOutlinedIcon />
                  </IconButton>
                </ListItemStyled>
                {rowIndex !== dataList.length - 1 && (
                  <Divider component="li" light />
                )}
              </React.Fragment>
            ))}
          </StyledList>

          <Pagination count={10} />
          {/* 공지사항 작성 모달  */}
          <Dialog
            onClose={handleWriteOpenModal}
            open={writeModalOpen}
            maxWidth={false}
          >
            <DialogTitle>
              <InputBoxM
                color="neutral"
                placeholder="Text"
                disabled={false}
                variant="soft"
                sx={{ mb: 2, mt: 2, width: "100%" }}
              />
            </DialogTitle>
            <DialogContent style={{ width: 900, height: 550 }}>
              <CKEditorContainer>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>공지를 작성하세요</p>"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    // 원하는 작업 수행
                  }}
                />
              </CKEditorContainer>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "20px" }}
              >
                <AdminButton autoFocus onClick={handleWriteCloseModal}>
                  Save
                </AdminButton>
              </DialogActions>
            </DialogContent>
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
                sx={{ marginRight: "10px" /* 추가적인 스타일 */ }}
              />
              <InputBoxM
                value={title}
                color="neutral"
                placeholder="Text"
                disabled={false}
                variant="soft"
                sx={{ mb: 2, mt: 2, width: "70%" }}
              />
            </DialogTitle>
            <DialogContent style={{ width: 900, height: 550 }}>
              <CKEditorContainer>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    // 원하는 작업 수행
                  }}
                />
              </CKEditorContainer>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "20px" }}
              >
                <AdminButton autoFocus onClick={handleUpdateCloseModal}>
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
            <DialogContent style={{ width: 900, height: 600 }}>
              <div>
                <Grid marginTop="2%" style={{ textAlign: "center" }}>
                  <h2>공지사항 입니다.</h2>
                </Grid>
                <Grid>작성일시 : 2024-01-22 작성자 라이언</Grid>

                <Typography style={{ marginTop: "5%" }}>
                  안녕하세요. 소중한 고객 여러분께 알려드리는 공지사항이
                  있습니다. 최근의 업데이트로 인해 당사의 서비스가 더욱 원활하고
                  효율적으로 운영될 수 있도록 노력하고 있습니다. 새롭게 추가된
                  기능들과 향상된 사용자 경험을 통해 더욱 편리한 서비스를
                  제공하고자 합니다.
                  <br />
                  <br />
                  이번 업데이트로는 보안 강화 및 속도 개선에 중점을
                  두었습니다.고객님들의 개인 정보를 보호하기 위해 최신 보안
                  기술을 도입하여 더욱 안전한 환경을 제공하고 있습니다. 또한,
                  서비스의 속도를 향상시켜 더 빠르고 신속한 이용이 가능하도록
                  조치하였습니다.
                  <br />
                  <br />
                  우리는 항상 고객님들의 소중한 의견에 귀 기울이고 있습니다.
                  서비스 이용 중 발생하는 어떠한 문제나 피드백이 있다면 언제든지
                  고객센터를 통해 알려주시기 바랍니다. 고객님들의 의견을 토대로
                  더 나은 서비스를 제공하기 위해 끊임없이 노력하고 있습니다.
                  <br />
                  <br />
                  많은 관심과 협조를 부탁드리며, 더 나은 서비스로
                  찾아뵙겠습니다. 감사합니다.
                </Typography>
              </div>
              <DialogActions
                style={{ justifyContent: "center", marginTop: "40px" }}
              >
                <AdminButton
                  autoFocus
                  onClick={handleUpdateOpenModal}
                  style={{ marginRight: "5%" }}
                >
                  수정
                </AdminButton>
                <AdminButton autoFocus onClick={handleLookCloseModal}>
                  삭제
                </AdminButton>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/*EditorModal은 AdminComponents.js에 있는 컴포넌트 입니다.*/}
        </Box>
      </Box>
    </Paper>
  );
};

export default AnnouncementPage;
