import React, { useEffect, useState } from "react";
import DefaultLayout from "./DefaultLayout";
import styled from "styled-components";
import { Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -1vh;
  margin-bottom: 30px;
`;

const TextL = styled.h1`
  font-size: 30px;
`;

const Choice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

// CustomerService 컴포넌트에서 Body 부분 수정
export const CustomerServiceLayout = ({ children }) => {
  // const [activeButton, setActiveButton] = useState("이용안내");
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("/cs/manual");

  useEffect(() => {
    setSelectedTab(location.pathname); // 컴포넌트 마운트 시 현재 경로로 탭 설정
  }, [location.pathname]); // 경로가 바뀔 때마다 selectedTab 업데이트

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <DefaultLayout>
      <Top>
        <TextL>고객센터</TextL>
        <Choice>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            indicatorColor="primary"
            textColor="primary"
            sx={{
              marginBottom: "3vh",
              // 선택되지 않은 탭의 글자 색상
              ".MuiTab-root": { color: "gray" },
              // 선택된 탭의 글자 색상
              ".Mui-selected": {
                color: "black !important",
                fontWeight: "bold",
              },
              // 선택된 탭의 배경 색상
              ".MuiTabs-indicator": { backgroundColor: "black" },
            }}
          >
            <Tab
              label="이용안내"
              value="/cs/manual"
              sx={{ fontSize: "1rem", width: "35%" }}
            />
            <Tab
              label="공지사항"
              value="/cs/notice"
              sx={{ fontSize: "1rem", width: "35%" }}
            />
            <Tab
              label="FAQ"
              value="/cs/user-faq"
              sx={{ fontSize: "1rem", width: "30%" }}
            />
          </Tabs>
        </Choice>
      </Top>
      <Body>{children}</Body>
    </DefaultLayout>
  );
};
