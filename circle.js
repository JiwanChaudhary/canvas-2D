let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cxt = canvas.getContext("2d");

let playerX = canvas.width - 350;
let playerY = canvas.height / 1.5;
let ballX = canvas.width - 220;
let ballY = canvas.height / 2 + 50;
let goalScored = false;
let handAngle = 0;

let img = new Image();
img.src = "./barcelona.jpg";

function clearCanvas() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScene() {
    // Draw the football ground
    cxt.beginPath();
    cxt.rect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle = "green";
    cxt.fill();

    // Draw the goal on the right side
    cxt.beginPath();
    cxt.rect(canvas.width - 150, canvas.height / 2 - 75, 150, 150);
    cxt.strokeStyle = "white";
    cxt.stroke();

    // Draw the goal on the left side
    cxt.beginPath();
    cxt.rect(0, canvas.height / 2 - 75, 150, 150);
    cxt.strokeStyle = "white";
    cxt.stroke();

    // Define the goalkeeper's position on the right side
    let goalkeeperXRight = canvas.width - 150;

    // Draw the goalkeeper on the right side
    drawGoalkeeper(goalkeeperXRight, canvas.height / 2, "yellow");

    // Define the goalkeeper's position on the left side
    let goalkeeperXLeft = 150;

    // Draw the goalkeeper on the left side
    drawGoalkeeper(goalkeeperXLeft, canvas.height / 2, "purple");

    function drawGoalkeeper(goalkeeperX, goalkeeperY, color) {
        cxt.beginPath();
        cxt.arc(goalkeeperX, goalkeeperY - 10, 10, 0, Math.PI * 2, false); // head
        cxt.rect(goalkeeperX - 10, goalkeeperY, 20, 40); // body
        cxt.moveTo(goalkeeperX - 10, goalkeeperY + 20);
        cxt.lineTo(goalkeeperX - 20, goalkeeperY + 30); // left arm
        cxt.lineTo(goalkeeperX - 15, goalkeeperY + 20); // left hand
        cxt.moveTo(goalkeeperX + 10, goalkeeperY + 20);
        cxt.lineTo(goalkeeperX + 20, goalkeeperY + 30); // right arm
        cxt.lineTo(goalkeeperX + 15, goalkeeperY + 20); // right hand
        cxt.moveTo(goalkeeperX - 10, goalkeeperY + 40);
        cxt.lineTo(goalkeeperX - 10, goalkeeperY + 50); // left leg
        cxt.lineTo(goalkeeperX - 15, goalkeeperY + 45); // left foot
        cxt.moveTo(goalkeeperX + 10, goalkeeperY + 40);
        cxt.lineTo(goalkeeperX + 10, goalkeeperY + 50); // right leg
        cxt.lineTo(goalkeeperX + 15, goalkeeperY + 45); // right foot
        cxt.fillStyle = color;
        cxt.fill();
        cxt.stroke();
    }

    // Draw the player
    cxt.beginPath();
    cxt.arc(playerX, canvas.height / 2 - 10, 10, 0, Math.PI * 2, false); // head
    cxt.rect(playerX - 10, canvas.height / 2, 20, 40); // body
    cxt.moveTo(playerX - 10, canvas.height / 2 + 20);
    cxt.lineTo(playerX - 20, canvas.height / 2 + 30); // left arm
    cxt.lineTo(playerX - 15, canvas.height / 2 + 20); // left hand
    cxt.moveTo(playerX + 10, canvas.height / 2 + 20);
    cxt.lineTo(playerX + 20, canvas.height / 2 + 30); // right arm
    cxt.lineTo(playerX + 15, canvas.height / 2 + 20); // right hand
    cxt.moveTo(playerX - 10, canvas.height / 2 + 40);
    cxt.lineTo(playerX - 10, canvas.height / 2 + 50); // left leg
    cxt.lineTo(playerX - 15, canvas.height / 2 + 45); // left foot
    cxt.moveTo(playerX + 10, canvas.height / 2 + 40);
    cxt.lineTo(playerX + 10, canvas.height / 2 + 50); // right leg
    cxt.lineTo(playerX + 15, canvas.height / 2 + 45); // right foot
    cxt.fillStyle = "red";
    cxt.fill();
    cxt.stroke();

    // Define the positions of the players
    let playerPositions = [
        { x: 1500, y: 50 },
        { x: 500, y: canvas.height - 50 },
        { x: 1000, y: 50 },
        { x: 1020, y: canvas.height - 50 },
        { x: 750, y: canvas.height / 2 },
    ];

    // Draw the players
    for (let i = 0; i < playerPositions.length; i++) {
        let playerX = playerPositions[i].x;
        let playerY = playerPositions[i].y;

        cxt.beginPath();
        cxt.arc(playerX, playerY - 10, 10, 0, Math.PI * 2, false); // head
        cxt.rect(playerX - 10, playerY, 20, 40); // body
        cxt.moveTo(playerX - 10, playerY + 20);
        cxt.lineTo(playerX - 20, playerY + 30); // left arm
        cxt.lineTo(playerX - 15, playerY + 20); // left hand
        cxt.moveTo(playerX + 10, playerY + 20);
        cxt.lineTo(playerX + 20, playerY + 30); // right arm
        cxt.lineTo(playerX + 15, playerY + 20); // right hand
        cxt.moveTo(playerX - 10, playerY + 40);
        cxt.lineTo(playerX - 10, playerY + 50); // left leg
        cxt.lineTo(playerX - 15, playerY + 45); // left foot
        cxt.moveTo(playerX + 10, playerY + 40);
        cxt.lineTo(playerX + 10, playerY + 50); // right leg
        cxt.lineTo(playerX + 15, playerY + 45); // right foot
        cxt.fillStyle = "red";
        cxt.fill();
        cxt.stroke();
    }


    // Update the positions of the players after scoring a goal
    playerPositions = [
        { x: 1000, y: canvas.height / 2 },
        { x: 1500, y: canvas.height / 2 - 100 },
        { x: 700, y: canvas.height / 2 + 100 },
        { x: 1600, y: canvas.height / 2 - 50 },
        { x: 1400, y: canvas.height / 2 + 50 },
        { x: 1300, y: canvas.height / 2 + 50 },
    ];

    // Draw the players at the new positions
    for (let i = 0; i < playerPositions.length; i++) {
        let playerX = playerPositions[i].x;
        let playerY = playerPositions[i].y;

        cxt.beginPath();
        cxt.arc(playerX, playerY - 10, 10, 0, Math.PI * 2, false); // head
        cxt.rect(playerX - 10, playerY, 20, 40); // body
        cxt.moveTo(playerX - 10, playerY + 20);
        cxt.lineTo(playerX - 20, playerY + 30); // left arm
        cxt.lineTo(playerX - 15, playerY + 20); // left hand
        cxt.moveTo(playerX + 10, playerY + 20);
        cxt.lineTo(playerX + 20, playerY + 30); // right arm
        cxt.lineTo(playerX + 15, playerY + 20); // right hand
        cxt.moveTo(playerX - 10, playerY + 40);
        cxt.lineTo(playerX - 10, playerY + 50); // left leg
        cxt.lineTo(playerX - 15, playerY + 45); // left foot
        cxt.moveTo(playerX + 10, playerY + 40);
        cxt.lineTo(playerX + 10, playerY + 50); // right leg
        cxt.lineTo(playerX + 15, playerY + 45); // right foot
        cxt.fillStyle = "black";
        cxt.fill();
        cxt.stroke();
    }

    // Define the ball's position
    let ballX = playerX;
    let ballY = canvas.height / 2 + 50; // position the ball at the player's foot

    // Draw the football
    cxt.beginPath();
    cxt.arc(ballX, ballY, 15, 0, Math.PI * 2, false);
    cxt.fillStyle = "white";
    cxt.fill();
    cxt.strokeStyle = "black";
    cxt.stroke();
}

