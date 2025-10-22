import { z } from "zod";

export const sheetSchema = z.object({
  id: z.string(),
  spreadsheetId: z.string(),
  sheetName: z.string(),
});
export const sheetsSchema = z.array(sheetSchema);

// スプレッドシートのURLをIDに変換
// https://docs.google.com/spreadsheets/d/xxx/edit?gid=0#gid=0 => xxx
export const urlToId = z.preprocess(
  (value: string) => String(value).match(/\/d\/([^/]+)/)?.[1],
  z.string().min(1),
);
export function idToUrl(id: string) {
  return `https://docs.google.com/spreadsheets/d/${id}`;
}

export type Sheet = z.infer<typeof sheetSchema>;
