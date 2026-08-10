import dotenv from "dotenv";
import process from "node:process";
import z from "zod";

dotenv.config();

const rawEnv = process.env;
const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),

  HOST: z.string(),
  PORT: z.coerce.number().int().gte(1024).lte(65535),

  POSTGRES_PASSWORD: z.string(),
  DATABASE_URL: z.url(),

  LOG_RESPONSE_BODY: z.coerce.boolean()
});

const parsedEnv = envSchema.parse(rawEnv);

export const env = {
  ...parsedEnv,
  isProduction: parsedEnv.NODE_ENV === "production",
  isDevelopment: parsedEnv.NODE_ENV === "development",
  isTest: parsedEnv.NODE_ENV === "test",
};
