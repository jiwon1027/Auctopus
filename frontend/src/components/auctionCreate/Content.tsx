import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MuiMenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

export default function Content({
  data,
  onChange,
}: {
  data: IAuctionCreate;
  onChange: (name: string, value: string) => void;
}) {
  const updateHandler = (e: SelectChangeEvent<unknown>) => {
    onChange(e.target.name, e.target.value as string);
  };

  const updateTextHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    // console.log(target);
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
      <FormControl
        sx={{
          marginTop: 2,
          borderRadius: 1,
        }}
        color="primary"
        fullWidth
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="categorySeq"
          onChange={updateHandler}
          value={data.categorySeq?.toString()}
          displayEmpty
        >
          <MenuItem value="">카테고리를 선택하세요.</MenuItem>
          <MenuItem value={1}>전자기기</MenuItem>
          <MenuItem value={2}>패션/잡화</MenuItem>
          <MenuItem value={3}>도서/음반</MenuItem>
          <MenuItem value={4}>완구/문구</MenuItem>
          <MenuItem value={5}>뷰티/미용</MenuItem>
          <MenuItem value={6}>인테리어</MenuItem>
          <MenuItem value={7}>생활용품</MenuItem>
          <MenuItem value={8}>기타</MenuItem>
        </Select>
      </FormControl>

      <PriceWrapper>
        <CustomPriceField
          id="outlined-basic"
          variant="outlined"
          placeholder="가격 ( 입찰 시작가)"
          name="startPrice"
          onChange={updateTextHandler}
        />
        <CustomPriceField
          id="outlined-basic"
          variant="outlined"
          placeholder="가격 ( 입찰 단위 )"
          name="bidUnit"
          // value={data.bidUnit}
          onChange={updateTextHandler}
        />
      </PriceWrapper>
      <CustomTextArea
        aria-label="minimum height"
        minRows={10}
        placeholder="상품 상세 내용"
        name="content"
        value={data.content}
        onChange={updateTextHandler}
        color="primary"
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
  /* border: solid 1px #386641; */
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
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.3rem;
    border: solid 1px #386641;
    border-radius: 0.5rem;
    outline-color: solid 2px gray;
    resize: none;
    ::placeholder {
      color: #D2D2D2;
    }
    :focus{
      outline: none !important;
        border-color: gray;
        box-shadow: 0 0 5px  #D2D2D2;
    }
`;

const Select = mstyled(MuiSelect)({
  fontWeight: `${theme.fontWeight.semibold}`,
  fontSize: "1.4rem",
  fontFamily: "Pretendard",
  height: "43px",
});

const MenuItem = mstyled(MuiMenuItem)({
  minHeight: "15px",
  padding: "5px 12px",
  fontWeight: `${theme.fontWeight.medium}`,
  fontSize: "1.4rem",
  fontFamily: "Pretendard",
});

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
