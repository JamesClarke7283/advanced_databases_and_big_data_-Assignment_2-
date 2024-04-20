-- SQL to insert a new employee into the 'emp' table

-- ENAME: Employee Name (String)
-- JOBID: Job ID (Integer)
-- MGR: Manager's Employee Number (Nullable Integer)
-- HIREDATE: Hire Date (Date, formatted as 'YYYY-MM-DD')
-- SAL: Salary (Integer)
-- COMM: Commission (Nullable Integer)
-- DEPTNO: Department Number (Integer)

INSERT INTO emp (ENAME, JOBID, MGR, HIREDATE, SAL, COMM, DEPTNO)
VALUES (?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?);
