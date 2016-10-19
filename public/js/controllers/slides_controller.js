angular.module("samesameApp.controllers.slides", [])
    .controller('SlidesCtrl', function ($rootScope, $scope, $timeout, $location, RunService, QueueService, SliderConstants, Slides) {
        $scope.slides = [];
        $scope.getSlides = function () {
            Slides.getAllSlides().success(function (data) {
                $scope.slides = data;
            });
        };

        $scope.getSlides();

        var slides = $scope.slides;

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
    })

    .animation('.fade-in-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, {opacity: 0}, {opacity: 1, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {opacity: 0, onComplete: done});
            }
        };
    })

    .animation('.slide-left-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, {left: $window.innerWidth}, {left: 0, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
            }
        };
    })

    .animation('.slide-down-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, {top: -$window.innerHeight}, {top: 0, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
            }
        };
    });