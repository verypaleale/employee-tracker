const mysql = require("mysql");
const inquirer = require("inquirer");

require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3300,
    user: "root",
       password: "password1",
    database: "employees_db"
});
