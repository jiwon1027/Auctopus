import React, { useState, useEffect } from "react";
import ItemsList from "../components/common/ItemsList";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import LiveFilter from "@components/main/LiveFilter";
import FloatingButton from "@components/main/FloatingButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { getAuctions } from "@/api/auction";
import { IAuction, IReqType } from "types/auction";

export default function Root() {
  const navigate = useNavigate();
  const [live, setLive] = useState<"live" | "nonLive">("live");
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);
  const [state, setState] = useState(0);
  useEffect(() => {
    const fetchAuction = async (type?: IReqType) => {
      // example: const res = await getAuctions({ sort: "like", state: 0 });
      const res = await getAuctions(requestType(type));
      setAuctionList(res.data);
    };

    fetchAuction();
  }, []);

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
    setState((prev) => (prev === 0 ? 1 : 0));
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

function requestType(type?: IReqType) {
  switch (type) {
    case "like":
      return { sort: type, state: 0 };
    case "startByCategory":
    case "startByStartTime":
      return { sort: type, state: 0 };
    case "onGoingByCategory":
    case "onGoingByStartTime":
      return { sort: type, state: 2 };
    default:
      return { sort: "main", state: 2 };
  }
}
