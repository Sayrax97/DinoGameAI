let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "kako napraviti ai za dinosaurusa koji ide na rodjendan.";
  popmax = 400;
  mutationRate = 0.001;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html(
    "Best phrase:<br>" +
      answer +
      "<br>Best Fitness Score so far: " +
      population.bestFitnessScore.toFixed(4) * 100 +
      "%"
  );

  let statstext =
    "total generations:     " + population.getGenerations() + "<br>";
  statstext +=
    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "highest avrage:         " + nf(population.highestAvg) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + mutationRate * 100 + "%";

  stats.html(statstext);

  //allPhrases.html("All phrases:<br>" + population.allPhrases());
}
