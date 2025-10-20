"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LIST_HEADER } from "@/constants/list-header";
import { useAuth } from "@/hooks/use-auth";
import { useList } from "@/hooks/use-list";
import type { CellValue } from "@/type/cell-value";
import { CheckListView } from "./check-list-view";

export function View() {
  const { auth, login, logout } = useAuth();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");
  const { list, listHeader, addItem, editItem } = useList(
    spreadsheetId,
    sheetName,
  );

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
          <ViewSwitcher
            list={list}
            listHeader={listHeader}
            addItem={addItem}
            editItem={editItem}
          />
        )}
      </main>
    </div>
  );
}

type ViewSwitcherProps = {
  list: CellValue[][];
  listHeader: string[];
  addItem: (item: CellValue[]) => Promise<void>;
  editItem: (item: CellValue[]) => void;
};

// スプレッドシートのヘッダーの内容によってテンプレートを出し分ける
function ViewSwitcher({
  list,
  listHeader,
  addItem,
  editItem,
}: ViewSwitcherProps) {
  switch (JSON.stringify(listHeader)) {
    case JSON.stringify(LIST_HEADER.CHECK_LIST):
      return (
        <CheckListView list={list} addItem={addItem} editItem={editItem} />
      );
    default:
      throw Error("invalid list header");
  }
}
