import React from "react";
import ItemList from "@components/notification/ItemList";
import Layout from "@components/common/Layout";
import NoticeMooneo from "@/assets/auction/mooneo-removebg.png";

const userLocal = localStorage.getItem("user");
const user = userLocal ? JSON.parse(userLocal) : "";
const notiDummy = [
  {
    img: NoticeMooneo,
    context: `Auctopus에 처음 오신 ‘${user.nickname}’님! 지구를 지키기에 동참에 주셔셔 감사해요!`,
  },
];

export default function Notification() {
  return (
    <Layout back={true} title={"알림함"}>
      <ItemList notiList={notiDummy} />
    </Layout>
  );
}
