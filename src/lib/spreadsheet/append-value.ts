import type { HTTP_METHOD } from "next/dist/server/web/http";

export async function appendValue(
  values: string[][],
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!A:B:append?valueInputOption=RAW`;
  const method: HTTP_METHOD = "POST";
  const headers = { Authorization: `Bearer ${accessToken}` };
  const body = JSON.stringify({ range: `${sheetTitle}!A:B`, values: values });
  const res = await fetch(url, { method, headers, body });

  if (!res.ok) return false;

  await res.json();
  return true;
}
