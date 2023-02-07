import React from "react";
import { TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import styled from "styled-components";

export default function ActionFooter() {
  return (
    <StyledActionFooter>
      <TextField fullWidth id="fullWidth" />
      <SendOutlinedIcon
        color="secondary"
        sx={{ width: "4rem", height: "4rem", marginLeft: "2rem" }}
      />
    </StyledActionFooter>
  );
}

const StyledActionFooter = styled.section`
  display: flex;
  margin-bottom: 3rem;
`;
