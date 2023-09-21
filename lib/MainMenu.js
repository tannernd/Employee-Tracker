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
                choices: [
                    {name:'View All Departments',value:"viewDep"},
                    {name:'View All Roles', value:'viewRole'}, 
                    {name:'View All Employees', value:'viewEmp'},
                    {name:'Add a Department', value:'addDep'}, 
                    {name:'Add a Role', value:'addRole'}, 
                    {name:'Add an Employee', value:'addEmp'}, 
                    {name:'Update an Employee Role',value:"updateEmpRole"},
                    {name:'Quit', value:'quit'}
                ]
            },
        ]
        const department = new Department;
        const role = new Role;
        const employee = new Employee;
        return inquirer
        .prompt(question)
        .then(async (resp) =>{        
            switch (resp.option) {         
                case 'viewDep':
                    department.viewAll();
                    break;
                case 'viewRole':
                    role.viewAll();
                    break;
                case 'viewEmp':
                    employee.viewAll();
                    break;
                case 'addDep':
                    await department.add();
                    break;
                case 'addRole':
                    await role.add();
                    break;
                case 'addEmp':
                    await employee.add();
                    break;
                case 'updateEmpRole':
                    await employee.UpdateRole();
                    break;  
                case 'quit':
                    console.log('Thanks for Using The Employee Tracker')
                    process.exit();
                    break;          
            }                              
        })
        .then(()=>{
            setTimeout(() => {
                this.show();  
            }, 1000);
        })             
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
        });
    }
}

module.exports = MainMenu;