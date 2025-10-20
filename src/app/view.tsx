"use client";

import Link from "next/link";
import { SheetAddDialog } from "@/components/sheet-add-dialog";
import { SheetList } from "@/components/sheet-list";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useSheet } from "@/hooks/use-sheet";

export function View() {
  const { sheets, addSheet, editSheet, deleteSheet } = useSheet();
  const { auth, login, logout } = useAuth();

  return (
    <div>
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

      <main className="max-w-3xl mx-auto p-5">
        <div className="flex flex-row-reverse my-2">
          <SheetAddDialog addSheet={addSheet} />
        </div>
        <SheetList
          sheets={sheets}
          editSheet={editSheet}
          deleteSheet={deleteSheet}
        />
      </main>
    </div>
  );
}
