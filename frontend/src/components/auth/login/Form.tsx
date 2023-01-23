import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import styled from "styled-components";

export default function Form() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitHandler = () => console.log("submit");

  return (
    <StyledForm method="POST" onSubmit={submitHandler}>
      <TextField
        ref={emailRef}
        className="textField"
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
        className="textField"
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
    </StyledForm>
  );
}

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .textField {
    fieldset {
      border-radius: 1rem;
    }
    input {
      font-size: 1.8rem;
    }
  }

  button {
    text-transform: initial;
    background-color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 1rem;
  }

  .linkContainer {
    display: flex;
    justify-content: space-evenly;
    font-size: 1.6rem;

    .link {
      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;
      width: 9rem;
      text-align: center;
    }
  }
`;
