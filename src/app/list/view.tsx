"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth-provider";
import { CheckListView } from "./check-list-view";
import { useList } from "./use-list";

export function View() {
  const { auth, login, logout } = useAuth();
  const searchParams = useSearchParams();
  const sheetName = searchParams.get("sheetName");
  const { list, addItem, editItem } = useList();

  return (
    <div>
      <header className="px-5 h-16 flex justify-between items-center">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <span className="font-bold">{sheetName}</span>
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

      <main className="max-w-3xl mx-auto p-5">
        {list && (
          <CheckListView list={list} addItem={addItem} editItem={editItem} />
        )}
      </main>
    </div>
  );
}
