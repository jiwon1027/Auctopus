import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function SearchBar() {
  const [value, setValue] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = () => {
    console.log(value);
    // 라우터 이동해서 props로 검색어 전달?
    // 혹은 post후, 페이지이동?
  };

  return (
    <SearchBox>
      <ArrowBackIosIcon className="backIcon" />
      <SearchBoxR>
        <InputBase
          sx={{ ml: 1, flex: 4, fontSize: 14, paddingY: 0.2 }}
          placeholder="검색어를 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <IconButton
          type="button"
          sx={{ p: "3px" }}
          aria-label="search"
          onClick={submitHandler}
        >
          <SearchIcon className="icon" />
        </IconButton>
      </SearchBoxR>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0.6rem 0 1.2rem 0;

  .backIcon {
    width: 2.4rem;
    height: 2.4rem;
    color: ${theme.colors.turtleDark};
  }
`;

const SearchBoxR = styled.div`
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
