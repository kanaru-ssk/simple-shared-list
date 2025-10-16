"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginButton } from "@/components/login-button";
import { ListView } from "./list-view";

export function View() {
  const [accessToken, setAccessToken] = useState<string>();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");

  function loginCompletedHandler(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  if (!spreadsheetId) return notFound();

  // 未認証の場合はログインボタン表示
  if (!accessToken) return <LoginButton onCompleted={loginCompletedHandler} />;

  return <ListView accessToken={accessToken} spreadsheetId={spreadsheetId} />;
}
