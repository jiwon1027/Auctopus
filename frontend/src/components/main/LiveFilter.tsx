import * as React from "react";
import styled from "styled-components";
// import InputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import axios from "axios";

interface IProps {
  isLive: boolean;
  setAuctionList: React.Dispatch<React.SetStateAction<IAuction[]>>;
}

export default function LiveFilter(props: IProps) {
  const [filterValue, setFilterValue] = React.useState("main");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setFilterValue(event.target.value as string);
    getAuctionList(value);
  };

  const getAuctionList = (value: string) => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_DOMAIN
        }/api/search?page=0&size=20&sort=${value}`
      )
      .then((res) => {
        const data = res.data.resList;
        props.setAuctionList(data);
      });
  };

  return (
    <FilterBox>
      {props.isLive ? (
        <FilterBoxLeft>
          <PodcastsIcon sx={{ paddingRight: 0.7 }} />
          진행중인 live 경매
        </FilterBoxLeft>
      ) : (
        <FilterBoxLeft>
          <InsertChartOutlinedIcon sx={{ paddingRight: 0.7 }} />
          진행예정인 live 경매
        </FilterBoxLeft>
      )}
      <FormControl variant="standard" sx={{ minWidth: 80, height: 25 }}>
        {props.isLive ? (
          <Select
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            color="success"
            displayEmpty
          >
            <MenuItem value="main">시청자순</MenuItem>
            <MenuItem value="startTime">최신순</MenuItem>
            <MenuItem value="category">관심 카테고리</MenuItem>
          </Select>
        ) : (
          <Select
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            color="success"
            displayEmpty
          >
            <MenuItem value="main">좋아요순</MenuItem>
            <MenuItem value="startTime">최신순</MenuItem>
            <MenuItem value="category">관심 카테고리</MenuItem>
          </Select>
        )}
      </FormControl>
    </FilterBox>
  );
}

const Select = mstyled(MuiSelect)({
  fontWeight: `${theme.fontWeight.semibold}`,
  fontSize: "1.2rem",
  fontFamily: "Pretendard",
});

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-weight: ${(props) => props.theme.fontWeight.semibold};
`;

const FilterBoxLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;

const MenuItem = mstyled(MuiMenuItem)({
  minHeight: "10px",
  padding: "5px 12px",
  fontWeight: `${theme.fontWeight.medium}`,
  fontSize: "1.3rem",
  fontFamily: "Pretendard",
});
