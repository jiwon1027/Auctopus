import React, { useState } from "react";
import Layout from "@components/common/Layout";
import ItemsList from "@components/common/ItemsList";
import ResultFilter from "@components/result/ResultFilter";
import SearchBar from "@components/search/SearchBar";
import Image1 from "@/assets/detail/dummy.svg";
import Image2 from "@/assets/main/airpodsImg.jpg";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const keywordQuery = searchParams.get("keyword");
  const categoryQuery = searchParams.get("category");

  const [auctionList, setAuctionList] = useState<IAuction[]>([]);

  const [live, setLive] = useState<"live" | "nonLive">("live");
  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };
  return (
    <Layout leftIcon="none">
      <SearchBar />
      {keywordQuery !== null ? (
        <ResultText>
          &lsquo;
          <b>{keywordQuery}</b>
          &rsquo;에 대한 검색결과입니다.
        </ResultText>
      ) : (
        <ResultText>
          &lsquo;
          <b>{categoryQuery}</b>
          &rsquo;카테고리에 대한 검색결과입니다.
        </ResultText>
      )}
      <ResultFilter live={live} onClick={changeLive} />
      <ItemsList liveAuction={auctionList} isLive={live === "live"} />
    </Layout>
  );
}

const ResultText = styled.span`
  font-size: 1.8rem;
`;
