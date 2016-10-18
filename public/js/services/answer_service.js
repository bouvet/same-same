/*
 * Service that communicates with the REST API for answers
 */
angular.module("samesameApp.services.answer", [])

    .factory("Answers", function($http) {
        return {
            //Gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
            getAll : function() {
                return $http.get("/answers");
            },
            //Get the answer with the specified id
            get : function(id) {
                return $http.get("/answers/" + id);
            },
            //Creates a new answer based on the answer object passed in
            create : function(answer) {
                return $http.post("/answers", answer);
            },
            //Deletes the answer with the specified id
            delete : function(id) {
                return $http.delete(/answers/ + id);
            },
            //Deletes all answers
            deleteAll : function() {
                return $http.delete("/answers");
            },
            //Exports db data to excel file
            export : function() {
                return $http.get("/exportAnswers");
            }
        };
    })


    .factory("RecentAnswer", function($http) {
        var answer = {};
        return {
            setAnswer : function(recAnswer) {
                answer = {
                    userid : recAnswer.userid,
                    questionid : recAnswer.questionid,
                    response : recAnswer.response
                };
            },
            getAnswer : function() {
                return answer;
            }
        };
    })


    .factory("AnsweredQuestions", function($http) {
        var answeredQuestions = {};

        return {
            initAnsweredQuestions : function(length) {
                answeredQuestions = new Array(length);
                var i;
                //Index starts from 1 to avoid retrieving gender-question in real questionnaire
                for (i = 1 ; i < (length + 1); i++) {
                    answeredQuestions[i] = i;
                }

                return answeredQuestions;
            },

            removeIndex : function(answeredQuestions, index) {
                delete answeredQuestions[index];
            },

            getNextQuestion : function(answeredQuestions) {
                var questionNumber = null;

                while (questionNumber == null) {
                    questionNumber = answeredQuestions[Math.floor(Math.random() * answeredQuestions.length)];
                }
                return questionNumber;
            },

            getAnsweredQuestions : function() {
                return answeredQuestions;
            }
        };
    });