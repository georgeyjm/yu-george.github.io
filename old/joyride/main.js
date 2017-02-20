/*
  Main Control
  Developed by George
  Latest update on July 13th
*/

// Key Values
var gameStarted = false;
var backgroundX = 0;
var backgroundMoveValue = 4;
var score = 0;

// Player Variables
var player = document.getElementById('player');
var playerCharacter = 'engine';
player.src = `images/player/player-${playerCharacter}.gif`;
if (playerCharacter == 'sujay') {player.style.width = '90px';}
if (playerCharacter == 'engine') {player.style.width = '120px';}
var playerHeight = 100;
var playerFlying = false;

// Obstacle Variables
var missile1 = document.getElementById('missile1');
var missile2 = document.getElementById('missile2');
var zapper1 = document.getElementById('zapper1');
var zapper2 = document.getElementById('zapper2');

// Power-up Variables
var shield = document.getElementById('shield');
var shieldIcon = document.getElementById('shieldIcon');
var shieldExplosion = document.getElementById('shieldExplosion');

// Other Elements Variables
var startMenu = document.getElementById('startPage');
var bgImg = document.getElementById('gameCanvas');
var selectCharacterMenu = document.getElementById('characterSelect');
var startText = document.getElementById('startText');
var scoreCounter = document.getElementById('scoreCounter');

// Sound Effect Elements
var bgm = new Audio('audios/bgm.mp3');
var shieldActivatedSFX = new Audio('audios/shield-activated.mp3');
var shieldBrokenSFX = new Audio('audios/shield-broken.mp3');
var startGameSFX = new Audio(`audios/${playerCharacter}-1.mp3 `);
if (playerCharacter == 'sujay') {var progressSFX = new Audio('audios/sujay-1.mp3');} else {var progressSFX = new Audio(`audios/${playerCharacter}-2.mp3`);}
var loseSFX = new Audio(`audios/${playerCharacter}-3.mp3`);

// Key Functions
function listenKeyboard() {
	document.onkeydown = function(event) {
		var keyId = event.keyCode;
		if (keyId == 32 && gameStarted == false) {startGame();}
		if (keyId == 32 && gameStarted == true) {playerFlying = true;}
		if (keyId == 80 && gameStarted == false) {selectCharacter();}
		if (keyId == 83) {shieldActivate();}
	};

	document.onkeyup = function(event) {
		var keyId = event.keyCode;
		if (keyId == 32) {
			playerFlying = false;
			player.src = `images/player/player-${playerCharacter}.gif`; // For Sujay
			player.style.transform = 'rotate(0deg)'; // For Engine
		}
	};
}

function selectCharacter() {
	selectCharacterMenu.style.opacity = 1;
	selectCharacterMenu.style.zIndex = 10000000;
	document.getElementById('copycatImg').addEventListener('click', function() {
		playerCharacter = 'copycat';
		selectCharacterMenu.style.opacity = 0;
		selectCharacterMenu.style.zIndex = -10000000;
		player.style.width = '100px';
		startGameSFX.src = `audios/${playerCharacter}-1.mp3`;
		progressSFX.src = `audios/${playerCharacter}-2.mp3`;
		loseSFX.src = `audios/${playerCharacter}-3.mp3`;
		progressSFX.play();
	});
	document.getElementById('engineImg').addEventListener('click', function() {
		playerCharacter = 'engine';
		selectCharacterMenu.style.opacity = 0;
		selectCharacterMenu.style.zIndex = -10000000;
		player.style.width = '120px';
		startGameSFX.src = `audios/${playerCharacter}-1.mp3`;
		progressSFX.src = `audios/${playerCharacter}-2.mp3`;
		loseSFX.src = `audios/${playerCharacter}-3.mp3`;
		startGameSFX.play();
	});
	document.getElementById('sujayImg').addEventListener('click', function() {
		playerCharacter = 'sujay';
		selectCharacterMenu.style.opacity = 0;
		selectCharacterMenu.style.zIndex = -10000000;
		player.style.width = '90px';
		startGameSFX.src = `audios/${playerCharacter}-1.mp3`;
		progressSFX.src = `audios/${playerCharacter}-2.mp3`;
		loseSFX.src = `audios/${playerCharacter}-3.mp3`;
		startGameSFX.play();
	});
}

