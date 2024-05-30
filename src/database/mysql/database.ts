// Script to initilize the database:

import { Client } from "mysql";

export async function execute_sql_file(path: string, password: string) {
  const db = await connect_mysql_database(password); 
  const sqlContent = await Deno.readTextFile(path);
  const stmt = sqlContent.trim();
  return db.query(stmt);
}


export async function create_mysql_database(password: string) {
  const client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    password: password,
  });

  try {
    const result = await client.query("SHOW DATABASES LIKE 'Movies'");
    if (result.length === 0) {
      console.log("Creating 'Movies' database...");
      await client.execute("CREATE DATABASE Movies");
      console.log("'Movies' database created.");

      console.log("Populating 'Movies' database...");
      const scripts = ["./data/tables/country.sql", "./data/tables/artist.sql", "./data/tables/movie.sql", "./data/tables/role.sql", "./data/tables/internet_user.sql", "./data/tables/score_movie.sql"];
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
      console.log("'Movies' database populated.");
    } else {
      console.log("'Movies' database already exists.");
    }
  } finally {
    await client.close();
  }
}

export async function connect_mysql_database(password: string): Promise<Client> {
  const client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "Movies",
    password: password,
  });
  return client;
}
