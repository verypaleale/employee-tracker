var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = ('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // PORT
    port: 3300,

    // USERNAME
    user: "root",

    // PASSWORD
    password: "password1",
    database: "empl_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

const questions = [
    {
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: [
            'View all employees',
            'View all company roles',
            'View all company departments',
            'Add an employee',
            'Add a company role',
            'Add a company department',
            'Update an employee role'
        ]
    }
];

const addemplquestions = [
    {
        type: "input",
        name: "emplfname",
        message: "What is the employee's first name?",
    },
    {
        type: "input",
        name: "empllname",
        message: "What is the employee's last name?"
    },
    {
        type: "input",
        name: "emplid",
        message: "What is the employee's role id number?"
    },
    {
        type: "input",
        name: "emplmgrid",
        message: "What is the employee's manager id number?"
    }
];

const addrolequestions = [
    {
        type: "input",
        name: "roletitle",
        message: "What is the role title?",
    },
    {
        type: "input",
        name: "rolesalary",
        message: "What is the salary for the role?"
    },
    {
        type: "input",
        name: "roledeptid",
        message: "What is the role's department ID number?"
    }
];

const adddeptquestions = [
    {
        type: "input",
        name: "deptname",
        message: "What is the name of the department?",
    },
    {
        type: "input",
        name: "deptid",
        message: "What is the department ID number?"
    }
];

function userStart() {
    inquirer
        .prompt(questions)
        .then(function (answer) {
            switch (answer.actions) {
                case "View all employees":
                    viewEmpls();
                    break;

                case 'View all company roles':
                    viewAllRoles();
                    break;

                case 'View all company departments':
                    viewAllDepts();
                    break;

                case "Add an employee":
                    addEmpl();
                    break;

                case 'Add a company role':
                    addRole();
                    break;

                case "Add a company department":
                    addDept();
                    break;

                case "Update an employee role":
                    updateEmplRole();
                    break;
            }
        })
};

function viewEmpls() {
    var query = "SELECT employees.id , employees.first_name , employees.last_name , roles.title , departments.department ,  roles.salary , employees.manager_id FROM employees JOIN roles ON employees.role_id = roles.role_id"
    query += " JOIN departments ON roles.department_id = departments.department_id"
    connection.query(query, function (err, res) {
        if (err) {
            throw err
        }
        console.log("")
        console.table(res)
        userStart()
    })
};

function viewAllRoles() {
    var query = "SELECT roles.role_id , roles.title FROM roles"
    connection.query(query, function (err, res) {
        if (err) {
            throw err
        }
        console.log("")
        console.table(res)
        userStart()
    })
}

function viewAllDepts() {
    var query = "SELECT departments.department_id , departments.department FROM departments"
    connection.query(query, function (err, res) {
        if (err) {
            throw err
        }
        console.log("")
        console.table(res)
        userStart()
    })
}

async function addEmpl() {
    await inquirer
        .prompt(addemplquestions)
        .then(emplData => {
            var query = connection.query(
                "INSERT INTO employees SET ?",
                {
                    "first_name": emplData.emplfname,
                    "last_name": emplData.empllname,
                    "role_id": emplData.emplid,
                    "manager_id": emplData.emplmgrid
                },
                function (err, res) {
                    if (err) {
                        throw err
                    }
                    console.log(query.sql);
                    userStart()
                })
        })

}


async function addRole() {
    await inquirer
        .prompt(addrolequestions)
        .then(roleData => {
            var query = connection.query(
                "INSERT INTO roles SET ?",
                {
                    "title": roleData.roletitle,
                    "salary": roleData.rolesalary,
                    "department_id": roleData.roledeptid
                },
                function (err, res) {
                    if (err) {
                        throw err
                    }
                    console.log(query.sql);
                    userStart()
                })
        })

}

async function addDept() {
    await inquirer
        .prompt(adddeptquestions)
        .then(deptData => {
            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    "department_id": deptData.deptid,
                    "department": deptData.deptname
                },
                function (err, res) {
                    if (err) {
                        throw err
                    }
                    console.log(query.sql);
                    userStart()
                })
        })

}


async function updateEmplRole() {
        await inquirer
            .prompt(
                [
                    {
                        type: "input",
                        name: "emplbyid",
                        message: "What is the id number of the employee's role that you would like to change?",
                    },
                    {
                        type: "input",
                        name: "emplroleid",
                        message: "What is the employee's new role id number?"
                    }
                ]
            )
            .then(employeeid => {
                var query = connection.query(
                    "UPDATE employees SET role_id = ? WHERE ?",
                    [
                        {
                            "role_id": employeeid.emplroleid
                        },
                        {
                            "id": employeeid.emplbyid
                        }
                    ],
                    function (err, res) {
                        if (err) {
                            throw err
                        }
                        console.log(query.sql);
                        userStart()
                    })
            })
//     })
}

userStart()