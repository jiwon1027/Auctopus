import Layout from "@components/common/Layout";
import React from "react";
import styled from "styled-components";
import useAuth from "@/store/atoms/useAuth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled as mstyled } from "@mui/system";
import { theme } from "@/styles/theme";
import Content from "@components/profile/Form";

import EditIcon from "@mui/icons-material/Edit";

const initProfile = {
  userName: "",
  bankCode: -1,
  account: "",
  address: "",
  profileUrl: "",
};

export default function ProfileUpdatePage() {
  const { getUser } = useAuth();
  const RightComponent = (
    <span style={{ fontSize: "1.8rem", color: "#386641" }}>완료</span>
  );
  const userData = getUser();
  console.log(userData);
  return (
    <Layout right={RightComponent} back title="프로필 편집">
      <ProfileBox>
        <Profile>
          <img
            className="image"
            src={userData.profileUrl}
            alt="profile-image"
          />
        </Profile>
      </ProfileBox>
      <Content />
    </Layout>
  );
}

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.6rem;
`;
const Profile = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 70%;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div``;

const CustomEdit = mstyled(EditIcon)`


`;
// const CustomCamera = mstyled(CameraAltIcon)`
//   position: absolute;
//   width: 4rem;
//   height: 4rem;
//   color: ${theme.colors.primary};
// `;
