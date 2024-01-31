import React, { useState }  from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TokenAxios } from "apis/CommonAxios";

const Container = styled.div`
  width: 100%;
`;

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const updateTextDescription = (state) => {
    setEditorState(state);
  };

  const uploadCallback = (file) => {
    // FormData 인스턴스 생성
    const formData = new FormData();
    formData.append("image", file);
  
    // 이미지를 서버로 업로드
    return TokenAxios.post("업로드할 서버 URL", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      // 서버에서 반환된 이미지 URL
      return { data: { link: response.data.imageUrl }};
    })
    .catch(error => {
      console.error("업로드 에러:", error);
    });
  };
  


  return (


      <Container>
        <Editor
          placeholder="문의 내용을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          editorStyle={{
            height: "400px",
            border: "1px solid lightgray"
          }}
        />
      </Container>

  );
};

export default EditorComponent;
