import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/common/Layout";

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
]);

export default router;
