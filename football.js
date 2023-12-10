let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

// images
let footballImage = new Image();
footballImage.src = "football.png";

let goalKeeperImage = new Image();
goalKeeperImage.src = "goalkeeper.png";

let playerImage = new Image();
playerImage.src = "player.png";

let primeDrinkImage = new Image();
primeDrinkImage.src = "prime.png";

// Define the dimensions of the football ground
let groundWidth = canvas.width;
let groundHeight = canvas.height;

// Draw the ground
function drawGround() {
  // Draw the green background
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, groundWidth, groundHeight);

  // Draw the outer boundary of the football ground
  ctx.beginPath();
  ctx.rect(0, 0, groundWidth, groundHeight);
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw the center circle
  let centerCircleRadius = 50; // Adjust as needed
  ctx.beginPath();
  ctx.arc(
    groundWidth / 2,
    groundHeight / 2,
    centerCircleRadius,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw the halfway line
  ctx.beginPath();
  ctx.moveTo(groundWidth / 2, 0);
  ctx.lineTo(groundWidth / 2, groundHeight);
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw the goal posts
  let goalPostHeight = 110;
  let goalPostWidth = 35;

  // Left goal post
  ctx.beginPath();
  ctx.rect(
    0,
    (groundHeight - goalPostHeight) / 2,
    goalPostWidth,
    goalPostHeight
  );
  ctx.fillStyle = "white";
  ctx.fill();

  // Right goal post
  ctx.beginPath();
  ctx.rect(
    groundWidth - goalPostWidth,
    (groundHeight - goalPostHeight) / 2,
    goalPostWidth,
    goalPostHeight
  );
  ctx.fillStyle = "white";
  ctx.fill();
}

// Calculate the center of the ground
let centerX = groundWidth / 2;
let centerY = groundHeight / 2;

// Calculate the position of the player
let playerX = centerX - playerImage.width / 6;
let playerY = centerY - playerImage.height / 6;

// Load the player image
playerImage.onload = function () {
  // Draw the player image at the center of the ground
  ctx.drawImage(
    playerImage,
    playerX + 100,
    playerY + 100,
    playerImage.width / 3,
    playerImage.height / 3
  );
};
playerImage.src = "player.png";

// Calculate the position of the football
let footballX = playerX - 10 + playerImage.width / 3;
let footballY = playerY - 30 + playerImage.height / 3;

// Load the football image
footballImage.onload = function () {
  // Draw the football image near the player
  ctx.drawImage(
    footballImage,
    footballX - 50,
    footballY - 50,
    footballImage.width / 30,
    footballImage.height / 30
  );
};
footballImage.src = "football.png";

// Load the goalkeeper image
goalKeeperImage.onload = function () {
  // Draw the goalkeeper image at the goal post of the ground
  ctx.drawImage(
    goalKeeperImage,
    centerX - 35,
    centerY - 100,
    goalKeeperImage.width / 3,
    goalKeeperImage.height / 3
  );
};
goalKeeperImage.src = "goalkeeper.png";

//   draw image of prime drink when player move to the bottom of the ground
primeDrinkImage.onload = function () {
  ctx.drawImage(
    primeDrinkImage,
    centerX - 100,
    centerY - 100,
    primeDrinkImage.width / 3,
    primeDrinkImage.height / 3
  );
};
primeDrinkImage.src = "prime.png";

function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, groundWidth, groundHeight);
  drawGround();

  // Draw the player image
  ctx.drawImage(
    playerImage,
    playerX,
    playerY,
    playerImage.width / 3,
    playerImage.height / 3
  );

  // Draw the football image
  ctx.drawImage(
    footballImage,
    footballX,
    footballY,
    footballImage.width / 30,
    footballImage.height / 30
  );

  // Draw the goalkeeper image
  ctx.drawImage(
    goalKeeperImage,
    centerX + 670,
    centerY - 35,
    goalKeeperImage.width / 3.5,
    goalKeeperImage.height / 3.5
  );

  //   draw image of prime drink when player move to the bottom of the ground
  ctx.drawImage(
    primeDrinkImage,
    centerX + 550,
    centerY + 300,
    primeDrinkImage.width / 8,
    primeDrinkImage.height / 8
  );

  // Update the positions
  if (groundWidth - playerImage.width / 4 > playerX + 200) {
    playerX += 1;
    footballX += 1;
  } else if (
    groundWidth - playerImage.width / 4 > playerX + 10 &&
    groundWidth - 35 > footballX + 35
  ) {
    footballX += 1;
  } else if (groundHeight - playerImage.height / 4 > playerY) {
    playerY += 1;
  } else {
  }
  //   draw image of prime drink when player move to the bottom of the ground

  //   move player move to the bottom of the ground

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Start the animation
animate();
