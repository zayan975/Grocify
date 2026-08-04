import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl ="postgresql://neondb_owner:npg_6hs5VSoWrljU@ep-royal-sound-ax3a5zjo-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for API routes.");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });