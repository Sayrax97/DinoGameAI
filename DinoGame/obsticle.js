class Obsticle {
  constructor(velocity, radius, image) {
    this.r = radius;
    this.x = width;
    this.moveV = velocity;
    this.y = height - this.r;
    this.image = image;
  }
  show() {
    image(this.image, this.x, this.y, this.r, this.r);
    //fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);
  }
  move() {
    this.x -= this.moveV;
  }
}
