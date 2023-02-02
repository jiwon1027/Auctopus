import React, { useState, useEffect } from "react";
import ItemsList from "../components/common/ItemsList";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import LiveFilter from "@components/main/LiveFilter";
import FloatingButton from "@components/main/FloatingButton";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const [live, setLive] = useState<"live" | "nonLive">("live");
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_DOMAIN
        }/api/search?page=0&size=20&sort=main`
      )
      .then((res) => {
        const data = res.data.resList;
        setAuctionList(data);
      });
  }, []);

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };

  const RightComponent = (
    <SearchOutlinedIcon className="icon" onClick={() => navigate("/search")} />
  );

  return (
    <Layout right={RightComponent}>
      <MainToggleButtonGroup
        text={{
          left: "진행중",
          right: "진행예정",
        }}
        live={live}
        onClick={changeLive}
      />
      <LiveFilter isLive={live === "live"} setAuctionList={setAuctionList} />
      <ItemsList liveAuction={auctionList} isLive={live === "live"} />
      <FloatingButton />
    </Layout>
  );
}
