// strip out any redundancies in our ranges, combining any overlapping ranges into one element
function collapseZipCodeRanges(zipCodeRanges,cb) {
    var arrayToReturn = [];

    for(var i = 0; i < zipCodeRanges.length; i++ ) {
        // arrayToReturn.length == 0, we are at the first iteration
        // there's no previous comparisons to be had here, and so it makes sense that his will be our initial assignment
        // this ensures arrayToReturn will have a minimum length of 1 for all iterations after i == 0 
        if(arrayToReturn.length == 0) {
            arrayToReturn.push(zipCodeRanges[0]);
            // begin the next step
            continue;
        }
        
        // is arrayToReturn[arrayToReturn.length - 1][1] (the last element in our arrayToReturn) >= zipCodeRanges[i][0]?
        // if it is, extend our range here to the ZipCodeRanges[i][1] ( the end range of zipCodeRanges[i] )
        if( arrayToReturn[arrayToReturn.length - 1][1] >= zipCodeRanges[i][0] ) {
            arrayToReturn[arrayToReturn.length - 1][1] = zipCodeRanges[i][1];
        } else {
        // we are in a situation where we notice a new starting point. As such, push ZipCodeRanges[i] to arrayToReturn
            arrayToReturn.push(zipCodeRanges[i]);
        }

    }

    cb(null,arrayToReturn);
    return;
}

module.exports = collapseZipCodeRanges;