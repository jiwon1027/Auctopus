import React from "react";
import Layout from "@components/common/Layout";
import Title from "@components/auth/login/Title";
import Form from "@components/auth/login/Form";
import SocialLogin from "@components/auth/login/SocialLogin";

export default function LoginPage() {
  return (
    <Layout>
      <Title />
      <Form />
      <SocialLogin />
    </Layout>
  );
}
