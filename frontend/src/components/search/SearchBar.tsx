import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface IProps {
  setAuctionList: React.Dispatch<React.SetStateAction<IAuction[]>>;
}

export default function SearchBar(props: IProps) {
  const [searchParams] = useSearchParams("keyword");
  const [searchValue, setSearchValue] = React.useState<string>(
    searchParams.get("keyword") === null
      ? ""
      : (searchParams.get("keyword") as string)
  );
  const navigate = useNavigate();

  const getAuctionList = (value: string) => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_DOMAIN
        }/api/search?word=${value}&page=0&size=20&sort=main`
      )
      .then((res) => {
        const data = res.data.resList;
        // if (data.length === 0) return;
        props.setAuctionList(data);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue === "") {
      alert("검색어를 입력하세요.");
      return;
    }
    searchParams.set("keyword", searchValue);
    navigate(`/result?${searchParams}`);
    getAuctionList(searchValue);
  };

  return (
    <SearchBox>
      <ArrowBackIosIcon className="backIcon" onClick={() => navigate(-1)} />
      <SearchForm onSubmit={handleSubmit}>
        <InputBase
          sx={{ ml: 1, flex: 4, fontSize: 14, paddingY: 0.2 }}
          placeholder="검색어를 입력하세요."
          value={searchValue}
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
