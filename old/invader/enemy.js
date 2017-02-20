function Enemy(x, i) {
  this.x = x;
  this.y = 80;
  this.r = 80;
  this.speed = 0.5;
  this.dead = false;
  this.hitEdge = false;

  this.show = function() {
    imageMode(CENTER);
    image(enemyImgs[i], this.x, this.y);
  }

  this.move = function() {
    if (!this.dead) {
      this.x += this.speed;
    }
    if (this.y < 0) {
      this.removed = true;
    }
    if (this.x + this.r/2 >= width || this.x - this.r/2 <= 0) {
      this.hitEdge = true;
    }
  }

  this.hit = function() {
    this.r -= 5;
    enemyImgs[i].resize(this.r, this.r);
    if (this.r < 20) {
      this.dead = true;
    }
  }

  this.down = function() {
    for (var i = 0; i < 10; i++) {
      this.y += abs(this.speed);
    }
    this.speed = -this.speed
    this.hitEdge = false;
  }
}
