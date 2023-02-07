import React, { useState } from "react";
import Layout from "@components/common/Layout";
import ItemsList from "@components/common/ItemsList";
import ResultFilter from "@components/result/ResultFilter";
import SearchBar from "@components/search/SearchBar";
import Category from "@components/search/Category";
import RecentSearches from "@components/search/RecentSearches";
import styled from "styled-components";
import { IAuction, IReqSearch } from "types/auction";
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

  const searchHandler = async (
    key: "keyword" | "category" | "live",
    val: string
  ) => {
    const data: IReqSearch = {
      state: live === "live" ? 2 : 0,
      word: keyword,
      category: category,
    };
    switch (key) {
      case "keyword":
        data.word = val;
        data.category = null;
        break;
      case "category":
        data.category = val;
        data.word = null;
        break;
      case "live":
        data.state = val === "live" ? 2 : 0;
        if (result.type !== "카테고리") data.category = null;
        else data.word = null;
        break;
      default:
        break;
    }

    const res = await getAuctionsByQuery(data);
    setAuctionList(res?.data || []);

    if (key === "live") return;
    setResult({
      type: key === "category" ? "카테고리" : "키워드",
      content: val,
    });
  };

  const keywordHandler = (val: string) => {
    if (result.type) setResult({ ...InitResult });
    setKeyword(val);
  };

  const categoryHandler = (val: string) => {
    searchHandler("category", val);
    setCategory(val);
  };

  const liveHandler = (val: "live" | "nonLive") => {
    searchHandler("live", val);
    setLive(val);
  };

  return (
    <Layout>
      <SearchBar
        keyword={keyword}
        onChangeKeyword={keywordHandler}
        onSearch={() => searchHandler("keyword", keyword)}
      />
      {result.type && (
        <ResultText>
          {`${result.type} ${result.content} 에 대한 검색결과입니다.`}
        </ResultText>
      )}
      <ResultFilter live={live} onChangeLive={liveHandler} />
      {auctionList.length === 0 && (
        <>
          <Category category={category} onChangeCategory={categoryHandler} />
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
