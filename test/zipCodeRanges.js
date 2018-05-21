var expect    = require("chai").expect;
var zipCodeRangesLib = require('../lib/zipCodeRanges/');


describe("Validating input", () => {
    /*
        validate
    */
    it("Validates legitimate input", () => {
        var validZipCodeRanges = [
            [94200,94299],
            [94226,94399],
            [94133,94133]
        ]

        zipCodeRangesLib.validate(validZipCodeRanges, (err,response) => {
            expect(err).to.equal(null);
            expect(response).to.have.members(validZipCodeRanges);
        });
    });


    // TODO
    // due to erratic behavior, this one appears to still be failing.

    // debugging suggests it is calling back with an error, however the unit test
    // suggests it is not erroring.
    it("Error on invalid input of array containing non-ranges", () => {
        var invalidZipCodeRanges = [
            [undefined,'asdf'],
            [{},null]
        ]

        zipCodeRangesLib.validate(invalidZipCodeRanges, (err,response) => {
            expect(err).to.not.equal(null);
            expect(response).to.equal(null);
        });
    });

    it("Error on invalid input of string", () => {
        var invalidZipCodeRanges = 'a string';

        zipCodeRangesLib.validate(invalidZipCodeRanges, (err,response) => {
            expect(err).to.not.equal(null);
            expect(response).to.equal(null);
        });
    });

    it("Error on invalid input of object", () => {
        var invalidZipCodeRanges = { key: [95811,95816] }

        zipCodeRangesLib.validate(invalidZipCodeRanges, (err,response) => {
            expect(err).to.not.equal(null);
            expect(response).to.equal(null);
        });
    });

    it("Error on invalid input of null", () => {
        zipCodeRangesLib.validate(null, (err,response) => {
            expect(err).to.not.equal(null);
            expect(response).to.equal(null);
        });
    });
});

describe("Ordering input by starting value", () => {
    it("Order disordered range", () => {
        var validZipCodeRanges = [
            [94200,94299],
            [94226,94399],
            [94133,94133]
        ]

        var expectedResponse = [ 
            [94133,94133], 
            [94200,94299], 
            [94226,94399] 
        ]

        zipCodeRangesLib.order(validZipCodeRanges, (err,response) => {
            expect(err).to.equal(null);
            expect(response).to.deep.equal(expectedResponse);
        });
    });

    it("Order already ordered range", () => {
        var validZipCodeRanges = [ 
            [94133,94133], 
            [94200,94299], 
            [94226,94399] 
        ]

        zipCodeRangesLib.order(validZipCodeRanges, (err,response) => {
            expect(err).to.equal(null);
            expect(response).to.deep.equal(validZipCodeRanges);
        });
    });
});

describe("Collapse input", () => {
    it("Collapse a collapsable range", () => {
        var validZipCodeRanges = [
            [94133,94133], 
            [94133,94040], 
            [94041,94050] 
        ]

        var expectedResponse = [
            [94133,94040], 
            [94041,94050] 
        ]

        zipCodeRangesLib.collapse(validZipCodeRanges, (err,response) => {
            expect(err).to.equal(null);
            expect(response).lengthOf(2);
            expect(response).to.deep.equal(expectedResponse);
        });
    });

    it("Collapse a non-collapsable range", () => {
        var validZipCodeRanges = [
            [94133,94133], 
            [94134,94040], 
            [94041,94050] 
        ]

        zipCodeRangesLib.collapse(validZipCodeRanges, (err,response) => {
            expect(err).to.equal(null);
            expect(response).lengthOf(3);
            expect(response).to.deep.equal(validZipCodeRanges);
        });
    });
});
