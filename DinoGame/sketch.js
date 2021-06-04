const POPULATION = 50;
let updateDistance = Math.floor(Math.random() * 40 + 40);
let generation = 1;
let highscore = 0;
let runners = [];
let savedRunners = [];
let rImage;
let oImage;
let bImage;
let doImage;
let obstacles = [];
let stopwatch;
let xlrt = 0;
let pause = false;
let currentVelocity = 10;
let frameCounter = 0;
function preload() {
  rImage = loadImage("birthday.png");
  oImage = loadImage("barrier.png");
  doImage = loadImage("barrierDouble.png");
}
function setup() {
  createCanvas(1000, 450);
  for (let i = 0; i < POPULATION; i++) {
    runners[i] = new Runner();
  }
  stopwatch = new clsStopwatch();
  stopwatch.start();
}

function keyPressed() {
  if(key == "k"){
    killAll()
  }
}

function killAll(){
  savedRunners.push(...runners)
  runners = []
  restart()
}
function restart() {
  obstacles = [];
  frameCounter = 0;
  generation++;
  if (highscore < savedRunners[POPULATION - 1].score)
    highscore = savedRunners[POPULATION - 1].score;
  xlrt = 0;
  currentVelocity = 10;
  nextGeneration();
  stopwatch.reset();
  textSize(14);
}
function draw() {
  if (frameCounter % updateDistance == 0) {
    if (stopwatch.time() / 10 > 1500 * xlrt) {
      currentVelocity = currentVelocity + 1;
      xlrt++;
      obstacles.forEach(obs => {
        obs.moveV = currentVelocity;
      });
    }
    let rand = random(1);
    if (rand > 0.66) {
      obs = new Obstacle(currentVelocity, 150, doImage);
    } 
    else if (rand > 0.33 && rand < 0.66) {
      obs = new Obstacle(currentVelocity, 110, oImage);
    } 
    else obs = new Obstacle(currentVelocity, 80, oImage);

    obstacles.push(obs);
    updateDistance = Math.floor(Math.random() * 30 + ((60 - xlrt) < 20 ? 20 : (60 - xlrt)) );
    frameCounter = 0;
  }
  frameCounter++;
  background(220);
  fill(0);
  textSize(14);
  text(`Rezultat:${parseInt(stopwatch.time() / 10)}`, width - 100, 10);
  text(`Population:${POPULATION}`, width - 950, 10);
  text(`Generation:${generation}`, width - 850, 10);
  text(`Highscore:${highscore}`, width - 750, 10);
  text(`Alive:${runners.length}`, width - 600, 10);
  if (runners.length > 0) {
    for (let runner of runners) {
      if (obstacles.length > 0) 
        runner.think(obstacles);
      runner.move();
      runner.show();
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < runners.length; j++) {
      if (runners[j].hits(obstacles[i])) {
        savedRunners.push(runners.splice(j, 1)[0]);
        j--;
      }
    }
    obstacles[i].move();
    obstacles[i].show();
    if (obstacles[i].x < -50) {
      obstacles.splice(i, 1);
    }
  }

  if (runners.length == 0) {
    restart();
  }
  stopwatch.start();
}
