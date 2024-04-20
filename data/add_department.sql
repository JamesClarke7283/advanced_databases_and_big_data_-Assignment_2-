import mysql from 'mysql';

-- Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'company'
});

-- Function to add a new department
async function addDepartment(dname: string, loc: string) {
  try {
    -- Get a connection from the pool
    const connection = await pool.getConnection();

    -- Define the SQL query
    const query = 'INSERT INTO dept (DNAME, LOC) VALUES (?, ?)';

    -- Execute the query
    const [result] = await connection.query(query, [dname, loc]);

    -- Release the connection
    connection.release();

    console.log(`Department added with ID: ${result.insertId}`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

-- Call the addDepartment function
addDepartment('HUMAN RESOURCES', 'SEATTLE');