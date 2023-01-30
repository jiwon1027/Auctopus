import * as React from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

interface MainProps {
  live: "live" | "nonLive";
  onClick: () => void;
}

export default function MainToggleButtonGroup(props: MainProps) {
  /**
   *
   * @param event 마우스 클릭이벤트
   * @param newAlignment null은 non-selected
   */
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "live" | "nonLive"
  ) => {
    if (newAlignment !== null) {
      props.onClick();
    }
  };

  return (
    <ToggleButtonGroup
      value={props.live}
      exclusive
      onChange={handleAlignment}
      aria-label="Platform"
      sx={{ paddingTop: 1, marginX: 1 }}
    >
      <ToggleButton value="live">진행중</ToggleButton>
      <ToggleButton value="nonLive">진행 예정</ToggleButton>
    </ToggleButtonGroup>
  );
}

const ToggleButton = mstyled(MuiToggleButton)({
  width: "17rem",
  height: "4rem",
  fontSize: "1.5rem",
  borderRadius: "1.2rem",
  border: `solid 1.5px ${theme.colors.turtleStandard}`,
  fontWeight: `${theme.fontWeight.medium}`,
  fontFamily: "Pretendard",
  "&.Mui-selected, &.Mui-selected:hover": {
    fontSize: "1.5rem",
    color: "white",
    backgroundColor: `${theme.colors.turtleStandard}`,
    fontWeight: `${theme.fontWeight.medium}`,
  },
});
