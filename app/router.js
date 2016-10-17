/*jshint node:true*/
"use strict";

var app_service = require("./services/app_service");
var answer_service = require("./services/answer_service");
var participant_service = require("./services/participant_service");
var statistics_service = require("./services/statistics_service");

//Routing:
module.exports = function (app) {

    /*====================================
     *            App Service
     *====================================*/
    app.route("/")
        .get(app_service.index);


    app.route("/slides")
        .get(app_service.slides);


    /*====================================
     *          Answer Service
     *====================================*/

    /*
     * Route for accessing multiple answers or create a new answer
     * supports GET, POST, DELETE
     */
    app.route("/answers")
    //Used to get all answers in json format
        .get(answer_service.getAllAnswers)

        //Used to insert a new answer
        .post(answer_service.insertAnswer)

        //Used to truncate the table containing the answers
        .delete(answer_service.deleteAllAnswers);

    /*
     * Route for accessing specific answers based on the id provided as parameter
     * supports GET, PUT, DELETE
     */
    app.route("/answers/:id")
    //Used to get the answer with the specified id
        .get(answer_service.getSingleAnswer)

        //Used to delete the answer with the specified id
        .delete(answer_service.deleteSingleAnswer);

    app.route("/exportAnswers")
        .get(answer_service.exportAnswers);


    /*====================================
     *        Participant Service
     *====================================*/

    /*
     * Route for accessing multiple participants
     * supports GET, POST, DELETE
     */
    app.route("/participants")
    //Used to get all participants in json format
        .get(participant_service.getParticipants)

        //Used to insert a new participant
        .post(participant_service.insertParticipant)

        //Used to truncate the table containing participants
        .delete(participant_service.deleteParticipants);

    /*
     * Route for creating a winner with the specified email/contact info as primary key
     * actually changes the 'winner' field of the participant with that primary key from 0 to 1, but for the user it 'creates' a winner
     */
    app.route("/winners/:email")
        .post(participant_service.updateWinner);

    //Route for deleting all winners, sets the 'winner' field of all participants to 0, but for the user is 'deletes' all winners
    app.route("/winners")
    //Used to reset all fields indicating winners
        .delete(participant_service.deleteWinners);

    app.route("/exportParticipants")
        .get(participant_service.exportParticipants);


    /*====================================
     *        Statistics Service
     *====================================*/
    app.route("/statsAverage")
        .get(statistics_service.getAverageStatistics);

    app.route("/statsBouvet")
        .get(statistics_service.getBouvetStatistics);

    app.route("/statsMale")
        .get(statistics_service.getMaleStatistics);

    app.route("/statsFemale")
        .get(statistics_service.getFemaleStatistics);

    app.route("/statsCount")
        .get(statistics_service.getCounts);

    app.route("/currentAnswers/:id")
        .get(statistics_service.getCurrentAnswers);

    app.route("/getTypeData")
        .get(statistics_service.getTypeData);
};