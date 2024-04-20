// Script to initilize the database:

import { Client } from "mysql";

interface Employee {
  EMPNO: number;
  ENAME: string;
  JOB: string;
  MANAGER: string;
  HIREDATE: string;
  SAL: number;
  COMM: number | null;
  DNAME: string;
}

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

async function loadSql(filePath: string): Promise<string> {
  try {
      const sqlContent = await Deno.readTextFile(filePath);  // Using Deno to read file content
      return sqlContent;
  } catch (error) {
      console.error("Error reading SQL file:", error);
      throw new Error(`Failed to read SQL file at ${filePath}`);
  }
}

// Function to add a department using prepared statement from SQL file
export async function addDepartment(client: Client, deptno: number, dname: string, loc: string): Promise<void> {
  const sql = await loadSql('../data/add_department.sql');
  await client.execute(sql, [deptno, dname, loc]);
  console.log('Department added successfully.');
}

// Function to add an employee using prepared statement from SQL file
export async function addEmployee(client: Client, ename: string, jobid: number, mgr: number | null, hiredate: string, sal: number, comm: number | null, deptno: number): Promise<void> {
  const sql = await loadSql('../data/add_employee.sql');
  await client.execute(sql, [ename, jobid, mgr, hiredate, sal, comm, deptno]);
  console.log('Employee added successfully.');
}

// Function to search employees using prepared statement from SQL file
export async function searchEmployees(client: Client, searchTerm: string): Promise<Employee[]> {
  const sql = await loadSql('../data/search_employee.sql');
  const result = await client.query(sql, [searchTerm, searchTerm, searchTerm]);
  console.log('Search completed successfully.');
  return result;
}

