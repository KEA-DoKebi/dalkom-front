import React, { useState } from "react";
import { Paper } from "@mui/material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Rating from "@mui/material/Rating"; // @mui/material에서 Rating 컴포넌트를 가져옴
import { styled } from "@mui/system";

const productInfo = {
  name: "에어포스",
  option: "230",
  imageUrl: "/images/MainPage/kakaofriends.png",
};

const Img = styled("img")({
  width: "70px",
  height: "auto",
});

const ReviewWriteBody = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Img src={productInfo.imageUrl} alt="Product Image" />
        <Box sx={{ ml: 2 }}>
          <Typography level="h6">{productInfo.name}</Typography>
          <Typography>{productInfo.option}</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography>별점</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
      </Box>

      <Textarea
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
      />

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          리뷰 제출
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewWriteBody;
