"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginButton } from "@/components/login-button";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { ListView } from "./list-view";

export function View() {
  const [accessToken, setAccessToken] = useState<string>();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");

  function loginCompletedHandler(accessToken: string) {
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, accessToken);
    setAccessToken(accessToken);
  }

  function logout() {
    localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
    setAccessToken(undefined);
  }

  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
    if (token) setAccessToken(token);
  }, []);

  if (!spreadsheetId || !sheetName) return notFound();

  // 未認証の場合はログインボタン表示
  if (!accessToken) return <LoginButton onCompleted={loginCompletedHandler} />;

  return (
    <ListView
      accessToken={accessToken}
      spreadsheetId={spreadsheetId}
      sheetName={sheetName}
      logout={logout}
    />
  );
}
