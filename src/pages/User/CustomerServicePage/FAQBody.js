import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Divider, IconButton, List, ListItem, Pagination, Typography} from "@mui/material";
import {TokenAxios} from "../../../apis/CommonAxios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const StyledList = styled(List)`
  padding: 0;
  width: 100%;
  border: none;
  background-color: background .paper;
  height: 70%; // 전체 높이의 70%로 설정
`;

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
        번호: [0, 10],
        제목: [10, 30],
        등록일: [30, 50]
        // Add more labels as needed
    };
    const [minWidth, maxWidth] = widthRanges[label] || [0, 100];
    const width = Math.min(100, maxWidth) - minWidth;

    return `calc(${width}% - 8px)`; // Adjust 8px for spacing
};

const PaginationContainer = styled.div`
  margin-top: 5px; /* 원하는 여백을 설정하세요 */
  display: inline-block;
  margin-top: 2%;
`;

const TopField = styled.h1`
  font-size: 30px;
  margin-left: 4%;
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
  border-color: gray;
  min-height: 50vh;
`;

export const FAQBody = () => {
    const [dataList, setDataList] = useState([]);
    const [dataListLabels, setDataListLabels] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    let currentInquirySeq = null;

    const getFAQ = async (page) => {
        try {
            const res = await TokenAxios.get(`/api/faq`);
            setTotalPages(res.data.result.data.totalPages);

            const mappedDataList = res.data.result.data.content.map(createFAQItem);
            setDataList(mappedDataList);
        } catch (e) {
            console.error(e);
        } finally {
            const newLabels = [
                "번호",
                "제목",
                "작성일시"
            ];
            setDataListLabels(newLabels);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const createFAQItem = (item) => {
        return {
            번호: item.inquirySeq,
            제목: item.title,
            작성일시: formatDate(new Date(item.createdAt))
        };
    };

    useEffect(() => {
        getFAQ(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Main>
            <TopField>FAQ</TopField>
            <Body>
                <StyledList aria-label="mailbox folders">
                    <ListItemStyled>
                        {dataListLabels.map((label, index) => (
                            <React.Fragment key={index}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{width: getColumnWidth(label), textAlign: "center"}}
                                >
                                    {label}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </ListItemStyled>
                    <Divider component="li" light/>
                    {dataList.map((item, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <ListItemStyled>
                                {dataListLabels.map((label, colIndex) => (
                                    <Typography
                                        variant="body1"
                                        key={colIndex}
                                        sx={{width: getColumnWidth(label), textAlign: "center"}}
                                    >
                                        {item[label]}
                                    </Typography>
                                ))}
                            </ListItemStyled>
                            {rowIndex !== dataList.length - 1 && (
                                <Divider component="li" light/>
                            )}
                        </React.Fragment>
                    ))}
                </StyledList>
                <PaginationContainer>
                    <Pagination count={10}/>
                </PaginationContainer>
            </Body>
        </Main>
    );
};
