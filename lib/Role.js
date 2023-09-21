const Table = require('cli-table');
const DB = require('./db');


class Role {
    constructor() {}
    viewAll() {
        const database = new DB('localhost', 'root', '', 'employee_db');
        const db = database.connect();
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
}

module.exports = Role;