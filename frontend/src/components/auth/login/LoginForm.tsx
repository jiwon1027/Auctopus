import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import styled from "styled-components";

export default function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitHandler = () => console.log("submit");

  return (
    <StyledForm>
      <form onSubmit={submitHandler}>
        <TextField
          ref={emailRef}
          id="outlined-basic"
          // label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="example@gmail.com"
          required
        />
        <TextField
          ref={passwordRef}
          id="outlined-password-input"
          // label="Password"
          type="password"
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="**********"
          required
          name="password"
        />
        <Button
          variant="contained"
          disableElevation
          className="btn"
          type="submit"
        >
          Login
        </Button>
        <div className="linkContainer">
          <NavLink to="#" className="link">
            비밀번호 찾기
          </NavLink>{" "}
          |{" "}
          <NavLink to="#" className="link">
            회원가입
          </NavLink>
        </div>
      </form>
    </StyledForm>
  );
}

const StyledForm = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }

  .btn {
    text-transform: initial;
    background-color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    font-size: 1.8rem;
  }

  .linkContainer {
    display: flex;
    justify-content: space-evenly;

    .link {
      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;
      width: 6rem;
      text-align: center;
    }
  }
`;
