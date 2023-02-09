import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/auction/Root";
import ErrorPage from "./pages/ErrorPage";
import ChatPage from "./pages/auction/ChatPage";
import LikesPage from "./pages/auction/LikesPage";
import ProfilePage from "./pages/auth/ProfilePage";
import DetailPage from "./pages/auction/DetailPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdditionalInfoPage from "./pages/auth/AdditionalInfoPage";
import CategoryInfoPage from "./pages/auth/CategoryInfoPage";
import OAuth2RedirectHandler from "@components/auth/login/OAuth2RedirectHandler";
import SearchPage from "./pages/auction/SearchPage";
import NotificationPage from "./pages/auction/NotificationPage";
import AuctionCreatePage from "./pages/auction/AuctionCreatePage";
import BiddingPage from "./pages/auction/BiddingPage";
import VideoRoomComponent from "./pages/openvidu/VideoRoomComponent";

const router = createBrowserRouter([
  { path: "/", element: <Root />, errorElement: <ErrorPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/oauth/callback/kakao", element: <OAuth2RedirectHandler /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signup/additional", element: <AdditionalInfoPage /> },
  { path: "/signup/category", element: <CategoryInfoPage /> },
  { path: "/detail/:auctionSeq", element: <DetailPage /> },
  { path: "/detail/:auctionSeq/bidding", element: <BiddingPage /> },
  { path: "/createAuction", element: <AuctionCreatePage /> },
  { path: "/noti", element: <NotificationPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/likes", element: <LikesPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/live/:auctionSeq", element: <VideoRoomComponent /> },
]);

export default router;
