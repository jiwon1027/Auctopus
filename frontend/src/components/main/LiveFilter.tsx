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

interface IProps {
  live?: string;
}

export default function LiveFilter(props: IProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFilterValue(event.target.value as string);
  };

  return (
    <FilterBox>
      {props.live === "live" ? (
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
        {props.live === "live" ? (
          <Select
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            color="success"
            displayEmpty
          >
            <MenuItem value="">시청순</MenuItem>
            <MenuItem value={"category"}>카테고리 순</MenuItem>
          </Select>
        ) : (
          <Select
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            color="success"
            displayEmpty
          >
            <MenuItem value="">좋아요 순</MenuItem>
            <MenuItem value={"category"}>카테고리 순</MenuItem>
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
  font-weight: ${theme.fontWeight.semibold};
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
