// requires
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const CheckboxPrompt = require('inquirer/lib/prompts/checkbox');

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
        'View All Employees By Mananger (in progress)','Add Employee', 'Add Manager', 'Add Role', 'Remove Employee', 
        'Update Employee Role (in progress)', 'Update Employee Manager (in progress)', 'View All']
    })
    .then((data) => {
        const { optionSelect } = data;

        if (optionSelect == 'View All Employees') {
            viewEmployees();
        };
        if (optionSelect == 'View All Employees By Department') {
            viewEmployeesDepartment();
        };
        if (optionSelect == 'View All Employees By Mananger (in progress)') {
            viewEmployeesManager();
        };
        if (optionSelect == 'Add Employee') {
            addEmployee();
        };
        if (optionSelect == 'Add Manager') {
            addManager();
        }
        if (optionSelect == 'Add Role') {
            addRole();
        };
        if (optionSelect == 'Remove Employee') {
            removeEmployee();
        };
        if (optionSelect == 'Update Employee Role (in progress)') {
            updateRole();
        };
        if (optionSelect == 'Update Employee Manager (in progress)') {
            updateManager();
        };
        if (optionSelect == 'View All') {
            viewAll();
        };
        
    });
};

const viewEmployees = () => {
    connection.query('SELECT first_name, last_name FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
    });
    setTimeout(start, 200);
};

const viewEmployeesDepartment = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
            .prompt({
                name: 'departmentSelect',
                type: 'list',
                message: 'Select Department:',
                choices() {
                    const choiceArray = [];
                    const newArray = [];
                    results.forEach(({ department }) => {
                        choiceArray.push(department);
                        choiceArray.forEach((department) => {
                            if (!newArray.includes(department)) {
                                newArray.push(department)
                            };
                        });
                    });
                    return newArray;
                  },
            })
            .then((answer) => {
                connection.query('SELECT * FROM employee WHERE ?', 
                { department: answer.departmentSelect },
                (err, res) => {
                    console.table(res)
                })
                setTimeout(start, 200)
            });
    });

};

const viewEmployeesManager = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
            .prompt({
                name: 'managerSelect',
                type: 'list',
                message: 'Select Manager:',
                choices() {
                    const choiceArray = [];
                    const newArray = [];
                    results.forEach(({ manager_id }) => {
                        choiceArray.push(manager_id);
                        choiceArray.forEach((manager_id) => {
                            if (!newArray.includes(manager_id)) {
                                newArray.push(manager_id)
                            };
                        });
                    });
                    return newArray;
                  },
            })
            .then((answer) => {
                connection.query('SELECT * FROM employee WHERE ?', 
                { manager_id: answer.managerSelect },
                (err, res) => {
                    console.table(res)
                })
                setTimeout(start, 200)
            });
    });
};

const addEmployee = () => {
// asks name, role, manager
    connection.query('SELECT * FROM employee', (err, results) => {
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
                type: 'list',
                message: 'Select Employee Role:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ role_id }) => {
                      choiceArray.push(role_id);
                    });
                    return choiceArray;
                  },
            },
            {
                name: 'employeeManager',
                type: 'list',
                message: 'Employee Manager:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ manager_id }) => {
                      choiceArray.push(manager_id);
                    });
                    return choiceArray;
                  },
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

const addRole = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'Title of Role: '
            },
            {
                name: 'rolesalary',
                type: 'input',
                message: 'Role Salary: '
            },
            {
                name: 'departmentID',
                type: 'list',
                message: 'Department:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ name }) => {
                      choiceArray.push(name);
                    });
                    return choiceArray;
                  },
            },
        ])
        .then((answer) => {
            connection.query('INSERT INTO role SET ?', 
            {
                title: answer.roleName,
                salary: answer.rolesalary,
                department_id: answer.departmentID,
            },
            (err) => {
                if (err) throw err;
                console.log('Role Added');
                start();
            }
            );
        });
    });
};

const addManager = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
            {
                name: 'managerFN',
                type: 'input',
                message: 'Manager First Name: '
            },
            {
                name: 'managerLN',
                type: 'input',
                message: 'Manager Last Name: '
            },
            {
                name: 'department',
                type: 'list',
                message: 'Department:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ name }) => {
                      choiceArray.push(name);
                    });
                    return choiceArray;
                  },
            },
        ])
        .then((answer) => {
            const mandepartment = answer.department;
            connection.query('INSERT INTO employee SET ?', 
            {
                first_name: answer.managerFN,
                last_name: answer.managerLN,
                role_id: 'Manager of ' + mandepartment,
                department: answer.department,
            },
            (err) => {
                if (err) throw err;
                console.log('Manager Added');
                start();
            }
            );
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
                type: 'list',
                message: 'Select Employee Role:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name, last_name, id }) => {
                        const fullName = `${ id } ${ first_name } ${last_name}`

                        choiceArray.push(fullName);
                    });
                    return choiceArray;
                  }
            },
        ])
        .then((answer) => {
            const { employeeRole } = answer;
            for (let i = 0; i < employeeRole.length; i++) {
                myID = employeeRole[0];
                connection.query(`DELETE FROM employee WHERE id = ?`, myID, (err, results) => {
                    if (err) return err;
                })   
            }
            console.log('employee deleted')
            setTimeout(start, 200);
        });      
    });
};

const updateRole = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
            {
                name: 'employeeSelect',
                type: 'list',
                message: 'Select Employee to Edit:',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name, last_name }) => {
                        const fullName = `${ first_name } ${last_name}`;
                        choiceArray.push(fullName);
                    });
                    return choiceArray;
                  }
            },
        ])
        .then((answer) => {
            const {employeeSelect} = answer;
            connection.query(`SELECT * FROM role`, (err, results) => {
                if (err) return err;

                inquirer
                    .prompt([
                        {
                            name: 'roleSelect',
                            type: 'list',
                            message: 'Select Role to change to:',
                            choices() {
                                const choiceArray = [];
                                results.forEach(({ title }) => {
                                    choiceArray.push(title);
                                });
                                return choiceArray;
                              }  
                        }
                    ])
                    .then((answer) => {
                        console.log(employeeSelect)

                        connection.query('UPDATE employee SET role_id = ? WHERE first_name = ?, last_name = ?', (err, results) => {
                            console.log(results);
                        });
                    });
            });
        }); 
    });
};

const updateManager = () => {

};

const viewAll = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
    });
    setTimeout(start, 200);
};

start();