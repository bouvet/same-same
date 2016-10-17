#Same same, but different

##The application
The application mainly consists of two subparts.
###Part 1 
Part 1 is a questionnaire where the user answers an image-questionnaire-form.
Answers obtained are saved in a database, and can be viewed in the admin part of the application.
Both the user and the admin part of the application can be accessed from the main menu (the first screen when accessing the application)

###Part 2
Part 2 is presenting statistics from the answers gathered in Part 1.

###Documentation
A documentation on the concept, the use of the application, the intended users, the technical solutions chosen and more can be obtained by asking Lars.


##How to set up and run the application
1. Clone this repo
2. Download and install [node.js](https://nodejs.org/en/download/current/).
3. Set up a working [mysql server](http://dev.mysql.com/downloads/mysql/). Create the two tables (Answers, Participants) needed, using the sql scripts in the sql folder.
4. Configure your own config.local.js file to define the url you will access the mysql server on. The file should follow this example:

    ```javascript
    /*jshint node: true*/
    "use strict";
    var dbOptions = {
       dburl: 'yourDBurl',
       dbuser: 'yourDBuser',
       dbpassword: 'yourDBpassword',
       database: 'yourDatabase'
    }
    exports.dbOptions = dbOptions; 
    ```
    and should be located in root/app

    
5. Run *npm start* from the root level of the project. This should install all further dependencies and fire up the application.

6. Access the application at <yourip>:<theportspecified> (e.g. localhost:3000).

##Branching
###Master
The master branch should only get commits that adds common functionality or improvements. There should never be a 
commit that contains any special logic that is implemented due to a event or course

###Adding new functionality due to a course/event
When there is a order of any new course or event specific logic, you should always create a new branch from master. 
The name of the branch should be on the format Year_Month_Course, example: 2016_October_SapCourse