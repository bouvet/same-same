var queries_statistics = require("../queries/db_queries_statistics");
var app_service = require("./app_service");

function getAverageStatistics(req, res) {
    queries_statistics.getAverageStatistics(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

function getBouvetStatistics(req, res) {
    queries_statistics.getBouvetStatistics(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

function getMaleStatistics(req, res) {
    queries_statistics.getMaleStatistics(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

function getFemaleStatistics(req, res) {
    queries_statistics.getFemaleStatistics(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

function getCounts(req, res) {
    queries_statistics.getCounts(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

function getCurrentAnswers(req, res) {
    queries_statistics.getCurrentAnswers(req.params.id, function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}


function getTypeData(req, res) {
    queries_statistics.getTypeData(function (err, rows) {
        if (err) {
            app_service.errorHandler(err, res);
        }
        else {
            res.send(rows);
        }
    });
}

exports.getAverageStatistics = getAverageStatistics;
exports.getBouvetStatistics = getBouvetStatistics;
exports.getMaleStatistics = getMaleStatistics;
exports.getFemaleStatistics = getFemaleStatistics;
exports.getCounts = getCounts;
exports.getCurrentAnswers = getCurrentAnswers;
exports.getTypeData = getTypeData;