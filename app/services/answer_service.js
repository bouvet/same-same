var queries_answer = require("../queries/db_queries_answer");
var app_service = require("./app_service");

/*
 * Get all answers from the database and return them as an array of JSON objects.
 * The parameter 'viewAll' determines whether all answers or only unprocessed are fetched
 */
function getAllAnswers(req, res) {
    queries_answer.getAllAnswers(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send((rows));
        }
    });
}

//Get the answer with the id specified as parameter of the request.
function getSingleAnswer(req, res) {
    queries_answer.getSingleAnswer(req.params.id, function (err, row) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(row);
        }
    });
}

/*
 * Insert the answers received as data of the POST request into the database.
 * Is called from the CREATE method of the Answers service.
 * Converts the data values into a new 'values' object for easier naming, which is passed on to the database script.
 */
function insertAnswer(req, res) {
    //console.log("\n Request body is: " + JSON.stringify(req.body) + "\n");
    var values = {
        userid: req.body.userid,
        questionid: req.body.questionid,
        response: req.body.response,
        gender: req.body.gender
    };
    queries_answer.insertAnswer(values, function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Successfully registered the answer \n");
        }
    });
}

//Truncate (clear/delete) the samesame.answers table.
function deleteAllAnswers(req, res) {
    queries_answer.deleteAllAnswers(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Successfully deleted all answers");
        }
    });
}


//Delete the answer with the id specified as parameter of the request
function deleteSingleAnswer(req, res) {
    queries_answer.deleteSingleAnswer(req.params.id, function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Successfully deleted answer with id " + req.params.id);
        }
    });
}

//Export answers to csv file
function exportAnswers(req, res) {
    console.log("exporting answers to csv");
    queries_answer.exportAnswers(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.setHeader("Content-Disposition", "attachment; filename=answers.csv");
            res.setHeader('Content-Type', 'application/octet-stream');
            res.write(app_service.convertToCSV(JSON.stringify(rows)));
            res.end();
        }
    });
}

exports.getAllAnswers = getAllAnswers;
exports.getSingleAnswer = getSingleAnswer;
exports.insertAnswer = insertAnswer;
exports.deleteAllAnswers = deleteAllAnswers;
exports.deleteSingleAnswer = deleteSingleAnswer;
exports.exportAnswers = exportAnswers;