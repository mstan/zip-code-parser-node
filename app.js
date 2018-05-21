var zipCodeRangesLib = require('./lib').zipCodeRanges;

const zipCodeRanges = [
    [94200,94299],
    [94226,94399],
    [94133,94133]
]

// master function for handling inputs
// restrictedZipCodeRanges represents a 2-dimensional array.
// each 2nd dimension array is composed to two elements, each of which are 5 digit integers
function handler(zipCodeRanges,cb) {
    zipCodeRangesLib.validate(zipCodeRanges, (err,response) => {
        if(err) {
            cb(err, null);
            return false;
        } else {
            zipCodeRanges = response;
        }
    });

    // if we got a falsy value back, it was invalid.
    if(!zipCodeRanges) {
        cb('Given range was not properly formatted', null);
        return false;
    }

    // if we received a range back, if it is valid, but only a length of one, there is nothing to reorder. Just send it back.
    if(zipCodeRanges.length <= 1) {
        return zipCodeRanges;
    }

    //arrange all ranges in ascending order, ordering by index[0]
    zipCodeRangesLib.order(zipCodeRanges, (err,response) => {
        if(err) {
            cb(err, null);
            return false;
        } else {
            zipCodeRanges = response;
        }
    });

    //now collapse any redundancies that occur
    zipCodeRangesLib.collapse(zipCodeRanges, (err,response) => {
        if(err) {
            cb(err,null);
            return false;
        } else {
            zipCodeRanges = response;
            cb(null,zipCodeRanges);
        }
    });
}

handler(zipCodeRanges, (err,data) => {
    if(err) { console.log(`An error occurred: ${err}`); }
    if(data) { console.log(data);}
})