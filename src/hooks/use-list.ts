import { useCallback, useEffect, useState } from "react";
import { HTTP_STATUS } from "@/constants/http-status";
import { useAuth } from "@/hooks/use-auth";
import { useSheet } from "@/hooks/use-sheet";
import { appendValues, getValues, updateValues } from "@/lib/google-sheets";
import type { CellValue } from "@/type/cell-value";
import type { Sheet } from "@/type/sheet";

export function useList(
  spreadsheetId: string | null,
  sheetName: string | null,
) {
  const { auth } = useAuth();
  const [list, setList] = useState<CellValue[][]>([]);
  const [status, setStatus] = useState<number>();
  const [listHeader, setListHeader] = useState<string[]>([]);
  const [sheet, setSheet] = useState<Sheet>();
  const { getSheet, addSheet } = useSheet();

  // SearchParamsのspreadsheetId,sheetNameからsheetを取得
  const loadSheet = useCallback(() => {
    if (!spreadsheetId || !sheetName) return;

    const targetSheet = getSheet(spreadsheetId, sheetName);

    if (targetSheet) {
      setSheet(targetSheet);
    } else {
      // sheetsになかった場合(共有リンクからのアクセス)は新規作成
      const newSheet = addSheet({ spreadsheetId, sheetName });
      setSheet(newSheet);
    }
  }, [spreadsheetId, sheetName, getSheet, addSheet]);

  const getList = useCallback(async () => {
    if (!auth || !sheet) {
      setListHeader([]);
      setList([]);
      return;
    }

    const result = await getValues(
      auth.accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    if (!result.ok) {
      setStatus(result.status);
      return;
    }

    setStatus(HTTP_STATUS.OK);
    setListHeader(result.data[0]);
    setList(result.data.slice(1));
  }, [auth, sheet]);

  async function addItem(item: CellValue[]) {
    if (!auth || !sheet || list === undefined) return;

    const id = crypto.randomUUID();
    const newItem = [id, ...item];
    setList([...list, newItem]);
    await appendValues(
      [newItem],
      auth.accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
  }

  function editItem(item: CellValue[]) {
    if (!auth || !sheet || list === undefined) return;

    const targetIndex = list.findIndex((v) => v[0] === item[0]);
    if (targetIndex === -1) return;

    const newValue = list.map((v) => (v[0] === item[0] ? item : v));
    setList(newValue);
    updateValues(
      [item],
      {
        from: { row: targetIndex + 2, col: 1 },
        to: { row: targetIndex + 2, col: item.length },
      },
      auth.accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
  }

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  useEffect(() => {
    getList();
  }, [getList]);

  return { list, listHeader, status, addItem, editItem };
}
