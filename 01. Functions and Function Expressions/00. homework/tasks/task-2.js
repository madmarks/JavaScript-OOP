/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(from, to) {
    "use strict";

    if (arguments.length < 2) {
        throw new Error;
    } else if (isNaN(+from) || isNaN(+to)) {
        throw new Error;
    } else {
        from = +from;
        to = +to;
    }

    function isPrime(number) {

        var divisor = 2,
            len = Math.sqrt(number);

        if (number == 2) {
            return true;
        } else if (number < 2) {
            return false;
        }

        //for (divisor = 2, len = Math.sqrt(number) ; divisor <= len; divisor += 1) {
        //
        //    if(!(number % divisor))
        //    {
        //        return false;
        //    }
        //}

        while (divisor <= Math.sqrt(number)) {

            if (!(number % divisor)) {
                return false;
            }

            divisor += 1;
        }

        return true;
    }

    var i,
    result = [];

    for (i = Math.ceil(from) ; i <= to; i += 1) {

        if (isPrime(i)) {
            result.push(i);
        }
    }

    return result;
}

module.exports = findPrimes;
