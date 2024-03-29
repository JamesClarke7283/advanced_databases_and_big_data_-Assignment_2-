CREATE TABLE emp (
  EMPNO NUMBER(4) GENERATED ALWAYS AS IDENTITY,
  ENAME VARCHAR2(10),
  JOB VARCHAR2(9),
  MGR NUMBER(4),
  HIREDATE DATE,
  SAL NUMBER(7,2),
  COMM NUMBER(7,2),
  DEPTNO NUMBER(2),
  CONSTRAINT pk_emp PRIMARY KEY (EMPNO),
  CONSTRAINT fk_emp_depts FOREIGN KEY (DEPTNO) REFERENCES dept (DEPTNO)
);

INSERT INTO emp VALUES (7369,'SMITH','CLERK',7902,TO_DATE('17-dec-80','dd-mon-yy'),800,NULL,20);
INSERT INTO emp VALUES (7499,'ALLEN','SALESMAN',7698,TO_DATE('20-feb-81','dd-mon-yy'),1600,300,30);
INSERT INTO emp VALUES (7521,'WARD','SALESMAN',7698,TO_DATE('22-feb-81','dd-mon-yy'),1250,500,30);
INSERT INTO emp VALUES (7566,'JONES','MANAGER',7839,TO_DATE('02-apr-81','dd-mon-yy'),2975,NULL,20);
INSERT INTO emp VALUES (7654,'MARTIN','SALESMAN',7698,TO_DATE('28-sep-81','dd-mon-yy'),1250,1400,30);
INSERT INTO emp VALUES (7698,'BLAKE','MANAGER',7839,TO_DATE('01-may-81','dd-mon-yy'),2850,NULL,30);
INSERT INTO emp VALUES (7782,'CLARK','MANAGER',7839,TO_DATE('09-jun-81','dd-mon-yy'),2450,NULL,10);
INSERT INTO emp VALUES (7839,'KING','PRESIDENT',NULL,TO_DATE('17-nov-81','dd-mon-yy'),5000,NULL,10);
INSERT INTO emp VALUES (7844,'TURNER','SALESMAN',7698,TO_DATE('08-sep-81','dd-mon-yy'),1500,0,30);
INSERT INTO emp VALUES (7876,'ADAMS','CLERK',7788,TO_DATE('23-sep-87','dd-mon-yy'),1100,NULL,20);
INSERT INTO emp VALUES (7900,'JAMES','CLERK',7698,TO_DATE('03-dec-81','dd-mon-yy'),950,NULL,30);
INSERT INTO emp VALUES (7902,'FORD','ANALYST',7566,TO_DATE('03-dec-81','dd-mon-yy'),3000,NULL,20);
INSERT INTO emp VALUES (7934,'MILLER','CLERK',7782,TO_DATE('23-jan-82','dd-mon-yy'),1300,NULL,10);