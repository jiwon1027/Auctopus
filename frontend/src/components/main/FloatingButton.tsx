import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PostAddIcon from "@mui/icons-material/PostAdd";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: <PostAddIcon />, name: "경매방 생성", path: "/createAuction" },
];

export default function FloatingButton() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePath = (path: string) => navigate(path);

  return (
    <Container>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="FloatingButton"
        sx={{ position: "absolute", bottom: 16, right: 22 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose;
              handlePath(action.path);
            }}
          />
        ))}
      </SpeedDial>
    </Container>
  );
}

const Container = styled.div`
  .MuiButtonBase-root {
    padding-bottom: 0.5rem;
  }

  .MuiSvgIcon-root {
    width: 3rem;
    height: 3rem;
  }

  #FloatingButton-action-0-label {
    width: 8rem;
    font-size: 1.5rem;
    font-weight: ${theme.fontWeight.semibold};
  }
`;
