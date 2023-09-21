//Add required libraries and classes
const inquirer = require('inquirer');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
//Get the DB Connection
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class MainMenu {
    constructor() {}
    //Method to show the main menu
    show() {
        //Show the inquirer question menu
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
        //Create the objects
        const department = new Department;
        const role = new Role;
        const employee = new Employee;
        return inquirer
        .prompt(question)
        .then(async (resp) =>{  
            //Hanlde the users menu selection      
            if(resp.option === 'viewDep') {
                //Call the viewAll method to get the departments
                department.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'viewRole') {
                //Call the viewAll method to get the roles
                role.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'viewEmp') {
                //Call the viewAll method to get the employees
                employee.viewAll();
                this.waitShow(); 
            } 
            if(resp.option === 'addDep') {
                //Call the add method to add the new department
                await department.add();
                this.waitShow(); 
            }  
            if(resp.option === 'addRole') {
                //Query the DB to get the department list for selection 
                db.promise().query("SELECT id as value, name as name FROM department")
                .then( async ([rows,fields]) => {
                    //Call the add method to add the new role passing the department list
                    await role.add(rows); 
                    return true;  
                })
                .then((resp)=>{
                    this.waitShow();                   
                })
                //Catch any errors
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
            } 
            if(resp.option === 'addEmp') {
                //Query the DB to get the role list for selection 
                db.promise().query("SELECT id as value, title as name FROM role")
                .then( async ([roles,fields]) => {
                    //Query the DB to get the manager list for selection 
                    db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM employee')
                    .then(async ([managers,fields]) => {
                        //Call the add method to add the new employee passing the role and manager lists
                        await employee.add(roles, managers); 
                    })
                    .then((resp)=>{
                        this.waitShow();                   
                    })
                    //Catch any errors
                    .catch((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });                    
                }) 
                //Catch any errors
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
            } 
            if(resp.option === 'updateEmpRole') {
                //Query the DB to get the role list for selection 
                db.promise().query("SELECT id as value, title as name FROM role")
                .then( async ([roles,fields]) => {
                    //Query the DB to get the employee list for selection 
                    db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM employee')
                    .then(async ([employees,fields]) => {
                        //Call the updateRole method to update the role passing the role and employee lists
                        await employee.updateRole(roles, employees);
                    })
                    .then((resp)=>{
                        this.waitShow();                   
                    })
                    //Catch any errors
                    .catch((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });                    
                }) 
                //Catch any errors
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
                
            } 
            //Quit the application logic
            if(resp.option === 'quit') {
                console.log('Thanks for Using The Employee Tracker')
                process.exit();  
            } 
                
        })  
        //Catch any errors                       
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
        });
    }
    //Method to wait to show the menu to allow the tables to be shown.
    waitShow() {
            setTimeout(() => {
                this.show();  
            }, 1000);      
    }
}

module.exports = MainMenu;