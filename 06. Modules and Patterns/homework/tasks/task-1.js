/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {

    //===============================================================================
    function isString(str) {

        return typeof str === "string" || (typeof str === "object" && str.constructor === String);
    }

    function isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0
    }

    function isStudentNameValid(name) {

        var names,
            firstname,
            lastname;

        if (!name || !isString(name)) {

            return false;
        }

        names = name.split(' ');

        if (names.length !== 2) {

            return false;
        }

        firstname = names[0];
        lastname = names[1];

        // ^ is the begin of string, $ is the end of string. 
        // It's used here to make sure the complete string does contain digits and Latin characters only. 
        // Without them any string containing letters and digits would be matched. 
        // Now strings containing letters and digits ONLY will be matched.

        var regExp = /^[a-zA-Z]+$/,
            isFirstNameContainsOnlyLatinLetters = regExp.test(firstname),
            isLastNameContainsOnlyLatinLetters = regExp.test(lastname);

        if (!isFirstNameContainsOnlyLatinLetters ||
            !isLastNameContainsOnlyLatinLetters ||
            !(firstname.charCodeAt(0) >= 65 && firstname.charCodeAt(0) <= 90) ||
            !(lastname.charCodeAt(0) >= 65 && lastname.charCodeAt(0) <= 90)) {

            return false;
        }

        return true;
    }

    function isCourseTitleValid(title) {

        // This regular expression looks for 2 or more white spaces.
        var regExp = /\s{2,}/;

        if (!title ||
            !isString(title) ||
            title.charAt(0) === ' ' ||
            title.charAt(title.length - 1) === ' ' ||
            regExp.test(title)) {

            return false;
        }

        return true;
    }

    function isStudentIdValid(id) {

        var that = this;

        if (!id || !isInt(id) || id < 0) {

            return false;
        }

        var isStudentIdExists = that.students.some(function (item) {

            return item.id === id;
        });

        if (!isStudentIdExists) {

            return false;
        }

        return true;
    }

    function isHomeworkIdValid(id) {

        if (!id || !isInt(id) || id < 0 || id > this.presentations.length) {

            return false;
        }

        return true;
    }

    //================================================================================

    var Student = (function () {

        var Student = {

            init: function (firstname, lastname, id) {

                this.firstname = firstname;
                this.lastname = lastname;
                this.id = id;
                this.score = 0;
                this.finalScore = 0;
            }
        };

        Object.defineProperties(Student, {

            firstname: {
                get: function () {

                    return this._firstname;
                },
                set: function (value) {

                    validateStudentName(value);
                    this._firstname = value;
                    return this;
                }
            },
            lastname: {
                get: function () {

                    return this._lastname;
                },
                set: function (value) {

                    validateStudentName(value);
                    this._lastname = value;
                    return this;
                }
            },
            id: {
                get: function () {

                    return this._id;
                },
                set: function (value) {

                    validateStudentId(value);
                    this._id = value;
                }
            },
            score: {
                get: function () {

                    return this._score;
                },
                set: function (value) {

                    validateStudentScore(value);
                    this._score = value;
                }
            },
            finalScore: {
                get: function () {

                    return this._finalScore;
                },
                set: function (value) {

                    this._finalScore = value;
                }
            }
        });

        function validateStudentName(name) {

            var namePattern = /^[A-Z]{1}[a-z]*/;

            if (!namePattern.test(name)) {

                throw new Error('You have entered an invalid name!');
            }
        }

        function validateStudentId(id) {

            if (!id || !isInt(id) || id < 0) {

                throw new Error('This Student ID is wrong!');
            }
        }

        function validateStudentScore(score) {

            if (isNaN(score) || score < 0) {

                throw new Error('This Student score is wrong!');
            }
        }

        return Student;

    }());

    var Course = {

        init: function (title, presentations) {

            this.title = title;
            this.presentations = presentations;
            this.students = [];
            this.homeworks = [];

            return this;
        },
        addStudent: function (name) {

            var student,
                names,
                firstname,
                lastname,
                studentID,
                that = this;

            if (!isStudentNameValid(name)) {

                throw new Error('');
            }

            names = name.split(' ');

            firstname = names[0];
            lastname = names[1];
            studentID = that.students.length + 1;

            student = Object.create(Student);
            student.init(firstname, lastname, studentID);

            that.students.push(student);

            return student.id;
        },
        getAllStudents: function () {

            return this.students.slice(0);
        },
        submitHomework: function (studentID, homeworkID) {

            if (!isStudentIdValid.call(this, studentID) || !isHomeworkIdValid.call(this, homeworkID)) {

                throw new Error('');
            }

            this.homeworks[studentID] = this.homeworks[studentID] || [];

            this.homeworks[studentID].push(homeworkID);

            return this;
        },
        pushExamResults: function (examResults) {

            var that = this;

            examResults.forEach(function (examResult) {

                var id = examResult.StudentID;
                var score = examResult.score;

                if (!isStudentIdValid.call(that, +id) || isNaN(+score)) {

                    throw new Error('');
                }

                that.students.forEach(function (student) {

                    if (student.id === id) {

                        if (student.score !== 0) {

                            throw new Error('Student trying to cheat!');

                        } else {

                            student.score = score;
                        }
                    }
                });
            });

            return that;
        },
        getTopStudents: function () {

            var that = this;

            that.students.forEach(function (student) {

                var numberOfHomeworks = that.homeworks[student.id].length,
                    homeworksScore = 0.25 * (numberOfHomeworks / that.homeworks.length),
                    examScore = 0.75 * student.score;

                student.finalScore = examScore + homeworksScore;
            });

            function compareScores(x, y) {

                return y.finalScore - x.finalScore;
            }

            return that.students.sort(compareScores).slice(0, 10);
        },
        //===============================
        get title() {

            return this._title;
        },
        set title(value) {

            if (!value || !isCourseTitleValid(value)) {

                throw new Error('Course title is invalid!');
            }

            this._title = value;
        },
        get presentations() {

            return this._presentations;
        },
        set presentations(value) {

            if (!value || !value.length || !value.every(function (item) {

                return isCourseTitleValid(item);

            })) {

                throw new Error();
            }

            this._presentations = value;
        },
        get homeworks() {

            return this._homeworks;
        },
        set homeworks(value) {

            if (!Array.isArray(value)) {

                throw new Error();
            }

            this._homeworks = value;
        }
    }

    return Course;
}

module.exports = solve;
