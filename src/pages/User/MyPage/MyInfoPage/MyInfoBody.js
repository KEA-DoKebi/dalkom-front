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
import TextField from "@mui/material/TextField";



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
  border-radius: 0px;
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
  const loadData = async () => {
    try {
      const res = await TokenAxios.get("/api/user/self");
      console.log(res.data.result.data);
      setUserInfo(res.data.result.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    loadData();
  }, [])


  //유저 정보 수정
  const { register, handleSubmit } = useForm();
  const editInfo = async (data) => {
    try {
      const res = await TokenAxios.put("/api/user", data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Paper elevation={0}>
       <form 
          onSubmit={handleSubmit((data) =>{
            console.log(data);
            editInfo(data);
        })}
      >
      <div>
        <Typography variant="h4" sx={{ mt: 7 }}>
          기존 회원정보
        </Typography>
        <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

       
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 20 }}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>아이디</Typography>
          </Grid>
          <Grid item xs={4}>
            <Textarea disabled placeholder={userInfo.email} />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>비밀번호</Typography>
          </Grid>
          <Grid item xs={4}>
            <Input
              placeholder="비밀번호"
              type="password"
              {...register("password")}
            />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>비밀번호 확인</Typography>
          </Grid>
          <Grid item xs={4}>
            <Input
              placeholder="비밀번호 확인"
              type="password" />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>이름(실명)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Textarea disabled placeholder={userInfo.name} />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>닉네임</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <Textarea placeholder="닉네임" defaultValue={userInfo.nickname} {...register("nickname")}/>
              <FormHelperText>닉네임은 최대 15자입니다.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>주소</Typography>
          </Grid>
          <Grid item xs={4}>
            <Textarea
              placeholder="주소"
              defaultValue={userInfo.address}
              {...register("address")}
            />
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
        
      </div>
      <Grid container justifyContent="center" sx={{ mt: 15 }}>
        <UserButton variant="solid" type = "submit">수정하기</UserButton>
      </Grid>
      </form>
    </Paper>
  );
};

export default MyInfoBody;