function startTextFade() {
	startText.style.opacity = 0;
	setTimeout(function(){startText.style.opacity = 1;}, 2000);
}

function startGame() {
	score = 0;
	startMenu.style.opacity = 0;
	startMenu.style.zIndex = -1000000;
	gameStarted = true;
	startGameSFX.play();

	bgm.volume = 0.2;
	bgm.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	bgm.play();

	setInterval(elementPos, 10);
	generateMissiles();
	generateZappers();
	window.speedUpInterval = setInterval(speedUp, 30000);
	window.moveBgInterval = setInterval(moveBackground, 10);
	window.addScoreInterval = setInterval(addScore, 100);
	window.shieldIconInterval = setInterval(shieldIconMove, 25000);
}

function addScore() {
	score += Math.floor(backgroundMoveValue / 4);
	scoreCounter.innerHTML = score;
}

function moveBackground() {
	bgImg.style.backgroundPosition = backgroundX.toString() + 'px';
	backgroundX -= backgroundMoveValue;
}

function elementPos() {
	var playerBottom = parseInt(player.style.bottom.slice(0,-2));
	shield.style.bottom = (playerBottom - 30).toString() + 'px';
	shieldExplosion.style.bottom = (playerBottom - 28).toString() + 'px';
}

function playerHit(obstacle) {
	if (obstacle.src == 'images/missile.png') {obstacle.style.opacity = 0;}
	if (shield.style.opacity == 1) {
		obstacle.style.opacity = 0;
		setTimeout(function() {obstacle.style.opacity = 1;}, 1000);
		shield.style.opacity = 0;
		shieldBrokenSFX.play();
		shieldExplosion.src = 'images/shield-explosion.gif';
		shieldExplosion.style.opacity = 1;
	} else {restartGame();}
}

function restartGame() {
	clearInterval(gravityInterval);
	clearInterval(moveBgInterval);
	clearInterval(speedUpInterval);
	clearInterval(playerFlyInterval);
	clearInterval(moveMissiles);
	clearInterval(moveZappers);
	clearInterval(addScoreInterval);
	clearInterval(shieldIconInterval);
	player.style.opacity = 0;
	shield.style.opacity = 0;
	missile1.style.opacity = 0;
	missile2.style.opacity = 0;
	shieldExplosion.src = 'images/shield-explosion.gif';
	shieldExplosion.style.opacity = 1;
	shieldBrokenSFX.play();
	bgm.pause();
	bgm.currentTime = 0;
	backgroundMoveValue = 4;
	startText.innerHTML = 'Press Space to Restart<br />Press P to Select Character';

	var intervalsCalled = false;
	setTimeout(function() {
		loseSFX.play();
		loseSFX.addEventListener('ended',function() {
			startMenu.style.zIndex = 1000000;
			startMenu.style.opacity = 1;
			backgroundX = 0;
			player.style.opacity = 1;
			gameStarted = false;
			playerHeight = 100;
			if (intervalsCalled == false) {
				gravityInterval = setInterval(gravity, 10);
				playerFlyInterval = setInterval(playerFly, 10);
				intervalsCalled = true;
			}
		});
	}, 500);
}

// Player Control
function playerFly() {
    if (playerFlying && playerHeight < 660) {
    	playerHeight += 8;
    	if (playerCharacter == 'sujay') {player.src = `images/player/player-${playerCharacter}.gif`;} // Making sure the Sujay GIF stays at the first frame
    	if (playerCharacter == 'engine') {player.style.transform = 'rotate(-90deg)';}
    }
    player.style.bottom = playerHeight.toString() + 'px';
}

function gravity() {
	if (playerHeight > 60) {playerHeight -= 3;}
}

