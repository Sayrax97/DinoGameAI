function nextGeneration() {
  calculateFitness();
  for (let i = 0; i < POPULATION; i++) {
    runners[i] = pickOne();
  }
  savedRunners = [];
}
function calculateFitness() {
  let sum = 0;
  for (let runner of savedRunners) {
    sum += runner.score;
  }
  for (let runner of savedRunners) {
    runner.fitness = runner.score / sum;
  }
}
function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= savedRunners[index].fitness;
    index++;
  }
  index--;
  let runner = savedRunners[index];
  let child = new Runner(runner.brain);
  child.mutate();
  return child;
}
