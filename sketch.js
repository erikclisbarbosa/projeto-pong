//backgroun
let img;

//variables ball
let xBall = 300;
let yBall = 200;
let diameter = 15;
let ligthning = diameter / 2;

//variables speed
let xBallspeed = 8;
let yBallspeed = 8;
let yRacket2speed = 5;

//variables racket1
let xRacket1 = 10;
let yRacket1 = 150;

//variables racket2
let xRacket2 = 580;
let yRacket2 = 150;

//variables racket size
let wRacket = 10;
let hRacket = 90;

//variables collision
let collision = false;

//variables punctuation
let spotsR1 = 0;
let spotsR2 = 0;
let chanceOfError = 0;

//variables sons
let score;
let racket;
let trail;

function preload() {
  score = loadSound("score.mp3");
  racket = loadSound("racket.mp3");
  trail = loadSound("trail.mp3");
}

function setup() {
  createCanvas(600, 400);
  img = loadImage(url = 'bg.jpg');
  //trail.loop();
}

function draw() {
  image(img, 0, 0);
  showBall();
  rollBall();
  limitBall();
  showRacket1(xRacket1, yRacket1);
  moveRacket1();
  showRacket2(xRacket2, yRacket2);
  moveRacket2();
  rCollision(xRacket1, yRacket1);
  rCollision(xRacket2, yRacket2);
  spots();
  punctuation();
  freeBall();
}

//function ball
function showBall() {
  circle(xBall, yBall, diameter);
}

function rollBall() {
      xBall += xBallspeed;
      yBall += yBallspeed;
}

function limitBall() {
   if (xBall + ligthning > width || xBall - ligthning < 0) {
    xBallspeed *= -1;
  }
  
  if (yBall + ligthning > height || yBall - ligthning <0) {
    yBallspeed *= -1;
  }
}

//function racket
function showRacket1 (x,y) {
  fill(color(0,0,0));
  rect(x, y, wRacket, hRacket, 10, 10);
}

function showRacket2 (x,y) {
  fill(color(0,0,0));
  rect(x, y, wRacket, hRacket, 10, 10);
}

function moveRacket1() {
  if (keyIsDown(UP_ARROW)) {
    yRacket1 -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRacket1 += 10;
  }
}

function errorCalculation() {
  if (spotsR2 >= spotsR1) {
    chanceOfError += 1;
    if(chanceOfError <=35) {
      chanceOfError = 40;
    }
  } else {
    chanceOfError -= 1
      if (chanceOfError <= 35) {
        chanceOfError = 35
      }
    }
  }

function moveRacket2() {
  yRacket2speed = yBall - yRacket2 - wRacket / 2 - 50;
  yRacket2 += yRacket2speed + chanceOfError;
  errorCalculation();
}

//function collision
function rCollision(x,y) {
    collision = collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, ligthning);
    if (collision) {
        xBallspeed *= -1;
      racket.play();
    }
}

//function point
function spots() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(150, 43, 50));
  rect(125, 8, 50, 25, 10);
  rect(425, 8, 50, 25, 10);
  fill(255);
  text(spotsR1, 150, 26);
  text(spotsR2, 450, 26);
}

function punctuation() {
  if (xBall > 595) {
    spotsR1 += 1;
    score.play();
  }
  if (xBall < 10) {
    spotsR2 += 1;
    score.play();
  }
}

//bugs
function freeBall() {
    if (xBall - ligthning < 0){
    xBall = 23
    }
    if (xBall + ligthning < 0){
    xBall = 580
    }
}

