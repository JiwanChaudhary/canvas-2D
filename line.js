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
let a = 6;
console.log(a);


// draw line function
function drawLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.y1 = y1;
    this.dx1 = (Math.random() - 0.5) * 2;
    this.dy1 = (Math.random() - 0.5) * 2;

    this.x2 = x2;
    this.y2 = y2;
    this.dx2 = (Math.random() - 0.5) * 2;
    this.dy2 = (Math.random() - 0.5) * 2;

    this.x3 = x3;
    this.y3 = y3;
    this.dx3 = (Math.random() - 0.5) * 2;
    this.dy3 = (Math.random() - 0.5) * 2;

    this.x4 = x4;
    this.y4 = y4;
    this.dx4 = (Math.random() - 0.5) * 2;
    this.dy4 = (Math.random() - 0.5) * 2;

    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        cxt.beginPath();
        cxt.moveTo(this.x1, this.y1);
        cxt.lineTo(this.x2, this.y2);
        cxt.lineTo(this.x3, this.y3);
        cxt.lineTo(this.x4, this.y4);
        cxt.strokeStyle = this.color;
        cxt.stroke();
    }

    this.update = function () {

        if (this.x1 + this.dx1 > innerWidth || this.x1 + this.dx1 < 0) {
            this.dx1 = -this.dx1;
        }
        if (this.y1 + this.dy1 > innerHeight || this.y1 + this.dy1 < 0) {
            this.dy1 = -this.dy1;
        }
        if (this.x2 + this.dx2 > innerWidth || this.x2 + this.dx2 < 0) {
            this.dx2 = -this.dx2;
        }
        if (this.y2 + this.dy2 > innerHeight || this.y2 + this.dy2 < 0) {
            this.dy2 = -this.dy2;
        }
        if (this.x3 + this.dx3 > innerWidth || this.x3 + this.dx3 < 0) {
            this.dx3 = -this.dx3;
        }
        if (this.y3 + this.dy3 > innerHeight || this.y3 + this.dy3 < 0) {
            this.dy3 = -this.dy3;
        }
        if (this.x4 + this.dx4 > innerWidth || this.x4 + this.dx4 < 0) {
            this.dx4 = -this.dx4;
        }
        if (this.y4 + this.dy4 > innerHeight || this.y4 + this.dy4 < 0) {
            this.dy4 = -this.dy4;
        }

        this.x1 += this.dx1;
        this.y1 += this.dy1;
        this.x2 += this.dx2;
        this.y2 += this.dy2;
        this.x3 += this.dx3;
        this.y3 += this.dy3;
        this.x4 += this.dx4;
        this.y4 += this.dy4;

        this.draw();
    }
}

let lineArray = [];
for (let i = 0; i < 50; i++) {
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
    cxt.fillText("The Line", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.strokeText("The Line", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.stroke();
}


function animateLine() {
    requestAnimationFrame(animateLine);
    cxt.clearRect(0, 0, innerWidth, innerHeight);

    moveText();

    for (let i = 0; i < lineArray.length; i++) {
        lineArray[i].update();
    }

}

animateLine();

module.exports = animateLine;