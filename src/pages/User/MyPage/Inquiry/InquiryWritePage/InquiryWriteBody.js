import React from "react";
import {Grid, Paper, Typography} from "@mui/material";
import {Option, Select, selectClasses, Textarea} from "@mui/joy";
import {KeyboardArrowDown} from "@mui/icons-material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import {UserButton} from "../../MyInfoPage/MyInfoBody";
import {useForm} from "react-hook-form";
import {TokenAxios} from "apis/CommonAxios";

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

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

                <CKEditorContainer>
                    <CKEditor
                        id="content"
                        editor={ClassicEditor}
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
                </CKEditorContainer>
                <Grid container justifyContent="center" sx={{mt: 15}}>
                    <UserButton type="submit" variant="solid">저장</UserButton>
                </Grid>
            </form>
        </Paper>
    );
};

export default InquiryWriteBody;
