import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { OutlinedInput } from "@mui/material";

import styled from "styled-components";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 180,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CustomBtn2 onClick={handleOpen}>자동 입찰 사용</CustomBtn2>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 230 }}>
          <CustomTitle id="alert-dialog-title">자동 입찰 설정</CustomTitle>
          <MinBidBox>
            <CustomContentText id="alert-dialog-description">
              최소 입찰 단위
            </CustomContentText>
            <CustomContentText>5000원</CustomContentText>
          </MinBidBox>
          <InputBox>
            <CustomInput aria-label="none" placeholder="300,000" />
            <span>원</span>
          </InputBox>
          <ButtonWrapper>
            <CustomBtn1>경매방 입장</CustomBtn1>
            <CustomBtn2 onClick={handleClose}>취소</CustomBtn2>
          </ButtonWrapper>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CustomizedButton variant="outlined" onClick={handleClickOpen}>
        입장 하기
      </CustomizedButton>
      <CustomDialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CustomTitle id="alert-dialog-title">자동 입찰 안내</CustomTitle>
        <DialogContent>
          <CustomContentText id="alert-dialog-description">
            편리한 자동 입찰 기능을 사용하여 <br /> 라이브 경매에
            참여하시겠습니까?
          </CustomContentText>
        </DialogContent>
        <CustomActions>
          <CustomBtn1 onClick={handleClose}>수동 입찰 사용</CustomBtn1>
          <ChildModal />
        </CustomActions>
      </CustomDialog>
    </div>
  );
}

const InputBox = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  span {
    font-size: 1.5rem;
    font-weight: ${theme.fontWeight.bold};
    margin-top: auto;
    margin-left: 0.5rem;
  }
`;
const CustomInput = mstyled(OutlinedInput)`
  font-size: 1.2rem;
  width: 12rem;
  height: 2.8rem;
  color: #8E8E8E;
  font-weight: bold;
  font-family: Pretendard;
  input{
  text-align: center;
  }
`;

const CustomDialog = mstyled(Dialog)`
  width: 100%;
  height: 100%;
  .MuiPaper-root {
    width: 29rem;
    height: 20rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;
const MinBidBox = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: space-around;
`;
const CustomBtn1 = mstyled(Button)`
  border: solid 2px ${theme.colors.turtleDark};
  font-size: 1rem;
  font-weight: bold;
  color:${theme.colors.turtleDark};
  width: 9rem;
  height: 3.7rem;
  border-radius: 10;
`;
const CustomBtn2 = mstyled(Button)`
  background-color: ${theme.colors.turtleDark};
  font-size: 1rem;
  font-weight: ${theme.fontWeight.bold};
  color: white;
  width: 9rem;
  height: 3.7rem;
  border-radius: 10;
  &:hover{
    background-color: ${theme.colors.primary};
    border: solid 2px ${theme.colors.turtleDark};

    opacity: 0.6;
  }
`;
const CustomTitle = mstyled(DialogTitle)`
  font-family: Pretendard;  
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.turtleDark};
  text-align: center;
  margin-top: 0.5rem;
  `;
const CustomContentText = mstyled(DialogContentText)`
  font-size: 1.3rem;
  font-family: Pretendard;  
  font-weight: ${theme.fontWeight.extraBold};
  text-align: center;

`;
const CustomActions = mstyled(DialogActions)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
const CustomizedButton = mstyled(Button)`
  border: solid 2px ${theme.colors.turtleDark};
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.turtleDark};
  width: 12.1rem;
  height: 4.8rem;
  border-radius: 10;
  margin-top: 1.3rem;
`;
