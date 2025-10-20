import { useCallback, useEffect, useState } from "react";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { type Sheet, sheetsSchema } from "@/type/sheet";

export function useSheet() {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  const loadSheets = useCallback(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return;

    const result = sheetsSchema.safeParse(JSON.parse(row));
    if (!result.success) throw new Error(result.error.message);

    setSheets(result.data);
  }, []);

  const getSheet = useCallback((spreadsheetId: string, sheetName: string) => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return;

    const result = sheetsSchema.safeParse(JSON.parse(row));
    if (!result.success) throw new Error(result.error.message);

    return result.data.find(
      (v) => v.spreadsheetId === spreadsheetId && v.sheetName === sheetName,
    );
  }, []);

  const addSheet = useCallback(
    (sheet: Omit<Sheet, "id">): Sheet => {
      const id = crypto.randomUUID();
      const newSheet = { id, ...sheet };
      const newValue = [...sheets, newSheet];
      setSheets(newValue);
      localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
      return newSheet;
    },
    [sheets],
  );

  function editSheet(sheet: Sheet) {
    const newValue = [...sheets.map((v) => (v.id === sheet.id ? sheet : v))];
    setSheets(newValue);
    localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
  }

  function deleteSheet(id: string) {
    const newValue = sheets.filter((v) => v.id !== id);
    setSheets(newValue);
    localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
  }

  useEffect(() => {
    loadSheets();
  }, [loadSheets]);

  return { sheets, getSheet, addSheet, editSheet, deleteSheet };
}
