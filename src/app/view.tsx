"use client";

import { useEffect, useState } from "react";
import { ListTable } from "./list-table";
import { LoginButton } from "./login-button";

export function View() {
  const [accessToken, setAccessToken] = useState<string>();

  function loginCompletedHandler(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  // 未認証の場合はログインボタン表示
  if (!accessToken) return <LoginButton onCompleted={loginCompletedHandler} />;

  return <ListTable accessToken={accessToken} />;
}
