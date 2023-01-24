import React from "react";
import Layout from "@components/common/Layout";
import Form from "@components/auth/signup/Form";
import Title from "@components/auth/signup/Title";

// TODO: add a custom hook to handle User state e.g. { must-have, additional, confirmed }
// User state must be shown again when the user goes back
export default function SignupPage() {
  return (
    <Layout leftIcon="back">
      <Title />
      <Form />
    </Layout>
  );
}
