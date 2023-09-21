const Table = require('cli-table');
const DB = require('./db');


class Role {
    constructor() {}
    viewAll() {
        const database = new DB('localhost', 'root', '', 'employee_db');
        const db = database.connect();
        db.query('SELECT * FROM role', function (err, results) {
            console.log(results);
          });
    }
}

module.exports = Role;