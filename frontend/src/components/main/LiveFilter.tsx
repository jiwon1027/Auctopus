import * as React from "react";
import styled from "styled-components";
// import InputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

interface IProps {
  live?: string;
}

export default function LiveFilter(props: IProps) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <FilterBox>
      진행중인 live 경매
      <FormControl variant="standard" sx={{ minWidth: 80, height: 25 }}>
        {props.live ? (
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            label="Age"
            color="success"
          >
            <MenuItem value={"people"}>시청 순</MenuItem>
            <MenuItem value={"category"}>카테고리 순</MenuItem>
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
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
  padding: 0 1.6rem;
`;

const MenuItem = mstyled(MuiMenuItem)({
  minHeight: "10px",
  padding: "5px 8px",
  fontWeight: `${theme.fontWeight.semibold}`,
});
