const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_demo"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    initialize();
});

const initialize = () => {
    inquirer
        .prompt([
            {
                type: "list"
                , name: "init"
                , message: "What would you like to do?"
                , choices: [
                    "View All Employees"
                    , "View All Employees by Department"
                    , "View All Employees by Role"
                    , "Add an Employee"
                    , "Update an Employee's Role"
                    , "Remove an Employee"
                    , "Exit"
                ]
            }
        ]).then((answer) => {
            switch (answer.init){
                case "View All Employees":
                    viewEmployees();
                break;
                case "View All Employees by Department":
                    viewDeparments();
                break;
                case "View All Employees by Role":
                    viewRoles();
                break;
                case "Add an Employee":
                    addEmployee();
                break;
                case "Update an Employee's Role":
                    updateEmployee();
                break;
                case "Remove an Employee":
                    deleteEmployee();
                break;
                default:
                    connection.end();

            }
        });
}

const viewEmployees = () => {
    const query = "SELECT DISTINCT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            console.table(res);
            initialize();
        });
};

const viewDeparments = () => {
    const query = "SELECT * FROM department;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name:"choice"
                        , type: "list"
                        , message: "Which Department would you like to view?"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name)
                            }
                            return choiceArray;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "department.name": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            initialize();
                        });
                })
        });
}

const viewRoles = () => {
    const query = "SELECT * FROM role;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name:"choice"
                        , type: "list"
                        , message: "Which Role would you like to view?"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.title)
                            }
                            return choiceArray;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "role.title": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            initialize();
                        });
                });
        });
}

const addEmployee = () => {
    inquirer
        .prompt([
            {   
                name: "firstName"
                , type: "input"
                , message: "What is the Employees First Name?"
            },
            {
                name: "lastName"
                , type: "input"
                , message: "What is the Employees Last Name?"
            },
            {
                name: "choice"
                , type: "list"
                , message: "What is this employee's title?"
                , choices: [
                    "CEO"
                    , "COO"
                    , "CIO"
                    , "CFO"
                    , "Senior Account Executive"
                    , "Account Executive"
                    , "Controller"
                    , "Accountant"
                    , "Head Legal Counsel"
                    , "Legal Counsel"
                    , "Senior Software Engineer"
                    , "Software Engineer"
                ]
            }
        ]).then(data => {
            switch(data.choice) {
                case "CEO":
                    var roleID = 1;
                break;
                case "COO":
                    var roleID = 2;
                break;
                case "CIO":
                    var roleID = 3;
                break;
                case "CFO":
                    var roleID = 4;
                break;
                case "Senior Account Executive":
                    var roleID = 5;
                break;
                case "Account Executive":
                    var roleID = 6;
                break;
                case "Controller":
                    var roleID = 7;
                break;
                case "Accountant":
                    var roleID = 8;
                break;
                case "Head Legal Counsel":
                    var roleID = 9;
                break;
                case "Legal Counsel":
                    var roleID = 10;
                break;
                case "Senior Software Engineer":
                    var roleID = 11;
                break;
                case "Software Engineer":
                    var roleID = 12;
                break;
            }

            const query = "INSERT INTO employee SET ?;"
            connection.query(
                query
                , {
                    first_name: data.firstName
                    , last_name: data.lastName
                    , role_id: roleID
                }
                , err => {
                    if (err)throw err;
                    console.log("Employee Added!")
                    initialize();
                });
        });
};

const updateEmployee = () => {
    const query = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list"
                        , message: "Which Employee would you like to update?"
                        , name: "selectedEmp"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name);
                            }
                            return choiceArray;
                        }
                    },
                    {
                        name: "choice"
                        , type: "list"
                        , message: "What is this employee's title?"
                        , choices: [
                            "CEO"
                            , "COO"
                            , "CIO"
                            , "CFO"
                            , "Senior Account Executive"
                            , "Account Executive"
                            , "Controller"
                            , "Accountant"
                            , "Head Legal Counsel"
                            , "Legal Counsel"
                            , "Senior Software Engineer"
                            , "Software Engineer"
                        ]
                    }
                ]).then(data => {
                    switch (data.choice) {
                        case "CEO":
                            var roleID = 1;
                            break;
                        case "COO":
                            var roleID = 2;
                            break;
                        case "CIO":
                            var roleID = 3;
                            break;
                        case "CFO":
                            var roleID = 4;
                            break;
                        case "Senior Account Executive":
                            var roleID = 5;
                            break;
                        case "Account Executive":
                            var roleID = 6;
                            break;
                        case "Controller":
                            var roleID = 7;
                            break;
                        case "Accountant":
                            var roleID = 8;
                            break;
                        case "Head Legal Counsel":
                            var roleID = 9;
                            break;
                        case "Legal Counsel":
                            var roleID = 10;
                            break;
                        case "Senior Softtware Engineer":
                            var roleID = 11;
                            break;
                        case "Software Engineer":
                            var roleID = 12;
                            break;
                    }
                    const emp = data.selectedEmp.split(" ");
                    const query = "UPDATE employee set ? where ? and ?";
                    connection.query(
                        query
                        , [
                            {
                                role_id: roleID
                            },
                            {
                                first_name: emp[0]
                            },
                            {
                                last_name: emp[1]
                            }
                        ]
                        , err => {
                            if (err) throw err;
                            console.log("Employee details successfully updated.");
                            initialize();
                        });
                });
        });
};

const deleteEmployee = () => {
    const query = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt(
                    {
                        type: "list"
                        , message: "Which Employee would you like to delete?"
                        , name: "selectedEmp"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name);
                            }
                            return choiceArray;
                        }
                    }
                ).then( data => {
                    const emp = data.selectedEmp.split(" ");
                    const query = "DELETE From employee where ? and ?";
                    connection.query(
                        query
                        , [
                            {
                                first_name: emp[0]
                            },
                            {
                                last_name: emp[1]
                            }
                        ]
                        , err => {
                            if (err) throw err;
                            console.log("Employee has been succesfully deleted.");
                            initialize();
                        });
                });
        });
};