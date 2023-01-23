import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import { styled as mstyled } from "@mui/system";
import Header from "@components/common/Header";
import { IProps as IHeaderProps } from "@components/common/Header";
import { ThemeProvider } from "@mui/material";
import { mtheme } from "@/styles/theme";

interface IProps {
  leftIcon: IHeaderProps["leftIcon"];
  children: ReactNode;
}
export default function Layout(props: IProps) {
  // TODO: move ThemeProvider imported from Styled-components here
  return (
    <ThemeProvider theme={mtheme}>
      <StyledContainer maxWidth="sm">
        <Header leftIcon={props.leftIcon} />
        {props.children}
      </StyledContainer>
    </ThemeProvider>
  );
}

const StyledContainer = mstyled(Container)`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
