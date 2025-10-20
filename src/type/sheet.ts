import { z } from "zod";

export const sheetSchema = z.object({
  id: z.string(),
  spreadsheetId: z.string(),
  sheetName: z.string(),
});
export const sheetsSchema = z.array(sheetSchema);

// スプレッドシートの共有リンクをIDに変換
export const sharedLinkToId = z.preprocess(
  (value: string) => String(value).match(/\/d\/([^/]+)/)?.[1],
  z.string().min(1),
);

export type Sheet = z.infer<typeof sheetSchema>;
