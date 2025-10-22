import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
    NEXT_PUBLIC_GSI_CLIENT_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GSI_CLIENT_ID: process.env.NEXT_PUBLIC_GSI_CLIENT_ID,
  },
});
