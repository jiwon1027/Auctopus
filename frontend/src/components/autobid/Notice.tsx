import React from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
export default function Notice() {
  return (
    <Container>
      <HeaderBox>
        <CustomHelpIcon color="primary" />
        <span>자동 입찰이란?</span>
      </HeaderBox>
      <ContentBox>
        설정한 자동 입찰 상한가까지 자동으로 입찰해주는 기능이에요.
      </ContentBox>
    </Container>
  );
}

const HeaderBox = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  span {
    margin-left: 0.3rem;
  }
`;
const ContentBox = styled.div`
  margin-top: 0.6rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.turtleStandard};
`;
const CustomHelpIcon = mstyled(HelpOutlineOutlinedIcon)`
    width: 2rem;
    height: 2rem;
`;

const Container = styled.div`
  background-color: rgba(167, 201, 87, 0.3);
  display: flex;
  flex-direction: column;
  padding: 1.7rem 2rem;
`;
