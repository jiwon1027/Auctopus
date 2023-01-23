import React from "react";
import Layout from "@components/common/Layout";
import Form from "@components/auth/register/Form";
import Title from "@components/auth/register/Title";

export default function RegisterPage() {
  return (
    <Layout leftIcon="back">
      <Title />
      <Form />
    </Layout>
  );
}
