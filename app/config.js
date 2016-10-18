/*jshint node: true*/
"use strict";
var config = {};
var dbOptions = {};
try {
    config = require("./config.local");
    dbOptions = config.dbOptions;
} catch (err) {
    console.warn("Could not find local config, using standard settings");
}

console.log(dbOptions);
if (Object.getOwnPropertyNames(dbOptions).length === 0) {
    dbOptions = {
        dburl: 'localhost',
        dbuser: 'bouvet',
        dbpassword: 'bouvet321',
        datebase: 'samesame'
    };
}
console.log(dbOptions);

exports.dbOptions = dbOptions;