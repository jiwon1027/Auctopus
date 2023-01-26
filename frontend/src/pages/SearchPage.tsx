import React from "react";
import Layout from "@components/common/Layout";
import Category from "@components/search/Category";
import RecentSearches from "@components/search/RecentSearches";

export default function SearchPage() {
  return (
    <Layout leftIcon="turtle">
      <Category />
      <RecentSearches />
    </Layout>
  );
}
