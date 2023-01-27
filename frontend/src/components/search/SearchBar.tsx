import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams("keyword");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    setSearchParams(searchValue);
    navigate(`/search?${searchParams}${searchValue}`);
  };

  return (
    <SearchBox>
      <Link to={"/"}>
        <ArrowBackIosIcon className="backIcon" />
      </Link>
      <SearchForm onSubmit={handleSubmit}>
        <InputBase
          sx={{ ml: 1, flex: 4, fontSize: 14, paddingY: 0.2 }}
          placeholder="검색어를 입력하세요."
          value={searchValue}
          onChange={handleChange}
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
