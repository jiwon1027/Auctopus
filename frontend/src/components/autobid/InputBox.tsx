import styled from "styled-components";
import React from "react";
// import Input from "@mui/material/Input";
export default function InputBox() {
  return (
    <></>
    // <Container>
    //   <div>
    //     <div className="index">자동 입찰 상한가</div>
    //   </div>
    // </Container>
  );
}

const Container = styled.div`
  height: 6%;
  padding: 2.7rem 2.5rem;
  border: solid 2px red;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  .index {
    font-size: 1.8rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.primary};
    margin-top: auto;
  }
`;
