"use client";

import Link from "next/link";
import Script from "next/script";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { env } from "@/env";

export const authSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.number(),
});

export type Auth = z.infer<typeof authSchema>;

const AuthContext = createContext<Auth | null>(null);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const tokenClientRef = useRef<TokenClient>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  function login() {
    tokenClientRef.current?.requestAccessToken({ prompt: "" });
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem(LOCALSTORAGE_KEY.AUTH);
  }

  function loginCallback({ access_token, expires_in }: AuthResponse) {
    if (!tokenClientRef.current) return;

    // 失効の60秒前にトークン再取得
    const expiresAt = expires_in * 1_000;
    timerRef.current = setTimeout(
      () => tokenClientRef.current?.requestAccessToken({ prompt: "" }),
      expiresAt - 60_000,
    );
    const newAuth = { accessToken: access_token, expiresAt };
    setAuth(newAuth);
    localStorage.setItem(LOCALSTORAGE_KEY.AUTH, JSON.stringify(newAuth));
  }

  const loadAuth = useCallback(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.AUTH);
    if (!row) return;

    const result = authSchema.safeParse(JSON.parse(row));
    if (!result.success) return localStorage.removeItem(LOCALSTORAGE_KEY.AUTH);

    setAuth(result.data);
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  function gsiInitialize() {
    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: env.NEXT_PUBLIC_GSI_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (res) => loginCallback(res),
      use_fedcm_for_prompt: false,
      use_fedcm_for_button: false,
    });
  }

  return (
    <AuthContext.Provider value={auth}>
      <header className="px-5 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold">
          Simple Shared List
        </Link>
        {auth ? (
          <Button onClick={logout} variant="outline" size="sm">
            Logout
          </Button>
        ) : (
          <Button onClick={login} size="sm">
            Login with Google
          </Button>
        )}
      </header>

      {children}
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        onLoad={gsiInitialize}
      />
    </AuthContext.Provider>
  );
}

const authResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
});

type AuthResponse = z.infer<typeof authResponseSchema>;

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
            callback: (arg: AuthResponse) => void;
            use_fedcm_for_prompt: boolean;
            use_fedcm_for_button: boolean;
          }) => TokenClient;
        };
      };
    };
  }
}
