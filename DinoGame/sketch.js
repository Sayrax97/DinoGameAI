let runner;
let rImage;
let oImage;
let bImage;
let doImage;
let obsticles = [];
let stopwatch;
let i = 0;
let pom = 10;
function preload() {
  rImage = loadImage("birthday.png");
  oImage = loadImage("barrier.png");
  doImage = loadImage("barrierDouble.png");
}
function setup() {
  createCanvas(1000, 450);
  runner = new Runner();
  stopwatch = new clsStopwatch();
  stopwatch.start();
}

function keyPressed() {
  if (key == " ") runner.jump();
  else if (key == "r") {
    restart();
  }
}
function restart() {
  obsticles = [];
  i = 0;
  pom = 10;
  runner = new Runner();
  stopwatch.reset();
  loop();
  textSize(14);
}
function draw() {
  if (random(1) < 0.01) {
    if (stopwatch.time() / 10 > 1500 * i) {
      pom = pom + 1;
      i++;
      obsticles.forEach(obs => {
        obs.moveV = pom;
      });
    }

    let obs = new Obsticle(pom, 80, oImage);
    if (stopwatch.time() / 10 > 4000) {
      let rand = random(1);
      if (rand > 0.66) {
        obs = new Obsticle(pom, 150, doImage);
      } else if (rand > 0.33 && rand < 0.66) {
        obs = new Obsticle(pom, 95, oImage);
      }
    } else if (stopwatch.time() / 10 > 2000 && stopwatch.time() / 10 < 4000) {
      if (random(1) > 0.7) {
        obs = new Obsticle(pom, 95, oImage);
      }
    }

    if (obsticles.length > 0 && obsticles.slice(-1)[0].x < width * 0.65)
      obsticles.push(obs);
    else if (obsticles.length == 0) {
      obsticles.push(obs);
    }
  }
  background(220);
  fill(0);
  textSize(14);
  text(`Rezultat:${parseInt(stopwatch.time() / 10)}`, width - 100, 10);
  runner.show();
  runner.move();

  for (let o of obsticles) {
    if (o.x - runner.x <= 200) {
      runner.jump();
    }
    o.move();
    o.show();
    if (o.x < -100) {
      obsticles.splice(obsticles.indexOf(o), 1);
    }
    if (runner.hits(o)) {
      textSize(32);
      fill(0);
      text("Kraj Igre,pritisnite R da restartujete", width / 3, height / 3);
      noLoop();
    }
  }
  stopwatch.start();
}
