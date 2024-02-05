import React, { useCallback, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Button,
  Stack,
  Typography, // Import Stack for horizontal layout
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Option from '@mui/joy/Option';
import { TokenAxios } from "apis/CommonAxios";
import Select, { selectClasses } from '@mui/joy/Select';

const Img = styled.img`
  width: 70px;
  height: auto;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 12px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  max-height: 550px; // 4개 항목의 높이에 맞춤
  overflow-y: auto; // 항목이 4개를 초과하면 스크롤 생성
`;

export default function OrderListBody() {
  const [review, setReview] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState("all");

  const deleteReview = async (reviewSeq) => {
    try {
      // DELETE 요청을 보내 리뷰 삭제
      await TokenAxios.delete(`/api/review/${reviewSeq}`);
      // 리뷰 삭제 후 리뷰 목록을 갱신
      reviewList();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const reviewList = useCallback(async () => {
    try {
      const res = await TokenAxios.get("/api/review/user?");
      console.log(res)
      const allReviews = res.data.result.data.content;

      const filteredOrders = filterPeriod === "all"
        ? allReviews
        : allReviews.filter(review => isWithinPeriod(review.modifiedAt, filterPeriod));

      setReview(filteredOrders);
    } catch (e) {
      console.error("Error fetching order list:", e);
    }
  }, [filterPeriod]);

  useEffect(() => {
    reviewList();
  }, [filterPeriod, reviewList]);

  const isWithinPeriod = (modifiedAt, period) => {
    const modifiedDate = new Date(modifiedAt);
    const today = new Date();

    console.log('modifiedDate:', modifiedDate);
    console.log('today:', today);
    switch (period) {
      case "1day":
        console.log('1day:', today.getDate(), modifiedDate.getDate());
        return (
          today.getDate() === modifiedDate.getDate() &&
          today.getMonth() === modifiedDate.getMonth() &&
          today.getFullYear() === modifiedDate.getFullYear()
        );
      case "1month":
        
        return (
          today.getMonth() === modifiedDate.getMonth() &&
          today.getFullYear() === modifiedDate.getFullYear()
        );
      case "3months":
        return (
          today >= modifiedDate &&
          today.getMonth() - modifiedDate.getMonth() <= 3 &&
          today.getFullYear() === modifiedDate.getFullYear()
        );
      case "6months":
        return (
          today >= modifiedDate &&
          today.getMonth() - modifiedDate.getMonth() <= 6 &&
          today.getFullYear() === modifiedDate.getFullYear()
        );
      default:
        return false;
    }
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: "3vh" }}>리뷰 관리</Typography>
      <Select
        placeholder="전체"
        indicator={<KeyboardArrowDown />}
        sx={{
          width: 150,
          margin: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #E3E3E3',
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        <Option value="all" onClick={() => setFilterPeriod("all")}>
          전체
        </Option>
        <Option value="1day" onClick={() => setFilterPeriod("1day")}>
          1일
        </Option>
        <Option value="1month" onClick={() => setFilterPeriod("1month")}>
          1달
        </Option>
        <Option value="3months" onClick={() => setFilterPeriod("3months")}>
          3개월
        </Option>
        <Option value="6months" onClick={() => setFilterPeriod("6months")}>
          6개월
        </Option>
      </Select>


      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TableContainer>
          <Table
            sx={{
              border: "1px solid",
              borderColor: "#e0e0e0",
              margin: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  상품명(옵션)
                </TableCell>
                <TableCell
                  sx={{
                    width: "70%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  내용
                </TableCell>
                <TableCell sx={{ width: "5%" }} />{" "}
                {/* For the edit and delete buttons */}
              </TableRow>
            </TableHead>
            <TableBody>

              {/* {rows.length > 0
                ? rows.map((row, index) => ( */}
              {review.map((review) => (
                <TableRow key={review.reviewSeq}>
                  <TableCell sx={{ textAlign: "flex-start" }}>
                    <ProductInfo>
                      <Img src={review.imageUrl} alt="Product" />
                      <TextContainer>
                        <div>{review.name}</div>
                        <div style={{ marginTop: "4px" }}>{review.detail}</div>
                      </TextContainer>
                    </ProductInfo>
                  </TableCell>
                  <TableCell>
                    <div>{review.modifiedAt.substring(0, 10)}</div>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      size="small"
                    />
                    <div dangerouslySetInnerHTML={{ __html: review.content }} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                    <Link to={`/mypage/review/edit/${review.reviewSeq}`} state={{ review_Seq: review.reviewSeq }}>
                      <Button sx={{ color: "#000000", padding: "0px" }}>
                        수정
                      </Button>
                      </Link>
                      |
                      <Button
                        sx={{ color: "#000000", padding: "0px" }}
                        onClick={() => deleteReview(review.reviewSeq)}
                      >
                        삭제
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
                //   ))
                // : [...Array(4)].map((_, index) => (
                //     <TableRow
                //       key={`empty-${index}`}
                //       sx={{ height: "110px", borderBottom: "none" }}
                //     >
                //       <TableCell colSpan={5} />
                //     </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}
