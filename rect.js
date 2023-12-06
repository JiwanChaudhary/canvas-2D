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

// x and y position in mouse object
let mouse = {
    x: undefined,
    y: undefined
}

// add mouse event listner
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})


// draw rect function
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

        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.w > innerWidth || this.x < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.h > innerHeight || this.y < 0) {
            this.vy = -this.vy;
        }


        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.w < 100) {
                this.w += 1;
                this.h += 1;
            }
        } else if (this.w > 50) {
            this.w -= 1;
            this.h -= 1;
        }

        this.draw();
    }

}

let rectArray = [];
for (let i = 0; i < 200; i++) {
    let w = Math.random() * 20 + 10;
    let h = Math.random() * 20 + 10;
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
    cxt.fillText("More and Many Designs", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.strokeText("More and Many Designs", innerWidth / 2, innerHeight / 2); // Draw the text
    cxt.stroke();
    // cxt.restore(); // Restore the last saved state
}

function animateRect() {
    requestAnimationFrame(animateRect);
    cxt.clearRect(0, 0, innerWidth, innerHeight);

    moveText();

    for (let i = 0; i < rectArray.length; i++) {
        rectArray[i].update();
    }
}

animateRect();

module.exports = animateRect;