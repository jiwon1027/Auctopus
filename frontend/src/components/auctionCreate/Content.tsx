import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { styled as mstyled } from "@mui/material/styles";
export default function Content() {
  return (
    <Container>
      <CustomTextField id="fullWidth" label="경매방 제목" variant="outlined" />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

const Container = styled.div``;
const CustomTextField = mstyled(TextField)`
  margin-top: 0.8rem;
  font-family: Pretendard;
  font-size: 2.6rem;
`;
