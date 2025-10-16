import { useCallback, useEffect, useState } from "react";
import { appendValue } from "@/lib/spreadsheet/append-value";
import { getSheets } from "@/lib/spreadsheet/get-sheets";
import { getValues } from "@/lib/spreadsheet/get-values";
import type { Sheet } from "@/type/sheet";

type ListViewProps = {
  accessToken: string;
  sheet: Sheet;
};

export function ListView({ accessToken, sheet }: ListViewProps) {
  const [list, setList] = useState<string[][]>();

  const getSheetValues = useCallback(async () => {
    const getSheetsResult = await getSheets(sheet.spreadsheetId, accessToken);
    if (!getSheetsResult.ok) return [];
    await appendValue(
      [["test_a5", "test_b5"]],
      accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    const values = await getValues(
      accessToken,
      sheet.spreadsheetId,
      sheet.sheetName,
    );
    setList(values);
  }, [accessToken, sheet]);

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
