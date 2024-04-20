import mysql from 'mysql';

-- Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'company'
});

-- Function to search employees
async function searchEmployees(searchTerm: string) {
  try {
    -- Get a connection from the pool
    const connection = await pool.getConnection();

    -- Define the SQL query
    const query = `
      SELECT e.EMPNO, e.ENAME, j.JOBNAME, m.ENAME AS MANAGER, e.HIREDATE, e.SAL, e.COMM, d.DNAME
      FROM emp e
      JOIN job j ON e.JOBID = j.JOBID
      LEFT JOIN emp m ON e.MGR = m.EMPNO
      JOIN dept d ON e.DEPTNO = d.DEPTNO
      WHERE e.ENAME LIKE ? OR j.JOBNAME LIKE ? OR d.DNAME LIKE ?
    `;

    -- Execute the query
    const [results] = await connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);

    -- Release the connection
    connection.release();

    console.log('Search results:');
    console.log(results);
  } catch (err) {
    console.error('Error searching employees:', err);
  }
}

-- Call the searchEmployees function
searchEmployees('SALES');