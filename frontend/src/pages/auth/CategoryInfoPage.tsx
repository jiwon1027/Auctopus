import React from "react";
import Layout from "@components/common/Layout";
import Title from "@components/auth/category/Title";
import Form from "@components/auth/category/Form";

export default function CategoryInfoPage() {
  return (
    <Layout leftIcon="back">
      <Title />
      <Form />
    </Layout>
  );
}
