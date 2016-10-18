/*
 * The controller used by answers
 */
angular.module("samesameApp.controllers.answer", [])
/*
 * The controller used in the viewing of answers
 */
    .controller("AnswerCtrl", ["$scope", "Answers", function ($scope, Answers) {

        //The number of answers showed in one view
        $scope.limitAnswers = 10;
        //the starting index of the view
        $scope.startAnswers = 0;


        //Update the index of viewed answers +10
        $scope.tenNextAnswers = function () {
            if ($scope.startAnswers + 10 < $scope.answers.length) {
                $scope.startAnswers += 10;
            }
        };

        //Update the index of viewed answers -10
        $scope.tenPrevAnswers = function () {
            if ($scope.startAnswers - 10 >= 0) {
                $scope.startAnswers -= 10;
            }
        };

        //Update the index of viewed answers to the last 10
        $scope.tenLastAnswers = function () {
            $scope.startAnswers = $scope.answers.length - lastIndex($scope.answers.length);
        };

        //Set the index to the first 10 answers
        $scope.tenFirstAnswers = function () {
            $scope.startAnswers = 0;
        };

        //Get all answers from the server,
        $scope.getAnswers = function () {
            Answers.getAll().success(function (data) {
                $scope.answers = data;
            });
        };

        //Initial call to fetch answers
        $scope.getAnswers();


        //Deletes all answers and gets all answers again
        $scope.deleteAnswers = function () {
            Answers.deleteAll().success(function () {
                $scope.getAnswers();
            });
        };

        //Deletes the answer with the specified id and gets all answers again
        $scope.deleteAnswer = function (id) {
            Answers.delete(id).success(function () {
                $scope.getAnswers();
            });
        };

        //Helper method for 'tenLastAnswers'
        function lastIndex(length) {
            var mod = length % 10;
            if (mod === 0) {
                return 10;
            }
            else {
                return mod;
            }
        }

        $scope.exportAnswers = function () {
            Answers.export().success(function () {
            });
        };
    }])

    /*
     * The controller used for registration of gender before the questions
     */
    .controller("RegisterGenderCtrl", ["$scope", "$location", "TextStrings", "AnsweredQuestions", "Questions", "Answers", "RecentAnswer", "UserIDService", function ($scope, $location, TextStrings, AnsweredQuestions, Questions, Answers, RecentAnswer, UserIDService) {

        $scope.registerAnswerHeader = TextStrings.registerAnswerHeader;


        //Maintains total number of questions
        var numberOfQuestions = Object.keys(Questions).length;

        //Setting variables used throughout questionnaire
        var questionid = 0;
        var gender;
        var userid = JSON.stringify(UserIDService.getUserID());
        var answeredQuestions = AnsweredQuestions.initAnsweredQuestions(numberOfQuestions);


        //Needed for retrieving images correctly at init stage
        AnsweredQuestions.removeIndex(answeredQuestions, questionid);
        $scope.nextQ = questionid;
        $scope.answeredQuestions = answeredQuestions;


        $scope.nextQuestion = function (response, radio) {

            if (response === 'a') {
                gender = 'm';
            }
            else if (response === 'b') {
                gender = 'f';
            }

            UserIDService.setGender(gender);

            //Creating JSON object used to send to db
            var dataJSON = {"userid": userid, "questionid": questionid, "response": response, "gender": gender};

            Answers.create(dataJSON)
                .success(function (data) {
                    console.log("answer registered" + JSON.stringify(dataJSON));
                    RecentAnswer.setAnswer(dataJSON);

                    $location.path("/partial-register-answer");
                });

        };
    }])

    /*
     * The controller used on the page where the user registers answers
     */
    .controller("RegisterAnswerCtrl", ["$scope", "$location", "Answers", "Questions", "RecentAnswer", "AnsweredQuestions", "UserIDService", "TextStrings", function ($scope, $location, Answers, Questions, RecentAnswer, AnsweredQuestions, UserIDService, TextStrings) {


        $scope.registerAnswerHeader = TextStrings.registerAnswerHeader;


        //Generates random number within range to select first question
        var nextQ = getRandomInt(1, Object.keys(Questions).length);


        //Setting variables used throughout questionnaire
        var answeredQuestions = AnsweredQuestions.getAnsweredQuestions();
        var userid = JSON.stringify(UserIDService.getUserID());


        //Needed for retrieving images correctly at init stage
        AnsweredQuestions.removeIndex(answeredQuestions, nextQ);
        $scope.nextQ = nextQ;
        //$scope.answeredQuestions = answeredQuestions;


        $scope.nextQuestion = function (response, radio) {

            answeredQuestions = AnsweredQuestions.getAnsweredQuestions();
            var listEmpty = isListEmpty(answeredQuestions);

            var questionid = $scope.nextQ;
            var gender = UserIDService.getGender();

            //Creating JSON object used to send to db
            var dataJSON = {"userid": userid, "questionid": questionid, "response": response, "gender": gender};

            Answers.create(dataJSON)
                .success(function (data) {
                    console.log("answer registered" + JSON.stringify(dataJSON));
                    RecentAnswer.setAnswer(dataJSON);

                    //Updating with next image, iff there are more images.
                    if (!listEmpty) {
                        var nextQ = AnsweredQuestions.getNextQuestion(answeredQuestions);
                        AnsweredQuestions.removeIndex(answeredQuestions, nextQ);
                        $scope.nextQ = nextQ;
                        $location.path("/partial-register-answer");
                    }
                    else {
                        $location.path("/partial-view-results");
                    }
                });

            $scope.questions = Questions.questions;
        };
    }]);

function isListEmpty(list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] != null) {
            return false;
        }
    }
    return true;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}