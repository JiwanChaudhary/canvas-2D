let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cxt = canvas.getContext("2d");

// x and y position in mouse object
let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;

let colorArray = [
    "#2C3E50",
    "#E74C3C",
    "#ECF0F1",
    "#3498DB",
    "#2980B9"
]

// add mouse event listner
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})


// draw circle
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
        cxt.fillStyle = this.color;
        cxt.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}


let circleArray = [];

for (let i = 0; i < 400; i++) {
    let radius = Math.random() * 10 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    circleArray.push(new Circle(x, y, dx, dy, radius));
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
    cxt.fillText("The Growing Circle", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.strokeText("The Growing Circle", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.stroke();
    // cxt.restore(); // Restore the last saved state
}

function animateCircle() {
    requestAnimationFrame(animateCircle);
    cxt.clearRect(0, 0, innerWidth, innerHeight);

    moveText();

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animateCircle();

module.exports = animateCircle;