function updateScene() {
    if (!goalScored) {
        playerX += 1;
        ballX += 1;

        if (playerX >= canvas.width - 100) {
            goalScored = true;
            ballX = canvas.width - 100; // keep the football inside the goal
            cxt.drawImage(img, playerX - 330, playerY - 200, 250, 150); // make the image move with the player
            // Display "GOAL!!!" text
            cxt.font = '50px Arial';
            cxt.fillStyle = 'red';
            cxt.fillText('GOAL!!!', canvas.width / 2, canvas.height / 2);
            cxt.fillStyle = 'yellow';
            cxt.fillText('GOAL!!!', canvas.width / 2, canvas.height / 1.5);
            cxt.fillStyle = 'blue';
            cxt.fillText('GOAL!!!', canvas.width / 1.5, canvas.height / 1.5);
            createFireworks();
        }
    } else {
        // move player to the top-right corner
        if (playerX < canvas.width - 50) {
            playerX += 1;
        }
        if (playerY > 50) {
            playerY -= 1;
        }
    }
}

// Define a firework as an object with position, velocity, and color
function Firework(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
}

// Initialize an array of fireworks
let fireworks = [];


function createFireworks() {
    // Create fireworks of different colors
    let colors = ['red', 'blue', 'yellow', 'purple', 'orange'];
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let vx = Math.random() * 2 - 1; // random velocity between -1 and 1
        let vy = Math.random() * 2 - 1;
        fireworks.push(new Firework(x, y, vx, vy, colors[i]));
    }
}

function updateFireworks() {
    for (let i = 0; i < fireworks.length; i++) {
        let f = fireworks[i];

        // Update position based on velocity
        f.x += f.vx;
        f.y += f.vy;

        // Reverse velocity when hitting the edge of the canvas
        if (f.x < 0 || f.x > canvas.width) {
            f.vx = -f.vx;
        }
        if (f.y < 0 || f.y > canvas.height) {
            f.vy = -f.vy;
        }
    }
}

let Radius = Math.random() * 50 + 30;

function drawFireworks() {
    for (let i = 0; i < fireworks.length; i++) {
        let f = fireworks[i];

        // Draw firework as a circle
        cxt.beginPath();
        cxt.arc(f.x, f.y, Radius, 0, Math.PI * 2, false);
        cxt.fillStyle = f.color;
        cxt.fill();
    }
}

function drawPlayer() {
    // Draw the player's body
    cxt.beginPath();
    cxt.arc(playerX, playerY, 50, 0, Math.PI * 2, false);
    cxt.fillStyle = 'blue';
    cxt.fill();

    // Draw the player's hand
    cxt.beginPath();
    cxt.moveTo(playerX, playerY);
    cxt.lineTo(playerX + 100 * Math.cos(handAngle), playerY - 100 * Math.sin(handAngle));
    cxt.strokeStyle = 'blue';
    cxt.stroke();
}



function animate() {
    clearCanvas();
    drawPlayer();
    drawScene();
    updateScene();
    updateFireworks();
    drawFireworks();


    if (!goalScored || playerX < canvas.width - 100) {
        requestAnimationFrame(animate);
    }
}

animate();