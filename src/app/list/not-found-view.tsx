"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HeaderMenu } from "@/components/header-menu";
import { useAuth } from "@/hooks/use-auth";

export function NotFoundView() {
  const { auth, logout } = useAuth();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");

  return (
    <div>
      <header className="px-5 h-16 flex justify-between items-center">
        <div className="flex gap-2 w-full min-w-0">
          <Link href="/">
            <ChevronLeft />
          </Link>
          <span className="font-bold truncate">{sheetName}</span>
        </div>

        {auth && <HeaderMenu logout={logout} />}
      </header>

      <main className="max-w-3xl mx-auto p-5">
        <h2 className="text-3xl font-bold my-4">404 Not Found</h2>
        <p>spreadsheetId, sheetNameが一致するシートが見つかりませんでした。</p>
        <ul>
          <li>spreadsheetId: {spreadsheetId}</li>
          <li>sheetName: {sheetName}</li>
        </ul>
        <Link href="/">Return Home</Link>
      </main>
    </div>
  );
}
