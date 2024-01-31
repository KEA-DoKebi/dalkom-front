import React, { useRef, useMemo } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_REGION;
const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const REACT_APP_AWS_S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;


const EditorComponent = ({ onContentChange }) => {
  const handleContentChange = (content) => {
    onContentChange(content);
  };
  

  // 에디터 이미지 업로드 함수
  const quillRef = useRef(null);
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file 생성
      const file = input.files?.[0];
      try {
        //Date를 업로드할 파일의 이름으로 사용
        const name = Date.now();
        //s3 관련 설정
        AWS.config.update({
          region: REACT_APP_AWS_S3_BUCKET_REGION,
          accessKeyId: REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID,
          secretAccessKey: REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY,
          
        });
        //s3에 업로드할 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: REACT_APP_AWS_S3_BUCKET_NAME, //버킷 이름
            Key: `upload/${name}.${file.type.split("/")[1]}`,
            Body: file,
            ContentType: file.type,
          },
        });
        //이미지 업로드 url 반환
        const IMG_URL = await upload.promise().then((res) => res.Location);
        //useRef로 에디터의 현재 커서로 접근
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        //커서 위치에 이미지 삽입
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (

        <ReactQuill
          ref={quillRef}
          onChange={handleContentChange}
          style={{ width: "100%", height: "400px" }}
          modules={modules}
          placeholder="문의 내용을 작성해주세요"
        />
  );
};

export default EditorComponent;