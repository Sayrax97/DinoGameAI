const POPULATION = 100;
let generation = 1;
let highscore = 0;
let runners = [];
let savedRunners = [];
let rImage;
let oImage;
let bImage;
let doImage;
let obsticles = [];
let stopwatch;
let i = 0;
let pom = 10;
let counter = 0;
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
  if (key == "r") {
    restart();
  }
}
function restart() {
  obsticles = [];
  counter = 0;
  generation++;
  if (highscore < savedRunners[POPULATION - 1].score)
    highscore = savedRunners[POPULATION - 1].score;
  i = 0;
  pom = 10;
  nextGeneration();
  stopwatch.reset();
  //loop();
  textSize(14);
}
function draw() {
  let distance = 65 - 1 * i;
  if (distance < 50) {
    distance = 50;
  }
  if (counter % distance == 0) {
    if (stopwatch.time() / 10 > 1500 * i) {
      pom = pom + 1;
      i++;
      obsticles.forEach(obs => {
        obs.moveV = pom;
      });
    }

    let obs = new Obsticle(pom, 80, oImage);
    // if (stopwatch.time() / 10 > 6000) {
    //   let rand = random(1);
    //   if (rand > 0.66) {
    //     obs = new Obsticle(pom, 150, doImage);
    //   } else if (rand > 0.33 && rand < 0.66) {
    //     obs = new Obsticle(pom, 95, oImage);
    //   }
    // } else if (stopwatch.time() / 10 > 3000 && stopwatch.time() / 10 < 6000) {
    //   if (random(1) > 0.7) {
    //     obs = new Obsticle(pom, 95, oImage);
    //   }
    // }

    // let procentage = width * 0.65 - 0.01 * i;
    // if (procentage < 0.5) {
    //   procentage = 0.5;
    // }
    // if (obsticles.length > 0 && obsticles.slice(-1)[0].x < procentage)
    //   obsticles.push(obs);
    // else if (obsticles.length == 0) {
    //   obsticles.push(obs);
    // }
    obsticles.push(obs);
  }
  counter++;
  background(220);
  fill(0);
  textSize(14);
  text(`Rezultat:${parseInt(stopwatch.time() / 10)}`, width - 100, 10);
  text(`Population:${POPULATION}`, width - 950, 10);
  text(`Generation:${generation}`, width - 850, 10);
  text(`Highscore:${highscore}`, width - 750, 10);
  text(`Alive:${runners.length}`, width - 600, 10);
  if (runners.length != 0) {
    for (let runner of runners) {
      if (obsticles.length > 0) runner.think(obsticles);
      runner.move();
      runner.show();
    }
  }

  for (let i = 0; i < obsticles.length; i++) {
    for (let j = 0; j < runners.length; j++) {
      if (runners[j].hits(obsticles[i])) {
        //textSize(32);
        savedRunners.push(runners.splice(j, 1)[0]);
        // fill(0);
        // text("Kraj Igre,pritisnite R da restartujete", width / 3, height / 3);
        //noLoop();
        //restart();
      }
    }
    obsticles[i].move();
    obsticles[i].show();
    if (obsticles[i].x < 0) {
      obsticles.splice(i, 1);
    }
  }

  if (runners.length == 0) {
    restart();
  }
  stopwatch.start();
}
