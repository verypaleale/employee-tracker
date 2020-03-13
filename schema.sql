ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password1';

DROP DATABASE IF EXISTS empl_db;

CREATE DATABASE empl_db;

USE empl_db;

CREATE TABLE employees (
    id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

CREATE TABLE roles (
    role_id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,3) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE departments (
    department_id INT NOT NULL,
    department VARCHAR(30)
);