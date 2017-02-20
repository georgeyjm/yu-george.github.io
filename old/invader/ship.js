function Ship() {
  this.width = 40;
  this.height = 57;
  this.x = width/2;
  this.y = height-this.width-10;
  this.drc = 0;
  this.speed = 5;
  this.firing = false;
  this.cooling = false;
  this.fireRate = 500;
  this.blood = 150;
  this.dead = false;

  this.show = function() {
    // rectMode(CENTER);
    // fill(255);
    // rect(this.x, this.y, this.width, this.height);
    imageMode(CENTER)
    image(playerImg, this.x, this.y);
    rectMode(CORNER);
    fill(180, 180, 180);
    rect(50, 20, 150, 15);
    fill(255, 10, 10);
    if (this.blood < 0) {
      this.dead = true;
      this.blood = 0;
    }
    rect(50, 20, this.blood, 15);
  }

  this.move = function() {
    if (this.x + this.drc*this.speed > this.width/2 && this.x + this.drc*this.speed < width - this.width/2) {
      this.x += this.drc*this.speed;
    }
  }

  this.fire = function() {
    if (this.firing && !this.cooling) {
      this.cooling = true;
      sleep(this.fireRate).then(() => {this.cooling = false;});
    }
  }
}
