import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { Select, selectClasses, Option, Textarea } from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";
import EditorComponent from "components/atoms/Editor";
import { UserButton } from "../../MyInfoPage/MyInfoBody";
import { useForm } from "react-hook-form";
import { TokenAxios } from "apis/CommonAxios";


const InquiryWriteBody = () => {
    const {
        register,
        handleSubmit,
        setValue,
        trigger
    } = useForm();


    const inquiryCreate = async (data) => {
        try {
            const res = await TokenAxios.post("/api/inquiry/user", data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Paper elevation={0}>
            <Typography variant="h4" sx={{mt: 7, mb: 3}}>
                문의하기
            </Typography>

            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    inquiryCreate(data);
                })}
            >
                <Grid container spacing={0.5} alignItems="center" sx={{mb: 2}}>
                    <Grid item xs={1}>
                        <Select
                            id="categorySeq"
                            placeholder="카테고리를 선택해 주세요."
                            indicator={<KeyboardArrowDown/>}
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
                        <Textarea
                            id="title"
                            placeholder="제목"
                            {...register("title")}
                        />

                    </Grid>
                </Grid>

        <EditorComponent
          id = "content"

          data=""
          config={{
            placeholder: "문의내용을 입력해 주세요.",
          }}
          onChange={(event, editor) => {
            setValue('content', editor.getData());
            trigger('content');
            console.log('content');
            // const data = editor.getData();
            // console.log({ event, editor, data });
            //원하는 작업 수행
          }}
          // onChange = {(value) => setValue('content', value)}

        // {...register("content")}
        />
      <Grid container justifyContent="center" sx={{ mt: 15 }}>
        <UserButton type = "submit" variant="solid">저장</UserButton>
      </Grid>
      </form>
    </Paper>
  );
};

export default InquiryWriteBody;
