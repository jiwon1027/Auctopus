import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
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
import { Link, Navigate, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";

const initUserData = {
  nickname: "",
  email: "",
  profileUrl: "",
};

interface IList {
  userData: IUserData;
  onClick: () => void;
}
export default function Hamburger() {
  const [toggle, setToggle] = React.useState(false);
  const [userData, setUserData] = useState<IUserData>(initUserData);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    setUserData(user);
  }, []);
  const toggleDrawer = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <MenuIcon
        onClick={toggleDrawer}
        sx={{
          width: "30px",
          height: "30px",
        }}
        color="primary"
      >
        left
      </MenuIcon>
      <Drawer anchor="left" open={toggle} onClose={toggleDrawer}>
        <ListComponent userData={userData} onClick={toggleDrawer} />
      </Drawer>
    </>
  );
}

const navItems = [
  { value: "메인 화면", uri: "/" },
  { value: "채팅", uri: "/chat" },
  { value: "찜 목록", uri: "/likes" },
  { value: "내 프로필", uri: "/profile" },
];

function ListComponent({ userData, onClick }: IList) {
  const navigate = useNavigate();
  return (
    <>
      <IconBox>
        <CustomNotice onClick={() => navigate("/noti")} />
        <CustomClose onClick={onClick} />
      </IconBox>
      <ProfileBox>
        <Profile onClick={() => navigate("/profile")}>
          <img className="image" src={userData.profileUrl} alt="profile" />
        </Profile>
        <span className="profileTitle">{userData.nickname}님</span>
      </ProfileBox>

      <Box
        sx={{ width: 280 }}
        role="presentation"
        onClick={onClick}
        onKeyDown={onClick}
      >
        <Divider />
        <List>
          {navItems.map((obj) => (
            <ListItem key={obj.value} disablePadding>
              <ListItemButton component={Link} to={obj.uri}>
                <ListItemIcon>
                  {obj.uri === "/" && <CustomHome color="primary" />}
                  {obj.uri === "/chat" && <CustomText color="primary" />}
                  {obj.uri === "/likes" && <CustomFavorite color="primary" />}
                  {obj.uri === "/profile" && <CustomAccount color="primary" />}
                </ListItemIcon>
                <CustomListText color="primary">{obj.value}</CustomListText>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <CustomLogout color="info" />.
            </ListItemIcon>
            <CustomListTextL>로그 아웃</CustomListTextL>
          </ListItemButton>
        </List>
      </Box>
    </>
  );
}

const IconBox = styled.div`
  display: flex;
`;
const Profile = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 70%;
  overflow: hidden;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }
`;

const CustomNotice = mstyled(NotificationsNoneOutlindIcon)`
width: 2.5rem;
height: 2.5rem;
display: flex;
/* margin-left: auto; */
padding: 1.5rem;
`;
const CustomClose = mstyled(CloseOutlinedIcon)`
width: 2.5rem;
height: 2.5rem;
display: flex;
margin-left: auto;
padding: 1.5rem;
`;

const CustomHome = mstyled(HomeOutlinedIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
  `;
const CustomText = mstyled(ChatOutlinedIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
`;
const CustomFavorite = mstyled(FavoriteBorderIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
`;
const CustomAccount = mstyled(AssignmentIndOutlinedIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
`;

const CustomListText = styled.div`
  font-size: 1.8rem;
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: ${(props) => props.theme.colors.turtleDark};
  font-family: Pretendard;
`;
const CustomListTextL = styled.div`
  font-size: 1.8rem;
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: ${(props) => props.theme.colors.greyStandard};
  font-family: Pretendard;
`;

const CustomLogout = mstyled(ExitToAppOutlinedIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
`;
