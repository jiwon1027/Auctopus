import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import { styled as mstyled } from "@mui/material/styles";
export default function ImageUpload() {
  return (
    <Container>
      <UploadBox>
        <CustomImageIcon />
        <CustomAddIcon />
      </UploadBox>

      {/* <UploadBox>
        <CustomImageIcon />
        <CustomAddIcon />
      </UploadBox> */}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 3px solid gray;
  margin-top: 2.7rem;
  /* width: 80%; */
  display: flex;
  overflow: auto;
  white-space: nowrap;
  /* overflow: scroll; */
  :-webkit-scrollbar {
    display: none;
  }
`;

const UploadBox = styled.div`
  width: 13rem;
  height: 13rem;
  border: solid 5px ${theme.colors.turtleStandard};
  background-color: ${theme.colors.turtleLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomImageIcon = mstyled(ImageIcon)`
  width: 5.5rem;
  height: 5.5rem;
  color: ${theme.colors.turtleDark};
`;
const CustomAddIcon = mstyled(AddIcon)`
  width: 4rem;
  height: 4rem;
  color: ${theme.colors.turtleDark};
`;
