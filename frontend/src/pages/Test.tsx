import React from "react";

// import Slider from "@mui/material";
import Button from "@mui/material/Button";
import { styled as mstyled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import styled from "styled-components";

const CustomizedSlider = mstyled(Slider)`
  color: #20b2aa;
  colo

  :hover {
    /* color: #2e8b57; */
    color: red
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function Test() {
  //   return <CustomizedSlider defaultValue={30} />;
  return (
    <div>
      <Title>Hello, world :)</Title>
      {/* <Slider defaultValue={30} /> */}
      hello test
      <Button variant="contained">Hello World</Button>
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}

export default Test;
