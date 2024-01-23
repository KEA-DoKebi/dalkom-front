import React from "react";
import { Typography, Divider, Grid, styled, Button } from "@mui/material";
import { Textarea, FormControl, FormHelperText, Input } from "@mui/joy";
import Key from "@mui/icons-material/Key";

import SidebarLayout from "../../../components/layout/SidebarLayout";

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

  &:hover {
    background-color: #ffffff; /* Button color changes to white */
    color: #000000; /* Text color changes to black */
    border: 1px solid #000000; /* Optional: Add a black border to maintain size */
  }
`;

const MyInfo = () => {
  return (
    <SidebarLayout>
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
            <Textarea disabled placeholder="아이디" />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>비밀번호</Typography>
          </Grid>
          <Grid item xs={4}>
            <Input
              placeholder="기존비번기존비번기존비번"
              defaultValue="기존비번기존비번기존비번"
              startDecorator={<Key />}
              type="password"
            />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>비밀번호 재입력</Typography>
          </Grid>
          <Grid item xs={4}>
            <Input startDecorator={<Key />} type="password" />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>이름(실명)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Textarea disabled placeholder="백현정" />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={1.5}>
            <Typography>닉네임</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <Textarea placeholder="기존 닉네임" defaultValue="기존 닉네임" />
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
              placeholder="경기도 성남시 중원구 둔촌대로151번길 11 504호"
              defaultValue="경기도 성남시 중원구 둔촌대로151번길 11 504호"
            />
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <Grid container justifyContent="center" sx={{ mt: 15 }}>
        <UserButton variant="solid">수정하기</UserButton>
      </Grid>
    </SidebarLayout>
  );
};

export default MyInfo;
