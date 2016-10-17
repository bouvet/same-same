/*===========================================================================
 SQL queries returns a lot of information, where a single view does not necessarily use all data, but all data is used somewhere.

 Complete statement is copied as a comment inside each function to easily test it out in MySQL command line without dealing with syntax.
 ===========================================================================*/

var db = require("./../db");

function getAverageStatistics(callback) {
    db.query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, " +
        "round((b/(a+b)*100),2) as b_ from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " +
        "from answers, participants where answers.userid=participants.userid and bouvet=0 group by questionid) x", callback);
}

function getBouvetStatistics(callback) {
    db.query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
        "from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " +
        "from answers, participants where answers.userid=participants.userid and bouvet=1 group by questionid) x", callback);
}

function getMaleStatistics(callback) {
    db.query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
        "from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " +
        "from answers where gender='m' group by questionid) x", callback);
}

function getFemaleStatistics(callback) {
    db.query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
        "from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " +
        "from answers where gender='f' group by questionid) x", callback);
}

function getCounts(callback) {
    db.query("select count(*) as total from answers;" +
        "select count(*) as bouvet from answers,participants where answers.userid = participants.userid and bouvet=1;" +
        "select count(*) as male from answers where gender='m';" +
        "select count(*) as female from answers where gender='f'", callback);
}

function getCurrentAnswers(id, callback) {
    db.query("Select questionid, response from answers where userid=" + id, callback);
}

function getTypeData(callback) {
    db.query("select questionid, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
        " from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " +
        " from answers group by questionid) x", callback);
}

exports.getAverageStatistics = getAverageStatistics;
exports.getBouvetStatistics = getBouvetStatistics;
exports.getMaleStatistics = getMaleStatistics;
exports.getFemaleStatistics = getFemaleStatistics;
exports.getCounts = getCounts;
exports.getCurrentAnswers = getCurrentAnswers;
exports.getTypeData = getTypeData;









