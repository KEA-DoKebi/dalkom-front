import React from "react";
import styled from "styled-components";
import {
    Divider,
    Pagination,
    List,
    ListItem,
    Typography,
} from "@mui/material";


const dataList = [
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },
    {
        번호: "1",
        제목: "ryan123",
        등록일: "라이언",

    },
    {
        번호: "2",
        제목: "apeach456",
        등록일: "어피치",
    },

]

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
        번호: [0, 10],
        제목: [10, 30],
        등록일: [30, 50],
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
                                    sx={{ width: getColumnWidth(label), textAlign: "center" }}
                                >
                                    {label}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </ListItemStyled>
                    <Divider component="li" light />
                    {dataList.map((item, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <ListItemStyled>
                                {dataListLabels.map((label, colIndex) => (
                                    <Typography
                                        variant="body1"
                                        key={colIndex}
                                        sx={{ width: getColumnWidth(label), textAlign: "center" }}
                                    >
                                        {item[label]}
                                    </Typography>
                                ))}

                            </ListItemStyled>
                            {rowIndex !== dataList.length - 1 && (
                                <Divider component="li" light />
                            )}
                        </React.Fragment>
                    ))}
                </StyledList>
                <PaginationContainer>
                    <Pagination count={10} />
                </PaginationContainer>
            </Body>
        </Main>
    )
}