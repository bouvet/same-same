angular.module("samesameApp.controllers.statistics", [])
    .controller("StatisticsTypePersonCtrl", ["$scope", "$interval", "$location", "Statistics", "SliderConstants", function ($scope, $interval, $location, Statistics, SliderConstants) {
        var pairs;

        //Retrieves data for the type parameter
        var retrieveStatistics = function (type, cb) {
            Statistics.resetStatistics();
            //initial call to fetch answers
            Statistics.retrieveStatistics(type).success(function (data) {
                var statistics = data;
                // sets objectlist
                Statistics.setStatistics(statistics, type);

                if (cb) {
                    cb(Statistics.getStatistics(type), type);
                }
            });
        };


        var retrieveAllStatistics = function (cb) {
            var count = 4;
            var data = [];
            var allDone = function (partial, index) {
                count = count - 1;
                data[index] = partial;
                if (count === 0) {
                    cb(data);
                }
            };

            retrieveStatistics(0, allDone);
            retrieveStatistics(1, allDone);
            retrieveStatistics(2, allDone);
            retrieveStatistics(3, allDone);
        };

        //Following variables used for stat-carousel
        var initList = function () {
            return [
                Statistics.getStatistics(0),
                Statistics.getStatistics(1),
                Statistics.getStatistics(2),
                Statistics.getStatistics(3)
            ];
        };

        //Administers freshness of typical person lists
        var getNextListForTypePerson = function (cb) {

            retrieveAllStatistics(function (allData) {

                var activeList = allData[currentList],
                    lengthOfSublist = 4,
                    arrayToReturn = [],
                    subArray = [];

                var pushed = true;

                var i;
                for (i = 0; i < activeList.length; i++) {
                    if ((i + 1) % lengthOfSublist === 0) {
                        subArray.push(activeList[i]);
                        arrayToReturn.push(subArray);
                        subArray = [];
                        pushed = true;
                    } else {
                        subArray.push(activeList[i]);
                        pushed = false;
                    }
                }
                if (!pushed) {
                    arrayToReturn.push(subArray);
                }
                $scope.activeList = arrayToReturn;
                $scope.listname = getListname(currentList);

                if (currentList === allData.length - 1) {
                    currentList = 0;
                } else {
                    currentList++;
                }

                cb();

            });
        };

        var getListname = function (index) {
            if (index === 0) {
                return "JavaZone deltageren";
            } else if (index === 1) {
                return "Bouvetansatte";
            } else if (index === 2) {
                return "mannen";
            } else if (index === 3) {
                return "kvinnen";
            }
        };

        pairs = initList();

        $scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
        $scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.


        //Exposure
        var currentCollectionId = 0, currentImageId = 0;
        var currentList = 2;

        var activeObject;

        var setCurrentImageObject = function () {
            //setListName(currentCollectionId);
            $scope.activeObject = pairs[currentCollectionId][currentImageId];
        };

        $scope.getCurrentImage = function (suffix) {

            setCurrentImageObject();

            //To initially set image while waiting for Angular
            if (!pairs[currentCollectionId][currentImageId]) {
                return "loading.png";
            }

            $scope.dataList = pairs[currentCollectionId];

            //Each of following scope variables, corresponds to each progress bar in partial-stat-carousel
            $scope.allList = pairs[0][currentImageId];
            $scope.bouvetList = pairs[1][currentImageId];
            $scope.maleList = pairs[2][currentImageId];
            $scope.femaleList = pairs[3][currentImageId];

            return pairs[currentCollectionId][currentImageId].questionid + suffix + '.png';
        };

        var getNextImageForCarousel = function (cb) {

            if (currentImageId === pairs[currentCollectionId].length - 1) { //if end of the current collection
                var nextCollectionId;
                if (currentCollectionId === pairs.length - 1) {
                    nextCollectionId = 0;
                } else {
                    nextCollectionId = currentCollectionId + 1;
                }

                retrieveStatistics(nextCollectionId, function (imagePairList) {
                    currentImageId = 0;
                    currentCollectionId = nextCollectionId;
                    pairs[nextCollectionId] = imagePairList;
                    cb();
                });
            } else {
                currentImageId = currentImageId + 1;
                cb();
            }
        };

        var count = SliderConstants.numberOfListsTypePerson;
        var handleInterval = function () {

            if ($location.path() === "/partial-stat-typePerson") {
                if (count === 0) {
                    count = 4;
                    $location.path("/partial-stat-carousel");
                } else {
                    getNextListForTypePerson(function () {
                        $interval(handleInterval, SliderConstants.getMillisForTypePerson, 1);
                    });
                }
            }
            count = count - 1;
        };

        handleInterval();
    }])

    .controller("StatisticsCarouselCtrl", ["$scope", "$interval", "$location", "Statistics", "SliderConstants", "Questions", function ($scope, $interval, $location, Statistics, SliderConstants, Questions) {

        var pairs = [];


        //Retrieves data for the type parameter
        var retrieveStatistics = function (type, cb) {
            Statistics.resetStatistics();
            //initial call to fetch answers
            Statistics.retrieveStatistics(type).success(function (data) {
                var statistics = data;
                // sets objectlist
                Statistics.setStatistics(statistics, type);

                if (cb) {
                    cb(Statistics.getStatistics(type), type);
                }
            });
        };

        var retrieveAllStatistics = function (cb) {
            var count = 4;
            var data = [];
            var allDone = function (partial, index) {
                count = count - 1;
                data[index] = partial;

            };

            retrieveStatistics(0, allDone);
            retrieveStatistics(1, allDone);
            retrieveStatistics(2, allDone);
            retrieveStatistics(3, allDone);
        };

        //Following variables used for stat-carousel
        var initList = function () {
            return [
                Statistics.getStatistics(0),
                Statistics.getStatistics(1),
                Statistics.getStatistics(2),
                Statistics.getStatistics(3)
            ];
        };

        //Exposure
        var currentCollectionId = 0, currentImageId = 0;
        var currentList = 2;

        var activeObject;

        var setCurrentImageObject = function () {
            //setListName(currentCollectionId);
            $scope.activeObject = pairs[currentCollectionId][currentImageId];
        };

        $scope.getCurrentImage = function (suffix) {

            setCurrentImageObject();

            //To initially set image while waiting for Angular
            if (!pairs[currentCollectionId][currentImageId]) {
                return "loading.png";
            }

            $scope.dataList = pairs[currentCollectionId];

            //Each of following scope variables, corresponds to each progress bar in partial-stat-carousel
            $scope.allList = pairs[0][currentImageId];
            $scope.bouvetList = pairs[1][currentImageId];
            $scope.maleList = pairs[2][currentImageId];
            $scope.femaleList = pairs[3][currentImageId];

            return pairs[currentCollectionId][currentImageId].questionid + suffix + '.png';
        };

        retrieveAllStatistics();
        pairs = initList();

        $scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
        $scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.

        var getNextImageForCarousel = function (cb) {

            if (currentImageId === pairs[currentCollectionId].length - 1) { //if end of the current collection
                var nextCollectionId;
                if (currentCollectionId === pairs.length - 1) {
                    nextCollectionId = 0;
                } else {
                    nextCollectionId = currentCollectionId + 1;
                }

                retrieveStatistics(nextCollectionId, function (imagePairList) {
                    currentImageId = 0;
                    currentCollectionId = nextCollectionId;
                    pairs[nextCollectionId] = imagePairList;
                    cb();
                });
            } else {
                currentImageId = currentImageId + 1;
                cb();
            }
        };

        var count = Questions.getAll().questions.length;
        var handleInterval = function () {
            if ($location.path() === "/partial-stat-carousel") {
                if (count === 0) {
                    $location.path("/partial-stat-typePerson");
                } else {
                    getNextImageForCarousel(function () {
                        $interval(handleInterval, SliderConstants.getMillisForCarouselSlide, 1);
                    });
                }
            }
            count = count - 1;
        };

        handleInterval();
    }])


    .controller("DisplayLogoCtrl", ["$scope", "$interval", "$location", "SliderConstants", function ($scope, $interval, $location, SliderConstants) {
        var redirect = function () {
            $location.path("/partial-stat-carousel");
        };

        $interval(redirect, SliderConstants.getMillisForDisplayLogo, 1);

    }])

    .controller("StatisticsTableCtrl", ["$scope", "Statistics", function ($scope, Statistics) {

        //Retrieves data for the type parameter specified
        var retrieveStatistics = function (type, cb) {
            Statistics.resetStatistics();
            //initial call to fetch answers
            Statistics.retrieveStatistics(type).success(function (data) {
                var statistics = data;
                // sets objectlist
                Statistics.setStatistics(statistics, type);

                if (cb) {
                    cb(Statistics.getStatistics(type), type);
                }
            });
        };

        var retrieveAllStatistics = function (cb) {
            var count = 4;
            var data = [];
            var allDone = function (partial, index) {
                count = count - 1;
                data[index] = partial;
            };

            retrieveStatistics(0, allDone);
            retrieveStatistics(1, allDone);
            retrieveStatistics(2, allDone);
            retrieveStatistics(3, allDone);
        };


        //Retrieves number of answered questions for each type.
        var retrieveCounts = function () {
            Statistics.resetCounts;
            Statistics.retrieveCounts().success(function (data) {
                var statistics = data;
                Statistics.setCounts(statistics);
            });
        };


        retrieveAllStatistics();
        retrieveCounts();

        $scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
        $scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.


    }])


    .controller("StatisticsCompareCtrl", ["$scope", "$interval", "Statistics", "UserIDService", function ($scope, $interval, Statistics, UserIDService) {
        var retrieveStatistics = function (type, cb) {
            Statistics.resetStatistics();
            //initial call to fetch answers
            Statistics.retrieveStatistics(type).success(function (data) {
                var statistics = data;
                // sets objectlist
                Statistics.setStatistics(statistics, type);

                $scope.currentAnswers = Statistics.getCurrentAnswers(UserIDService.getUserID);
                if (cb) {
                    cb(Statistics.getStatistics(type));
                }

                Statistics.compareAnswers(Statistics.getStatistics(type), Statistics.getCurrentAnswers(UserIDService.getUserID()));
            });
        };

        var retrieveAllStatistics = function (cb) {
            retrieveStatistics(0);
            retrieveStatistics(1);
            retrieveStatistics(2);
            retrieveStatistics(3);
        };


        var getCurrentAnswers = function () {
            Statistics.retrieveCurrentAnswers(UserIDService.getUserID()).success(function (data) {
                Statistics.setCurrentAnswers(data);
            });
        };


        getCurrentAnswers(UserIDService.getUserID);
        retrieveAllStatistics();

        $scope.resultDispatcher = {
            _resultObject: null,
            getImage: function () {
                if (this._resultObject) {
                    return this._resultObject.questionid + this._resultObject.response;
                } else {
                    return 'loading';
                }
            },
            getPercent: function () {
                if (this._resultObject) {
                    return this._resultObject.percent;
                } else {
                    return '???';
                }
            }
        };

        var retrieveTypeData = function (type) {
            Statistics.resetStatistics();
            //initial call to fetch answers
            Statistics.retrieveTypeData().success(function (data) {
                var statistics = data;
                // sets objectlist
                Statistics.setTypeData(statistics);

                var comparisons = Statistics.compareCurrentWithType(Statistics.getTypeData(), $scope.currentAnswers);

                $scope.resultDispatcher._resultObject = Statistics.getBiggestDeviation(comparisons);
            });
        };

        retrieveTypeData();
    }]);