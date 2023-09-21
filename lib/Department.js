const MainMenu = require('./MainMenu.js');
const Table = require('cli-table');
const DB = require('./db');

class Department {
    constructor() {}
    viewAll() {
        const database = new DB('localhost', 'root', '', 'employee_db');
        const db = database.connect();
        db.query('SELECT id, name FROM department', function (err, results) {
            const table = new Table({head:['Department Name', 'Department ID']});
            results.forEach(value => {
                table.push([value.name, value.id]);                
            });
            console.log('');
            console.log(table.toString());            
          });
    }
}

module.exports = Department;