import React, { useCallback, useState } from "react";
import Layout from "@components/common/Layout";
import ItemsList from "@components/common/ItemsList";
import ResultFilter from "@components/result/ResultFilter";
import SearchBar from "@components/search/SearchBar";
import Category from "@components/search/Category";
import RecentSearches from "@components/search/RecentSearches";
import styled from "styled-components";
import { IAuction } from "types/auction";
import { getAuctionsByQuery } from "@/api/auction";

interface IResult {
  type: string;
  content: string;
}

const InitResult: IResult = {
  type: "",
  content: "",
};

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [live, setLive] = useState<"live" | "nonLive">("live");
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);
  const [result, setResult] = useState<IResult>({ ...InitResult });

  const fetchAuction = useCallback(
    async (liveChanged = live) => {
      const res = await getAuctionsByQuery({
        state: liveChanged === "live" ? 2 : 0,
        word: keyword ? keyword : null,
        category: category ? category : null,
      });
      setAuctionList(res.data);
    },
    [live, keyword, category]
  );

  const searchHandler = (liveChanged = live) => {
    if (!keyword && !category) {
      alert("키워드 검색 또는 카테고리를 선택해주세요");
      return;
    }

    fetchAuction(liveChanged);
    setResult({
      type: category ? "카테고리" : "키워드",
      content: category || keyword,
    });
  };

  const keywordHandler = (val: string) => {
    if (result.type) setResult({ ...InitResult });
    setKeyword(val);
  };

  const categoryHandler = (val: string) => {
    if (result.type) setResult({ ...InitResult });
    setCategory(val);
  };

  const liveHandler = (val: "live" | "nonLive") => {
    setLive(val);
    searchHandler(val);
  };

  return (
    <Layout>
      <SearchBar
        keyword={keyword}
        onChangeKeyword={keywordHandler}
        onSearch={searchHandler}
      />
      {result.type && (
        <ResultText>
          {`${result.type} ${result.content} 에 대한 검색결과입니다.`}
        </ResultText>
      )}
      {auctionList.length > 0 ? (
        <ResultFilter live={live} onChangeLive={liveHandler} />
      ) : (
        <>
          <Category
            category={category}
            onChangeCategory={categoryHandler}
            onSearch={searchHandler}
          />
          <RecentSearches />
        </>
      )}
      <ItemsList liveAuction={auctionList} isLive={live === "live"} />
    </Layout>
  );
}

const ResultText = styled.span`
  font-size: 1.8rem;
`;
