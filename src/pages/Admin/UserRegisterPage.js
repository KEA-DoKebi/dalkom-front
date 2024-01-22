// UserListPage.jsx
import React, { useEffect, useState } from "react";
import AdminBar from "components/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { AdminButton, InputBoxS } from "components/AdminComponents";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const UserRegisterPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("사용자 등록");
  const [isAlertOpen, setAlertOpen] = useState(false);
  // Alert의 열림 여부 상태

  const handleAdminButtonClick = () => {
    // AdminButton이 클릭되면 Alert를 열도록 상태를 업데이트
    setAlertOpen(true);
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("사용자 등록");
  }, []);

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "80px",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  ID(이메일)
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="아이디를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  비밀번호
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="비밀번호를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  사원번호
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="사원번호를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  전화번호
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="전화번호를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  이름
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="이름을 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  닉네임
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="닉네임을 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  부서
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="부서를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ alignItems: "start" }}>
                <Typography variant="h7" fontWeight="bold" align="left">
                  주소
                </Typography>
                <InputBoxS
                  color="neutral"
                  disabled={false}
                  placeholder="주소를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
            </div>
          </div>

          <AdminButton variant="contained" onClick={handleAdminButtonClick}>
            등록하기
          </AdminButton>

          {/* Alert 컴포넌트 */}
          <Snackbar
            sx={{ width: "50%" }}
            spacing={2}
            open={isAlertOpen}
            onClose={() => setAlertOpen(false)}
            autoHideDuration={2000} // alert 떠 있는 시간
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
              color="success"
              endDecorator={
                <IconButton variant="soft" color="success">
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <AlertTitle>
                <Typography fontWeight="bold">Success</Typography>
              </AlertTitle>
              사용자 등록을 완료했습니다!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserRegisterPage;
