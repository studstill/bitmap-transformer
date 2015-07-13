
/**********************************************************************
/   In order to fulfill the base requirements for this assignment
/   (and for the sake of time), this test file only tests one of
/   my transformation functions, invert().
/*********************************************************************/

var invert = require('../helpers/helpers.js').invertImageColors;
var expect = require('chai').expect;

describe('helpers.js', function() {
  describe('#invert', function() {
    it('Should take an array of image data from a BMP with palette data ' +
       'and return an array, where each value has been converted to ' +
       'its the inverse value (max value is 255)', function() {
      var imageDataArrayWP = [0, 0, 0, 0, 243, 15, 5, 0, 91, 91, 91, 0];
      var resultWP = [255, 255, 255, 255, 12, 240, 250, 255,
                      164, 164, 164, 255];

      // Check that any random pixel has been inverted
      var randomIndex = Math.floor(Math.random() * imageDataArrayWP.length);
      expect(resultWP[randomIndex]).to.eql(invert(imageDataArrayWP)[randomIndex]);
    });
    it('Should take an array of image data from a BMP without palette data ' +
       'and return an array, where each value has been converted to ' +
       'its the inverse value (max value is 255)', function() {

      var imageDataArrayNP = [0, 0, 0, 50, 150, 250, 255, 255, 255];
      var resultNP = [255, 255, 255, 205, 105, 5, 0, 0, 0];

      // Check that any random pixel has been inverted
      var randomIndex = Math.floor(Math.random() * imageDataArrayNP.length);
      expect(resultNP[randomIndex]).to.eql(invert(imageDataArrayNP)[randomIndex]);
    });
  });

});
