import React, { useState, useEffect, useCallback } from "react";
import { TokenAxios } from "apis/CommonAxios";
import { useLocation } from 'react-router-dom';
import { Paper } from "@mui/material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import EditorComponent from "components/atoms/Editor";

const Img = styled("img")({
  width: "70px",
  height: "auto",
});

const ReviewWriteBody = () => {
  //불러온 데이터 
  const location = useLocation();
  const orderDetailSeq = location.state?.orderDetailSeq;
  const [productInfo, setProductInfo] = useState([]);
  //저장할 데이터
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  const { register, handleSubmit, setValue, trigger } = useForm();

  const [editorContent, setEditorContent] = useState("");

  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  //데이터 불러오기
  const loadOrderDetail = useCallback(async () => {
    try {
      // orderSeq가 정의되어 있는지 확인
      if (!orderDetailSeq) {
        // orderSeq가 정의되지 않은 경우 처리 (예: 에러 페이지로 리다이렉트)
        console.error("orderDetailSeq가 정의되지 않았습니다");
        return;
      }
      const res = await TokenAxios.get(`/api/order/detail/${orderDetailSeq}`);
      console.log(res.data.result.data);
      setProductInfo(res.data.result.data)
    } catch (e) {
      console.error(e);
      // 에러 처리 (예: 에러 페이지로 리다이렉트)
    }
  }, [orderDetailSeq]);
  useEffect(() => {
    const fetchData = async () => {
      await loadOrderDetail();
    };
    fetchData();
  }, [orderDetailSeq, loadOrderDetail]);

  //데이터 저장하기
  const reviewCreate = async (data) => {
    data.content = editorContent;
    try {
      const res = await TokenAxios.post(`/api/review/${orderDetailSeq}`, data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Img src={productInfo.imageUrl} alt="Product Image" />
        <Box sx={{ ml: 2 }}>
          <Typography level="h6">{productInfo.productName}</Typography>
          <Typography>{productInfo.detail}</Typography>
        </Box>
      </Box>

      <form

        onSubmit={handleSubmit((data) => {
          reviewCreate(data);
          console.log(data);
        })}
      >
        <Box sx={{ mb: 2 }}>
          <Typography>별점</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
              register("rating", { value: newValue }); // 폼 값 수동 업데이트
            }}
          />
        </Box>

        {/* <Textarea
          placeholder="Type in here…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          minRows={4}
          startDecorator={
            <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("👍")}
              >
                👍
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("👎")}
              >
                👎
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("😍")}
              >
                😍
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🙁")}
              >
                🙁
              </IconButton>
            </Box>
          }
          endDecorator={<Typography>{`${text.length} character(s)`}</Typography>}
          sx={{ width: "100%", mb: 2 }}
         {...register("content")}
        /> */}
        <EditorComponent
          onContentChange={handleEditorContentChange}
          id="content"
          data=""
          placeholder="문의 내용을 입력해주세요."
          onChange={(event, editor) => {
            setValue("content", editor.getData());
            trigger("content");
            console.log("content");
          }}
          
        />

        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#000", color: "#fff" }}
          >
            리뷰 제출
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ReviewWriteBody;
