/*
 * Service that communicates with the REST API for statistics
 */
angular.module("samesameApp.services.statistics", [])
    .factory("Statistics", function ($http) {
        var allStat = [],
            statAverage = [],
            statBouvet = [],
            statMale = [],
            statFemale = [],
            statObject = {};

        var counts = [];
        var statPercentage = [];
        var currentAnswers = [];
        var typeData = [];
        var comparisons = [];


        return {
            /*
             The type variable is used to differentiate between the different kinds of average persons we want to obtain values from.
             type = 1 --> Average
             type = 2 --> Bouvet
             type = 3 --> Male
             type = 4 --> Female
             */

            //retrieves statistics from db
            retrieveStatistics: function (type) {
                if (type === 0) {
                    return $http.get("/statsAverage");
                } else if (type === 1) {
                    return $http.get("/statsBouvet");
                } else if (type === 2) {
                    return $http.get("/statsMale");
                } else if (type === 3) {
                    return $http.get("/statsFemale");
                }
            },


            //resets data before retrieving to avoid duplication
            resetStatistics: function (type) {
                statAverage = [];
                statBouvet = [];
                statMale = [];
                statFemale = [];
                allStat = [];
            },

            getAllStats: function (type) {
                return allStat;
            },


            getStatistics: function (type) {
                if (type === 0) {
                    return statAverage;
                } else if (type === 1) {
                    return statBouvet;
                } else if (type === 2) {
                    return statMale;
                } else if (type === 3) {
                    return statFemale;
                }
            },

            //creates one statObject per questionid, and pushes object to respective statList which is used to retrieve data
            setStatistics: function (currObject, type) {
                var i;
                for (i = 0; i < currObject.length; i++) {
                    statObject = {

                        questionid: currObject[i]["questionid"],
                        responseA: currObject[i]["a"],
                        percentageA: currObject[i]["a_"],
                        percentageAText: currObject[i]["a_"] < 50 ? '' : (currObject[i]["a_"] + ' %'),
                        responseB: currObject[i]["b"],
                        percentageB: currObject[i]["b_"],
                        percentageBText: currObject[i]["b_"] <= 50 ? '' : (currObject[i]["b_"] + ' %'),
                        total: currObject[i]["total"],

                        mostFreq: currObject[i]["mostFreq"],
                        greatest: currObject[i]["greatest"]
                    };

                    if (type === 0) {
                        statAverage.push(statObject);
                    }
                    else if (type === 1) {
                        statBouvet.push(statObject);
                    }
                    else if (type === 2) {
                        statMale.push(statObject);
                    }
                    else if (type === 3) {
                        statFemale.push(statObject);
                    }
                }

                if (type === 0) {
                    allStat.push(statAverage);
                } else if (type === 1) {
                    allStat.push(statBouvet);
                } else if (type === 2) {
                    allStat.push(statMale);
                } else if (type === 3) {
                    allStat.push(statFemale);
                }
            },

            retrieveCounts: function () {
                return $http.get("/statsCount");
            },

            resetCounts: function () {
                counts = [];
            },

            getCounts: function () {
                return counts;
            },

            setCounts: function (currObject) {
                var i;
                for (i = 0; i < currObject.length; i++) {
                    statObject = {
                        total: currObject[i][0]["total"],
                        bouvet: currObject[i][0]["bouvet"],
                        male: currObject[i][0]["male"],
                        female: currObject[i][0]["female"]
                    };

                    counts.push(statObject);
                }
            },


            /*
             Comparing module after register-answer but before register-participant:
             */
            retrieveCurrentAnswers: function (id) {
                statPercentage = [];
                return $http.get("/currentAnswers/" + id);
            },

            getCurrentAnswers: function () {
                return currentAnswers;
            },

            compareAnswers: function (average, currList) {
                var result = 0;
                var counter = 0;
                var listLength;

                //In case a new question is added or removed while db is not empty
                listLength = Math.min(currList.length, average.length);

                var i;
                for (i = 0; i < listLength; i++) {
                    if (average[i]["questionid"] === currList[i]["questionid"] && average[i]["mostFreq"] === currList[i]["response"]) {
                        counter++;
                    }
                }
                result = (counter / currList.length) * 100;
                statPercentage.push(result);
            },

            setCurrentAnswers: function (currObject) {
                currentAnswers = [];
                var i;

                for (i = 0; i < currObject.length; i++) {
                    statObject = {
                        questionid: currObject[i]["questionid"],
                        response: currObject[i]["response"]
                    };

                    currentAnswers.push(statObject);
                }
            },

            getPercentageStats: function () {
                return statPercentage;
            },


            retrieveTypeData: function () {
                typeData = [];
                return $http.get("/getTypeData");
            },


            getTypeData: function () {
                return typeData;
            },

            setTypeData: function (currObject) {
                typeData = [];

                var i;
                for (i = 0; i < currObject.length; i++) {
                    statObject = {
                        questionid: currObject[i]["questionid"],
                        mostFreq: currObject[i]["mostFreq"],
                        a_: currObject[i]["a_"],
                        b_: currObject[i]["b_"]
                    };

                    typeData.push(statObject);
                }
            },

            compareCurrentWithType: function (typeData, currentAnswers) {
                comparisons = [];

                var listLength = Math.min(typeData.length, currentAnswers.length);

                var i;
                for (i = 0; i < listLength; i++) {

                    var sameAsType = (currentAnswers[i].response === typeData[i].mostFreq)

                    statObject = {
                        questionid: typeData[i].questionid,
                        response: currentAnswers[i].response,
                        mostAnswered: sameAsType,
                        percentA: typeData[i].a_,
                        percentB: typeData[i].b_
                    };

                    comparisons.push(statObject);
                }

                return comparisons;
            },

            /*
             The purpose of this function is to retrieve interesting statistics to present to user
             If user chooses the same answer as the type answer on ALL questions, then this function
             returns the question where the users answer was a part of the biggest majority

             If the user does not choose the same answer as the typical answer, then the function
             will return the question where the user was a part of the smallest minority of answers.

             The function returns an object holding necessary information about answer, question and
             percentages, which is used to show results in view.
             */
            getBiggestDeviation: function (comparisons) {

                //neg variables is the main check. But if no neg variables are found, I retrieve biggest positive deviation to present
                var biggestNegDeviationIndex = -1,
                    biggestNegDeviation = 0,
                    currentNegDeviation = -1;

                var biggestPosDeviationIndex = -1,
                    biggestPosDeviation = 0,
                    currentPosDeviation = -1;

                var i;
                //Purpously omitting index=0, because statistics male/female is not interesting
                for (i = 1; i < comparisons.length; i++) {

                    var typeAnswer = comparisons[i].mostAnswered;
                    var userResponse = comparisons[i].response;
                    var percentA = comparisons[i].percentA;
                    var percentB = comparisons[i].percentB;


                    if (typeAnswer === false) {
                        if (userResponse === 'a') {
                            currentNegDeviation = percentB - percentA;
                            if (currentNegDeviation > biggestNegDeviation) {
                                biggestNegDeviation = currentNegDeviation;
                                biggestNegDeviationIndex = i;
                            }
                        } else if (userResponse === 'b') {
                            currentNegDeviation = percentA - percentB;
                            if (currentNegDeviation > biggestNegDeviation) {
                                biggestNegDeviation = currentNegDeviation;
                                biggestNegDeviationIndex = i;
                            }
                        }
                    } else if (typeAnswer === true) {
                        if (userResponse === 'a') {
                            currentPosDeviation = percentA - percentB;
                            if (currentPosDeviation > biggestPosDeviation) {
                                biggestPosDeviation = currentPosDeviation;
                                biggestPosDeviationIndex = i;
                            }
                        } else if (userResponse === 'b') {
                            currentPosDeviation = percentB - percentA;
                            if (currentPosDeviation > biggestPosDeviation) {
                                biggestPosDeviation = currentPosDeviation;
                                biggestPosDeviationIndex = i;
                            }
                        }
                    }
                }

                //Setting object:
                var questionid,
                    response,
                    mostAnswered,
                    percentage;

                if (biggestNegDeviationIndex === -1) {
                    questionid = currentAnswers[biggestPosDeviationIndex].questionid;
                    response = currentAnswers[biggestPosDeviationIndex].response;
                    mostAnswered = true;

                    if (response === 'a') {
                        percentage = typeData[biggestPosDeviationIndex].a_;
                    } else if (response === 'b') {
                        percentage = typeData[biggestPosDeviationIndex].b_;
                    }
                } else {
                    questionid = currentAnswers[biggestNegDeviationIndex].questionid;
                    response = currentAnswers[biggestNegDeviationIndex].response;
                    mostAnswered = false;

                    if (response === 'a') {
                        percentage = typeData[biggestNegDeviationIndex].a_;
                    } else if (response === 'b') {
                        percentage = typeData[biggestNegDeviationIndex].b_;
                    }
                }

                return statObject = {
                    questionid: questionid,
                    response: response,
                    mostAnswered: mostAnswered,
                    percent: percentage
                };
            }

        };
    });