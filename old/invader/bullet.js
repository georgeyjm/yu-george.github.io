function Bullet(x, y, bulletType) {
  this.x = x;
  this.y = y;
  this.removed = false;
  this.bulletType = bulletType;
  if (this.bulletType == 'playerNormalBullet') {
    this.r = 15;
    this.speed = 10;
    this.red = 140;
    this.green = 120;
    this.blue = 255;
  } else if (this.bulletType == 'enemyNormalBullet') {
    this.r = 15;
    this.speed = -6;
    this.red = 220;
    this.green = 30;
    this.blue = 20;
  } else if (this.bulletType == 'enemyFollowBullet') {
    this.r = 15;
    this.speed = -6;
    this.red = 220;
    this.green = 255;
    this.blue = 20;
    this.maxFollowSpeed = 6;
  }

  this.show = function() {
    noStroke();
    fill(this.red, this.green, this.blue);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.move = function() {
    if (!this.removed) {
      this.y -= this.speed;
    }
    if (this.bulletType == 'enemyFollowBullet') {
      // if (this.x > ship.x) {
      //   this.x -= 1;
      // } else if (this.x < ship.x) {
      //   this.x += 1;
      // }
      var moveAmount = (ship.x - this.x) / 20;
      if (moveAmount > this.maxFollowSpeed) {
        moveAmount = this.maxFollowSpeed;
      } else if (moveAmount < -this.maxFollowSpeed) {
        moveAmount = -this.maxFollowSpeed;
      }
      this.x += moveAmount;
    }
    if (this.y < 0) {
      this.removed = true;
    }
  }

  this.hit = function(obj) {
    if (this.bulletType == 'playerNormalBullet') {
      if (dist(this.x, this.y, obj.x, obj.y) < obj.r/2 + this.r/2) {
        return true;
      } else {
        return false;
      }
    } else {
      if (dist(this.x, this.y-this.r/2, obj.x, obj.y) < obj.height) {
        return true;
      } else {
        return false;
      }
    }
  }
}
