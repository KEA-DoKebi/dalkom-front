import React, {useEffect, useState} from "react";
import {Box, Paper, Toolbar, Typography,} from "@mui/material";
import AdminBar from "components/organisms/AdminBar";
import {InputBoxS} from "components/atoms/Input";
import {AdminButton} from "components/atoms/AdminCommonButton";
import {TokenAxios} from "apis/CommonAxios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const AdminRegisterPage = () => {
    // Declare selectedMenu and setSelectedMenu using useState
    const [selectedMenu, setSelectedMenu] = useState("관리자 등록");
    const navigate = useNavigate();

    const adminRegister = async (data) => {
        try {
            const res = await TokenAxios.post("/api/admin", data);
            if (res.data.code === 200) {
                // 성공 메시지 설정
                Swal.fire({//
                    position: "center",
                    icon: "success",
                    title: "관리자 등록이 완료되었습니다.",
                    showConfirmButton: true,
                    confirmButtonColor: 'black',
                    confirmButtonText: '확인',
                }).then(() => {
                    navigate("/admin/list");
                });
            } else {
                // 실패 메시지 설정 (API 응답에 따라 다를 수 있음)
                Swal.fire({//
                    icon: "error",
                    title: "관리자 등록에 실패했습니다.",
                    showConfirmButton: true,
                    confirmButtonColor: 'gray',
                    confirmButtonText: '확인',
                });
            }
        } catch (e) {
            // 오류 발생 시 처리
            Swal.fire({//
                icon: "error",
                title: "관리자 등록에 실패했습니다.",
                showConfirmButton: true,
                confirmButtonColor: 'gray',
                confirmButtonText: '확인',
            });
        }
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
                                // onClick={handleAdminButtonClick}
                            >
                                등록하기
                            </AdminButton>
                        </div>
                    </form>
                </Box>
            </Box>
        </Paper>
    );
};

export default AdminRegisterPage;
