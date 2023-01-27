import styled from "styled-components";
import React from "react";
import { OutlinedInput } from "@mui/material";
import { styled as mstyled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { theme } from "@/styles/theme";
export default function InputBox() {
  return (
    <>
      <Divider sx={{ borderColor: `${theme.colors.primary}`, height: 3 }} />
      <Container>
        <Box>
          <div className="index">자동 입찰 상한가</div>
          <RightBox>
            <CustomInput placeholder="300,000" />
            <span className="won">원</span>
          </RightBox>
        </Box>
      </Container>
    </>
  );
}

const CustomDivider = mstyled(Divider)`
  color: #386641;
  height: 0.3rem;
`;
const Container = styled.div`
  height: 6%;
  padding: 2.7rem 2.5rem;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .index {
    font-size: 1.8rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.primary};
    margin-top: auto;
  }
`;

const RightBox = styled.div`
  margin-left: auto;
  .won {
    font-size: 2.4rem;
    font-weight: ${theme.fontWeight.bold};
    margin-top: auto;
    margin-left: 1rem;
  }
`;
const CustomInput = mstyled(OutlinedInput)`
  font-size: 2rem;
  width: 15rem;
  height: 5rem;
  color: #8E8E8E;
  font-weight: bold;
  font-family: Pretendard;
  input{
  text-align: right;
  }
`;
