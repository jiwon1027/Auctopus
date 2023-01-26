import AdditionalForm from "@components/auth/additional/Form";
import Title from "@components/auth/additional/Title";
import Layout from "@components/common/Layout";
import React from "react";

export default function AdditionalInfoPage() {
  return (
    <Layout leftIcon="back">
      <Title />
      <AdditionalForm />
    </Layout>
  );
}
