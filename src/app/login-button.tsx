/** biome-ignore-all lint/suspicious/noExplicitAny: 公式でgsiの型が提供されていないため一旦として扱う */
"use client";

import Script from "next/script";
import { env } from "@/env";

declare global {
  interface Window {
    google: any;
  }
}

let tokenClient: any;

type LoginButtonProps = {
  onCompleted: (accessToken: string) => void;
};

export function LoginButton({ onCompleted }: LoginButtonProps) {
  function gsiInitialize() {
    console.log("gsiInitialize");
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: env.NEXT_PUBLIC_GSI_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (res: any) => {
        console.log(res);
        onCompleted(res.access_token);
      },
      use_fedcm_for_prompt: false,
      use_fedcm_for_button: false,
    });
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        onLoad={gsiInitialize}
      />
      <button
        type="button"
        id="authorize_button"
        onClick={() => {
          tokenClient.requestAccessToken({ prompt: "consent" });
        }}
      >
        Authorize
      </button>
    </>
  );
}
