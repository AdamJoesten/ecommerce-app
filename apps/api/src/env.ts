import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const EnvironmentSchema = z.object({
    POSTGRES_URL: z.url(),
    API_PORT: z.number().gt(1024).lt(65535)
})

const parsedEnv = EnvironmentSchema.parse(process.env);

export const env = {
    postgresUrl: parsedEnv.POSTGRES_URL,
    apiPort: parsedEnv.API_PORT
}