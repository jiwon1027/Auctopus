import * as React from "react";
import styled from "styled-components";
// import InputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

interface IProps {
  live?: boolean;
}

export default function LiveFilter(props: IProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value as string);
  };

  return (
    <FilterBox>
      {props.live ? (
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
        {props.live ? (
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            label="Age"
            color="success"
            sx={{ fontSize: 11 }}
          >
            <MenuItem value={"people"}>시청 순</MenuItem>
            <MenuItem value={"category"}>카테고리 순</MenuItem>
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            value={filterValue}
            label="Age"
            color="success"
          >
            <MenuItem value={"people"}>좋아요 순</MenuItem>
            <MenuItem value={"category"}>카테고리 순</MenuItem>
          </Select>
        )}
      </FormControl>
    </FilterBox>
  );
}

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
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
  fontSize: "1.2rem",
});
