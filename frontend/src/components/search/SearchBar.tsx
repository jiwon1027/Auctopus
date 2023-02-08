import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface IProps {
  keyword: string;
  onChangeKeyword: (val: string) => void;
  onSearch: () => void;
}

export default function SearchBar(props: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSearch();
  };

  return (
    <SearchBox>
      <SearchForm onSubmit={handleSubmit}>
        <InputBase
          sx={{ ml: 1, flex: 4, fontSize: 14, paddingY: 0.2 }}
          placeholder="검색어를 입력하세요."
          value={props.keyword}
          onChange={handleChange}
          autoFocus
        />
        <IconButton type="submit" sx={{ p: "3px" }} aria-label="search">
          <SearchIcon className="icon" />
        </IconButton>
      </SearchForm>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0.1rem 0 1.2rem 0;

  .backIcon {
    width: 2.4rem;
    height: 2.4rem;
    color: ${theme.colors.turtleDark};
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 95%;
  padding: 0.2rem 0.5rem;
  align-items: center;
  border: ${theme.colors.greyDim} solid 0.2rem;
  border-radius: 0.5rem;
  font-family: "Pretendard";

  .icon {
    width: 2.4rem;
    height: 2.4rem;
    color: ${theme.colors.turtleDark};
  }
`;
