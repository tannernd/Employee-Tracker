const MainMenu = require('./MainMenu.js');

class CLI {
    constructor() {
  
    }
    run() {
        console.log('Welcome to your Employee Tracker');
        const mainMenu = new MainMenu;
        mainMenu.show();              
    }
}

module.exports = CLI;