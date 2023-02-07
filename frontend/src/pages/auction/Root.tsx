import React, { useState, useEffect } from "react";
import ItemsList from "../../components/common/ItemsList";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import LiveFilter from "@components/main/LiveFilter";
import FloatingButton from "@components/main/FloatingButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { getAuctions } from "@/api/auction";
import { IAuction, IFilter } from "types/auction";

export default function Root() {
  const navigate = useNavigate();
  const [live, setLive] = useState<"live" | "nonLive">("live");
  const [filterValue, setFilterValue] = useState<IFilter>("like");
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);

  useEffect(() => {
    const fetchAuction = async () => {
      const res = await getAuctions({
        sort: filterValue,
        state: live === "live" ? 2 : 0,
      });
      setAuctionList(res.data);
    };

    fetchAuction();
  }, [live, filterValue]);

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };

  const handleFilter = (filter: IFilter) => {
    setFilterValue(filter);
  };

  const RightComponent = (
    <SearchOutlinedIcon className="icon" onClick={() => navigate("/search")} />
  );

  return (
    <Layout right={RightComponent}>
      <MainToggleButtonGroup live={live} onClick={changeLive} />
      <LiveFilter
        isLive={live === "live"}
        filterValue={filterValue}
        handleFilter={handleFilter}
      />
      <ItemsList liveAuction={auctionList} isLive={live === "live"} />
      <FloatingButton />
    </Layout>
  );
}
