import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBar from "components/organisms/AdminBar";
import { InputBoxS } from "components/atoms/Input";
import { AdminButton } from "components/atoms/AdminCommonButton";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import {
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Toolbar,
  Pagination,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const dataList = [
  {
    상품번호: "P001",
    이미지: "image1.jpg",
    이름: "상품 1",
    제조사: "제조사 A",
    옵션: "색상: 빨강, 사이즈: M",
    재고: 10,
  },
  {
    상품번호: "P002",
    이미지: "image2.jpg",
    이름: "상품 2",
    제조사: "제조사 B",
    옵션: "색상: 파랑, 사이즈: L",
    재고: 5,
  },
  {
    상품번호: "P003",
    이미지: "image3.jpg",
    이름: "상품 3",
    제조사: "제조사 C",
    옵션: "색상: 녹색, 사이즈: S",
    재고: 20,
  },
  {
    상품번호: "P004",
    이미지: "image4.jpg",
    이름: "상품 4",
    제조사: "제조사 D",
    옵션: "색상: 노랑, 사이즈: XL",
    재고: 0,
  },
  {
    상품번호: "P005",
    이미지: "image5.jpg",
    이름: "상품 5",
    제조사: "제조사 E",
    옵션: "색상: 검정, 사이즈: M",
    재고: 15,
  },
  {
    상품번호: "P006",
    이미지: "image6.jpg",
    이름: "상품 6",
    제조사: "제조사 F",
    옵션: "색상: 흰색, 사이즈: L",
    재고: 8,
  },
  {
    상품번호: "P007",
    이미지: "image7.jpg",
    이름: "상품 7",
    제조사: "제조사 G",
    옵션: "색상: 회색, 사이즈: S",
    재고: 12,
  },
  {
    상품번호: "P008",
    이미지: "image8.jpg",
    이름: "상품 8",
    제조사: "제조사 H",
    옵션: "색상: 주황, 사이즈: XL",
    재고: 6,
  },
  {
    상품번호: "P009",
    이미지: "image9.jpg",
    이름: "상품 9",
    제조사: "제조사 I",
    옵션: "색상: 보라, 사이즈: M",
    재고: 9,
  },
  {
    상품번호: "P010",
    이미지: "image10.jpg",
    이름: "상품 10",
    제조사: "제조사 J",
    옵션: "색상: 분홍, 사이즈: L",
    재고: 3,
  },
];

const StyledList = styled(List)`
  /* Add styling for the List component */
  padding: 0;
  width: 100%;
  border: none; /* Remove border */
  background-color: background.paper;
`;

const dataListLabels = Object.keys(dataList[0]);

const ListItemStyled = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

// 간격 일정하게 만드는 거
const getColumnWidth = (label) => {
  // Define your width ranges for each column label
  const widthRanges = {
    상품번호: [0, 10],
    이미지: [10, 20],
    이름: [20, 30],
    제조사: [30, 40],
    옵션: [60, 80],
    재고: [80, 90],
    저장: [90, 100],
    // Add more labels as needed
  };
  const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
  const width = Math.min(100, maxWidth) - minWidth;

  return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const Modal = ({ open, onClose, title, contents }) => {
  const [content, setContent] = useState(contents || "");

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleSubmit = () => {
    console.log("Submitting modal content:", content);
    handleClose();
  };

  const modalDimensions = { width: 600, height: 200 };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="false">
      <DialogContent style={modalDimensions}>
        {title && (
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
          >
            {title}
          </DialogTitle>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AdminButton variant="contained" onClick={handleSubmit}>
            확인
          </AdminButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const InventoryManagePage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("재고 관리");

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("재고 관리");
  }, []);
  // Modal의 상태를 관리하는 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (ID, amount) => {
    setModalOpen(true);
    setModalTitle(`정말로 재고를 ${amount}개로 변경하시겠습니까?`);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
      {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
      <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#EEF2F6",
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box
          component="main"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            {/* 중앙 정렬을 위해 앞뒤로 <div/> 추가*/}
            <div />
            <InputBoxS
              color="neutral"
              disabled={false}
              startDecorator={<SearchIcon />}
              placeholder="Search"
              variant="soft"
              sx={{ mb: 4, mt: 4 }}
            />
            <AdminButton variant="contained">작성하기</AdminButton>
          </Toolbar>

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
              <Typography variant="h6" fontWeight="bold">
                저장
              </Typography>
            </ListItemStyled>
            <Divider component="li" light />
            {dataList.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <ListItemStyled>
                  {dataListLabels.map((label, colIndex) =>
                    label === "재고" ? (
                      // 재고에 대한 스핀박스 렌더링
                      <Input
                        type="number"
                        value={item[label]}
                        style={{ width: getColumnWidth(label) }}
                      />
                    ) : (
                      // 다른 데이터는 Typography로 렌더링
                      <Typography
                        variant="body1"
                        key={colIndex}
                        sx={{
                          width: getColumnWidth(label),
                          textAlign: "center",
                        }}
                      >
                        {item[label]}
                      </Typography>
                    ),
                  )}
                  <AdminButton
                    variant="contained"
                    onClick={() => openModal(item.상품번호, item.재고)}
                  >
                    수정
                  </AdminButton>
                </ListItemStyled>
                {rowIndex !== dataList.length - 1 && (
                  <Divider component="li" light />
                )}
              </React.Fragment>
            ))}
          </StyledList>

          <Pagination count={10} />

          <Modal
            open={modalOpen}
            onClose={() => closeModal()}
            title={modalTitle}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default InventoryManagePage;
