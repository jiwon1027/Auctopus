import useAuth from "@/store/atoms/useAuth";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const OAuth2RedirectHandler = () => {
  const { kakaoLogin } = useAuth();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code") || "";

  useEffect(() => {
    kakaoLogin(code);
  }, []);

  return <CircularProgress />;
};

export default OAuth2RedirectHandler;
