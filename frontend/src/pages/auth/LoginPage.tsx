import React from 'react';
import Title from '@components/auth/login/Title';
// import Form from '@components/auth/login/Form';
import SocialLogin from '@components/auth/login/SocialLogin';
import styled from 'styled-components';
export default function LoginPage() {
  return (
    <Container title="">
      <Title />
      {/* <Form /> */}
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;
