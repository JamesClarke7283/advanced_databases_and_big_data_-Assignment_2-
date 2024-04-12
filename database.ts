// Script to initilize the database:

import { Client } from "https://deno.land/x/mysql/mod.ts";


export async function create_database(password: string) {
  const client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    password: password,
  });

  try {
    const result = await client.query("SHOW DATABASES LIKE 'company'");
    if (result.length === 0) {
      console.log("Creating 'company' database...");
      await client.execute("CREATE DATABASE company");
      console.log("'company' database created.");

      console.log("Populating 'company' database...");
      const scripts = ["./data/dept.sql", "./data/job.sql", "./data/emp.sql"];
      for (const script of scripts) {
        const sqlContent = await Deno.readTextFile(script);
        const stmts = sqlContent.split(";")
        for (let stmt of stmts) {
          stmt = stmt.trim()
          if (stmt) {
          console.log(`Executing ${stmt+";"}`)
          await client.execute(stmt+";");
          }
        }
        console.log(`Executed ${script}`);
      }
      console.log("'company' database populated.");
    } else {
      console.log("'company' database already exists.");
    }
  } finally {
    await client.close();
  }
}

export async function connect_database(password: string): Promise<Client> {
  const client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "company",
    password: password,
  });
  return client;
}