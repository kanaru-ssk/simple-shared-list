"use client";

import Script from "next/script";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

const authSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
});

type Auth = z.infer<typeof authSchema>;

type TokenClient = {
  requestAccessToken: (arg: { prompt?: string }) => void;
};

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (arg: {
            client_id: string;
            scope: string;
            callback: (arg: Auth) => void;
            use_fedcm_for_prompt: boolean;
            use_fedcm_for_button: boolean;
          }) => TokenClient;
        };
      };
    };
  }
}

let tokenClient: TokenClient;

type LoginButtonProps = {
  onCompleted: (accessToken: string) => void;
};

export function LoginButton({ onCompleted }: LoginButtonProps) {
  function gsiInitialize() {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: env.NEXT_PUBLIC_GSI_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (res) => onCompleted(res.access_token),
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
      <Button onClick={() => tokenClient.requestAccessToken({ prompt: "" })}>
        Authorize with Google
      </Button>
    </>
  );
}
