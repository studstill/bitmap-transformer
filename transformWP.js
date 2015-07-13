// For this assignment you will be building a Bitmap reader and transformer.
// It will read a Bitmap in from disk, run one or more color transforms on
// the bitmap and then write it out to a new file. This project will require
// the use of node buffers in order to manipulate binary data. Your project
// should include tests, as well as a Gruntfile and package.json file. Make
// sure to run all your code through jshint and jscs. The process will look
// something like this:

var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var invert = require('./helpers/helpers').invertImageColors;
var grayscale = require('./helpers/helpers').grayscaleColors;
var brightness = require('./helpers/helpers').brightness;
var cliArg = process.argv[2];

// Define allowable command line arguments
var options = {
  'invert': invert,
  'grayscale': grayscale
};

// Ensure proper usage of the program
if (!cliArg || !(cliArg in options)) {
  err = 'Usage: node transformWP.js option\n' +
        'options: invert, grayscale\n';
  throw err;
}

function transformWP(cliArg, options) {

  /************************************************
  / 1. open file using fs and read it into a buffer
  /************************************************/

  ee.on('readFile', function() {
    fs.readFile('lib/palette-bitmap.bmp', function(err, data) {
      if (err) throw err;
      ee.emit('convertFile', data);
    });
  });

  ee.emit('readFile');

  /************************************************
  / 2. convert buffer into a Javascript Object
  /************************************************/

  ee.on('convertFile', function(data) {
    var imageBuf = data.slice(54, 1078);
    var json = JSON.stringify(imageBuf);
    var parsed = JSON.parse(json);
    var imageDataArray = parsed.data;
    ee.emit('transform', data, imageBuf, imageDataArray);

  });

  /************************************************
  / 3. Run a transform on that Javascript Object
  /************************************************/

  ee.on('transform', function(data, imageBuf, imageDataArray) {

    // Pull in the command line arguement to choose which function to run
    var transformedArray = options[cliArg](imageDataArray, data);

    ee.emit('convertToBuffer', data, imageBuf, transformedArray);
  });

  /************************************************
  / 4. Turn the transformed object back into a buffer
  /************************************************/

  ee.on('convertToBuffer', function(data, imageBuf, transformedArray) {

    // Sanity Check
    if (imageBuf.length !== transformedArray.length)
      console.error('There was an error during transformation');

    // Write the transformed image back to the buffer
    for (var i = 0; i < imageBuf.length; i++) {
      var currentBufIndex = imageBuf.slice(i, i + 1);
      currentBufIndex.writeUInt8(transformedArray[i]);
    }

    ee.emit('writeFile', data, imageBuf);
  });

  /************************************************
  / 5. Write that buffer to a new file.
  /************************************************/

  ee.on('writeFile', function(data) {
    fs.writeFile('lib/new-palette2.bmp', data, function(err) {
      if (err) throw err;
    });
    console.log('Image Transformation Using ' + cliArg.toUpperCase() +
                ' Complete');
  });
}

transformWP(cliArg, options);

exports.transformWP = transformWP;

