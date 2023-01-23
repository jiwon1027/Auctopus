import React, { useReducer } from "react";
import styled from "styled-components";
import { Button, InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const userInitState = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
};

type ACTIONTYPE =
  | { type: "update"; payload: { name: string; value: string } } // check that it is not empty
  | { type: "updateEmail"; payload: { name: string; value: string } } // check that it is not duplicated
  | { type: "updatePassword"; payload: { name: string; value: string } } // check that it complies with regex
  | { type: "updatePasswordConfirm"; payload: { name: string; value: string } } // check that it is the same as password
  | { type: "submit" };

function reducer(state: typeof userInitState, action: ACTIONTYPE) {
  switch (action.type) {
    case "update":
    case "updateEmail":
    case "updatePassword":
    case "updatePasswordConfirm":
      return { ...state, [action.payload.name]: action.payload.value };
    // TODO: "submit"
    default:
      return state;
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, userInitState);

  const updateHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case "name":
      case "nickname":
        return dispatch({ type: "update", payload: { name, value } });
      case "email":
        return dispatch({ type: "updateEmail", payload: { name, value } });
      case "password":
        return dispatch({ type: "updatePassword", payload: { name, value } });
      case "passwordConfirm":
        return dispatch({
          type: "updatePasswordConfirm",
          payload: { name, value },
        });
      default:
        throw new Error();
    }
  };

  const submitHandler = () => dispatch({ type: "submit" });

  return (
    <StyledRegisterForm method="POST" onSubmit={submitHandler}>
      <TextField
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
        name="email"
        onChange={(e) => updateHandler(e)}
        value={state.email}
      />
      <TextField
        className="textField"
        // label="Password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder="비밀번호"
        required
        name="password"
        onChange={(e) => updateHandler(e)}
        value={state.password}
      />
      <TextField
        className="textField"
        // label="Confirm Password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder="비밀번호 확인"
        required
        name="passwordConfirm"
        onChange={(e) => updateHandler(e)}
        value={state.passwordConfirm}
      />
      <TextField
        className="textField"
        // label="Name"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmojiEmotionsOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder="이름"
        required
        name="name"
        onChange={(e) => updateHandler(e)}
        value={state.name}
      />
      <TextField
        className="textField"
        // label="Nickname"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder="닉네임"
        required
        name="nickname"
        onChange={(e) => updateHandler(e)}
        value={state.nickname}
      />
      <Button variant="contained" disableElevation type="submit">
        Next
      </Button>
    </StyledRegisterForm>
  );
}

const StyledRegisterForm = styled.form`
  flex: 5;
  display: flex;
  flex-direction: column;

  .textField {
    margin-bottom: 3rem;

    fieldset {
      border-radius: 1rem;
    }
    input {
      font-size: 1.8rem;
    }
  }

  button {
    padding: 1rem;
    font-size: 1.8rem;
    border-radius: 1rem;
  }
`;