function speedUp() {
	progressSFX.play();
	if (backgroundMoveValue < 25) {backgroundMoveValue += 1;}
}

// Power-ups and Obstacles
function generateMissiles() {
	missile1.style.opacity = 1;
	missile2.style.opacity = 1;
	missile1.style.bottom = (Math.random() * 590 + 100).toString() + 'px';
	missile2.style.bottom = (Math.random() * 590 + 100).toString() + 'px';
	var missile1Right = -10000;
	var missile2Right = -16000;

	window.moveMissiles = setInterval(function() {
		missile1Right += backgroundMoveValue + 2;
		missile2Right += backgroundMoveValue + 2;
		missile1.style.right = missile1Right.toString() + 'px';
		missile2.style.right = missile2Right.toString() + 'px';
		if (missile1Right > 2000) {
			missile1Right = -Math.random() * 200 - 1;
			missile1.style.opacity = 1;
			missile1.style.bottom = (Math.random() * 560 + 60).toString() + 'px';
		}
		if (missile2Right > 2000) {
			missile2Right = -Math.random() * 200 - 1;
			missile2.style.opacity = 1;
			missile2.style.bottom = (Math.random() * 560 + 60).toString() + 'px';
		}
		if (checkCollide(missile1)) {playerHit(missile1);}
		if (checkCollide(missile2)) {playerHit(missile2);}
	}, 10);
}

function generateZappers() {
	zapper1.style.opacity = 1;
	zapper2.style.opacity = 1;
	zapper1.style.bottom = (Math.random() * 500 + 60).toString() + 'px';
	zapper2.style.bottom = (Math.random() * 560 + 60).toString() + 'px';
	var zapper1Right = -200;
	var zapper2Right = -1200;

	window.moveZappers = setInterval(function() {
		zapper1Right += backgroundMoveValue;
		zapper2Right += backgroundMoveValue;
		zapper1.style.right = zapper1Right.toString() + 'px';
		zapper2.style.right = zapper2Right.toString() + 'px';
		if (zapper1Right > 1900) {
			zapper1Right = -Math.random() * 200 - 50;
			zapper1.style.opacity = 1;
			zapper1.style.bottom = (Math.random() * 500 + 60).toString() + 'px';
		}
		if (zapper2Right > 1900) {
			zapper2Right = -Math.random() * 200 - 50;
			zapper2.style.opacity = 1;
			zapper2.style.bottom = (Math.random() * 560 + 60).toString() + 'px';
		}
		if (checkCollide(zapper1)) {playerHit(zapper1);}
		if (checkCollide(zapper2)) {playerHit(zapper2);}
	}, 10);
}

function checkCollide(obstacle) {
	if (player.y + player.height > obstacle.y &&
	obstacle.y > player.y - obstacle.height &&
	player.x + player.width > obstacle.x &&
	obstacle.x > player.x - obstacle.width &&
	obstacle.style.opacity == 1) {return true;}
}

function shieldIconMove() {
	shieldIcon.style.bottom = (Math.random() * 630 + 60).toString() + 'px';
	shieldIcon.style.opacity = 1;
	shieldIcon.style.right = '-100px';
	var shieldIconRight = -100;
	for (var i = 0; i < 10000; i += 10) {
		setTimeout(function() {
			shieldIcon.style.right = shieldIconRight.toString() + 'px';
			shieldIconRight += backgroundMoveValue - 1;
			if (checkCollide(shieldIcon) && shieldIcon.style.opacity == 1) {shieldActivate();}
		}, i / 2);
	}
}

function shieldActivate() {
	if (shield.style.opacity == 0) {
		shieldIcon.style.opacity = 0;
		shieldActivatedSFX.play();
		shield.style.opacity = 1;
		setTimeout(function() {
			shield.style.opacity = 0;
		}, 5000);
	}
}

var startTextFade = setInterval(startTextFade, 4000)

listenKeyboard();
var playerFlyInterval = setInterval(playerFly, 10);
var gravityInterval = setInterval(gravity, 10);