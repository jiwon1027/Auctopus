import React from "react";
import styled from "styled-components";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

export default function NoticeSection() {
  return (
    <StyledNotice>
      <CampaignOutlinedIcon />
      Notification
    </StyledNotice>
  );
}

const StyledNotice = styled.section`
  background-color: purple;
`;
