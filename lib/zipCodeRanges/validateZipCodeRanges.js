// validates a single zipCodeRange (e.g. [95811,95816] )
// expected return for something valid is either [x,y] or [y,x] (the integers may be reversed)
// expected return for something invalid is false;
function validateZipCodeRange(zipCodeRange,cb) {
    // zipCodeRange should be an array. 
    // if it is not an array, return false
    if( !Array.isArray(zipCodeRange) ) {
        cb('Range was not an array', null);
        return false;
    }
    // a range should consist of exactly two elements. 
    // if it is not exactly two elements, return false
    if( zipCodeRange.length != 2) {
        cb('Range did not contain two elements',null);
        return false;
    }

    // JavaScript is pretty forgiving with how you pass values. Just in case they are passed as stringified numbers, let's parse these.

    // We are going to parse these as floats since JavaScript is overall lackadazical with numbers and we cannot ensure our potentially
    // stringified numbers were not passed as decimal numbers by the user. 
    // If we parsed potential floats as integers, we would be dropping off decimal values which may result in false positives to the user

    // If they are not numbers, they will evaluate NaN and we can check for this and break out
    // If they are numbers, but are not integers, we will check this and also break out
    // If they are already integers, this evaluation technically do nothing, but ensures that they were, in fact, numbers, and not stringified
    var startRange = parseFloat(zipCodeRange[0]);
    var endRange = parseFloat(zipCodeRange[1])

    // These checks could potentially be extracted into their own functions at some point, should a need arise. For this simple case, 
    // they are being left inlined due to no present need for abstraction. 

    // Ensure that both of these are actually numbers and did not evaluate to a not-number
    // return false if either are not a number
    if ( (startRange == NaN) || (endRange == NaN) ) {
        cb(`At least one of the range values was not a number`, null)
        return false;
    }

    // regular expression to ensure the value is only numbers
    // In our case, zip code only contains (5) integers. No hyphens, periods, or any other characters
    // if either of our values are not all integers, return false
    if( !Number.isInteger(startRange) || !Number.isInteger(endRange) ) {
        cb(`At least one of the range values was not an integer.`, null);
        return false;
    }

    // Now that we can ensure they are integers, we should check to see that both of their lengths are 5 exactly.
    // We evaluate this now, and not earlier, because we don't want to check if an decimal number is somehow 5 characters. (for example: 123.4 is a length of 5)
    if( (startRange.toString().length != 5) || (endRange.toString().length != 5) ) {
        cb(`At least one of the range values was not 5 characters long`, null)
        return false;
    }


    // For the below check, the prompt is ambigous on how this should be handled.
    // It is not clear if negative ranges are acceptable. For sake of assumption
    // I am going to assume that negative range cases are indeed acceptable, but 
    // refactor the ranges to always be non-negative.

    // We want to be consistent with our ranges for easy comparison logic later on.
    // if our startRange is greater than our endrange, we should flip these two.

    // I considered doing an immediate return here with an if/else of returning either [startRange,endRange] or [endRange,startRange]
    // but from a descriptive code perspective, this is confusing to read. It also makes it more difficult to perform checks after this
    // check should we want to add more later. However, for optimiziation purposes, we could do this to not end up declaring the additional
    // variable in this if/else
    if( startRange > endRange) {
        // store startRange temporarily.
        var tempVar = startRange;
        // move endRange to startRange
        startRange = endRange;
        // assign startRange to endRange
        endRange = tempVar;

        console.log(`[${zipCodeRange}] startRange exceeds endRange, reversing to [${startRange},${endRange}]`)
    }

    cb(null, [startRange,endRange]);
}

// validates a 2-dimensional array of zip code ranges, ensuring that each set in the array is indeed valid.
function validateZipCodeRanges(zipCodeRanges,cb) {
    // zipCodeRanges should be an array. 
    // if it is not an array, return false
    if( !Array.isArray(zipCodeRanges) ) {
        cb('zipCodeRanges was not an array', null);
        return;
    }

    // sanitize our input. Ensure that each element in this array is the structure we're seeking
    for(var i = 0; i < zipCodeRanges.length; i++) {
        validateZipCodeRange(zipCodeRanges[i], (err,validZipCodeRange) => {
            if(err || !validZipCodeRange) {
                // if the element wasn't valid, we should break out of this entire function and just return false.
                cb(`Range at index ${i} was invalid`, null)
                return false;
            } else {
                // validate the input. If something comes back (not falsy), it is vaild.
                // However, even if it is valid, it may be returned in the format [y,x] and not [x,y].
                // Therefore, if it is valid, clobber it with the return value at its index in case it is reversed
                // Example: [95816,95811] is valid, but will be returned [95811,95816]
                zipCodeRanges[i] = validZipCodeRange;   
            }
        });
    }

    cb(null,zipCodeRanges);
    return;
}

module.exports = validateZipCodeRanges;