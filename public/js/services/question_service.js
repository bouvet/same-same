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
            question1: {
                questionid: '1',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/1a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/1b.png"
                    }
                ]
            }
            ,
            question2: {
                questionid: '2',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/2a.png"

                    }, {
                        value: 'b',
                        imageURL: "./images/2a.png"
                    }
                ]
            },
            question3: {
                questionid: '3',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/3a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/3b.png"
                    }
                ]
            },
            question4: {
                questionid: '4',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/4a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/4b.png"
                    }
                ]
            },
            question5: {
                questionid: '5',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/5a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/5b.png"
                    }
                ]
            },
            question6: {
                questionid: '6',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/6a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/6b.png"
                    }
                ]
            },
            question7: {
                questionid: '7',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/7a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/7b.png"
                    }
                ]
            },
            question8: {
                questionid: '8',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/8a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/8b.png"
                    }
                ]
            },
            question9: {
                questionid: '9',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/9a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/9b.png"
                    }
                ]
            },
            question10: {
                questionid: '10',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/10a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/10b.png"
                    }
                ]
            },
            question11: {
                questionid: '11',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/11a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/11b.png"
                    }
                ]
            },
            question12: {
                questionid: '12',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/12a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/12b.png"
                    }
                ]
            },
            question13: {
                questionid: '13',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/13a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/13b.png"
                    }
                ]
            },
            question14: {
                questionid: '14',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/14a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/14b.png"
                    }
                ]
            },
            question15: {
                questionid: '15',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/15a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/15b.png"
                    }
                ]
            },
            question16: {
                questionid: '16',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/16a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/16b.png"
                    }
                ]
            },
            question17: {
                questionid: '17',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/17a.png"
                    }, {
                        value: 'b',
                        imageURL: "./images/17b.png"
                    }
                ]
            },
            question18: {
                questionid: '18',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/18a.jpg"
                    }, {
                        value: 'b',
                        imageURL: "./images/18b.jpg"
                    }
                ]
            },
            question19: {
                questionid: '19',
                options: [
                    {
                        value: 'a',
                        imageURL: "./images/19a.jpg"
                    }, {
                        value: 'b',
                        imageURL: "./images/19b.jpg"
                    }
                ]
            }
        };
    });
