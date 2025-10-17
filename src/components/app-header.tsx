"use client";

import Link from "next/link";
import { useAuth } from "@/app/auth-provider";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { auth, login, logout } = useAuth();

  return (
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
  );
}
