// Invert Image colors
function invertImageColors(imageDataArray, data) {
  for (var i = 0; i < imageDataArray.length; i++) {
    imageDataArray[i] = 255 - imageDataArray[i];
  }
  return imageDataArray;
}

// Grayscale Image colors
function grayscaleColors(imageDataArray, data) {
  // Implement method found here:
  // http://www.rapidtables.com/convert/image/rgb-to-grayscale.htm

  // Check for alpha
  var increment;
  var alpha;
  if (data.readUInt32LE(28) === 24) {
    increment = 3;
  } else if (data.readUInt32LE(28) === 8) {
    increment = 4;
    alpha = true;
  }

  var newArray = [];
  for (var i = 0; i < imageDataArray.length - 1; i += increment) {
    var b = imageDataArray[i];
    var g = imageDataArray[i + 1];
    var r = imageDataArray[i + 2];
    var grayValue = Math.floor((b + g + r) / 3);
    for (var j = 0; j < 3; j++) {
      newArray.push(grayValue);
    }
    if (alpha) {
      // Add extra zero for zero alpha
      newArray.push(0);
    }
  }
  return newArray;
}

// Flip Image NP -- * * ONLY WORKS ON NON-PALETTE IMAGE * *
function flipImageNP(imageDataArray, data) {
  var newArray = [];
  for (var i = 0; i < imageDataArray.length - 1; i += 3) {
    var b = imageDataArray[i];
    var g = imageDataArray[i + 1];
    var r = imageDataArray[i + 2];

    newArray.unshift(r);
    newArray.unshift(g);
    newArray.unshift(b);
  }
  return newArray;
}

exports.flipImageNP = flipImageNP;
exports.grayscaleColors = grayscaleColors;
exports.invertImageColors = invertImageColors;
