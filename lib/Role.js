//Add required libraries and classes
const inquirer = require('inquirer');
const Table = require('cli-table');
//Get the DB Connection
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Role {
    constructor() {}
    //Method to pull all roles
    viewAll() {        
        db.query(`SELECT r.id, title, salary, name 
                    FROM role r
                    JOIN department d on d.id = r.department_id
                    ORDER BY r.id
                    `, function (err, results) {
            //Create the table output from the cli-table library
            const table = new Table({head:['Job Title','Role ID', 'Department Name', 'Salary']});
            results.forEach(value => {
                table.push([value.title, value.id, value.name, value.salary]);                
            });
            console.log('');
            console.log(table.toString());  
          });
    }
    //Method to add a new Role
    async add(choices) {   
        //Inquirer question setup     
        const question = [
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter the role name you wish to add.',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary.',
            },
            {
                type: 'list',
                message: 'Please select a department.',
                name: 'deptId',
                choices: choices
            },
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //INSERT the new role to the database
            db.query(`INSERT INTO role (title, salary, department_id)
                        VALUES (?,?,?);`, [resp.roleName, resp.salary, resp.deptId], function (err, results) {
                console.log('Role Added');            
                }); 
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
}

module.exports = Role;