function nextGeneration() {
  calculateFitness();
  // for (let i = 0; i < POPULATION; i++) {
  //   runners[i] = pickOne();
  // }
  generateNewGeneration();
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

function generateNewGeneration(){
  savedRunners.sort( function compare(firstEl, secondEl) {
    return firstEl.fitness < secondEl.fitness
   })
   let bestHalf = savedRunners.splice(0,POPULATION/2);
  //  bestHalf.forEach(function(item) {
  //    item.mutate()
  //  })
   let recombinedHalf = []
   for( let i = 0; i < (POPULATION / 2) - 1; i++){
     let recRes = recombine(bestHalf[i].brain,bestHalf[i+1].brain)
     recombinedHalf.push(recRes)
   }
   let last = lastRecombine(bestHalf[0].brain,bestHalf[1].brain)
  recombinedHalf.push(last)
  bestHalf.push(...recombinedHalf)
  runners.push(...bestHalf);
  // let best = savedRunners.splice(0,2);
  // let removed = savedRunners.splice(savedRunners.length-2,2)
  // let bestRec = recombineBest(best[0].brain, best[1].brain);
  //  runners.push(...best);
  //  runners.push(...bestRec);
  //  runners.push(...savedRunners);
}

function recombineBest(brain1, brain2) {
  let newBrain = new NeuralNetwork(4, 3, 2);
  let newBrain2 = new NeuralNetwork(4, 3, 2);
  newBrain.weights_ih = brain2.weights_ih;
  newBrain.bias_o = brain2.bias_o;
  newBrain.weights_ho = brain1.weights_ho;
  newBrain.bias_h = brain1.bias_h;
  
  let child1 = new Runner(newBrain);
  child1.mutate()

  newBrain2.weights_ih = brain1.weights_ih;
  newBrain2.bias_o = brain1.bias_o;
  newBrain2.weights_ho = brain2.weights_ho;
  newBrain2.bias_h = brain2.bias_h;
  let child2 = new Runner(newBrain2);
  child2.mutate()
  return [child1, child2]
}

function recombine(brain1, brain2) {
  let newBrain = new NeuralNetwork(4, 3, 2);
  // let newBrain2 = new NeuralNetwork(4, 3, 2);
  newBrain.weights_ih = brain2.weights_ih;
  newBrain.bias_h = brain2.bias_h;
  newBrain.weights_ho = brain1.weights_ho;
  newBrain.bias_o = brain1.bias_o;
  
  let child = new Runner(newBrain);
  child.mutate()
  // newBrain2.weights_ih = brain1.weights_ih;
  // newBrain2.bias_o = brain1.bias_o;
  // newBrain2.weights_ho = brain2.weights_ho;
  // newBrain2.bias_h = brain2.bias_h;

  return child
}
 function lastRecombine(brain1, brain2) {
    let newBrain = new NeuralNetwork(4, 3, 2);
    newBrain.weights_ih = brain1.weights_ih;
    newBrain.bias_o = brain1.bias_o;
    newBrain.weights_ho = brain2.weights_ho;
    newBrain.bias_h = brain2.bias_h;
    let child = new Runner(newBrain);
    child.mutate()
    return child;
 }
