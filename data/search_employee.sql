-- SQL to search for employees by name, job title or department name
<<<<<<< HEAD
SELECT e.EMPNO, e.ENAME, j.JOBNAME, e.MGR, e.HIREDATE, e.SAL, e.COMM, d.DNAME
FROM emp e
JOIN job j ON e.JOBID = j.JOBID
LEFT JOIN emp m ON e.MGR = m.EMPNO
JOIN dept d ON e.DEPTNO = d.DEPTNO
WHERE e.ENAME LIKE CONCAT('%', ?, '%')
  OR j.JOBNAME LIKE CONCAT('%', ?, '%')
  OR d.DNAME LIKE CONCAT('%', ?, '%')
=======
SELECT e.EMPNO, e.ENAME, j.JOB, m.ENAME AS MANAGER, e.HIREDATE, e.SAL, e.COMM, d.DNAME
FROM emp e
LEFT JOIN job j ON e.JOBID = j.JOBID
LEFT JOIN emp m ON e.MGR = m.EMPNO
LEFT JOIN dept d ON e.DEPTNO = d.DEPTNO
WHERE e.ENAME LIKE CONCAT('%', ?, '%')
   OR j.JOB LIKE CONCAT('%', ?, '%')
   OR d.DNAME LIKE CONCAT('%', ?, '%');
>>>>>>> parent of 41284f8 (migrated data, added sql queries for part 1)
