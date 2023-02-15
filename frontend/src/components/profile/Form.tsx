import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { theme } from "@/styles/theme";
import { styled as mstyled } from "@mui/material/styles";
import { updateUserInfo, getUserInfo } from "@/api/profile";
import { IUserInfoData } from "types/profile";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const initProfile = {
  email: "",
  nickname: "",
  userName: "",
  social: 0,
  account: "",
  addrress: "",
  profileUrl: "",
};

export default function Form() {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState<IUserInfoData>(initProfile);

  useEffect(() => {
    getUserInfo().then((res) => {
      const data = res.data;
      userInfo.nickname = data.nickname;
      userInfo.account = data.account;
      userInfo.addrress = data.address;
    });
  }, [userInfo]);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    changeUserInfo(target.name, target.value);
  };

  const changeUserInfo = (key: string, value: string | number) => {
    setUserInfo((cur) => ({
      ...cur,
      [key]: value,
    }));
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(userInfo);
    updateUserInfo(userInfo).then(() => {
      navigator("/profile");
    });
  };

  return (
    <Container>
      <Title>닉네임 수정</Title>
      <CustomTextField
        value={userInfo.nickname}
        name="nickname"
        onChange={handleChange}
      />
      <Title>계좌정보 수정</Title>
      <CustomTextField
        value={userInfo.account}
        name="account"
        onChange={handleChange}
        placeholder={
          userInfo.account === "" ? "정보가 없습니다" : userInfo.account
        }
      />
      <Title>대표배송지 수정</Title>
      <CustomTextField
        value={userInfo.addrress}
        name="addrress"
        onChange={handleChange}
        placeholder={
          userInfo.addrress === "" ? "정보가 없습니다" : userInfo.addrress
        }
      />
      <Button
        variant="contained"
        size="medium"
        sx={{ fontSize: 15, width: 330, margin: "5rem auto" }}
        onClick={submitHandler}
      >
        완료
      </Button>
    </Container>
  );
}

const Container = styled.div`
  height: 35%;
  margin-top: 2rem;
  padding: 2rem;
`;
const Title = styled.div`
  font-size: 1.7rem;
  margin-top: 1.5rem;
  font-weight: ${theme.fontWeight.semibold};
`;

const CustomTextField = mstyled(TextField)`
  margin-top: 2rem;
  font-family: Pretendard;
  width: 100%;   
  font-weight: bold;
  color: #D2D2D2;
  border-radius: 0.5rem;
  input{
    font-weight: bold;
    font-size: 1.6rem;
    padding: 1rem;
  }
`;
