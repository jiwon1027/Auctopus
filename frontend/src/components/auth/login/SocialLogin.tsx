import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { kAKAO_AUTH_URL } from '@/api/api';

export default function SocialLogin() {
  return (
    <StyledSocialLogin>
      <Button
        variant="contained"
        disableElevation
        className="btn"
        type="submit"
        href={kAKAO_AUTH_URL}
      >
        kakao로 간편로그인하기
      </Button>
    </StyledSocialLogin>
  );
}

const StyledSocialLogin = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 4rem;
  .btn {
    text-transform: initial;
    background-color: #fae100;
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 1rem;
    color: black;
    padding: 1rem;
  }
`;
