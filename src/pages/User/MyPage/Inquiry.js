import React from "react";
import SidebarLayout from "../../../components/templates/SidebarLayout";
import { Grid, Typography } from "@mui/material";
import { Select, selectClasses, Option, Textarea } from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { UserButton } from "./MyInfo";

const CKEditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px;
  }
`;

const Inquiry = () => {
  return (
    <SidebarLayout>
      <Typography variant="h4" sx={{ mt: 7, mb: 3 }}>
        문의하기
      </Typography>
      <Grid container spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={1}>
          <Select
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
          >
            <Option value="상품">상품</Option>
            <Option value="주문">주문</Option>
            <Option value="결제">결제</Option>
          </Select>
        </Grid>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={9.5}>
          <Textarea placeholder="제목" />
        </Grid>
      </Grid>

      <CKEditorContainer>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{
            placeholder: "문의내용을 입력해 주세요.",
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            // 원하는 작업 수행
          }}
        />
      </CKEditorContainer>
      <Grid container justifyContent="center" sx={{ mt: 15 }}>
        <UserButton variant="solid">저장</UserButton>
      </Grid>
    </SidebarLayout>
  );
};

export default Inquiry;
