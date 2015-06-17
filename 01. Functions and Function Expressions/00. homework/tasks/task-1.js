/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(array) {
    "use strict";

    if (!arguments.length) {
        throw Error;
    } else if (!array.length) {
        return null;
    }

    return array.reduce(function (sum, item) {

        if (isNaN(item)) {
            throw Error;
        }

        return (sum + +item);
    }, 0);
}

module.exports = sum;