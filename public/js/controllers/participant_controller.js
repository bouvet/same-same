/*
 * The controller used in the viewing of participants
 */
angular.module("samesameApp.controllers.participant", [])
    .controller("ParticipantsCtrl", ["$scope", "filterFilter", "Participants", function ($scope, filterFilter, Participants) {

        //Initial fetching of participants and updates the list of winners
        Participants.getAll().success(function (data) {
            $scope.participants = data;
            getWinners();
        });

        //Index of view
        $scope.startParticipants = 0;
        //Number of participants showed in the view
        $scope.limitParticipants = 10;

        //Deletes all participants and fetches the participants again
        $scope.deleteParticipants = function () {
            Participants.deleteAll().success(function () {
                Participants.getAll().success(function (data) {
                    $scope.participants = data;
                });
            });
        };

        /*
         * Used to pick a winner.
         * Finds a winner from the list of participants and checks whether the winner already is a winner.
         * If so, it picks a new winner recursively.
         * If not it marks the participant as a winner, gets all participants again, and updates the list of winners
         */
        $scope.pickWinner = function () {
            if ($scope.winners.length < $scope.participants.length) {
                var winnerIndex = Math.floor(Math.random() * $scope.participants.length);
                var winnerEmail = $scope.participants[winnerIndex].email;
                if (winnerAlreadyExists(winnerEmail)) {
                    $scope.pickWinner();
                }
                else {
                    Participants.updateWinner(winnerEmail).success(function () {
                        Participants.getAll().success(function (data) {
                            $scope.participants = data;
                            getWinners();
                        });
                    });
                }
            }
        };

        //Helper method for 'pickWinner', checks if the email passed in is the email of any participant already in the list of winners
        function winnerAlreadyExists(winnerEmail) {
            var i;
            for (i = 0; i < $scope.winners.length; i++) {
                if ($scope.winners[i].email === winnerEmail) {
                    return true;
                }
            }
            return false;
        }

        //Sets the list of winners
        function getWinners() {
            $scope.winners = filterFilter($scope.participants, {winner: 1});
        }

        //Deletes all winners and gets all participants again, since the list of winners is a filtered version of the list of participants
        $scope.deleteWinners = function () {
            Participants.deleteWinners().success(function () {
                Participants.getAll().success(function (data) {
                    $scope.participants = data;
                    getWinners();
                });
            });
        };

        //Updates the index of the viewing of participants +10
        $scope.tenNextParticipants = function () {
            if ($scope.startParticipants + 10 < $scope.participants.length) {
                $scope.startParticipants += 10;
            }
        };

        //Updates the index of the viewing of participants -10
        $scope.tenPrevParticipants = function () {
            if ($scope.startParticipants - 10 >= 0) {
                $scope.startParticipants -= 10;
            }
        };

        //Updates the index to the last 10 participants
        $scope.tenLastParticipants = function () {
            $scope.startParticipants = $scope.participants.length - lastIndex($scope.participants.length);
        };

        //Updates the index to the first participants
        $scope.tenFirstParticipants = function () {
            $scope.startParticipants = 0;
        };

        //Helper method of 'tenLastParticipants'
        function lastIndex(length) {
            var mod = length % 10;
            if (mod === 0) {
                return 10;
            }
            else {
                return mod;
            }
        }

        function exportParticipants() {
            Participants.export().success(function () {
            });
        }

    }])

    /*
     * The controller used on the page where the user registers the contact info
     */
    .controller("RegisterParticipantCtrl", ["$scope", "$location", "Participants", "UserIDService", "Statistics", "TextStrings", function ($scope, $location, Participants, UserIDService, Statistics, TextStrings) {


        $scope.participant1Text = TextStrings.registerParticipant1Text;
        $scope.participant2Text = TextStrings.registerParticipant2Text;

        //Initial object of participant
        $scope.participant = {};
        //The initial field of duplicate contact info0
        $scope.duplicateEmail = "";


        //A setter for the duplicate email field
        $scope.setDuplicateEmail = function () {
            $scope.duplicateEmail = $scope.participant.email;
        };

        /*
         * Used to submit the participant object.
         * If no error is received, we are relocated to the next page
         * If an error is detected and the status is 400, it's set by the server due to duplicate entry of the primary key (email)
         * Sets the attempted email as duplicated, which in turn is used to inform the user
         */
        $scope.submitParticipant = function () {
            var bouvet;

            if (isBouvetEmployee($scope.participant.email)) {
                bouvet = 1;
            }
            else {
                bouvet = 0;
            }

            var userid = UserIDService.getUserID();


            //Creating JSON object used to send to db
            var dataJSON = {
                "userid": userid,
                "name": $scope.participant.name,
                "email": $scope.participant.email,
                "prize": "a",
                "bouvet": bouvet
            };


            Participants.create(dataJSON)
                .success(function (data) {
                    console.log("participant registered" + JSON.stringify(dataJSON));
                    $location.path("/partial-participant-registered");
                })
                .error(function (data, status) {
                    if (status === 400) {
                        $scope.setDuplicateEmail();
                    }
                });
        };

    }])

    /*
     * Inits a unique user id. Used for db interaction for a single user
     */
    .controller("InitUserCtrl", ["$scope", "$location", "UserIDService", function ($scope, $location, UserIDService) {

        var d = new Date();
        var id = d.getTime();

        UserIDService.setUserID(id);
        $location.path("/partial-start");
    }]);

function isBouvetEmployee(email) {
    var mail = email.split("@");
    var domain = mail[1];
    return (domain === "bouvet.no");
}