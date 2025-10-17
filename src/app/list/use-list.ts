import { notFound, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { getValues } from "@/lib/spreadsheet/get-values";
import { type Sheet, sheetsSchema } from "@/type/sheet";
import { useAuth } from "../auth-provider";

export function useList() {
  const { auth } = useAuth();
  const searchParams = useSearchParams();
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetName = searchParams.get("sheetName");

  const [list, setList] = useState<string[][]>();
  const [sheet, setSheet] = useState<Sheet>();

  const loadSheet = useCallback(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return;

    const result = sheetsSchema.safeParse(JSON.parse(row));
    if (!result.success) throw new Error(result.error.message);

    setSheet(
      result.data.find(
        (v) => v.spreadsheetId === spreadsheetId && v.sheetName === sheetName,
      ),
    );
  }, [spreadsheetId, sheetName]);

  const getList = useCallback(async () => {
    if (!sheet || !auth) return;

    const result = await getValues(
      auth.accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    if (!result.ok) {
      return notFound();
    }

    setList(result.data);
  }, [auth, sheet]);

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  useEffect(() => {
    getList();
  }, [getList]);

  return { list };
}
