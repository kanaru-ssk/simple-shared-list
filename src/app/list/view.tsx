"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HeaderMenu } from "@/components/header-menu";
import { Button } from "@/components/ui/button";
import { HTTP_STATUS } from "@/constants/http-status";
import { LIST_HEADER } from "@/constants/list-header";
import { useAuth } from "@/hooks/use-auth";
import { useList } from "@/hooks/use-list";
import type { CellValue } from "@/type/cell-value";
import { CheckListView } from "./check-list-view";
import { InvalidListHeaderView } from "./invalid-list-header-view";
import { ListSkelton } from "./list-skeleton";
import { PermissionErrorView } from "./permission-error-view";
import { WrongSheetNameView } from "./wrong-sheet-name-view";
import { WrongSpreadsheetIdView } from "./wrong-spreadsheet-id-view";

export function View() {
  const { auth, login, logout } = useAuth();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");
  const { list, listHeader, status, addItem, editItem } = useList(
    spreadsheetId,
    sheetName,
  );

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
        {auth ? (
          <ViewSwitcher
            status={status}
            list={list}
            listHeader={listHeader}
            addItem={addItem}
            editItem={editItem}
            logout={logout}
          />
        ) : (
          <div className="text-center space-y-6">
            <p className="text-neutral-600">
              Please log in with the Google account that has access permissions
              to the target spreadsheet.
            </p>
            <Button onClick={login}>Login with Google</Button>
          </div>
        )}
      </main>
    </div>
  );
}

type ViewSwitcherProps = {
  status: number | undefined;
  list: CellValue[][];
  listHeader: string[];
  addItem: (item: CellValue[]) => Promise<void>;
  editItem: (item: CellValue[]) => void;
  logout: () => void;
};

// スプレッドシートのヘッダーの内容によってテンプレートを出し分ける
function ViewSwitcher({
  status,
  list,
  listHeader,
  addItem,
  editItem,
  logout,
}: ViewSwitcherProps) {
  switch (status) {
    case undefined:
      return <ListSkelton />;
    case HTTP_STATUS.OK:
      break;
    case HTTP_STATUS.BAD_REQUEST:
      return <WrongSheetNameView />;
    case HTTP_STATUS.UNAUTHORIZED:
      logout();
      return null;
    case HTTP_STATUS.FORBIDDEN:
      return <PermissionErrorView />;
    case HTTP_STATUS.NOT_FOUND:
      return <WrongSpreadsheetIdView />;
    default:
      throw new Error("unknown error");
  }

  switch (getViewType(listHeader)) {
    case "check_list":
      return (
        <CheckListView list={list} addItem={addItem} editItem={editItem} />
      );
  }

  return <InvalidListHeaderView />;
}

type ViewType = "check_list" | "unknown";

function getViewType(listHeader: string[]): ViewType {
  if (LIST_HEADER.CHECK_LIST.every((v, i) => v === listHeader[i]))
    return "check_list";

  return "unknown";
}
