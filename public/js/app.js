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
            templateUrl: "views/partial-index.html", controller: "SlidesCtrl"
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
            templateUrl: "views/partial-stat-typePerson.html", controller: "StatisticsTypePersonCtrl",
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
            templateUrl: "views/partial-view-slideshow.html", controller: "MainCtrl"
        });

    $routeProvider.otherwise({redirectTo: "/partial-index"});

}]);

app.controller('MainCtrl', function ($rootScope, $scope, $timeout, $location, RunService, QueueService, SliderConstants) {
    var slides = $rootScope.slides;
    console.log("Slides");
    console.log(slides);

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, SliderConstants.getMillisForSlides);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.$on('queueProgress', function (event, queueProgress) {
    });

    $scope.$on('queueComplete', function (event, slides) {
        $scope.$apply(function () {
            $scope.slides = slides;
            console.log($scope.slides);
            $scope.loaded = true;

            $timeout(nextSlide, SliderConstants.getMillisForSlides);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = -1;
    $scope.currentAnimation = 'fade-in-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    if (!$scope.slides) {
        loadSlides();
    }

    nextSlide();
});

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

app.animation('.slide-left-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, {left: $window.innerWidth}, {left: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
        }
    };
});

app.animation('.slide-down-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, {top: -$window.innerHeight}, {top: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
        }
    };
});

app.animation('.fade-in-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, {opacity: 0}, {opacity: 1, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {opacity: 0, onComplete: done});
        }
    };
});

app.directive('bgImage', function ($window, $timeout) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
        };

        element.bind('load', function () {
            resizeBG();
        });
    }
});