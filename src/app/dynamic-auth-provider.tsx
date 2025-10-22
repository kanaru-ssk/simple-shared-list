"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const AuthProvider = dynamic(
  () => import("@/hooks/use-auth").then((mod) => mod.AuthProvider),
  {
    ssr: false,
  },
);

type DynamicAuthProviderProps = {
  children: ReactNode;
};

export function DynamicAuthProvider({ children }: DynamicAuthProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
