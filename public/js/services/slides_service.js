angular.module("samesameApp.services.slides", [])

    .factory("Slides", function ($http) {
        return {
            getAllSlides: function () {
                return $http.get("/slides");
            }
        };
    });
