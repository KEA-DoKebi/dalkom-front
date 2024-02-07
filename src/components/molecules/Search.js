// SearchComponent.jsx

import React from "react";
import { InputBoxS } from "components/atoms/Input";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/joy/Autocomplete";
import styled from "styled-components";

const Search = ({
  onSearch,
  searchQuery,
  onInputChange,
  setSelectedValue,
  optionList,
}) => {
  const handleSearchIconClick = () => {
    onSearch(searchQuery);
  };

  return (
    <FlexContainer>
      <Autocomplete
        placeholder="검색"
        options={optionList}
        sx={{ width: 150, height: 52 }}
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
        }}
      />
      <div />
      <InputBoxS
        color="neutral"
        disabled={false}
        startDecorator={<SearchIcon onClick={handleSearchIconClick} />}
        placeholder="Search"
        variant="soft"
        sx={{ mb: 4, mt: 4, ml: "60px" }}
        value={searchQuery}
        onChange={onInputChange}
      />
    </FlexContainer>
  );
};

export default Search;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 440px;
`;
