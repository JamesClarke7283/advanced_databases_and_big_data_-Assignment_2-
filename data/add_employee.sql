import mysql from 'mysql';

-- Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'company'
});

-- Function to add a new employee
async function addEmployee(ename: string, jobid: number, mgr: number | null, hiredate: string, sal: number, comm: number | null, deptno: number) {
  try {
    -- Get a connection from the pool
    const connection = await pool.getConnection();

    -- Define the SQL query
    const query = `
      INSERT INTO emp (ENAME, JOBID, MGR, HIREDATE, SAL, COMM, DEPTNO)
      VALUES (?, ?, ?, STR_TO_DATE(?, '%d-%M-%y'), ?, ?, ?)
    `;

    -- Execute the query
    const [result] = await connection.query(query, [ename, jobid, mgr, hiredate, sal, comm, deptno]);

    -- Release the connection
    connection.release();

    console.log(`Employee added with ID: ${result.insertId}`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

-- Call the addEmployee function
addEmployee('NEWEMPLOYEE', 1, 7902, '01-may-24', 3000, null, 20);