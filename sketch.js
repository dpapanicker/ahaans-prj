var bg, boyRunning, coins, bird1, bird2;
var bgImg, boyRunningImg, coinsImg, bird1Img, bird2Img;
var coinsGroup, bird1Group, bird2Group;
var gameState = "play";
var iGround;
var score = 0;
function preload() {
  bgImg = loadImage("images/bgfinal.jpg");
  boyRunningImg = loadAnimation(
    "images/boy1.png",
    "images/boy2.png",
    "images/boy3.png",
    "images/boy4.png",
    "images/boy5.png"
  );
  coinsImg = loadAnimation(
    "images/c1.png",
    "images/c2.png",
    "images/c3.png",
    "images/c4.png",
    "images/c5.png",
    "images/c6.png"
  );
  bird1Img = loadAnimation(
    "images/b1.png",
    "images/b2.png",
    "images/b3.png",
    "images/b4.png"
  );
}

function setup() {
  createCanvas(1000, 500);
  bg = createSprite(500, 200, 1000, 500);
  bg.addImage(bgImg);
  bg.scale = 2;
  boyRunning = createSprite(100, 310, 20, 50);
  boyRunning.addAnimation("running", boyRunningImg);
  coinsGroup = createGroup();
  iGround = createSprite(100, 380, 400, 10);
  iGround.visible = false;
  bird1Group = createGroup();
}

function draw() {
  textSize(30);
  background("green");
  drawSprites();
  fill("black");
  text("Score:" + score, 800, 50);

  if (score < 0) {
    gameState = "end";
  }

  if (gameState === "play") {
    bg.velocityX = -3;
    console.log(boyRunning.y);
    
    boyRunning.collide(iGround);
    
    if (keyDown("space") && boyRunning.y > 260) {
      boyRunning.velocityY = -12;
    }
    boyRunning.velocityY += 0.8;
    if (bg.x < 500) {
      bg.x = 1000;
    }

    spawnCoins();
    spawnBirds();

    coinsGroup.isTouching(boyRunning, destroyCoins);
    bird1Group.isTouching(boyRunning, birdDestroy);
  }

  if (gameState === "end") {
    boyRunning.velocityX = 0;
    bg.velocityX = 0;
    bird1Group.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    strokeWeight(5);
    stroke(0);
    fill("white");
    textSize(50);
    text("GAME OVER", 400, 250);
  }
}

function birdDestroy(bird1, boyRunning) {
  bird1.destroy();
  score -= 10;
}

function destroyCoins(coins, boyRunning) {
  coins.destroy();
  score += 10;
}

function spawnCoins() {
  if (frameCount % 100 === 0) {
    coins = createSprite(1000, 250, 10, 10);
    coins.y = Math.round(random(250, 100));
    coins.velocityX = -3;
    coins.addAnimation("coins", coinsImg);
    coins.scale = 0.5;
    coinsGroup.add(coins);
    coins.lifetime = 1000;
  }
}

function spawnBirds() {
  if (frameCount % 100 === 0) {
    bird1 = createSprite(1000, 250, 30, 30);
    bird1.addAnimation("bird1", bird1Img);
    bird1.scale = 0.7;
    bird1.y = Math.round(random(100, 250));
    bird1.velocityX = -10;
    bird1Group.add(bird1);
    bird1.lifetime = 200;
  }
}
