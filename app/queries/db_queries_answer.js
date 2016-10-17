var db = require("./../db");

function getAllAnswers(callback) {
    db.query("select * from answers", callback);
}

function getSingleAnswer(id, callback) {
    db.query("select * from answers where answerid = " + id + ";", callback);
}

function insertAnswer(values, callback) {
    db.query("INSERT INTO answers(userid, questionid, response, gender)" +
        "VALUES ('" + values.userid + "', '" + values.questionid + "', '" + values.response + "', '" + values.gender + "');", callback);
}

function deleteAllAnswers(callback) {
    db.query("truncate table answers", callback);
}

function deleteSingleAnswer(id, callback) {
    db.query("delete from answers where answerid = " + id, callback);
}

//export answers to CSV-file without the status fields (locked and processed)
function exportAnswers(callback) {
    db.query("SELECT userid, questionid, response from answers", callback);
}

exports.getAllAnswers = getAllAnswers;
exports.getSingleAnswer = getSingleAnswer;
exports.insertAnswer = insertAnswer;
exports.exportAnswers = exportAnswers;
//exports.deleteAllAnswers = deleteAllAnswers;
//exports.deleteSingleAnswer = deleteSingleAnswer;
