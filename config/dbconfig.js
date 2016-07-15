var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1992927',
    database: 'glueCircle',
    multipleStatements: 'true'
});

module.exports = connection;
