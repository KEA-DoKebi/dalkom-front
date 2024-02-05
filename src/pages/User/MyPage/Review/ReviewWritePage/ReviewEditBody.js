import React, { useState, useEffect, useCallback } from "react";
import { TokenAxios } from "apis/CommonAxios";
import {
  Box,
  Typography
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import EditorComponent from "components/atoms/Editor";
import { Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/joy/Button";

const Img = styled("img")({
    width: "70px",
    height: "auto",
  });
  
  const ReviewEditBody = () => {
    //불러온 데이터 
    const location = useLocation();
    const review_Seq = location.state?.review_Seq;
    const [reviewInfo, setReviewInfo] = useState([]);
    const [defaultContent, setDefaultContent] = useState("");
    //저장할 데이터
    const [rating, setRating] = useState(0);
    const {handleSubmit, setValue, trigger } = useForm();
    const [ setEditorContent] = useState("");
    
    const handleEditorContentChange = (content) => {
      setValue('content', content, { shouldValidate: true });
      trigger('content');
    };
  
  
    //데이터 불러오기
    const loadOrderDetail = useCallback(async () => {
      try {
        // orderSeq가 정의되어 있는지 확인
        if (!review_Seq) {
          // orderSeq가 정의되지 않은 경우 처리 (예: 에러 페이지로 리다이렉트)
          console.error("review_Seq가 정의되지 않았습니다");
          return;
        }
        const res = await TokenAxios.get(`/api/review/${review_Seq}`);
        console.log(res.data.result.data);

        setReviewInfo(res.data.result.data)
        setDefaultContent(res.data.result.data.content);
        setRating(res.data.result.data.rating);
        setEditorContent(res.data.result.data.content);

      } catch (e) {
        console.error(e);
        // 에러 처리 (예: 에러 페이지로 리다이렉트)
      }
    }, [review_Seq]);
    useEffect(() => {
      const fetchData = async () => {
        await loadOrderDetail();
      };
      fetchData();
    }, [review_Seq, loadOrderDetail]);
  


    //데이터 저장하기
    const reviewEdit = async (data) => {
      try {
        const res = await TokenAxios.put(`/api/review/${review_Seq}`, data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
  
    
    
    return (
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Img src={reviewInfo.imageUrl} alt="Product Image" />
          <Box sx={{ ml: 2 }}>
            <Typography level="h6">{reviewInfo.productName}</Typography>
            <Typography>{reviewInfo.detail}</Typography>
          </Box>
        </Box>
  
        <form
          onSubmit={handleSubmit((data) => {
            reviewEdit(data);
            console.log(data);
          })}
        >
          <Box sx={{ mb: 2 }}>
            <Typography>별점</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                setValue("rating", newValue);; // 폼 값 수동 업데이트
              }}
            />
          </Box>
  
          <EditorComponent
          onContentChange={handleEditorContentChange}
          id="content"
          placeholder="문의 내용을 입력해주세요."
          value={defaultContent}
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
              저장하기
            </Button>
          </Box>
        </form>
      </Paper>
    );
  };
  
  export default ReviewEditBody;