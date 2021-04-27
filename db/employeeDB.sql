create database employeesDB;

use employeesDB;

create table department (
	id int auto_increment,
    name varchar(30) not null,
    primary key (id)
);

drop table if exists role;
create table role (
	id int auto_increment,
    title varchar(30) not null,
    salary int(30) not null,
    department_id varchar(30) not null,
    primary key (id)
);
use employeesDB;
drop table if exists employee;
create table employee (
	id int auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id varchar(30) not null,
    manager_id varchar(30),
    department varchar(30),
    primary key (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", "100000", "Sales"), ("Lead Engineer", "150000", "Engineering"), ("Accountant", "125000", "Finance"), ("Lawyer", "190000", "Legal"),
("Salesperson", "80000", "Sales"), ("Software Engineer", "120000", "Engineering"), ("Legal Team Lead", "250000", "Legal");

INSERT INTO employee (first_name, last_name, role_id, manager_id, department)
VALUES ("Sam", "Oberg", "Lead Engineer","Tammy", "Engineering"), ("Jerry", "Oberg", "Legal Team Lead","Doug", "Legal"), ("Lard", "Oberg", "Accountant","Richard", "Finance"), 
("Joe", "Oberg", "Lawyer","Doug", "Legal"), ("Dan", "Oberg", "Salesperson","Jeff", "Sales"), ("Lois", "Oberg", "Sales Lead","Jeff", "Sales");


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;


