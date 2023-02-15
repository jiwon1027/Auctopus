import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import backgroundImg from "@/assets/auction/background.png";
import Turtle from "@/assets/auction/turtle-removebg.png";
import Dog1 from "@/assets/auction/dog1-removebg.png";
import Dog2 from "@/assets/auction/dog2-removebg.png";
import Mooneo from "@/assets/auction/mooneo-removebg.png";
import Mulbeom from "@/assets/auction/mulbeom-removebg.png";
import Sudal from "@/assets/auction/sudal-removebg.png";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
// import { keyframes } from "@emotion/react";

const animalList = [
  {
    img: Turtle,
    name: "바다 거북이를",
  },
  {
    img: Dog1,
    name: "강아지를",
  },
  {
    img: Dog2,
    name: "강아지를",
  },
  {
    img: Mooneo,
    name: "무너를",
  },
  {
    img: Mulbeom,
    name: "물범을",
  },
  {
    img: Sudal,
    name: "수달을",
  },
];
const idx = Math.floor(Math.random() * animalList.length);
export default function AuctionCompeletePage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/main", { replace: true });
    }, 3000);
  }, []);

  return (
    <Container>
      <CuteAnimals src={animalList[idx].img} alt="cuties" />
      <Content>
        <Text> 당신 덕분에</Text>
        <Text>
          <span className="number">1</span> 마리의
        </Text>
        <Text> {animalList[idx].name}</Text>
        <Text>구했어요!</Text>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${backgroundImg});
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const floating = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const CuteAnimals = styled.img`
  width: 25rem;
  animation: ${floating} 2s 1s infinite linear alternate;
`;
const Content = styled.div`
  font-family: Pretendard;
  font-size: 3.6rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  /* color: purple; */
  .number {
    font-size: 5rem;
    color: purple;
    /* color: ${theme.colors.turtleLight}; */
  }
  br {
    margin-top: 2rem;
  }
`;

const Text = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
