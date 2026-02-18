import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  max: 10,
  prepare: false,
  idle_timeout: 20,
  connect_timeout: 10,
  max_lifetime: 60 * 30,
});

export const db = drizzle(client, {
  schema,
  logger: !isProduction,
});
