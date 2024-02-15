// UserListPage.jsx
import React, { useEffect, useState } from "react";
import AdminBar from "components/organisms/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { InputBoxS, InputBoxL } from "components/atoms/Input";
import { AdminButton } from "components/atoms/AdminCommonButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TokenAxios } from "apis/CommonAxios";
import Swal from "sweetalert2";

const UserRegisterPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("사용자 등록");
  const [isAlertOpen, setAlertOpen] = useState(false);
  // Alert의 열림 여부 상태

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  const handleAdminButtonClick = () => {
    // AdminButton이 클릭되면 Alert를 열도록 상태를 업데이트
    setAlertOpen();
  };

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("사용자 등록");
  }, []);

  const userRegister = async (data) => {
    data.mileage = 0;
    console.log(data);

    try {
      const res = await TokenAxios.post("/api/admin/user", data);
      if (res.data.code === 200) {
        // 성공 메시지 설정
        Swal.fire({
          position: "center",
          icon: "success",
          title: "사용자 등록이 완료되었습니다.",
          showConfirmButton: true,
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/admin/user/list");
        })
        // setAlertMessage("사용자 등록을 완료했습니다!");
        // setAlertSeverity("success");
        // setAlertOpen(true); // alert 열기
      } else {
        // 실패 메시지 설정 (API 응답에 따라 다를 수 있음)
        setAlertMessage("사용자 등록에 실패했습니다.");
        setAlertSeverity("error");
        console.log(res);
        setAlertOpen(true); // alert 열기
      }
    } catch (e) {
      // 오류 발생 시 처리
      setAlertMessage("사용자 등록 중 오류가 발생했습니다.");
      setAlertSeverity("error");
      console.log(e);
      setAlertOpen(true); // alert 열기
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Paper sx={{ display: "flex", minHeight: "100vh" }} elevation={0}>
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
          <form
            onSubmit={handleSubmit((data) => {
              userRegister(data);
            })}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <div style={{ alignItems: "start" }}>
                  <Typography variant="h7" fontWeight="bold" align="left">
                    이메일(ID)
                  </Typography>
                  <InputBoxS
                    color="neutral"
                    disabled={false}
                    placeholder="이메일을 입력하세요."
                    variant="soft"
                    sx={{ mb: 4 }}
                    {...register("email")}
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
                    {...register("empId")}
                  />
                </div>
                <div style={{ alignItems: "start" }}>
                  <Typography variant="h7" fontWeight="bold" align="left">
                    입사일
                  </Typography>
                  <InputBoxS
                    color="neutral"
                    type="date"
                    disabled={false}
                    placeholder="입사일을 입력하세요"
                    variant="soft"
                    sx={{ mb: 4 }}
                    slotProps={{
                      input: {
                        max: today,
                      },
                    }}
                    {...register("joinedAt")}
                  />
                </div>
              </div>
              <div style={{ marginLeft: "10px" }}>
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
                    {...register("password")}
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
                    {...register("name")}
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
                    {...register("nickname")}
                  />
                </div>
              </div>
            </div>
            <div style={{ alignItems: "start" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px", // 등록하기 버튼과의 간격
                }}
              >
                <Typography variant="h7" fontWeight="bold" align="left">
                  주소
                </Typography>
                <InputBoxL
                  color="neutral"
                  disabled={false}
                  placeholder="주소를 입력하세요"
                  variant="soft"
                  sx={{ mb: 4, width: "80%" }} // 너비 조절
                  {...register("address")}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              {/* Flexbox 사용 */}
              <AdminButton
                type="submit"
                variant="contained"
                onClick={handleAdminButtonClick}
                style={{ margin: "auto" }}
              >
                등록하기
              </AdminButton>
            </div>
          </form>

          {/* Alert 컴포넌트 */}
          <Snackbar
            open={isAlertOpen}
            autoHideDuration={2000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity={alertSeverity}
              sx={{ width: "100%" }}
            >
              <AlertTitle>
                <Typography fontWeight="bold">
                  {alertSeverity === "success" ? "Success" : "Error"}
                </Typography>
              </AlertTitle>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserRegisterPage;
