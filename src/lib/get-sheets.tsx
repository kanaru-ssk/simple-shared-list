/** biome-ignore-all lint/suspicious/noExplicitAny: sheets APIのレスポンスの型を後でチェック入れる */

import type { HTTP_METHOD } from "next/dist/server/web/http";

export async function getSheets(
  spreadsheetId: string,
  accessToken: string,
): Promise<string[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${"AIzaSyAK4uwSiKR6mTf1ZPHOZvgs86hbrQ4A0rI"}`;
  const method: HTTP_METHOD = "GET";
  const headers = { Authorization: `Bearer ${accessToken}` };
  const res = await fetch(url, { method, headers });
  const data = await res.json();
  return data.sheets.map((s: any) => s.properties.title);
}
