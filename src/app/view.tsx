"use client";

import { useCallback, useEffect, useState } from "react";
import { SheetAddDialog } from "@/components/sheet-add-dialog";
import { SheetTable } from "@/components/sheet-table";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { type Sheet, sheetsSchema } from "@/type/sheet";

export function View() {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  const loadSheets = useCallback(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return;
    console.log("row", row);

    const result = sheetsSchema.safeParse(JSON.parse(row));
    if (!result.success) throw new Error(result.error.message);

    setSheets(result.data);
  }, []);

  function addSheet(value: Sheet) {
    const newValue = [...sheets, value];
    setSheets(newValue);
    localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
  }

  function deleteSheet(spreadsheetId: string, sheetName: string) {
    const newValue = sheets.filter(
      (sheet) =>
        !(
          sheet.spreadsheetId === spreadsheetId && sheet.sheetName === sheetName
        ),
    );
    setSheets(newValue);
    localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
  }

  useEffect(() => {
    loadSheets();
  }, [loadSheets]);

  return (
    <div>
      <SheetTable sheets={sheets} deleteSheet={deleteSheet} />
      <SheetAddDialog addSheet={addSheet} />
    </div>
  );
}
