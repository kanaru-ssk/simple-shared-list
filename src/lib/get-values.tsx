import type { HTTP_METHOD } from "next/dist/server/web/http";

export async function getValues(
  spreadsheetId: string,
  sheetTitle: string,
  accessToken: string,
): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!A:B?key=${"AIzaSyAK4uwSiKR6mTf1ZPHOZvgs86hbrQ4A0rI"}`;
  const method: HTTP_METHOD = "GET";
  const headers = { Authorization: `Bearer ${accessToken}` };
  const res = await fetch(url, { method, headers });
  const data = await res.json();
  return data.values;
}
