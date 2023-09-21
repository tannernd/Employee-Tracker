const mysql = require('mysql2');
//Class to create a DB Connection for use by other classes
class DB {
    constructor(host, user, password, database) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
    //Connect to the DB
    connect() {
        const db = mysql.createConnection(
            {
                host: this.host,
                // MySQL username,
                user: this.user,
                // MySQL password
                password: this.password,
                database: this.database
            }
            );
        return db;
    }
}

  module.exports = DB;