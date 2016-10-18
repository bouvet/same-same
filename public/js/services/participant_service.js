/*
 * Service that communicates with the REST API for participants
 */
angular.module("samesameApp.services.participant", [])

    .factory("Participants", function ($http) {
        return {
            //Gets all participants
            getAll: function () {
                return $http.get("/participants");
            },
            //Deletes all participants
            deleteAll: function () {
                return $http.delete("/participants");
            },
            //Creates a new participant based on the participant object passed in
            create: function (participant) {
                return $http.post("/participants", participant);
            },
            //Marks the participant with that email as winner
            updateWinner: function (email) {
                return $http.post("/winners/" + email);
            },
            //Deletes all winners (sets the 'winner' field of all participants to 0)
            deleteWinners: function () {
                return $http.delete("/winners");
            },
            export: function () {
                return $http.get("/exportParticipants");
            }
        };
    })

    .factory("Prize", function () {
        return {
            question1: {
                questionid: '1',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/prize/1a.jpg"
                    }, {
                        value: 'b',
                        imageURL: "./images/prize/1b.jpg"
                    }
                ]
            }

        };
    });
