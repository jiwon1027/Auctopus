import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ClearIcon from "@mui/icons-material/Clear";

interface IProps {
  notiItem: {
    img: string;
    context: string;
  };
}
export default function Item({ notiItem }: IProps) {
  return (
    <Container>
      <ProfileBox>
        <img className="profile" src={notiItem.img} alt="" />
      </ProfileBox>
      <TextBox>{notiItem.context}</TextBox>
      {/* <IconBox>
        <ClearIcon sx={{ fontSize: 20 }} />
      </IconBox> */}
    </Container>
  );
}

const Container = styled.div`
  height: 11rem;
  padding: 0 1rem;
  display: flex;
  border-bottom: solid 3px ${theme.colors.turtleDark};
`;

const ProfileBox = styled.div`
  margin: auto auto;
  width: 7rem;
  height: 7rem;
  border-radius: 70%;
  overflow: hidden;
  border: solid 3px ${theme.colors.turtleDark};
  .profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  width: 62%;
  font-size: 1.4rem;
  padding: 0.5rem;
  margin: auto auto;
`;

const IconBox = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
