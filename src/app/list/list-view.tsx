import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ListTable } from "@/components/list-table";
import { HTTP_STATUS } from "@/constants/http-status";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { getValues } from "@/lib/spreadsheet/get-values";
import { type Sheet, sheetsSchema } from "@/type/sheet";

type ListViewProps = {
  accessToken: string;
  spreadsheetId: string;
  sheetName: string;
  logout: () => void;
};

export function ListView({
  accessToken,
  spreadsheetId,
  sheetName,
  logout,
}: ListViewProps) {
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

  const getSheetValues = useCallback(async () => {
    if (!sheet) return;

    const result = await getValues(
      accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    if (!result.ok) {
      if (result.status === HTTP_STATUS.UNAUTHORIZED) return logout();
      return notFound();
    }

    setList(result.data);
  }, [accessToken, sheet, logout]);

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  useEffect(() => {
    getSheetValues();
  }, [getSheetValues]);

  if (!list) return null;

  return (
    <div>
      <ListTable list={list} />
    </div>
  );
}
