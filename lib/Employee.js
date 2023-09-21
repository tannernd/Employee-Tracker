const Table = require('cli-table');
const DB = require('./db');


class Employee {
    constructor() {}
    viewAll() {
        const database = new DB('localhost', 'root', '', 'employee_db');
        const db = database.connect();
        db.query(`SELECT e.id as employee_id, first_name, last_name, title, name, manager, salary
        FROM employee e
        JOIN role r on e.role_id = r.id
        JOIN department d on r.department_id = d.id
        JOIN (select id, concat(first_name, ' ', last_name) as manager FROM employee) m on e.manager_id = m.id`, function (err, results) {
            const table = new Table({head:['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department Name', 'Salary', 'Manager']});
            results.forEach(value => {
                table.push([value.employee_id, value.first_name, value.last_name, value.title, value.name, value.salary, value.manager]);                
            });
            console.log('');
            console.log(table.toString());
          });
    }
}

module.exports = Employee;