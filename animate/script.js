let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let groundWidth = canvas.width;
let groundHeight = canvas.height;

let goalPostHeight = 110;
let goalPostWidth = 35;

function drawGround() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, groundWidth, groundHeight);

  ctx.beginPath();
  ctx.rect(0, 0, groundWidth, groundHeight);
  ctx.strokeStyle = "white";
  ctx.stroke();

  let centerCircleRadius = 50;
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

  ctx.beginPath();
  ctx.moveTo(groundWidth / 2, 0);
  ctx.lineTo(groundWidth / 2, groundHeight);
  ctx.strokeStyle = "white";
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(
    0,
    (groundHeight - goalPostHeight) / 2,
    goalPostWidth,
    goalPostHeight
  );
  ctx.fillStyle = "white";
  ctx.fill();

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

let playerOne = new Image();
playerOne.src = "player.png";

let playerTwo = new Image();
playerTwo.src = "animation2.png";

let playerThree = new Image();
playerThree.src = "animation3.png";

let playerFour = new Image();
playerFour.src = "animation4.png";

let playerFive = new Image();
playerFive.src = "animation5.png";

let playerSix = new Image();
playerSix.src = "animation6.png";

let playerSeven = new Image();
playerSeven.src = "animation7.png";

let playerEight = new Image();
playerEight.src = "animation8.png";

let goalKeeper = new Image();
goalKeeper.src = "goalkeeper.png";

let football = new Image();
football.src = "football.png";

let primeImage = new Image();
primeImage.src = "prime.png";

let prime3D = new Image();
prime3D.src = "prime-3d.jpg";

let imagesLoaded = 0;
let currentFrame = 0;
let players = [
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  playerFive,
  playerSix,
  playerSeven,
  playerEight,
];
let x = canvas.width / 2;

playerOne.onload =
  playerTwo.onload =
  playerThree.onload =
  playerFour.onload =
    function () {
      imagesLoaded++;
      if (imagesLoaded === players.length) {
        animate();
      }
    };
let footballX = 0;

//TODO function main
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();

  let y = canvas.height / 2 - players[currentFrame].height / 2;

  //   frame One
  function frameOne() {
    ctx.drawImage(
      players[currentFrame],
      x - 100,
      y + 100,
      players[currentFrame].width / 3,
      players[currentFrame].height / 3
    );

    footballX = x + 20;
    let footballY = y + players[currentFrame].height / 2;

    ctx.drawImage(
      goalKeeper,
      canvas.width - goalKeeper.width / 4,
      y + 100,
      goalKeeper.width / 4,
      goalKeeper.height / 4
    );

    if (x < canvas.width - 200) {
      x += 15;
      //   requestAnimationFrame(frameOne);
    } else if (
      x >= canvas.width - 200 &&
      y < canvas.height - players[currentFrame].height / 3
    ) {
      footballX += 180;
      currentFrame = 1;
      y += 20;
    }

    ctx.drawImage(
      football,
      footballX - 70,
      footballY + 20,
      football.width / 35,
      football.height / 35
    );

    currentFrame = (currentFrame + 1) % players.length;

    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 300);
  }

  //   frame Two
  function frameTwo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();

    ctx.drawImage(
      players[currentFrame],
      x + 450,
      y + 100,
      players[currentFrame].width / 3,
      players[currentFrame].height / 3
    );

    ctx.drawImage(
      goalKeeper,
      canvas.width - goalKeeper.width / 4,
      300,
      goalKeeper.width / 4,
      goalKeeper.height / 4
    );

    if (y < canvas.height - players[currentFrame].height / 3 - 90) {
      y += 15;
      currentFrame = (currentFrame + 1) % players.length;
    } else if (y >= canvas.height - players[currentFrame].height / 3 - 100) {
      ctx.drawImage(
        primeImage,
        x + 475,
        y + 105,
        players[0].width / 3,
        players[0].height / 3
      );
    }

    if (y < canvas.height - players[currentFrame].height / 3 - 40) {
      setTimeout(function () {
        requestAnimationFrame(frameTwo);
      }, 300);
    }
  }

  //   frame three
  function frameThree() {
    ctx.drawImage(
      players[currentFrame],
      x - 120,
      y + 90,
      players[currentFrame].width / 3,
      players[currentFrame].height / 3
    );

    footballX = x + 20;
    let footballY = y + players[currentFrame].height / 2;

    // draw goalkeeper
    ctx.drawImage(
      goalKeeper,
      canvas.width - goalKeeper.width / 4,
      y + 100,
      goalKeeper.width / 4,
      goalKeeper.height / 4
    );

    if (x < canvas.width - 100) {
      x += 20;
    } else if (
      x >= canvas.width - 200 &&
      y < canvas.height - players[currentFrame].height / 3
    ) {
      footballX += 115;
      currentFrame = 1;
      y += 20;
    }

    ctx.drawImage(
      football,
      footballX - 70,
      footballY + 20,
      football.width / 35,
      football.height / 35
    );

    currentFrame = (currentFrame + 1) % players.length;

    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 300);
  }

  //   frame four
  function frameFour() {
    prime3D.onload = function () {
      let imageWidth = canvas.width * 0.7;
      let imageHeight = canvas.height * 0.7;

      let x = (canvas.width - imageWidth) / 2;
      let y = (canvas.height - imageHeight) / 2;
      ctx.drawImage(prime3D, x, y, imageWidth, imageHeight);

      ctx.fillStyle = "red";
      ctx.font = "bold 30px Arial";
      let text = "Prime Energy Drink, Never Lets You Down!💪";
      let textWidth = ctx.measureText(text).width;
      x = (canvas.width - textWidth) / 2;
      y = (canvas.height + imageHeight) / 2 + 50;
      ctx.fillText(text, x, y);
    };
  }

  //   setTimeout(function () {
  //     frameOne();
  //     setTimeout(function () {
  //       shouldExitFrameOne = true;
  //       frameTwo();
  //       setTimeout(function () {
  //         shouldExitFrameTwo = true;
  //         frameThree();
  //         setTimeout(function () {
  //           shouldExitFrameThree = true;
  //           frameFour();
  //           setTimeout(function () {
  //             shouldExitFrameFour = true;
  //           }, 20000);
  //         }, 15000);
  //       }, 9500);
  //     }, 1);
  //   });
  frameOne();
  //   frameTwo();
  // frameThree();
  // frameFour();
}

animate(); // Start the animation
