"use strict";

/*Main app*/

/*
The dependencies used in the app are defined, and the route functionality of angular is set up.
Defines which html file to return in 'templateUrl' and the associated controller if it exists
*/
var app = angular.module("samesameApp", [
	"ngRoute",
	"ngAnimate",
	"samesameApp.controllers",
	"samesameApp.directives",
	"samesameApp.services.user",
	"samesameApp.services.text",
	"samesameApp.services.answer",
	"samesameApp.services.participant",
	"samesameApp.services.statistics",
	"samesameApp.services.question",
	"samesameApp.filters",
	"ui.bootstrap"
	]).

config(["$routeProvider", function($routeProvider) {
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
Stats views
=============================================================*/

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


//var app = angular.module('website', ['ngAnimate', 'ui.bootstrap']);

app.controller('MainCtrl', function ($scope, $timeout, $location, RunService, QueueService) {
    var INTERVAL = 10000;
    // var slides = [
	   //  {id:"image00", src:"./images/slides/Slide01.jpg"},
	   //  {id:"image01", src:"./images/slides/Slide02.jpg"},
	   //  {id:"image02", src:"./images/slides/Slide03.jpg"},
	   //  {id:"image03", src:"./images/slides/Slide04.jpg"},
	   //  {id:"image04", src:"./images/slides/Slide05.jpg"},
	   //  {id:"image05", src:"./images/slides/Slide06.jpg"},
	   //  {id:"image06", src:"./images/slides/Slide07.jpg"},
	   //  {id:"image07", src:"./images/slides/Slide08.jpg"},
	   //  {id:"image08", src:"./images/slides/Slide09.jpg"},
	   //  {id:"image09", src:"./images/slides/Slide10.jpg"},
	   //  {id:"image10", src:"./images/slides/Slide11.jpg"},
	   //  {id:"image11", src:"./images/slides/Slide12.jpg"},
	   //  {id:"image12", src:"./images/slides/Slide13.jpg"},
	   //  {id:"image13", src:"./images/slides/Slide14.jpg"},
	   //  {id:"image14", src:"./images/slides/Slide15.jpg"},
	   //  {id:"image15", src:"./images/slides/Slide16.jpg"},
	   //  {id:"image16", src:"./images/slides/Slide17.jpg"},
	   //  {id:"image17", src:"./images/slides/Slide18.jpg"},
	   //  {id:"image18", src:"./images/slides/Slide19.jpg"},
	   //  {id:"image19", src:"./images/slides/Slide20.jpg"},
	   //  {id:"image20", src:"./images/slides/Slide21.jpg"},
	   //  {id:"image21", src:"./images/slides/Slide22.jpg"},
	   //  {id:"image22", src:"./images/slides/Slide23.jpg"},
	   //  {id:"image23", src:"./images/slides/Slide24.jpg"},
	   //  {id:"image24", src:"./images/slides/Slide25.jpg"},
	   //  {id:"image25", src:"./images/slides/Slide26.jpg"},
	   //  {id:"image26", src:"./images/slides/Slide27.jpg"},
	   //  {id:"image27", src:"./images/slides/Slide28.jpg"},
	   //  {id:"image28", src:"./images/slides/Slide29.jpg"}
    // ];

    var slides = getSlides();
   	//console.log(slides)

   	function getSlides(){
   		var slides = [];
        slides.push({"id":"image1", "src":"./images/slides/Slide01.jpg"});
   		for (var i =8;i<32;i++) {
   			if (i < 10) {
   				slides.push({"id":"image" + i, "src":"./images/slides/Slide0" + i + ".jpg"});
   			} 
            else {
   				slides.push({"id":"image" + i, "src":"./images/slides/Slide" + i + ".jpg"});
   			}
   		}
   		return slides;
   	}


    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        //console.log("Slide " + $scope.currentIndex + " of " + ($scope.slides.length -1));
    	 //if ($scope.currentIndex == $scope.slides.length - 1) {
    	 //	$scope.currentIndex = 0;
    	 //	$location.path("/partial-stat-typePerson");
    	 //} else {
        	$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        	$timeout(nextSlide, INTERVAL);
    	 //}
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

    $scope.$on('queueProgress', function(event, queueProgress) {
        //$scope.$apply(function(){
        //    $scope.progress = queueProgress.progress * 100;
        //});
    });

    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function(){
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'fade-in-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    if (!$scope.slides) {
        loadSlides();
    }
});


// app.factory("Slides", function($http) {
// 	return {
// 		//gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
// 		get : function() {
// 			return $http.get("/slides");
// 		}
// 	};
// })

// app.factory('SlideService', function(Slides) {
// 	var slides = 
// 	Slides.get().succsess(function(data) {
// 		slides = data;
// 	});
// 	return {
// 		get: function() {
// 			console.log(slides);
// 			return slides;
// 		}
// 	};
// });


app.factory('RunService', function() {
	var run = 0;
	return {
		get: function() {
			return run;
		},
		inc: function() {
			run++;
		}
	};
});

app.factory('QueueService', function($rootScope){
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
    	//console.log(manifest);
        queue.loadManifest(manifest);

        queue.on('progress', function(event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function() {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
})

app.animation('.slide-left-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { left: $window.innerWidth}, {left: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
        }
    };
});

app.animation('.slide-down-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { top: -$window.innerHeight}, {top: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
        }
    };
});

app.animation('.fade-in-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {opacity: 0, onComplete: done});
        }
    };
});

app.directive('bgImage', function ($window, $timeout) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
            // var bgwidth = element.width();
            // var bgheight = element.height();

            // var winwidth = $window.innerWidth;
            // var winheight = $window.innerHeight;

            // var widthratio = winwidth / bgwidth;
            // var heightratio = winheight / bgheight;

            // var widthdiff = heightratio * bgwidth;
            // var heightdiff = widthratio * bgheight;

            // if (heightdiff > winheight) {
            //     element.css({
            //         width: winwidth + 'px',
            //         height: heightdiff + 'px'
            //     });
            // } else {
            //     element.css({
            //         width: widthdiff + 'px',
            //         height: winheight + 'px'
            //     });
            // }
        };

        var windowElement = angular.element($window);
        // windowElement.resize(resizeBG);

        element.bind('load', function () {
            resizeBG();
        });
    }
});