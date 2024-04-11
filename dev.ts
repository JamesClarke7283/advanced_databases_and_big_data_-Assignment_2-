#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import "$std/dotenv/load.ts";
import { createDatabase } from "./init_database.ts";

export const password = Deno.env.get("DB_PASSWORD");
if (!password) {
  console.error("DB_PASSWORD environment variable is not set.");
  Deno.exit(1);
}

// Run the database setup before starting the frontend
await createDatabase(password);

await dev(import.meta.url, "./main.ts", config);
