import * as React from "react";
import Box from "@mui/material/Box";
import ProfileImg from "@/assets/common/profile.png";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import NotificationsNoneOutlindIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
type Anchor = "top" | "left" | "bottom" | "right";

const navItems = [
  { value: "메인 화면", uri: "/" },
  { value: "채팅", uri: "/chat" },
  { value: "찜 목록", uri: "/likes" },
  { value: "내 프로필", uri: "/profile" },
];
export default function Hamburger() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <>
      <IconBox>
        <CustomNotice />
        <CustomClose onClick={toggleDrawer(anchor, false)} />
      </IconBox>
      <ProfileBox>
        <Link to={`/profile`}>
          <Profile src={ProfileImg} alt="profile" />
        </Link>

        <span className="profileTitle">정개미님</span>
      </ProfileBox>

      <Box
        sx={{ width: 280 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Divider />
        <List>
          {navItems.map((obj, index) => (
            <ListItem key={obj.value} disablePadding>
              <ListItemButton key={index} component={Link} to={obj.uri}>
                <ListItemIcon key={index}>
                  {index % 2 != 0 ? (
                    obj.value === "채팅" ? (
                      <CustomText />
                    ) : (
                      <CustomAccount />
                    )
                  ) : obj.value == "메인 화면" ? (
                    <CustomHome />
                  ) : (
                    <CustomFavorite />
                  )}
                </ListItemIcon>
                <CustomListText>{obj.value}</CustomListText>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <CustomLogout />.
            </ListItemIcon>
            <CustomListTextL>로그 아웃</CustomListTextL>
          </ListItemButton>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            sx={{
              width: "30px",
              height: "30px",
              color: `${theme.colors.primary}`,
            }}
          >
            {anchor}
          </MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
const IconBox = styled.div`
  display: flex;
`;
const ProfileBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profileTitle {
    font-size: 1.8rem;
    margin: 1.2rem 0;
    font-family: Pretendard;
    text-align: center;
    font-weight: ${theme.fontWeight.semibold};
  }
`;
const Profile = styled.img`
  width: 6rem;
  cursor: pointer;
`;

const CustomNotice = mstyled(NotificationsNoneOutlindIcon)`
widtH: 2.5rem;
height: 2.5rem;
display: flex;
/* margin-left: auto; */
padding: 1.5rem;
`;
const CustomClose = mstyled(CloseOutlinedIcon)`
widtH: 2.5rem;
height: 2.5rem;
display: flex;
margin-left: auto;
padding: 1.5rem;
`;

const CustomHome = mstyled(HomeOutlinedIcon)`
width: 2.5rem;
height: 2.5rem;
  color: ${theme.colors.turtleDark};
  padding: 1rem;
  `;
const CustomText = mstyled(ChatOutlinedIcon)`
width: 2.5rem;
height: 2.5rem;
  color: ${theme.colors.turtleDark};
  padding: 1rem;
`;
const CustomFavorite = mstyled(FavoriteBorderIcon)`
width: 2.5rem;
height: 2.5rem;
  color: ${theme.colors.turtleDark};
  padding: 1rem;
`;
const CustomAccount = mstyled(AssignmentIndOutlinedIcon)`
width: 2.5rem;
height: 2.5rem;
  color: ${theme.colors.turtleDark};
  padding: 1rem;
`;

const CustomListText = styled.div`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.turtleDark};
  font-family: Pretendard;
`;
const CustomListTextL = styled.div`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.greyStandard};
  font-family: Pretendard;
`;

const CustomLogout = mstyled(ExitToAppOutlinedIcon)`
width: 2.5rem;
height: 2.5rem;
  color: ${theme.colors.greyStandard};
  padding: 1rem;
`;
