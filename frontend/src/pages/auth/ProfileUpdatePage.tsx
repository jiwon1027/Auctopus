import Layout from "@components/common/Layout";
import React from "react";
import styled from "styled-components";
import useAuth from "@/store/atoms/useAuth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled as mstyled } from "@mui/system";
import { theme } from "@/styles/theme";
import Form from "@components/profile/Form";

// import EditIcon from "@mui/icons-material/Edit";


export default function ProfileUpdatePage() {
  const { getUser } = useAuth();

  const userData = getUser();
  return (
    <Layout back title="프로필 편집">
      <ProfileBox>
        <Profile>
          <img
            className="image"
            src={userData.profileUrl}
            alt="profile-image"
          />
        </Profile>
      </ProfileBox>
      <Form />
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
