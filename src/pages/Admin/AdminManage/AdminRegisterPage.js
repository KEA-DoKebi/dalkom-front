import React, { useEffect, useState } from "react";

import {
  Paper,
  Box,
  Toolbar,
  Typography,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AdminBar from "components/organisms/AdminBar";
import { InputBoxS } from "components/atoms/Input";
import { AdminButton } from "components/atoms/AdminCommonButton";

const AdminRegisterPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("관리자 등록");

  const [isAlertOpen, setAlertOpen] = useState(false);
  // Alert의 열림 여부 상태

  const handleAdminButtonClick = () => {
    // AdminButton이 클릭되면 Alert를 열도록 상태를 업데이트
    setAlertOpen(true);
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("관리자 등록");
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
          <div style={{ alignItems: "start" }}>
            <Typography variant="h7" fontWeight="bold" align="left">
              ID
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
              //variant="soft"
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
              관리자 등록을 완료했습니다!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminRegisterPage;
