import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ChatPage from "./pages/ChatPage";
import LikesPage from "./pages/LikesPage";
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdditionalInfoPage from "./pages/auth/AdditionalInfoPage";
import CategoryInfoPage from "./pages/auth/CategoryInfoPage";
import OAuth2RedirectHandler from "@components/auth/login/OAuth2RedirectHandler";
import SearchPage from "./pages/search/SearchPage";
import ResultPage from "./pages/search/ResultPage";
import NotificationPage from "./pages/NotificationPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/oauth/callback/kakao",
    element: <OAuth2RedirectHandler />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signup/additional",
    element: <AdditionalInfoPage />,
  },
  {
    path: "/signup/category",
    element: <CategoryInfoPage />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
  { path: "/noti", element: <NotificationPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/likes", element: <LikesPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/result", element: <ResultPage /> },
]);

export default router;
