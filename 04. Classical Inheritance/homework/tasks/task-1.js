/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
    'use strict';

    var Person = (function () {

        function isValidName(name) {

            // ^ is the begin of string, $ is the end of string. 
            // It's used here to make sure the complete string does contain characters only. 
            // Without them any string containing letters would be matched. 
            // Now strings containing letters ONLY will be matched.

            var regExp = /^[a-zA-Z]+$/,
                isNameWithLatinLettersOnly = regExp.test(name);

            if (!isNameWithLatinLettersOnly || name.length < 3 || name.length > 20) {
                return false;
            }

            return true;
        }

        function Person(firstname, lastname, age) {

            if (!(this instanceof Person)) {
                return new Person(firstname, lastname, age);
            }

            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
        }

        Person.prototype = {
            get firstname() {

                return this._firstname;
            },
            set firstname(value) {

                if (!isValidName(value)) {
                    throw new Error('firstname must always be strings between 3 and 20 characters , containing only Latin letters');
                }

                this._firstname = value;
            },
            get lastname() {

                return this._lastname;
            },
            set lastname(value) {

                if (!isValidName(value)) {
                    throw new Error('lastname must always be strings between 3 and 20 characters , containing only Latin letters');
                }

                this._lastname = value;
            },
            get age() {

                return this._age;
            },
            set age(value) {

                if (isNaN(+value) || +value < 0 || +value > 150) {
                    throw new Error('Age must always be a number in the range 0 - 150');
                }

                this._age = +value;
            },
            get fullname() {

                return this._firstname + ' ' + this._lastname;
            },
            set fullname(value) {

                var names = value.split(' ');
                this._firstname = names[0];
                this._lastname = names[1];
            },
        };

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        }

        return Person;
    }());
    return Person;
}
module.exports = solve;