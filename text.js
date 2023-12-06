let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cxt = canvas.getContext("2d");

let colorArray = [
    "#2C3E50",
    "#E74C3C",
    "#ECF0F1",
    "#3498DB",
    "#2980B9"
]

// draw line function
function drawLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        cxt.beginPath();
        // cxt.moveTo(0, 0);
        cxt.lineTo(this.x1, this.y1);
        cxt.lineTo(this.x2, this.y2);
        cxt.lineTo(this.x3, this.y3);
        cxt.lineTo(this.x4, this.y4);
        cxt.strokeStyle = this.color;
        cxt.stroke();
    }

    this.update = function () {
        this.draw();
    }
}

let lineArray = [];
for (let i = 0; i < 20; i++) {
    let x1 = Math.random() * innerWidth;
    let y1 = Math.random() * innerHeight;
    let x2 = Math.random() * innerWidth;
    let y2 = Math.random() * innerHeight;
    let x3 = Math.random() * innerWidth;
    let y3 = Math.random() * innerHeight;
    let x4 = Math.random() * innerWidth;
    let y4 = Math.random() * innerHeight;

    lineArray.push(new drawLine(x1, y1, x2, y2, x3, y3, x4, y4));
}

// circle function
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;


    this.draw = function () {
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // cxt.scale(2, 2);
        cxt.fillStyle = this.color;
        cxt.fill();
        // cxt.strokeStyle = "blue";
        // cxt.stroke();
    }

    this.update = function () {
        this.draw();
    }
}


let circleArray = [];

for (let i = 0; i < 20; i++) {
    let radius = Math.random() * 25 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    circleArray.push(new Circle(x, y, dx, dy, radius));

}

// rectangle function
function drawRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = Math.floor(Math.random() * 4) - 2;
    this.vy = Math.floor(Math.random() * 4) - 2;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        cxt.beginPath();
        cxt.fillStyle = this.color;
        cxt.fillRect(this.x, this.y, this.w, this.h);
        // rotate
        cxt.rotate(45);
        // rotate back
        cxt.rotate(-45);
        // translate
        cxt.translate(100, 100);
        // translate back
        cxt.translate(-100, -100);
        // scale
        cxt.scale(2, 2);
        // scale back
        cxt.scale(0.5, 0.5);
        cxt.stroke();
    }

    this.update = function () {
        this.draw();
    }
}

let rectArray = [];
for (let i = 0; i < 20; i++) {
    let w = Math.random() * 50 + 10;
    let h = Math.random() * 50 + 10;
    let x = Math.random() * (innerWidth - w * 2) + w;
    let y = Math.random() * (innerHeight - h * 2) + h;
    rectArray.push(new drawRect(x, y, w, h));
}

// text function
let startTime = Date.now();

function moveText() {

    let now = Date.now();
    let timePassed = now - startTime;

    // Calculate the font size
    let fontSize = 90 + Math.sin(timePassed / 500) * 20;

    // Reset startTime when the sine function completes a full cycle
    if (timePassed > Math.PI * 1000) {
        startTime = now;
    }

    cxt.font = `bold ${fontSize}px Arial`; // Set the font size and style
    cxt.fillStyle = "red"; // Set the text color to red
    cxt.textAlign = "center"; // Align the text to the center
    cxt.fillText("2D Design", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.strokeText("2D Design", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.stroke();
    // cxt.restore(); // Restore the last saved state
}


function animateText() {
    requestAnimationFrame(animateText);
    cxt.clearRect(0, 0, innerWidth, innerHeight);

    moveText();

    for (let i = 0; i < rectArray.length; i++) {
        rectArray[i].update();
    }

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animateText();
module.exports = animateText;