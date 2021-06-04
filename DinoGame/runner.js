function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
class Runner {
  constructor(brain) {
    this.r = 120;
    this.x = 50;
    this.y = height - 50;
    this.vy = 0;
    this.gravity = 1.5;
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 3, 2);
    }
  }
  show() {
    image(rImage, this.x, this.y, this.r, this.r);
  }
  think(obstacles) {
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < obstacles.length; i++) {
      let diff = obstacles[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = obstacles[i];
      }
    }
    let inputs = [];
    if (closest != null) {
      inputs[0] = this.x / width;
      inputs[1] = closest.x / width;
      inputs[2] = closest.y / height;
      inputs[3] = closest.moveV / 100;
      let output = this.brain.predict(inputs);
      if(output[0] > output[1]){
        this.jump(25)
      }
    }
  }
  jump(value) {
    if (this.y == height - this.r) this.vy = -value;
  }
  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
    this.score = floor(stopwatch.time() / 10);
  }
  hits(obsticle) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = obsticle.x + obsticle.r * 0.5;
    let y2 = obsticle.y + obsticle.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, obsticle.r);
  }
  mutate() {
    this.brain.mutate(mutate);
  }
}
