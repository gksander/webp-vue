// Import sharp (processing images) and path (traversing directory)
const sharp = require('sharp');
const path = require('path');

// Create an asynchronous IIFE
(async function(){
  // Where are our image files located?
  const imageDirectory = path.join(__dirname, './images');
  // Which images should we process?
  const imageNames = ["dog.jpg", "chair.png"];
  // What size should we crop to?
  const maxSize = 1000;

  // Loop through the images and process them one at a time.
  for (let imageName of imageNames) {
    try {
      // Start by creating a jpg version
      await sharp(path.join(imageDirectory, imageName)) // This inputs the file into sharp
        .resize(maxSize, maxSize, { fit: "inside" }) // This resizes our image
        .toFile(
          path.join(imageDirectory, imageName.replace(/\.(jpg|png)$/, `_${maxSize}$&`)) // Replace file extensions with .jpg (assumes .jpg or .png)
        ); // This writes the new image.

      // Same thing, but create a .webp version
      await sharp(path.join(imageDirectory, imageName))
        .resize(maxSize, maxSize, { fit: "inside" })
        .toFile(
          path.join(imageDirectory, imageName.replace(/\.(jpg|png)$/, `_${maxSize}.webp`)) // Replace file extensions with .webp (assumes .jpg or .png)
        ); // This writes the new image.

    } catch (_) {}
  } // End loop

  process.exit();
})();