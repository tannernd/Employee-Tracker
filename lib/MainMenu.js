const inquirer = require('inquirer');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

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
            if(resp.option === 'viewDep') {
                department.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'viewRole') {
                role.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'viewEmp') {
                employee.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'addDep') {
                await department.add();
                this.waitShow(); 
            }  
            if(resp.option === 'addRole') {

                db.promise().query("SELECT id as value, name as name FROM department")
                .then( async ([rows,fields]) => {
                    await role.add(rows); 
                    return true;  
                })
                .then((resp)=>{
                    this.waitShow();                   
                })
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
            } 
            if(resp.option === 'addEmp') {
                db.promise().query("SELECT id as value, title as name FROM role")
                .then( async ([roles,fields]) => {
                    db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM employee')
                    .then(async ([managers,fields]) => {
                        await employee.add(roles, managers); 
                    })
                    .then((resp)=>{
                        this.waitShow();                   
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });                    
                }) 
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
            } 
            if(resp.option === 'updateEmpRole') {
                db.promise().query("SELECT id as value, title as name FROM role")
                .then( async ([roles,fields]) => {
                    db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM employee')
                    .then(async ([employees,fields]) => {
                        await employee.UpdateRole(roles, employees);
                    })
                    .then((resp)=>{
                        this.waitShow();                   
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });                    
                }) 
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
                
            } 
            if(resp.option === 'quit') {
                console.log('Thanks for Using The Employee Tracker')
                process.exit();  
            } 
                
        })                         
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
        });
    }
    waitShow() {
            setTimeout(() => {
                this.show();  
            }, 1000);      
    }
}

module.exports = MainMenu;