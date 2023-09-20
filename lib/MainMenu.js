const inquirer = require('inquirer');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');


class MainMenu {
    constructor() {}
    show() {
        const question = [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'option',
                choices: ['View All Departments', 'View All Roles', 'View All Employees',
                'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role',
                'Quit']
            },
        ]
        const department = new Department;
        const role = new Role;
        const employee = new Employee;
        return inquirer
        .prompt(question)
        .then((resp) => {        
            switch (resp.option) {         
                case 'View All Departments':
                    department.viewAll();
                    break;
                case 'View All Roles':
                    role.viewAll();
                    break;
                case 'View All Employees':
                    employee.viewAll();
                    break;
                case 'Add a Department':
                    department.add();
                    break;
                case 'Add a Role':
                    role.add();
                    break;
                case 'Add an Employee':
                    employee.add();
                    break;
                case 'Update an Employee Role':
                    employee.UpdateRole();
                    break;  
                case 'Quit':
                    console.log('Thanks for Using The Employee Tracker')
                    return;
                    break;          
            }
            console.log(resp.option);
            return this.show();        
        })      
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
        });
    }
}

module.exports = MainMenu;