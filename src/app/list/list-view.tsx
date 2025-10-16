import { useCallback, useEffect, useState } from "react";
import { appendValue } from "@/lib/spreadsheet/append-value";
import { getSheets } from "@/lib/spreadsheet/get-sheets";
import { getValues } from "@/lib/spreadsheet/get-values";

type ListViewProps = {
  accessToken: string;
  spreadsheetId: string;
};

export function ListView({ accessToken, spreadsheetId }: ListViewProps) {
  const [list, setList] = useState<string[][]>();

  const getSheetValues = useCallback(async () => {
    const getSheetsResult = await getSheets(spreadsheetId, accessToken);
    if (!getSheetsResult.ok) return [];
    await appendValue(
      [["test_a5", "test_b5"]],
      accessToken,
      spreadsheetId,
      getSheetsResult.data[0],
    );
    const values = await getValues(
      spreadsheetId,
      getSheetsResult.data[0],
      accessToken,
    );
    setList(values);
  }, [accessToken, spreadsheetId]);

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
