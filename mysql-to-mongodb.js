import { Client } from "mysql";
import { parse } from "https://deno.land/std@0.131.0/flags/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.131.0/fs/mod.ts";
import { writeFileSync } from "node:fs";

// Check if MARIADB_ROOT_PASSWORD environment variable is set
const password = Deno.env.get("MARIADB_ROOT_PASSWORD");
if (!password) {
  console.error("Error: MARIADB_ROOT_PASSWORD environment variable is not set.");
  Deno.exit(1);
}

// Parse command-line arguments
const args = parse(Deno.args, {
  alias: {
    o: "output-dir"
  },
  default: {
    "output-dir": "./"
  }
});

const databaseName = args._[0];
if (!databaseName) {
  console.error("Error: No database name provided.");
  console.error("Usage: deno run --allow-env --allow-net --allow-write mysql-to-mongodb.js <DATABASE> [-o/--output-dir <output_directory>]");
  Deno.exit(1);
}

const outputDir = args["output-dir"];
ensureDirSync(outputDir);

// MySQL connection details
const client = new Client();
await client.connect({
  hostname: "127.0.0.1",
  username: "root",
  db: databaseName,
  password: password,
});

// Fetch all table names
const tables = await client.query(`SHOW TABLES`);
const tableNames = tables.map((table) => Object.values(table)[0]);

// Export each table to JSON
for (const tableName of tableNames) {
  const rows = await client.query(`SELECT * FROM ${tableName}`);
  const jsonContent = JSON.stringify(rows, null, 2);
  const outputPath = `${outputDir}/${databaseName}.${tableName}.json`;
  writeFileSync(outputPath, jsonContent);
  console.log(`Exported ${tableName} to ${outputPath}`);
}

// Close MySQL connection
await client.close();
