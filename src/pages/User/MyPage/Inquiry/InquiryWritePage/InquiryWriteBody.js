import React from "react";
import { Grid, Typography, Paper, Divider } from "@mui/material";
import { Select, selectClasses, Option, Textarea } from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";
import EditorComponent from "components/atoms/Editor";
import { UserButton } from "../../MyInfoPage/MyInfoBody";
import { useForm } from "react-hook-form";
import { TokenAxios } from "apis/CommonAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InquiryWriteBody = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, trigger } = useForm();

  const handleEditorContentChange = (content) => {
    setValue("content", content, { shouldValidate: true });
    trigger("content");
  };

  const inquoryCreate = async (data) => {
    try {
      const res = await TokenAxios.post("/api/inquiry/user", data);
      console.log(res.data);
      Swal.fire({
        //
        position: "center",
        icon: "success",
        title: "문의 작성이 완료되었습니다.",
        showConfirmButton: true,
        confirmButtonColor: "black",
        confirmButtonText: "확인",
        didClose: () => {
          // 얼럿이 닫힌 후에 페이지 이동
          navigate("/mypage/inquiry/history"); // history 객체를 통해 페이지 이동
        },
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        //
        position: "center",
        icon: "error",
        title: "문의 작성에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: 3 }}>문의하기</Typography>
      <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>
      <form
        onSubmit={handleSubmit((data) => {
          inquoryCreate(data);
        })}
      >
        <Grid container spacing={0.5} alignItems="center" sx={{ mb: 2, mt: 4 }}>
          <Grid item xs={1}>
            <Select
              id="categorySeq"
              placeholder="카테고리를 선택해 주세요."
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
              {...register("categorySeq")}
            >
              <Option value="34">상품</Option>
              <Option value="35">주문</Option>
              <Option value="36">결제</Option>
              <Option value="37">반품/환불</Option>
            </Select>
          </Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={9.5}>
            <Textarea id="title" placeholder="제목" {...register("title")} />
          </Grid>
        </Grid>

        <EditorComponent
          onContentChange={handleEditorContentChange}
          id="content"
          placeholder="문의 내용을 입력해주세요."
          onChange={(event, editor) => {
            setValue("content", editor.getData());
            trigger("content");
            console.log("content");
          }}
        />

        <Grid container justifyContent="center" sx={{ mt: 15 }}>
          <UserButton type="submit" variant="solid">
            저장
          </UserButton>
        </Grid>
      </form>
    </Paper>
  );
};

export default InquiryWriteBody;
