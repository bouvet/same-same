//Used to propagate userid throughout application
angular.module("samesameApp.services.user", [])
    .service("UserIDService", function () {
        var userid,
            usergender;

        var setUserID = function (id) {
            userid = id;
        };

        var getUserID = function () {
            return userid;
        };

        var setGender = function (gender) {
            usergender = gender;
        };

        var getGender = function () {
            return usergender;
        };

        return {
            setUserID: setUserID,
            getUserID: getUserID,
            setGender: setGender,
            getGender: getGender
        };
    });