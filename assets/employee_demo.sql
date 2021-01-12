DROP DATABASE IF EXISTS employee_demo;
CREATE DATABASE employee_demo;

USE employee_demo;

CREATE TABLE department
(
    id INT NOT NULL AUTO_INCREMENT
    , name VARCHAR(30) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE role
(
    id INT NOT NULL AUTO_INCREMENT
    , title VARCHAR(30) NOT NULL
    , salary DECIMAL(8, 2)
    , department_id INT
    , PRIMARY KEY (id)
);

CREATE TABLE employee
(
    id INT NOT NULL AUTO_INCREMENT
    , first_name VARCHAR(30)
    , last_name VARCHAR(30)
    , role_id INT
    , manager_id INT DEFAULT NULL
    , PRIMARY KEY (id)
);

/* Create Starting Table Data */

INSERT INTO department (name)
VALUES ("Operations")
, ("Sales")
, ("Finance")
, ("Legal")
, ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 250000, 1)
, ("COO", 3000000, 1) 
, ("CIO", 2000000, 5) 
, ("CFO", 2000000, 3)
, ("Senior Account Executive", 200000, 2) 
, ("Account Executive", 90000, 2)
, ("Controller", 150000, 3)
, ("Accountant", 70000, 3)
, ("Head Legal Counsel", 200000, 4) 
, ("Legal Counsel", 150000, 4) 
, ("Senior Software Engineer", 150000, 5) 
, ("Software Engineer", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("George", "Washington", 1, NULL)
, ("Brian", "Johnson", 2, NULL)
, ("Carl", "Sagan", 3, NULL)
, ("Amos", "Andy", 4, NULL)
, ("Phil", "Swift", 5, 2)
, ("Erik", "Magnusson", 6, 5)
, ("Barbara", "Bush", 7, 4)
, ("Floyd", "Mayweather", 8, 7)
, ("Roberta", "Williams", 9, 2)
, ("Yasmine", "Pulido", 10, 9)
, ("Katy", "Parker", 11, 3)
, ("John", "Hancock", 12, 11);