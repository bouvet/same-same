/*
 * Service that handles the questions in the app
 */
angular.module("samesameApp.services.question", [])

    .factory("Questions", function () {
        /*
         * These are the questions that are being used in the application. If you want to remove a question, just delete
         * one object.
         *
         * NB Remember to empty the database when you are removing qestions
         */
        return {
            getAll: function () {
                return {
                    questions: [
                        {
                            questionid: '1',
                            imageURLA: "./images/questions/1a.png",
                            imageURLB: "./images/questions/1b.png"
                        }, {
                            questionid: '2',
                            imageURLA: "./images/questions/2a.png",
                            imageURLB: "./images/questions/2b.png"
                        }, {
                            questionid: '3',
                            imageURLA: "./images/questions/3a.png",
                            imageURLB: "./images/questions/3b.png"
                        }, {
                            questionid: '4',
                            imageURLA: "./images/questions/4a.png",
                            imageURLB: "./images/questions/4b.png"
                        }, {
                            questionid: '5',
                            imageURLA: "./images/questions/5a.png",
                            imageURLB: "./images/questions/5b.png"
                        }, {
                            questionid: '6',
                            imageURLA: "./images/questions/6a.png",
                            imageURLB: "./images/questions/6b.png"
                        }, {
                            questionid: '7',
                            imageURLA: "./images/questions/7a.png",
                            imageURLB: "./images/questions/7b.png"
                        }, {
                            questionid: '8',
                            imageURLA: "./images/questions/8a.png",
                            imageURLB: "./images/questions/8b.png"
                        }, {
                            questionid: '9',
                            imageURLA: "./images/questions/9a.png",
                            imageURLB: "./images/questions/9b.png"
                        }, {
                            questionid: '10',
                            imageURLA: "./images/questions/10a.png",
                            imageURLB: "./images/questions/10b.png"
                        }, {
                            questionid: '11',
                            imageURLA: "./images/questions/11a.png",
                            imageURLB: "./images/questions/11b.png"
                        }, {
                            questionid: '12',
                            imageURLA: "./images/questions/12a.png",
                            imageURLB: "./images/questions/12b.png"
                        }, {
                            questionid: '13',
                            imageURLA: "./images/questions/13a.png",
                            imageURLB: "./images/questions/13b.png"
                        }, {
                            questionid: '14',
                            imageURLA: "./images/questions/14a.png",
                            imageURLB: "./images/questions/14b.png"
                        }, {
                            questionid: '15',
                            imageURLA: "./images/questions/15a.png",
                            imageURLB: "./images/questions/15b.png"
                        }, {
                            questionid: '16',
                            imageURLA: "./images/questions/16a.png",
                            imageURLB: "./images/questions/16b.png"
                        }, {
                            questionid: '17',
                            imageURLA: "./images/questions/17a.png",
                            imageURLB: "./images/questions/17b.png"
                        }, {
                            questionid: '18',
                            imageURLA: "./images/questions/18a.png",
                            imageURLB: "./images/questions/18b.png"
                        }, {
                            questionid: '19',
                            imageURLA: "./images/questions/19a.png",
                            imageURLB: "./images/questions/19b.png"
                        }
                    ]
                };
            }
        }
    });
