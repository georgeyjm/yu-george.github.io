var ship;
var bullets = [];
var enemies = [];
var playerImg;
var enemyImg;
var enemyImgs = [];

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function preload() {
  playerImg = loadImage('images/player.png');
  for (var i = 0; i < 6; i++) {
    enemyImgs.push(loadImage('images/enemy'+str(floor(random(1,4)))+'.png'));
  }
}

function setup() {
  createCanvas(800,600);
  ship = new Ship();

  for (var i = 0; i < 6; i++) {
    enemyImgs.push(enemyImg);
    enemies.push(new Enemy(i*120 + 40, i));
  }
}

function draw() {
  background(51);

  // Bullets
  if (ship.firing && !ship.cooling) {
    ship.fire();
    bullets.push(new Bullet(ship.x + ship.drc*8, height-40, 'playerNormalBullet'));
  }
  for (var i = bullets.length-1; i >= 0; i--) {
    if (bullets[i].removed) {
      bullets.splice(i, 1);
      continue;
    }
    bullets[i].show();
    bullets[i].move();
  }

  // Enemies
  for (var i = enemies.length-1; i >= 0; i--) {
    if (random(500) < 1) {
      bullets.push(new Bullet(enemies[i].x, enemies[i].y+12, 'enemyNormalBullet'))
    }
    if (random(2000) < 1) {
      bullets.push(new Bullet(enemies[i].x, enemies[i].y+12, 'enemyFollowBullet'))
    }
    if (enemies[i].dead) {
      enemies.splice(i, 1);
      continue;
    }
    enemies[i].show();
    enemies[i].move();
    if (enemies[i].hitEdge) {
      for (var j = enemies.length-1; j >= 0; j--) {
        enemies[j].down();
      }
    }
  }

  // Collapse
  for (var i = bullets.length-1; i >= 0; i--) {
    for (var j = enemies.length-1; j >= 0; j--) {
      if (bullets[i].hit(enemies[j])) {
        enemies[j].hit();
        bullets[i].removed = true;
      }
    }
    if (bullets[i].hit(ship)) {
      ship.blood -= 8;
      bullets[i].removed = true;
    }
  }

  // Ship
  ship.show();
  ship.move();
  if (ship.dead) {
    noLoop();
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.drc = 1;
  } else if (keyCode == LEFT_ARROW) {
    ship.drc = -1;
  } else if (key == ' ' && !ship.cooling) {
    ship.firing = true;
  }
}

function keyReleased() {
  if ((keyCode == RIGHT_ARROW && ship.drc == 1) || (keyCode == LEFT_ARROW && ship.drc == -1)) {
    ship.drc = 0;
  } else if (key == ' ') {
    ship.firing = false;
  }
}
