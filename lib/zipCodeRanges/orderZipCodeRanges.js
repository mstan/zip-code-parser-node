// orders zipCodeRanges in ascending order by the first element in each range.
function orderZipCodeRanges(zipCodeRanges,cb) {
    // sort the array by the first element index of each element.
    try {
        return zipCodeRanges.sort( (a,b) => { return a[0] - b[0] })
    } catch (err) {
        cb(err,null);
    }
}

module.exports = orderZipCodeRanges;