import React, { useState } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
// import AirPods from "@/assets/autobid/AirPodsMax.png";
// import SLine from "@/assets/autobid/SharpenLine.svg";
export default function Notice() {
  return (
    <Container>
      {/* <ImgBox src={AirPods} alt="dummy-img" /> */}
      <ContentBox>
        <div className="title">Airpods Max 스페이스 그레이</div>
        <NumberBox>
          <div className="title">입찰시작가</div>
          <div className="number">100,000원</div>
        </NumberBox>
        {/* <Line src={SLine} alt="s-line" /> */}
        <NumberBox>
          <div className="title">최소 입찰 단위</div>
          <div className="number">5,000원</div>
        </NumberBox>
        {/* <Line src={SLine} alt="s-line" /> */}
      </ContentBox>
    </Container>
  );
}

const Container = styled.div`
  height: 70%;
`;
const ImgBox = styled.img`
  height: 60%;
  width: 100%;
`;
const ContentBox = styled.div`
  height: 28%;
  padding: 2.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  .title {
    color: ${(props) => props.theme.colors.primary};
    font-size: 2.4rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 1.9rem;
  }
`;

const Line = styled.img`
  width: 60%;
  margin-left: auto;
`;
const NumberBox = styled.div`
  display: flex;
  margin-left: auto;
  width: 18rem;
  height: 2.2rem;
  margin-top: 1.26rem;

  .title {
    font-size: 1.3rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-top: 1rem;
  }
  .number {
    margin-left: auto;
    font-size: 2.2rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.primary};
    align-items: center;
  }
`;
