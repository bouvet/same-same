var queries_participant = require("../queries/db_queries_participant");
var app_service = require("./app_service");

//Get all participants from the database
function getParticipants(req, res) {
    queries_participant.getParticipants(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

/*
 * Insert the participant object received as data of the POST request.
 * Converts the data values into a new 'values' object for easier naming, which is passed on to the database script.
 */
function insertParticipant(req, res) {
    var values = {
        email: req.body.email,
        userid: req.body.userid,
        name: req.body.name,
        prize: req.body.prize,
        bouvet: req.body.bouvet
    };

    queries_participant.insertParticipant(values, function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Participant successfully registered");
        }
    });
}

//Truncate the bod.participants table.
function deleteParticipants(req, res) {
    queries_participant.deleteParticipants(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Successfully deleted all participants");
        }
    });
}

//Set the 'winner' field of all participants to 0, effectively deleting all winners
function deleteWinners(req, res) {
    queries_participant.deleteWinners(function (err) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Successfully deleted all winners");
        }
    });
}

/*
 * Change the 'winner' field of the participant with the email specified as parameter of the requet.
 * Is set to 1 if it's currently 0, and to 0 if it's currently 1.
 */
function updateWinner(req, res) {
    queries_participant.updateWinner(req.params.email, function (err) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send("Participant " + req.params.email + " was marked as winner");
        }
    });
}

//Export participants to csv file
function exportParticipants(req, res) {
    console.log("exporting participants to csv");
    queries_participant.exportParticipants(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.setHeader("Content-Disposition", "attachment; filename=participants.csv");
            res.setHeader('Content-Type', 'application/octet-stream');
            res.write(app_service.convertToCSV(JSON.stringify(rows)));
            res.end();
        }
    });
}

exports.getParticipants = getParticipants;
exports.insertParticipant = insertParticipant;
exports.deleteParticipants = deleteParticipants;
exports.deleteWinners = deleteWinners;
exports.updateWinner = updateWinner;
exports.exportParticipants = exportParticipants;