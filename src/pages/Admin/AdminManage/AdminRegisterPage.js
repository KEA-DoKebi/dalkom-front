import React, {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, Paper, Snackbar, Toolbar, Typography,} from "@mui/material";
import AdminBar from "components/organisms/AdminBar";
import {InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {TokenAxios} from "apis/CommonAxios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const AdminRegisterPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("관리자 등록");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success"); // 'success' 또는 'error'
    const navigate = useNavigate();

    const adminRegister = async (data) => {
        try {
            const res = await TokenAxios.post("/api/admin", data);
            if (res.data.code === 200) {
                // 성공 메시지 설정
                setAlertMessage("관리자 등록을 완료했습니다!");
                setAlertSeverity("success");
                setAlertOpen(true); // alert 열기
                navigate("/admin/list");
            } else {
                // 실패 메시지 설정 (API 응답에 따라 다를 수 있음)
                setAlertMessage("관리자 등록에 실패했습니다.");
                setAlertSeverity("error");
                setAlertOpen(true); // alert 열기
            }
        } catch (e) {
            // 오류 발생 시 처리
            setAlertMessage("관리자 등록 중 오류가 발생했습니다.");
            setAlertSeverity("error");
            setAlertOpen(true); // alert 열기
        }
    };

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

    const {register, handleSubmit} = useForm();

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
                    <form
                        onSubmit={handleSubmit((data) => {
                            adminRegister(data);
                        })}
                    >
                        <div style={{alignItems: "start"}}>
                            <Typography variant="h7" fontWeight="bold" align="left">
                                ID
                            </Typography>
                            <InputBoxS
                                color="neutral"
                                disabled={false}
                                placeholder="아이디를 입력하세요"
                                variant="soft"
                                sx={{mb: 4}}
                                {...register("adminId")}
                            />
                        </div>
                        <div style={{alignItems: "start"}}>
                            <Typography variant="h7" fontWeight="bold" align="left">
                                비밀번호
                            </Typography>
                            <InputBoxS
                                color="neutral"
                                disabled={false}
                                placeholder="비밀번호를 입력하세요"
                                variant="soft"
                                sx={{mb: 4}}
                                {...register("password")}
                            />
                        </div>
                        <div style={{alignItems: "start"}}>
                            <Typography variant="h7" fontWeight="bold" align="left">
                                이름
                            </Typography>
                            <InputBoxS
                                color="neutral"
                                disabled={false}
                                placeholder="이름을 입력하세요"
                                variant="soft"
                                sx={{mb: 4}}
                                {...register("name")}
                            />
                        </div>
                        <div style={{alignItems: "start"}}>
                            <Typography variant="h7" fontWeight="bold" align="left">
                                닉네임
                            </Typography>
                            <InputBoxS
                                color="neutral"
                                disabled={false}
                                placeholder="닉네임을 입력하세요"
                                variant="soft"
                                sx={{mb: 4}}
                                {...register("nickname")}
                            />
                        </div>
                        <div style={{alignItems: "start"}}>
                            <Typography variant="h7" fontWeight="bold" align="left">
                                부서
                            </Typography>
                            <InputBoxS
                                color="neutral"
                                disabled={false}
                                placeholder="부서를 입력하세요"
                                variant="soft"
                                sx={{mb: 4}}
                                {...register("depart")}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <AdminButton
                                variant="contained"
                                type="submit"
                                onClick={handleAdminButtonClick}
                            >
                                등록하기
                            </AdminButton>
                        </div>
                    </form>
                </Box>

                {/* Alert 컴포넌트 */}
                <Snackbar
                    open={isAlertOpen}
                    autoHideDuration={2000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                >
                    <Alert
                        onClose={() => setAlertOpen(false)}
                        severity={alertSeverity}
                        sx={{width: "100%"}}
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
        </Paper>
    );
};

export default AdminRegisterPage;
