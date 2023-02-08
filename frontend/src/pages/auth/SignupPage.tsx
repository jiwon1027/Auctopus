import React from "react";
import Layout from "@components/common/Layout";
import Form from "@components/auth/signup/Form";
import Title from "@components/auth/signup/Title";

export default function SignupPage() {
  return (
    <Layout back>
      <Title />
      <Form />
    </Layout>
  );
}
