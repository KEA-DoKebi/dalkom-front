import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
import { TokenAxios } from "apis/CommonAxios";
import { AdminButton } from "components/atoms/AdminCommonButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background.paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

const dataListLabels = ["번호", "제목", "등록일"];

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

const PaginationContainer = styled.div`
  display: flex;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  align-items: center;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 70%;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  border-radius: 20px;
  border-color: #eeeeee;
  min-height: 50vh;
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
  // Define your width ranges for each column label
  const widthRanges = {
    번호: [0, 10],
    제목: [10, 30],
    등록일: [30, 50],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const FaqItem = ({ faq, index, onClick }) => {
  return (
    <ListItemStyled onClick={() => onClick(faq)}>
      <Typography
        variant="body1"
        sx={{ width: getColumnWidth("번호"), textAlign: "center" }}
      >
        {index + 1}
      </Typography>
      <Typography
        variant="body1"
        sx={{ width: getColumnWidth("제목"), textAlign: "center" }}
      >
        {faq.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ width: getColumnWidth("등록일"), textAlign: "center" }}
      >
        {formatDate(faq.createdAt)}
      </Typography>
    </ListItemStyled>
  );
};

export const FAQBody = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const pageSize = 10;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleFaqClick = async (inquirySeq) => {
    try {
      const res = await TokenAxios.get(`/api/inquiry/${inquirySeq}`);
      setSelectedFaq(res.data.result.data);
      navigate(`/cs/user-faq/${inquirySeq}`, {
        state: { selectedFaq: res.data.result.data },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getFAQ = async (page) => {
    try {
      const res = await TokenAxios.get(`/api/faq?page=${page}&size=10`);
      setTotalPages(res.data.result.data.totalPages);
      setDataList(res.data.result.data.content);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFAQ(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Main>
      <Body>
        <StyledList aria-label="mailbox folders">
          <ListItemStyled>
            {dataListLabels.map((label, index) => (
              <React.Fragment key={index}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: getColumnWidth(label), textAlign: "center" }}
                >
                  {label}
                </Typography>
              </React.Fragment>
            ))}
          </ListItemStyled>
          <Divider component="li" light />
          {dataList.map((faq, index) => (
            <React.Fragment key={index}>
              <FaqItem
                faq={faq}
                index={index + currentPage * pageSize}
                onClick={() => handleFaqClick(faq.inquirySeq)}
              />
              {index !== dataList.length - 1 && (
                <Divider component="li" light />
              )}
            </React.Fragment>
          ))}
        </StyledList>
      </Body>
      <PaginationContainer>
        <Pagination
          count={totalPages} // 총 페이지 수를 적용
          page={currentPage + 1} // 현재 페이지 설정 (0부터 시작하므로 그대로 사용)
          onChange={(event, newPage) => handlePageChange(event, newPage - 1)} // 페이지 변경 시 호출되는 함수 설정
        />
      </PaginationContainer>

      <Dialog onClose={handleCloseModal} open={modalOpen} maxWidth={false}>
        <DialogTitle>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textAlign: "center", mt: 2, mb: 2 }}
          >
            FAQ
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{
            width: 900,
            height: "450px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {selectedFaq && (
            <div>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                {selectedFaq.title}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedFaq.content }}
                />
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            margin: "auto",
          }}
        >
          <AdminButton
            onClick={handleCloseModal}
            sx={{ marginLeft: "55px", marginBottom: 2 }}
          >
            확인
          </AdminButton>
        </DialogActions>
      </Dialog>
    </Main>
  );
};
