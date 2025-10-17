"use client";

import { useCallback, useEffect, useState } from "react";
import { SheetAddDialog } from "@/components/sheet-add-dialog";
import { SheetList } from "@/components/sheet-list";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { type Sheet, sheetsSchema } from "@/type/sheet";

export function View() {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  const loadSheets = useCallback(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return;

    const result = sheetsSchema.safeParse(JSON.parse(row));
    if (!result.success) throw new Error(result.error.message);

    setSheets(result.data);
  }, []);

  function addSheet(value: Omit<Sheet, "id">) {
    const id = crypto.randomUUID();
    const newValue = [...sheets, { id, ...value }];
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
    <main>
      <div className="flex flex-row-reverse mb-2">
        <SheetAddDialog addSheet={addSheet} />
      </div>
      <SheetList sheets={sheets} />
    </main>
  );
}
