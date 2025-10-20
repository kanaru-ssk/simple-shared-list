import { useCallback, useState } from "react";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage";
import { type Sheet, sheetsSchema } from "@/type/sheet";

export function useSheet() {
  const [sheets, setSheets] = useState<Sheet[]>(() => {
    const row = localStorage.getItem(LOCALSTORAGE_KEY.SHEETS);
    if (!row) return [];
    const parsed = sheetsSchema.safeParse(JSON.parse(row));
    if (!parsed.success) {
      console.error(parsed.error);
      return [];
    }
    return parsed.data;
  });

  const getSheet = useCallback(
    (spreadsheetId: string, sheetName: string) => {
      return sheets.find(
        (v) => v.spreadsheetId === spreadsheetId && v.sheetName === sheetName,
      );
    },
    [sheets],
  );

  const addSheet = useCallback(
    (sheet: Omit<Sheet, "id">): Sheet => {
      const newSheet = { id: crypto.randomUUID(), ...sheet };
      const newValue = [...sheets, newSheet];
      setSheets(newValue);
      localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
      return newSheet;
    },
    [sheets],
  );

  const editSheet = useCallback(
    (sheet: Sheet) => {
      const newValue = [...sheets.map((v) => (v.id === sheet.id ? sheet : v))];
      setSheets(newValue);
      localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
    },
    [sheets],
  );

  const deleteSheet = useCallback(
    (id: string) => {
      const newValue = sheets.filter((v) => v.id !== id);
      setSheets(newValue);
      localStorage.setItem(LOCALSTORAGE_KEY.SHEETS, JSON.stringify(newValue));
    },
    [sheets],
  );

  return { sheets, getSheet, addSheet, editSheet, deleteSheet };
}
