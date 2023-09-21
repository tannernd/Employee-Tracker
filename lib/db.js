const mysql = require('mysql2');

class DB {
    constructor(host, user, password, database) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
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