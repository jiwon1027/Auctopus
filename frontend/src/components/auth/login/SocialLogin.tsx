import Button from "@mui/material/Button";
import React from "react";
import styled from "styled-components";

export default function SocialLogin() {
  // TODO: social login

  return (
    <StyledSocialLogin>
      <Button variant="outlined">Kakao</Button>
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
