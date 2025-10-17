"use client";

import { notFound, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "../auth-provider";
import { ListView } from "./list-view";

export function View() {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");

  if (!spreadsheetId || !sheetName) return notFound();

  if (!auth) {
    return (
      <div>
        <Spinner className="size-6 text-neutral-500" />
      </div>
    );
  }

  return (
    <ListView
      accessToken={auth.accessToken}
      spreadsheetId={spreadsheetId}
      sheetName={sheetName}
    />
  );
}
