import type { HTTP_METHOD } from "next/dist/server/web/http";
import { z } from "zod";
import { HTTP_STATUS } from "@/constants/http-status";
import type { Result } from "@/type/result";

// 必要なプロパティのみバリデーション
const spreadsheetSchema = z.object({
  sheets: z.array(
    z.object({
      properties: z.object({
        title: z.string(),
      }),
    }),
  ),
});

const errorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
    status: z.string(),
  }),
});

export async function getSheets(
  spreadsheetId: string,
  accessToken: string,
): Promise<Result<string[]>> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  const method: HTTP_METHOD = "GET";
  const headers = { Authorization: `Bearer ${accessToken}` };
  const res = await fetch(url, { method, headers });

  if (!res.ok) {
    const responseBody = errorSchema.safeParse(await res.json());
    if (!responseBody.success) {
      return {
        ok: false,
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errorMessage: "unexpected error",
      };
    }
    return {
      ok: false,
      status: responseBody.data.error.code,
      errorMessage: responseBody.data.error.message,
    };
  }

  const responseBody = spreadsheetSchema.safeParse(await res.json());
  if (!responseBody.success) {
    return {
      ok: false,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorMessage: "unexpected error",
    };
  }
  return {
    ok: true,
    data: responseBody.data.sheets.map((sheet) => sheet.properties.title),
  };
}
