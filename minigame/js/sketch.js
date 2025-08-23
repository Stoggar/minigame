var framerate = 60;
var audioContext = new AudioContext();

function setup() {
   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	cnv = createCanvas(Math.min(700, w), 550);
	cnv.parent("col1");
	resetGame();
	frameRate(framerate);
	customize = new Customize();
	sounds = new Sounds();
}

function draw() {
	background(51);
	textField();
	ball.show();
	ball.update();
	for (i = 0; i < rocks.length; i++) {
		rocks[i].show();
		rocks[i].update();
		rocks[i].overlap();
	}
	for (i = 0; i < flowers.length; i++) {
		flowers[i].show();
		flowers[i].update();
		if (flowers[i].overlap()) {
			flowers.splice(i, 1);
		}
	}
	newFlower();
	newRock();
	counter.update();
	gravity();
	game.finished();
}

function resetGame() {
   getAudioContext().resume()
   document.getElementById("crash").load();
	terrain = new Terrain;
	ball = new Ball();
	rocks = [];
	rocks.push(new Rock(terrain.getSpeed()));
	flowers = [];
	flowers.push(new Flower()); flowers[flowers.length - 1].specialFlower();
	game = new Game;
	counter = new Counter();
}

function Counter() {
	var second = framerate;
	var deciSeconds = 0;	//resets at 1 min
	var seconds = 0;	//resets at 10 min

	this.update = function() {
		if (seconds === 600) {
			seconds = 0;
		}
		if (deciSeconds%second === 0) {
			deciSeconds = 0;
			seconds++;
		}
		deciSeconds++;
	}
	this.getSeconds = function() {
		return seconds;
	}
	this.getDeciSeconds = function() {
		return deciSeconds;
	}
}

function gravity() {
	if (ball.special() !== 'gravity') { return; }
	var speedFactor = 40000;
	for (i = 0; i < flowers.length; i++) {
		var distX = ball.getCoord()[0] - flowers[i].getPos()[0];
		var distY = ball.getCoord()[1] - flowers[i].getPos()[1];
		var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
		var velocity = [distX/distance, distY/distance];
		velocity[0] *= speedFactor/Math.pow(distance,2);
		velocity[1] *= speedFactor/Math.pow(distance,2);
		flowers[i].getPos()[0] += velocity[0];
		flowers[i].getPos()[1] += velocity[1];
	}
}

function Game() {
	var over = false;
	var level = 1;
	var points = 0;

	this.finished = function() {
		if (over) {
			textSize(70);
			colorMode('rgb');
			textAlign(CENTER);
			text("GAME OVER", width/2, height/2);
		}
	}
	this.isOver = function() {
		return over;
	}
	this.endGame = function() {
		over = true;
	}
	this.getLevel = function() {
		return level;
	}
	this.nextLevel = function() {
		level++;
		terrain.nextLevel();
	}
	this.increasePoints = function(n) {
		points += n;
	}
	this.getPoints = function() {
		return points;
	}
}

function Terrain() {
	var rocksMarginFactor = 3;
	var rows = 12;
	var columns = 12;
	var initialSpeed = 3.5;
	var displaySpeed = 1;
	var speed = initialSpeed;
	var increment = 0.8;

	this.accel = function(n) {
		if (n > 0) {
			speed += increment*n;
			displaySpeed++;
		} else if (n < 0 && speed > initialSpeed) {
			speed -= increment*Math.abs(n);
			displaySpeed--;
		}
	}
	this.nextLevel = function() {
		initialSpeed += increment;
	}
	this.getDisplaySpeed = function() {
		return displaySpeed;
	} 
	this.getSpeed = function() {
		return speed;
	}
	this.getRockMargin = function() {
		return rocksMarginFactor;
	}
	this.getRows = function() {
		return rows;
	}
	this.getColumns = function() {
		return columns;
	}
}

function Sounds() {
	this.carmen = document.getElementById("carmen_overture");
}

function textField() {
	textSize(32);
	colorMode('rgb');
	fill(0, 204, 255);
	textAlign(LEFT);
	text(String(game.getPoints()), 20, 40);

	textAlign(CENTER);
	text("level " + game.getLevel(), width/2, 40);

	textAlign(RIGHT);
	text(terrain.getDisplaySpeed(), width - 20, 40);
}
/*
function mousePressed() {
	ball.jump();
}*/
function keyPressed() {
	ball.jump();
}

var released = true;

function mouseReleased(){
	released = true;
   return false;
}

function mousePressed(){
	if(!released){
		return;
	}
	released = false;
	ball.jump();
}

