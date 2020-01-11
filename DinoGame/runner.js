class Runner {
  constructor() {
    this.r = 120;
    this.x = 50;
    this.y = height - 50;
    this.vy = 0;
    this.gravity = 1.5;
  }
  show() {
    image(rImage, this.x, this.y, this.r, this.r);
    //fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);
  }
  jump() {
    if (this.y == height - this.r) this.vy = -25;
  }
  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  hits(obsticle) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = obsticle.x + obsticle.r * 0.5;
    let y2 = obsticle.y + obsticle.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, obsticle.r);
  }
}
