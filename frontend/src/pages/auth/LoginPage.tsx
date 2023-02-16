import React from "react";
import Title from "@components/auth/login/Title";
import SocialLogin from "@components/auth/login/SocialLogin";
import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";
import background from "@/assets/common/greenbg.jpg";
export default function LoginPage() {
  return (
    <Container title="">
      <Title />
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${background});
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  /* width: 100%; */
`;
