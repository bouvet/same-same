angular.module("samesameApp.controllers.slides", [])
    .controller('SlidesCtrl', ["$rootScope", "$scope", "Slides", function ($rootScope, $scope, Slides) {
        $rootScope.slides = [];
        $scope.getSlides = function () {
            Slides.getAllSlides().success(function (data) {
                $rootScope.slides = data;
                console.log("Service");
                console.log($rootScope.slides);
                done = true;
            });
        };

        $scope.getSlides();
    }]);