import React from "react";
import Layout from "@components/common/Layout";
import RegisterForm from "@components/auth/register/RegisterForm";

export default function RegisterPage() {
  return (
    <Layout leftIcon="back">
      <RegisterForm />
    </Layout>
  );
}
