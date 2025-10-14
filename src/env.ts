import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GSI_CLIENT_ID: z.string(),
    NEXT_PUBLIC_SHEET_ID: z.string(), // TODO: ユーザーに入力させるようにする
  },
  runtimeEnv: {
    NEXT_PUBLIC_GSI_CLIENT_ID: process.env.NEXT_PUBLIC_GSI_CLIENT_ID,
    NEXT_PUBLIC_SHEET_ID: process.env.NEXT_PUBLIC_SHEET_ID,
  },
});
