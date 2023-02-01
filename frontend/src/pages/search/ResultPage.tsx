import React, { useEffect, useState } from "react";
import Layout from "@components/common/Layout";
import ItemsList from "@components/common/ItemsList";
import ResultFilter from "@components/result/ResultFilter";
import SearchBar from "@components/search/SearchBar";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const keywordQuery = searchParams.get("keyword");
  const categoryQuery = searchParams.get("category");
  const categoryNumQuery = searchParams.get("categoryNum");

  const [live, setLive] = useState<"live" | "nonLive">("live");
  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };

  const [auctionList, setAuctionList] = useState<IAuction[]>([]);

  useEffect(() => {
    // 카테고리일떄, 검색어 검색일떄 나누었는데 리팩토리 가능할듯
    axios
      .get(
        keywordQuery !== null
          ? `${
              import.meta.env.VITE_SERVER_DOMAIN
            }/api/search?word=${keywordQuery}&page=0&size=20&sort=main`
          : `${
              import.meta.env.VITE_SERVER_DOMAIN
            }/api/search/category?categorySeq=${categoryNumQuery}&page=0&size=20`
      )
      .then((res) => {
        const data = res.data.resList;
        setAuctionList(data);
      });
  }, []);

  return (
    <Layout leftIcon="none">
      <SearchBar setAuctionList={setAuctionList} />
      {keywordQuery !== null ? (
        <ResultText>
          검색어&lsquo;
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
      {auctionList.length === 0 ? (
        <></>
      ) : (
        <ResultFilter
          setAuctionList={setAuctionList}
          live={live}
          onClick={changeLive}
        />
      )}

      <ItemsList liveAuction={auctionList} isLive={live === "live"} />
    </Layout>
  );
}

const ResultText = styled.span`
  font-size: 1.8rem;
`;
