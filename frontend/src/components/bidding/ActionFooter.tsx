import React from "react";
import { TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import styled from "styled-components";

export default function ActionFooter() {
  return (
    <StyledActionFooter>
      <TextField fullWidth id="fullWidth" sx={{ backgroundColor: "white" }} />
      <SendOutlinedIcon
        color="secondary"
        sx={{ width: "4rem", height: "4rem", marginLeft: "2rem" }}
      />
    </StyledActionFooter>
  );
}

const StyledActionFooter = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 3rem;
`;
