import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/common/ItemsList";

// import Footer from "./components/common/Footer";
import Chat from "./pages/Chat";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  { path: "chat", element: <Chat /> },
  { path: "likes", element: <Likes /> },
  { path: "profile", element: <Profile /> },
]);

export default router;
