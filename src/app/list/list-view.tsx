import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
      {list.map((row, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: reactで操作しないのでignore
        <div key={i}>
          {row.map((cell, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: reactで操作しないのでignore
            <span key={`${i}-${j}`} className="px-4">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
