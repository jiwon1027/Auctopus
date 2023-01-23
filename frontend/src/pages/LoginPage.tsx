import React from "react";
import Layout from "@components/common/Layout";
import Title from "@components/login/Title";
import LoginForm from "@components/login/LoginForm";
import SocialLogin from "@components/login/SocialLogin";

export default function LoginPage() {
  return (
    <Layout leftIcon="none">
      <Title />
      <LoginForm />
      <SocialLogin />
    </Layout>
  );
}
