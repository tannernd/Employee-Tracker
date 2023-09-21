const MainMenu = require('./MainMenu.js');

class CLI {
    constructor() {
  
    }
    //Run the CLI
    run() {
        console.log('Welcome to your Employee Tracker');
        const mainMenu = new MainMenu;
        mainMenu.show();              
    }
}

module.exports = CLI;