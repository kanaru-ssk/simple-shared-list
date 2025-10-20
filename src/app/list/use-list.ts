import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { appendValue } from "@/lib/spreadsheet/append-value";
import { getValues } from "@/lib/spreadsheet/get-values";
import { updateValue } from "@/lib/spreadsheet/update-value";
import type { CellValue } from "@/type/cell-value";
import type { Sheet } from "@/type/sheet";
import { useAuth } from "../auth-provider";
import { useSheet } from "../use-sheet";

export function useList(
  spreadsheetId: string | null,
  sheetName: string | null,
) {
  const { auth } = useAuth();
  const [list, setList] = useState<CellValue[][]>();
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
      addSheet({ spreadsheetId, sheetName });
    }
  }, [spreadsheetId, sheetName, getSheet, addSheet]);

  const getList = useCallback(async () => {
    if (!auth || !sheet) return;

    const result = await getValues(
      auth.accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    if (!result.ok) {
      return notFound();
    }

    setListHeader(result.data[0]);
    setList(result.data.slice(1));
  }, [auth, sheet]);

  async function addItem(item: CellValue[]) {
    if (!auth || !sheet || list === undefined) return;

    const id = crypto.randomUUID();
    const newItem = [id, ...item];
    setList([...list, newItem]);
    await appendValue(
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
    updateValue(
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

  return { list, listHeader, addItem, editItem };
}
