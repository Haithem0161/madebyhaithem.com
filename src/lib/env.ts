import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  API_BASE_URL: z.url().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().optional(),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

const isServer = typeof window === "undefined";

const parsed = isServer
  ? serverSchema.safeParse(process.env)
  : clientSchema.safeParse({
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.issues);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
