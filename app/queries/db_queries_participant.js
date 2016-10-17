var db = require("./../db");

function getParticipants(callback) {
    db.query("select * from participants", callback);
}

function insertParticipant(values, callback) {
    db.query("insert into participants(email, userid, name, prize, bouvet)" +
        "values ('" + values.email + "', '" + values.userid + "', '" + values.name + "', '" + values.prize + "', '" + values.bouvet + "');", callback);
}

function deleteParticipants(callback) {
    db.query("truncate table participants", callback);
}

function updateWinner(email, callback) {
    db.query("update participants set winner = not winner where email = '" + email + "'", callback);
}

function deleteWinners(callback) {
    db.query("update participants set winner = 0 where winner = 1", callback);
}

//export participants to CSV-file without the winner field
function exportParticipants(callback) {
    db.query("SELECT email, name FROM participants", callback);
}

exports.getParticipants = getParticipants;
exports.insertParticipant = insertParticipant;
exports.updateWinner = updateWinner;
exports.exportParticipants = exportParticipants;
//exports.deleteParticipants = deleteParticipants;
//exports.deleteWinners = deleteWinners;
