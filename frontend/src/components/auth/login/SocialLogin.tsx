import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { kAKAO_AUTH_URL } from "@/api/api";

export default function SocialLogin() {
  return (
    <StyledSocialLogin>
      <Button variant="outlined" href={kAKAO_AUTH_URL}>
        Kakao
      </Button>
    </StyledSocialLogin>
  );
}

const StyledSocialLogin = styled.div`
  flex: 1;
  text-align: center;

  button {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    margin-top: 3rem;
    font-size: 1.8rem;
  }
`;
