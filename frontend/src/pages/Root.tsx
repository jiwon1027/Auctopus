import React from "react";
import ItemsList from "../components/common/ItemsList";
import Layout from "@components/common/Layout";

export default function Root() {
  return (
    <Layout leftIcon="turtle">
      <div className=" h-12"> 필터</div>
      <ItemsList />
    </Layout>
  );
}
