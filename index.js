// requires
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const start = () => {
    inquirer
    .prompt({
        name: 'optionSelect',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees By Department', 
        'View All Employees By Mananger','Add Employee', 'Remove Employee', 
        'Update Employee Role', 'Update Employee Manager', 'View All Roles']
    })
    .then((data) => {
        const { optionSelect } = data;

        
    })
}

const viewEmployees = () => {

}

const viewEmployeesDepartment = () => {

}

const viewEmployeesManager = () => {

}

const addEmployee = () => {

}

const removeEmployee = () => {

}

const updateRole = () => {

}

const updateManager = () => {

}

const viewAll = () => {

}

start();