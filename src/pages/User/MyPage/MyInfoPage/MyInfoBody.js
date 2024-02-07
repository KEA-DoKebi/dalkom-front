import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  styled,
  Button,
  Paper,
} from "@mui/material";
import { FormControl, FormHelperText, Input } from "@mui/joy";
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
  const [maskedName, setMaskedName] = useState("");
  const [nickname, setNickname] = useState("");


  const loadData = async () => {
    try {
      const res = await TokenAxios.get("/api/user/self");
      console.log(res.data.result.data);
      setUserInfo(res.data.result.data);
      setNickname(res.data.result.data.nickname);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (userInfo.address) {
      setUserAddress(userInfo.address);
    }
  }, [userInfo.address]);

  //유저 정보 수정
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const editInfo = async (data) => {
    if (!data.password) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "정보가 입력되지 않았습니다.",
        showConfirmButton: true,
        confirmButtonColor: 'gray',
        confirmButtonText: '확인',
      });
      return; // 비밀번호가 입력되지 않았으면 함수 종료
    }
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

  const maskName = (name) => {
    const length = name.length;
    const middleIndex = Math.floor(length / 2);
    let maskedName = "";

    for (let i = 0; i < length; i++) {
      if (i === middleIndex) {
        maskedName += "*";
      } else {
        maskedName += name[i];
      }
    }
    return maskedName;
  };

  useEffect(() => {
    if (userInfo.name) {
      const maskedValue = maskName(userInfo.name); // 마스킹된 이름 생성
      setMaskedName(maskedValue); // 마스킹된 이름 설정
    }
  }, [userInfo.name]);

  const maskEmail = (email) => {
    if (!email) return ''; // 이메일이 없을 경우 빈 문자열 반환

    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.com');
    if (atIndex === -1 || dotIndex === -1) return ''; // 이메일 형식이 아닐 경우 빈 문자열 반환

    const prefix = email.substring(0, atIndex);
    const suffix = email.substring(atIndex + 1, dotIndex);
    const maskedPrefix = prefix.substring(0, 3) + '*'.repeat(prefix.length - 3);
    const maskedSuffix = '*'.repeat(suffix.length);
    return maskedPrefix + '@' + maskedSuffix + '.com';
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
          <Typography sx={{ fontSize: "40px", mb: 3 }}>
            개인정보 확인 / 수정
          </Typography>

          <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

          <Grid container spacing={2} justifyContent="auto" sx={{ mt: 8, alignItems: "center" }}>
            {/* 왼쪽의 빈 공간 */}
            <Grid item xs={2}></Grid>
            {/* 아이디 */}
            <Grid item xs={2} >
              <Typography>아이디</Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>{maskEmail(userInfo.email)}</Typography>
              {/* <Textarea disabled placeholder={userInfo.email} /> */}
            </Grid>
            <Grid item xs={4}></Grid>

            {/* 비밀번호 */}
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }} >
              <Typography>비밀번호</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}>
              <CustomInput
                variant="soft"
                placeholder="비밀번호" type="password" {...register("password")}
                sx={{
                  backgroundColor: "white",
                  border: "1.5px solid rgba(0,0,0,0.5)"
                }}
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}></Grid>


            {/* 비밀번호 확인 */}
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Typography>비밀번호 확인</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}>
              <CustomInput
                variant="soft"
                placeholder="비밀번호 확인" type="password"
                {...register("passwordConfirmation", {
                  validate: (value) => value === password || "Passwords do not match",
                })}
                sx={{
                  backgroundColor: "white",
                  border: "1.5px solid rgba(0,0,0,0.5)"
                }}
              />
              {errors.passwordConfirmation && <FormHelperText>{errors.passwordConfirmation.message}</FormHelperText>}
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}></Grid>

            {/* 이름(실명) */}
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Typography>이름(실명)</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}>
              {/* <Textarea disabled placeholder={userInfo.name} /> */}
              {/* {userInfo.name} */}
              {maskedName}
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}></Grid>

            {/* 닉네임 */}
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Typography sx={{ marginBottom: 3.5 }}>닉네임</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}>
              <FormControl sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <CustomInput
                  variant="soft"
                  placeholder="닉네임" type="text" {...register("nickname")}
                  value={nickname}
                  sx={{
                    backgroundColor: "white",
                    border: "1.5px solid rgba(0,0,0,0.5)"
                  }}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {/*                                 
                                <Textarea
                                    
                                    defaultValue={userInfo.nickname}
                                    {...register("nickname")}
                                    sx={{ flexGrow: 1 }} // Textarea가 여유 공간을 모두 차지하도록 설정
                                /> */}
                <FormHelperText>닉네임은 최대 15자입니다.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}></Grid>

            {/* 주소 */}
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Typography>주소</Typography>
            </Grid>


            <Grid item xs={4} sx={{ mt: 2 }} style={{ display: "flex", alignItems: "center" }}>
              <Input
                variant="soft"
                placeholder="주소"
                value={userAddress}
                sx={{
                  marginRight: "10px", width: "420px", backgroundColor: "white",
                  border: "1.5px solid rgba(0,0,0,0.5)"
                }}
                {...register("address")}
              />
              <DaumAddressComponent />
            </Grid>


            <Grid item xs={4} sx={{ mt: 2 }}>

            </Grid>
            <Grid item xs={2} sx={{ mt: 2 }}></Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Typography>상세주소</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}>
              <CustomInput
                variant="soft"
                placeholder="상세주소" type="password"
                sx={{
                  backgroundColor: "white",
                  border: "1.5px solid rgba(0,0,0,0.5)"
                }}
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: 2 }}></Grid>


          </Grid>
        </div>
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
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
  height:34px;
`;

const CustomInput = styled(Input)`
  width: 470px;
  &:focus {
    outline: none; // 클릭 시 태두리 제거
  }
`;

