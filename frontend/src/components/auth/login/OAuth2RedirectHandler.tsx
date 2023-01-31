import useAuth from "@/store/atoms/useAuth";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const OAuth2RedirectHandler = () => {
  const { kakaoLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code") || "";

  useEffect(() => {
    if (isLoading) {
      setIsLoading(!isLoading);
    } else {
      kakaoLogin(code);
    }
  }, [isLoading]);

  return <CircularProgress />;
};

export default OAuth2RedirectHandler;
