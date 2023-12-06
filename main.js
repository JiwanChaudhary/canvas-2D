const animateText = require('./text.js');
const animateRect = require('./rect.js');
const animateLine = require('./line.js');
const animateCircle = require('./circle.js');
const animateScript = require('./script.js');

let animations = [animateText, animateRect, animateLine, animateCircle, animateScript];
let index = 0;

setInterval(() => {
    animations[index]();
    index = (index + 1) % animations.length;
}, 3000);