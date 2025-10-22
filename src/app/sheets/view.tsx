"use client";

import Link from "next/link";
import { HeaderMenu } from "@/components/header-menu";
import { SheetAddDialog } from "@/components/sheet-add-dialog";
import { SheetList } from "@/components/sheet-list";
import { useAuth } from "@/hooks/use-auth";
import { useSheet } from "@/hooks/use-sheet";

export function View() {
  const { sheets, addSheet, editSheet, deleteSheet } = useSheet();
  const { auth, logout } = useAuth();

  return (
    <div>
      <header className="px-5 h-16 flex justify-between items-center">
        <h1>
          <Link href="/" className="font-bold">
            Simple Shared List
          </Link>
        </h1>
        {auth && <HeaderMenu logout={logout} />}
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
