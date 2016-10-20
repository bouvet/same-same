"use strict";

/*Main app*/

/*
 The dependencies used in the app are defined, and the route functionality of angular is set up.
 Defines which html file to return in 'templateUrl' and the associated controller if it exists
 */
var app = angular.module("samesameApp", [
    "ngRoute",
    "ngAnimate",
    "samesameApp.controllers.answer",
    "samesameApp.controllers.participant",
    "samesameApp.controllers.statistics",
    "samesameApp.controllers.slides",
    "samesameApp.directives",
    "samesameApp.services.user",
    "samesameApp.services.text",
    "samesameApp.services.answer",
    "samesameApp.services.participant",
    "samesameApp.services.statistics",
    "samesameApp.services.slides",
    "samesameApp.services.question",
    "samesameApp.filters",
    "ui.bootstrap"
]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/partial-index",
        {
            templateUrl: "views/partial-index.html"
        });

    $routeProvider.when("/partial-start",
        {
            templateUrl: "views/partial-start.html", controller: "InitUserCtrl"
        });

    $routeProvider.when("/partial-register-gender",
        {
            templateUrl: "views/partial-register-gender.html", controller: "RegisterGenderCtrl"
        });

    $routeProvider.when("/partial-register-answer",
        {
            templateUrl: "views/partial-register-answer.html", controller: "RegisterAnswerCtrl"
        });

    $routeProvider.when("/partial-register-participant",
        {
            templateUrl: "views/partial-register-participant.html", controller: "RegisterParticipantCtrl"
        });

    $routeProvider.when("/partial-participant-registered",
        {
            templateUrl: "views/partial-participant-registered.html", controller: "RegisterParticipantCtrl"
        });

    $routeProvider.when("/partial-view-answers",
        {
            templateUrl: "views/partial-view-answers.html", controller: "AnswerCtrl"
        });

    $routeProvider.when("/partial-view-participants",
        {
            templateUrl: "views/partial-view-participants.html", controller: "ParticipantsCtrl"
        });


    /* ============================================================
     * Stats views
     * ============================================================ */

    $routeProvider.when("/partial-stat-overview",
        {
            templateUrl: "views/partial-stat-overview.html"
        });

    $routeProvider.when("/partial-stat-table",
        {
            templateUrl: "views/partial-stat-table.html", controller: "StatisticsTableCtrl"
        });

    $routeProvider.when("/partial-stat-typePerson",
        {
            templateUrl: "views/partial-stat-typePerson.html", controller: "StatisticsTypePersonCtrl"
        });

    $routeProvider.when("/partial-stat-carousel",
        {
            templateUrl: "views/partial-stat-carousel.html", controller: "StatisticsCarouselCtrl"
        });

    $routeProvider.when("/partial-view-logo",
        {
            templateUrl: "views/partial-view-logo.html", controller: "DisplayLogoCtrl"
        });

    $routeProvider.when("/partial-view-results",
        {
            templateUrl: "views/partial-view-results.html", controller: "StatisticsCompareCtrl"
        });
    $routeProvider.when("/partial-view-slideshow",
        {
            templateUrl: "views/partial-view-slideshow.html", controller: "SlidesCtrl"
        });

    $routeProvider.otherwise({redirectTo: "/partial-index"});

}]);

app.factory('RunService', function () {
    var run = 0;
    return {
        get: function () {
            return run;
        },
        inc: function () {
            run++;
        }
    };
});

app.factory('QueueService', function ($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        //console.log(manifest);
        queue.loadManifest(manifest);

        queue.on('progress', function (event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function () {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});
