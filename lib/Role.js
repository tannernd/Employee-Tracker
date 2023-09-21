const inquirer = require('inquirer');
const Table = require('cli-table');
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Role {
    constructor() {}
    viewAll() {
        
        db.query(`SELECT r.id, title, salary, name 
                    FROM role r
                    JOIN department d on d.id = r.department_id
                    ORDER BY r.id
                    `, function (err, results) {
            const table = new Table({head:['Job Title','Role ID', 'Department Name', 'Salary']});
            results.forEach(value => {
                table.push([value.title, value.id, value.name, value.salary]);                
            });
            console.log('');
            console.log(table.toString());  
          });
    }
    async add(choices) {
        
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
                db.query(`INSERT INTO role (title, salary, department_id)
                            VALUES (?,?,?);`, [resp.roleName, resp.salary, resp.deptId], function (err, results) {
                    console.log('Role Added');            
                    }); 
            })
            .catch((err) => {
                console.log(err);
                console.log('Sorry, there was an error.');
                });
    }
}

module.exports = Role;