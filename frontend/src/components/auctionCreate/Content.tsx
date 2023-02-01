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

/* const categories = [
  {
    categorySeq: 1,
    name: "전자기기",
  },
  {
    categorySeq: 2,
    name: "패션/잡화",
  },
  {
    categorySeq: 3,
    name: "도서/음반",
  },
  {
    categorySeq: 4,
    name: "완구/문구",
  },
  {
    categorySeq: 5,
    name: "뷰티/미용",
  },
  {
    categorySeq: 6,
    name: "인테리어",
  },
  {
    categorySeq: 7,
    name: "생활용품",
  },
  {
    categorySeq: 8,
    name: "기타",
  },
];
 */
export default function Content() {
  return (
    <Container>
      <CustomTextField id="fullWidth" variant="outlined" placeholder="123" />
      {/* select */}
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            style={{
              fontSize: 16,
              fontFamily: "Pretendard",
              color: "#D2D2D2",
            }}
          >
            카테고리
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="category"
            // onChange={handleChange}
          >
            <MenuItem value={10}>전자기기</MenuItem>
            <MenuItem value={20}>패션/잡화</MenuItem>
            <MenuItem value={30}>도서/음반</MenuItem>
            <MenuItem value={40}>완구/문구</MenuItem>
            <MenuItem value={50}>뷰티/미용</MenuItem>
            <MenuItem value={60}>인테리어</MenuItem>
            <MenuItem value={70}>생활용품</MenuItem>
            <MenuItem value={80}>기타</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <CustomTextArea
        aria-label="minimum height"
        minRows={15}
        placeholder="상품 상세 내용"
      />
    </Container>
  );
}

const Container = styled.div``;
const CustomTextField = mstyled(TextField)`
  margin-top: 2rem;
  font-family: Pretendard;
  width: 100%;   
  font-weight: bold;
  color: #D2D2D2;
  input{
    font-weight: bold;
    font-size: 1.6rem;
    padding: 1rem;
  }

`;

const CustomTextArea = mstyled(TextareaAutosize)`
    width: 33rem;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #D2D2D2;
    margin-top: 1rem;
    border: solid 1px #386641;
    border-radius: 1rem;

`;
