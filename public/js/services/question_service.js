/*
 * Service that handles the questions in the app
 */
angular.module("samesameApp.services.question", [])

    .factory("Questions", function () {
        /*
         The object that contains the questions.
         To see how this is used, please check the html file where they are displayed, 'partial-register-answer.html'
         The output field is the value displayed to the user, the 'value' field is the the value stored in the database
         */
        return {
            getAll: function () {
                return {
                    questions: [
                        {
                            questionid: '1',
                            imageURLA: "./images/1a.png",
                            imageURLB: "./images/1b.png"
                        }, {
                            questionid: '2',
                            imageURLA: "./images/2a.png",
                            imageURLB: "./images/2b.png"
                        }, {
                            questionid: '3',
                            imageURLA: "./images/3a.png",
                            imageURLB: "./images/3b.png"
                        }, {
                            questionid: '4',
                            imageURLA: "./images/4a.png",
                            imageURLB: "./images/4b.png"
                        }, {
                            questionid: '5',
                            imageURLA: "./images/5a.png",
                            imageURLB: "./images/5b.png"
                        }, {
                            questionid: '6',
                            imageURLA: "./images/6a.png",
                            imageURLB: "./images/6b.png"
                        }, {
                            questionid: '7',
                            imageURLA: "./images/7a.png",
                            imageURLB: "./images/7b.png"
                        }, {
                            questionid: '8',
                            imageURLA: "./images/8a.png",
                            imageURLB: "./images/8b.png"
                        }, {
                            questionid: '9',
                            imageURLA: "./images/9a.png",
                            imageURLB: "./images/9b.png"
                        }, {
                            questionid: '10',
                            imageURLA: "./images/10a.png",
                            imageURLB: "./images/10b.png"
                        }, {
                            questionid: '11',
                            imageURLA: "./images/11a.png",
                            imageURLB: "./images/11b.png"
                        }, {
                            questionid: '12',
                            imageURLA: "./images/12a.png",
                            imageURLB: "./images/12b.png"
                        }, {
                            questionid: '13',
                            imageURLA: "./images/13a.png",
                            imageURLB: "./images/13b.png"
                        }, {
                            questionid: '14',
                            imageURLA: "./images/14a.png",
                            imageURLB: "./images/14b.png"
                        }, {
                            questionid: '15',
                            imageURLA: "./images/15a.png",
                            imageURLB: "./images/15b.png"
                        }, {
                            questionid: '16',
                            imageURLA: "./images/16a.png",
                            imageURLB: "./images/16b.png"
                        }, {
                            questionid: '17',
                            imageURLA: "./images/17a.png",
                            imageURLB: "./images/17b.png"
                        }, {
                            questionid: '18',
                            imageURLA: "./images/18a.png",
                            imageURLB: "./images/18b.png"
                        }, {
                            questionid: '19',
                            imageURLA: "./images/19a.png",
                            imageURLB: "./images/19b.png"
                        }
                    ]
                };
            }
        }
    });
