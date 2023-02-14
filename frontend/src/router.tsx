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
import BiddingPage from "./pages/auction/BidPage";
import VideoRoomComponent from "./pages/openvidu/VideoRoomComponent";
import AuctionCompeletePage from "./pages/auction/AuctionCompletePage";
import ProfileUpdatePage from "./pages/auth/ProfileUpdatePage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "/main", element: <Root /> },
  { path: "/oauth/callback/kakao", element: <OAuth2RedirectHandler /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signup/additional", element: <AdditionalInfoPage /> },
  { path: "/signup/category", element: <CategoryInfoPage /> },
  { path: "/detail/:auctionSeq", element: <DetailPage /> },
  { path: "/detail/:auctionSeq/bid", element: <BiddingPage /> },
  { path: "/createAuction", element: <AuctionCreatePage /> },
  { path: "/noti", element: <NotificationPage /> },
  { path: "/chat/:auctionSeq", element: <ChatPage /> },
  { path: "/likes", element: <LikesPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/live/:auctionSeq", element: <VideoRoomComponent /> },
  { path: "/auctionComplete", element: <AuctionCompeletePage /> },
  { path: "/profileUpdate", element: <ProfileUpdatePage /> },
]);

export default router;
