import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../env';

export const pool = new Pool({ connectionString: env.postgresUrl })

export const db = drizzle({
    client: pool,
    casing: "snake_case"
});
