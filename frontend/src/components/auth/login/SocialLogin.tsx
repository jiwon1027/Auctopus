import Button from "@mui/material/Button";
import React from "react";
import styled from "styled-components";

export default function SocialLogin() {
  // TODO: social login

  return (
    <StyledSocialLogin>
      <Button variant="outlined" className="btn">
        Kakao
      </Button>
    </StyledSocialLogin>
  );
}

const StyledSocialLogin = styled.section`
  flex: 1;
  text-align: center;

  .btn {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    margin-top: 3rem;
  }
`;
