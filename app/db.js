/*jshint node: true*/
"use strict";

//Uses the mysql package of node
var mysql = require("mysql");
var config = require("./config");


/*
 * The connection to the database, needs to be set up correctly
 * 'host' is the ip of the host of the mysql server,
 * 'user' and 'password' is the credentials defined by the mysql server
 */
var connection = mysql.createConnection({
    multipleStatements: true, //for allowing stats calls
    host: config.dbOptions.dburl,
    user: config.dbOptions.dbuser,
    password: config.dbOptions.dbpassword,
    database: config.dbOptions.datebase
});

//Connect to the db
connection.connect();

setInterval(function () {
    connection.query('SELECT 1');
}, 50000);

/*
 * Generic function for executing queries.
 * logs all statements to the server-side console
 */
function query(queryStr, callback) {
    connection.query(queryStr, function (err, rows) {
        console.log("sql statement: " + queryStr);
        if (err) {
            callback(err);
        }
        else {
            callback(null, rows);
        }
    });
}

exports.query = query;