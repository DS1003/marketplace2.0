const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'mise-en-avant.svg');
const pngPath = path.join(__dirname, 'public', 'mise-en-avant.png');

sharp(svgPath)
  .png()
  .toFile(pngPath)
  .then(info => {
    console.log('Conversion successful:', info);
  })
  .catch(err => {
    console.error('Error during conversion:', err);
  });
