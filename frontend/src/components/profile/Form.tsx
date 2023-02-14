import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { theme } from "@/styles/theme";
import { styled as mstyled } from "@mui/material/styles";

export default function Content() {
  return (
    <Container>
      <Title>닉네임 수정</Title>
      <CustomTextField
        id="fullWidth"
        variant="outlined"
        // placeholder={}
        // value={data.title}
        name="title"
        // onChange={updateTextHandler}
      />
      <Title>계좌 정보 수정</Title>
      <CustomTextField
        id="fullWidth"
        variant="outlined"
        // placeholder={}
        // value={data.title}
        name="title"
        // onChange={updateTextHandler}
      />
      <Title>배송지 수정</Title>
      <CustomTextField
        id="fullWidth"
        variant="outlined"
        // placeholder={}
        // value={data.title}
        name="title"
        // onChange={updateTextHandler}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 50%;
  margin-top: 2rem;
  padding: 2rem;
`;
const Title = styled.div`
  font-size: 1.7rem;
  margin-top: 1.5rem;
  font-weight: ${theme.fontWeight.semibold};
`;

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
