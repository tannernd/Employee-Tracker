const Table = require('cli-table');
const DB = require('./db');


class Department {
    constructor() {}
    viewAll() {
        const database = new DB('localhost', 'root', '', 'employee_db');
        const db = database.connect();
        db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
          });
    }
}

module.exports = Department;