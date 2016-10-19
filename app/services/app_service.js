/*jshint node:true*/
"use strict";

var fs = require("fs");

/*
 * Used to route '/' to index.html
 */
function index(req, res) {
    res.redirect("/public/index.html");
}

function slides(req, res) {
    var slides = fs.readdirSync("./public/images/slides");

    var slidesArray = [];
    for (var i = 0; i < slides.length; i++) {
        var value = slides[i];
        slidesArray.push({"id": value, "src": "./images/slides/" + value})
    }

    res.send(slidesArray);
}

/*
 * Used to handle errors. Logs the error to the server-side console, and checks wheter the error is the one of duplicate entries.
 * The only case where duplicate entries can happen is the if the contact info of the participant to be registered already exists.
 */
function errorHandler(error, response) {
    console.log("There has been an error:");
    console.log(error);
    if (error.errno === 1062) {
        response.send(400, "The contact info already exists");
    }
    else {
        response.send(500, "There has been an error with the database, check the console for details...");
    }
}

/*
 * http://www.gilgh.com/article/Create-CSV-file-using-JSON-data
 */
function convertToCSV(objArray) {
    var arrData = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var CSV = '';

    var row = "";
    //This loop will extract the label from 1st index of on array
    for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //Append Label row with line break
    CSV += row + '\r\n';

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (index in arrData[i]) {
            if (row !== '') row += ',';
            row += arrData[i][index];
        }
        row.slice(0, row.length - 1);
        //Add a line break after each row
        CSV += row + '\r\n';
    }
    return CSV;
}

exports.index = index;
exports.slides = slides;
exports.errorHandler = errorHandler;
exports.convertToCSV = convertToCSV;