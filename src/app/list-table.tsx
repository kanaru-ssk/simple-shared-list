import { useCallback, useEffect, useState } from "react";
import { env } from "@/env";
import { appendValue } from "@/lib/append-value";
import { getSheets } from "@/lib/get-sheets";
import { getValues } from "@/lib/get-values";

type ListTableProps = {
  accessToken: string;
};

export function ListTable({ accessToken }: ListTableProps) {
  const [list, setList] = useState<string[][]>();
  const getSheetValues = useCallback(async () => {
    const sheets = await getSheets(env.NEXT_PUBLIC_SHEET_ID, accessToken);
    await appendValue(
      [["test_a5", "test_b5"]],
      accessToken,
      env.NEXT_PUBLIC_SHEET_ID,
      sheets[0],
    );
    const values = await getValues(
      env.NEXT_PUBLIC_SHEET_ID,
      sheets[0],
      accessToken,
    );
    setList(values);
  }, [accessToken]);

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
