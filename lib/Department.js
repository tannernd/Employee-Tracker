const inquirer = require('inquirer');
const MainMenu = require('./MainMenu.js');
const Table = require('cli-table');
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Department {
    constructor() {}
    viewAll() {
        
        db.query('SELECT id, name FROM department', function (err, results) {
            const table = new Table({head:['Department Name', 'Department ID']});
            results.forEach(value => {
                table.push([value.name, value.id]);                
            });
            console.log('');
            console.log(table.toString());            
          });
    }
    add() {
        const question = [
            {
                type: 'input',
                name: 'deptName',
                message: 'Please enter the department name you wish to add.',
            }
        ]
        return inquirer
        .prompt(question)
        .then((resp) => {
            db.query(`INSERT INTO department (name)
                        VALUES (?);`, resp.deptName, function (err, results) {
                console.log('Department Added');            
              }); 
        })
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
          });
    }
}

module.exports = Department;