import React from "react";
import Layout from "@components/common/Layout";
import Title from "@components/auth/login/Title";
import LoginForm from "@components/auth/login/LoginForm";
import SocialLogin from "@components/auth/login/SocialLogin";

export default function LoginPage() {
  return (
    <Layout leftIcon="none">
      <Title />
      <LoginForm />
      <SocialLogin />
    </Layout>
  );
}
