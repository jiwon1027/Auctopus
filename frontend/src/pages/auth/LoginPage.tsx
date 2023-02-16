import React from "react";
import Title from "@components/auth/login/Title";
import SocialLogin from "@components/auth/login/SocialLogin";
import styled from "styled-components";
import { theme } from "@/styles/theme";
export default function LoginPage() {
  return (
    <Container title="">
      <Title />
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: lightgreen;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;
