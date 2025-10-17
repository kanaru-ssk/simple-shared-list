import type { HTTP_METHOD } from "next/dist/server/web/http";
import { z } from "zod";
import { HTTP_STATUS } from "@/constants/http-status";
import type { Result } from "@/type/result";
import { errorSchema } from "./error-schema";

// 必要なプロパティのみバリデーション
const spreadsheetSchema = z.object({
  values: z.array(z.array(z.string())),
});

export async function getValues(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<Result<string[][]>> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!A:B`;
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
    data: responseBody.data.values,
  };
}
