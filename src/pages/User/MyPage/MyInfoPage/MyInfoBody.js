import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  styled,
  Button,
  Paper,
} from "@mui/material";
import { Textarea, FormControl, FormHelperText, Input } from "@mui/joy";
import { TokenAxios } from "apis/CommonAxios";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import DaumPostcode from "react-daum-postcode";
import { CustomButton } from "common";


export const UserButton = styled(Button)`
  background-color: #000000;
  color: #ffffff;
  width: 124px;
  height: 46px;
  text-align: center;
  font-weight: 500;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;

  &:hover {
    background-color: #ffffff; /* Button color changes to white */
    color: #000000; /* Text color changes to black */
    border: 1px solid #000000; /* Optional: Add a black border to maintain size */
  }
`;

const MyInfoBody = () => {
    //기존 유저 정보 불러오기
    const [userInfo, setUserInfo] = useState([]);
    const [openDaumAddress, setOpenDaumAddress] = useState(false);
    const [userAddress, setUserAddress] = useState(userInfo.address || "");



    const loadData = async () => {
        try {
            const res = await TokenAxios.get("/api/user/self");
            console.log(res.data.result.data);
            setUserInfo(res.data.result.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

  //유저 정보 수정
  const { register, handleSubmit,watch ,formState: { errors }} = useForm();
  const password = watch("password");
  // password rule 추가 가능 
  // const passwordRules = {
  //   required: "Password is required",
  //   minLength: { value: 8, message: "Password must be at least 8 characters long" },
  // };

  const editInfo = async (data) => {
    try {
      const res = await TokenAxios.put("/api/user", data);
      res.address = userAddress
      console.log(res.data);
      Swal.fire({//
        position: "center",
        icon: "success",
        title: "수정이 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: '확인',
      });
    } catch (e) {
        console.log(e);
        Swal.fire({//
            position: "center",
            icon: "error",
            title: "수정에 실패했습니다.",
            showConfirmButton: true,
            confirmButtonColor: 'gray',
            confirmButtonText: '확인',
        });

    }
  };

  
  const DaumAddressComponent = () => {
    const handle = {
      clickButton: () => {
        setOpenDaumAddress((current) => !current);
      },
      selectAddress: (data) => {
        console.log(`
          주소: ${data.address},
          우편번호: ${data.zonecode}
        `);
        setOpenDaumAddress(false);
        setUserAddress(`${data.address} ${data.zonecode}`);
      },
    };

    return (
      <div>
        <SearchAddressButton onClick={handle.clickButton}>
          주소찾기
        </SearchAddressButton>
        {openDaumAddress && (
          <DaumPostcode
            onComplete={handle.selectAddress}
            autoClose={false}
            defaultQuery="가천대역"
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 3333,
            }}
          />
        )}
      </div>
    );
  };



    return (
        <Paper elevation={0}>
            <form
                onSubmit={handleSubmit((data) => {
                  data.address = userAddress;
                    console.log(data);
                    editInfo(data);
                })}
            >
                <div>
                    <Typography variant="h4" sx={{mt: 7}}>
                        기존 회원정보
                    </Typography>

                    <Divider sx={{borderBottomWidth: 3}} color={"black"}></Divider>

                    <Grid container spacing={2} justifyContent="auto" sx={{ mt: 8, alignItems: "center" }}>
                        {/* 왼쪽의 빈 공간 */}
                        <Grid item xs={2}></Grid>
                        {/* 아이디 */}
                        <Grid item xs={2} >
                            <Typography>아이디</Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <Typography>{userInfo.email}</Typography>
                            {/* <Textarea disabled placeholder={userInfo.email} /> */}
                        </Grid>
                        <Grid item xs={4}></Grid>

                        {/* 비밀번호 */}
                        <Grid item xs={2} sx={{mt:2}}></Grid>
                        <Grid item xs={2} sx={{mt:2}} >
                            <Typography>비밀번호</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                            <Input placeholder="비밀번호" type="password" {...register("password")} />
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}></Grid>
                        

                        {/* 비밀번호 확인 */}
                        <Grid item xs={2} sx={{mt:2}}></Grid>
                        <Grid item xs={2} sx={{mt:2}}>
                            <Typography>비밀번호 확인</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                            <Input placeholder="비밀번호 확인"  type="password"
                            {...register("passwordConfirmation", {
                              validate: (value) => value === password || "Passwords do not match",
                            })} />
                             {errors.passwordConfirmation && <FormHelperText>{errors.passwordConfirmation.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}></Grid>

                        {/* 이름(실명) */}
                        <Grid item xs={2} sx={{mt:2}}></Grid>
                        <Grid item xs={2} sx={{mt:2}}>
                            <Typography>이름(실명)</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                            <Textarea disabled placeholder={userInfo.name} />
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}></Grid>

                        {/* 닉네임 */}
                        <Grid item xs={2} sx={{mt:2}}></Grid>
                        <Grid item xs={2} sx={{mt:2}}>
                            <Typography sx={{ marginBottom: 3.5 }}>닉네임</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                            <FormControl sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                                <Textarea
                                    placeholder="닉네임"
                                    defaultValue={userInfo.nickname}
                                    {...register("nickname")}
                                    sx={{ flexGrow: 1 }} // Textarea가 여유 공간을 모두 차지하도록 설정
                                />
                                <FormHelperText>닉네임은 최대 15자입니다.</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>

                        {/* 주소 */}
                        <Grid item xs={2} sx={{mt:2}}></Grid>
                        <Grid item xs={2} sx={{mt:2}}>
                            <Typography>주소</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                        <Input
                              placeholder="주소"
                              value={userAddress}
                              // You don't need to register the address field if it's not editable
                              // {...register("address")}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt:2}}>
                        <DaumAddressComponent />
                        </Grid>

                        
                    </Grid>

                </div>
                <Grid container justifyContent="center" sx={{mt: 10}}>
                    <UserButton variant="solid" type="submit">
                        수정하기
                    </UserButton>
                </Grid>
            </form>
        </Paper>
    );
};

export default MyInfoBody;

const SearchAddressButton = styled(CustomButton)`
  font-size: 11px;
`;