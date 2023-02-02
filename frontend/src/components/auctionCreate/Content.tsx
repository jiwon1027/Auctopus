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

export default function Content({
  data,
  onChange,
}: {
  data: IAuctionCreate;
  onChange: (name: string, value: string) => void;
}) {
  const updateHandler = (e: SelectChangeEvent) => {
    onChange(e.target.name, e.target.value as string);
  };

  const updateTextHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    console.log(target);
    onChange(target.name, target.value);
  };

  return (
    <>
      <CustomTextField
        id="fullWidth"
        variant="outlined"
        placeholder="경매방 제목"
        value={data.title}
        name="title"
        onChange={updateTextHandler}
      />
      {/* select */}
      <Box
        sx={{
          minWidth: 120,
          marginTop: 2,
          border: "solid 1px #386641",
          borderRadius: 1,
        }}
      >
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
            label="category"
            name="categorySeq"
            onChange={updateHandler}
            value={data.categorySeq?.toString()}
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

      <PriceWrapper>
        <CustomPriceField
          id="outlined-basic"
          variant="outlined"
          placeholder="가격 ( 입찰 시작가)"
          name="startPrice"
          value={data.startPrice}
          onChange={updateTextHandler}
        />
        <CustomPriceField
          id="outlined-basic"
          variant="outlined"
          placeholder="가격 ( 입찰 단위 )"
        />
      </PriceWrapper>
      <CustomTextArea
        aria-label="minimum height"
        minRows={15}
        placeholder="상품 상세 내용"
        name="content"
        value={data.content}
        onChange={updateTextHandler}
      />
    </>
  );
}

const CustomTextField = mstyled(TextField)`
  margin-top: 2rem;
  font-family: Pretendard;
  width: 100%;   
  font-weight: bold;
  color: #D2D2D2;
  border: solid 1px #386641;
  border-radius: 0.5rem;


  input{
    font-weight: bold;
    font-size: 1.6rem;
    padding: 1rem;
  }
`;

const PriceWrapper = styled.div`
  margin-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;
const CustomPriceField = mstyled(TextField)`
  font-family: Pretendard;
  border: solid 1px #386641;
  border-radius: 0.5rem;
  width: 48%;   
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
    margin-top: 1.3rem;
    border: solid 1px #386641;
    border-radius: 0.5rem;
    outline-color: solid 2px gray;
    ::placeholder {
      color: #D2D2D2;
    }
    :focus{
      outline: none !important;
        border-color: gray;
        box-shadow: 0 0 5px  #D2D2D2;
    }
`;

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
