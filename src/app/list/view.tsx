"use client";

import { ChevronLeft, UserRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LogoutDialog } from "@/components/logout-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
        <div className="flex gap-2 w-full">
          <Link href="/">
            <ChevronLeft />
          </Link>
          <span className="font-bold truncate">{sheetName}</span>
        </div>

        {auth && <PopoverMenu logout={logout} />}
      </header>

      <main className="max-w-3xl mx-auto p-5">
        {!auth && (
          <div className="text-center space-y-6">
            <p className="text-neutral-600">
              Please log in with the Google account that has access permissions
              to the target spreadsheet.
            </p>
            <Button onClick={login}>Login with Google</Button>
          </div>
        )}
        {list.length !== 0 && (
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

type PopoverMenuProps = {
  logout: () => void;
};

function PopoverMenu({ logout }: PopoverMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserRound />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <LogoutDialog logout={logout} />
      </PopoverContent>
    </Popover>
  );
}
