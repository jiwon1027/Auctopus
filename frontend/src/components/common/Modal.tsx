import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
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
          <CustomBtn2 onClick={handleClose} autoFocus>
            자동 입찰 사용
          </CustomBtn2>
        </CustomActions>
      </CustomDialog>
    </div>
  );
}

const CustomDialog = mstyled(Dialog)`
  width: 100%;
  height: 100%;
  .MuiPaper-root {
    width: 29rem;
    height: 20rem;
  }
`;

const CustomBtn1 = mstyled(Button)`
  border: solid 2px ${theme.colors.turtleDark};
  font-size: 1rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.turtleDark};
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
`;
