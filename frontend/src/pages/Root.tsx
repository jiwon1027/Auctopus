import React, { useState } from "react";
import ItemsList from "../components/common/ItemsList";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import LiveFilter from "@components/main/LiveFilter";
import Image1 from "@/assets/detail/dummy.svg";
import Image2 from "@/assets/main/airpodsImg.jpg";

interface IAuction {
  img: string;
  title: string;
  price: number;
  viewer: number;
  time: string;
}

const liveAuction: IAuction[] = [
  {
    img: Image1,
    title: "구찌를 굳이?",
    price: 450000,
    viewer: 55,
    time: "2023-01-27 12:00",
  },
  {
    img: Image2,
    title: "에어팟 맥스",
    price: 410000,
    viewer: 15,
    time: "2023-01-27 12:05",
  },
];

export default function Root() {
  const [live, setLive] = useState<"live" | "nonLive">("live");

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };

  return (
    <Layout leftIcon="turtle">
      <MainToggleButtonGroup live={live} onClick={changeLive} />
      <LiveFilter isLive={live === "live"} />
      <ItemsList liveAuction={liveAuction} isLive={live === "live"} />
    </Layout>
  );
}
