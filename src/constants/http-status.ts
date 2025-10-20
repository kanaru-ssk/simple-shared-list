// see: https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status
// 必要なステータスを都度追加する

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
