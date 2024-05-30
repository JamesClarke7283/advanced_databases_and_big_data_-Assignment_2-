#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import "$std/dotenv/load.ts";
import { create_mysql_database } from "./database/mysql/database.ts";
import { create_mongo_database } from "./database/mongodb/database.ts";
import { init_password, password } from "./config.ts";

await init_password();

// Run the database setup before starting the frontend
await create_mysql_database(password);

await create_mongo_database(password);

await dev(import.meta.url, "./main.ts", config);
