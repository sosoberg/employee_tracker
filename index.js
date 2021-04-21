// requires
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'password',
    database: 'employeesDB',
});

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

        if (optionSelect == 'View All Employees') {
            viewEmployees();
        }
        if (optionSelect == 'View All Employees By Department') {
            viewEmployeesDepartment();
        }
        if (optionSelect == 'View All Employees By Mananger') {
            viewEmployeesManager();
        }
        if (optionSelect == 'Add Employee') {
            addEmployee();
        }
        if (optionSelect == 'Remove Employee') {
            removeEmployee();
        }
        if (optionSelect == 'Update Employee Role') {
            updateRole();
        }
        if (optionSelect == 'Update Employee Manager') {
            updateManager();
        }
        if (optionSelect == 'View All Roles') {
            viewAll();
        }
        
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        
    })
}

const viewEmployeesDepartment = () => {

}

const viewEmployeesManager = () => {

}

const addEmployee = () => {
// asks name, role, manager
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
    
        inquirer
            .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Employee First Name: '
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Employee Last Name: '
            },
            {
                name: 'employeeRole',
                type: 'rawlist',
                message: 'Select Employee Role:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ title }) => {
                      choiceArray.push(title);
                    });
                    return choiceArray;
                  },
            },
            {
                name: 'employeeManager',
                type: 'rawlist',
                message: 'Employee Manager:',
                choices: [1, 2, 3, 4],
            },
        ])
        .then((answer) => {
            connection.query('INSERT INTO employee SET ?', 
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.employeeRole,
                manager_id: answer.employeeManager
            },
            (err) => {
                if (err) throw err;
                console.log('Employee Added');
                start();
            }
            )
        });
    });

};

const removeEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
    
        inquirer
            .prompt([
            {
                name: 'employeeRole',
                type: 'rawlist',
                message: 'Select Employee Role:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name, last_name }) => {
                        const fullName = `${ first_name } ${last_name}`
                        choiceArray.push(fullName);
                    });
                    return choiceArray;
                  },
            },
        ]);
        
    });
    start();
};

const updateRole = () => {

};

const updateManager = () => {

};

const viewAll = () => {

};

start();