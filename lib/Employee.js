//Add required libraries and classes
const inquirer = require('inquirer');
const Table = require('cli-table');
//Get the DB Connection
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Employee {
    constructor() {}
    //Method to pull all employee data
    viewAll() {
        db.query(`SELECT e.id as employee_id, first_name, last_name, title, name, manager, salary
        FROM employee e
        INNER JOIN role r on e.role_id = r.id
        INNER JOIN department d on r.department_id = d.id
        LEFT JOIN (select id, concat(first_name, ' ', last_name) as manager FROM employee) m on e.manager_id = m.id
        ORDER BY e.id`, function (err, results) {
            //Create the table output from the cli-table library
            const table = new Table({head:['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department Name', 'Salary', 'Manager']});
            results.forEach(value => {
                if (value.manager === null) {
                    value.manager = 'null';
                }
                table.push([value.employee_id, value.first_name, value.last_name, value.title, value.name, value.salary, value.manager]);                
            });
            console.log('');
            console.log(table.toString());
          });
    }
     //Method to add a new Employee
    async add(roles, managers) {
        //Inquirer question setup 
        const question = [
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter the employee\'s first name.',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter  the employee\'s last name..',
            },
            {
                type: 'list',
                message: 'Please select a role.',
                name: 'role',
                choices: roles
            },
            {
                type: 'list',
                message: 'Please select a manager.',
                name: 'manager',
                choices: managers
            }
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //INSERT the new employee to the database
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?,?,?,?);`, [resp.firstName, resp.lastName, resp.role, resp.manager], function (err, results) {
                console.log('Employee Added');            
                }); 
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
    //Method to update the employee role
    async updateRole(roles, employees) {
        //Inquirer question setup 
        const question = [
            {
                type: 'list',
                message: 'Please select an employee.',
                name: 'employee',
                choices: employees
            },
            {
                type: 'list',
                message: 'Please select a new role.',
                name: 'role',
                choices: roles
            }
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //UPDATE the employee's role in the database
            db.query(`UPDATE employee 
                        SET role_id = ?
                        WHERE id = ?`, [resp.role, resp.employee], function (err, results) {
                console.log('Employee Role Updated');            
                }); 
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
}

module.exports = Employee;