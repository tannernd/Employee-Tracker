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
                    `, function (err, results) {
            const table = new Table({head:['Job Title','Role ID', 'Department Name', 'Salary']});
            results.forEach(value => {
                table.push([value.title, value.id, value.name, value.salary]);                
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

module.exports = Role;