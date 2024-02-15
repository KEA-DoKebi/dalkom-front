import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  Pagination,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Button,
  Stack,
  Typography, // Import Stack for horizontal layout
} from "@mui/material";
import styled from "styled-components";
import { TokenAxios } from "apis/CommonAxios";
import { Link } from "react-router-dom";

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
  overflow-y: hidden; // 항목이 4개를 초과하면 스크롤 생성
`;

export default function OrderListBody() {
  const [review, setReview] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

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

  const reviewList = async (page) => {
    try {
      const res = await TokenAxios.get(`/api/review/user?page=${page}&size=10`);
      console.log(res);
      setTotalPages(res.data.result.data.totalPages);
      setReview(res.data.result.data.content);
    } catch (e) {
      console.error("Error fetching order list:", e);
    }
  };

  useEffect(() => {
    reviewList(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  return (
    <Paper elevation={0}>
      <Typography sx={{ fontSize: "40px", mb: 3 }}>리뷰 관리</Typography>
      <Divider sx={{ borderBottomWidth: 3 }} color={"black"}></Divider>

      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TableContainer style={{ maxHeight: "none" }}>
          {" "}
          <Table sx={{ width: "100%", margin: "auto" }}>
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
              {review.length !== 0 ?
               (
                review.map((review) => (
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
                      <Link
                          to={`/mypage/review/detail/${review.reviewSeq}`}
                          state={{ review_Seq: review.reviewSeq }}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                      <div dangerouslySetInnerHTML={{ __html: review.content }} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <Link
                          to={`/mypage/review/edit/${review.reviewSeq}`}
                          state={{ review_Seq: review.reviewSeq }}
                        >
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
                ))
               ) : 
               (
                <TableCell colSpan={6} style={{ textAlign: "center", borderBottom : "none" }}>
                    <Typography variant="h6" sx={{mt : 3}} >
                      리뷰 내역이 없습니다.
                    </Typography>
                  </TableCell>
               )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        {review.length !== 0 && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2.5%",
          }}
        >
          <Pagination
            count={totalPages} // 총 페이지 수를 적용
            page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
            onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
          />
        </Box>
      )}
      
    </Paper>
  );
}
