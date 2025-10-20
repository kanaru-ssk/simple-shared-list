// see: https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append

import type { HTTP_METHOD } from "next/dist/server/web/http";
import { HTTP_STATUS } from "@/constants/http-status";
import type { CellValue } from "@/type/cell-value";
import type { Result } from "@/type/result";
import { errorSchema } from "./error-schema";

export async function appendValue(
  values: CellValue[][],
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<Result<undefined>> {
  const range = sheetTitle;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
  const method: HTTP_METHOD = "POST";
  const headers = { Authorization: `Bearer ${accessToken}` };
  const body = JSON.stringify({ range, values });
  const res = await fetch(url, { method, headers, body });

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

  return {
    ok: true,
    data: undefined,
  };
}
