function Flower() {
	var increment = terrain.getSpeed();
	var radius = 20;
	var pos = [width + radius, (height-30)*Math.random() + 15]
	colorMode(RGB);
	var farge = color(0, 204, 255);
	var special = '';

	this.show = function() {
		colorMode('rgb');
		fill(farge);
		ellipse(pos[0], pos[1], 30, 30);
	}
	this.update = function() {
		pos[0] -= increment;
		increment = terrain.getSpeed();
	}
	/**
	*	Determine special attributes for this flower.
	*/
	this.specialFlower = function() {
		var specialProbability = 0.1;
		if (Math.random() > specialProbability) { return; }

		var numberOfSpecial = 2;
		var dice = floor(numberOfSpecial*Math.random());
		if (dice === 0) {
			special = 'shield';
			farge = color(255, 204, 0);
		} else if (dice === 1) {
			special = 'gravity';
			farge = color('red');
		}
	}
	/**
	*	Determines if there is room enough for a new flower after this one.
	*	@return {boolean} true if there is room, false otherwise
	*/
	this.passed = function() {
		var margin = 5*width/terrain.getColumns();
		if (width - pos[0] > margin) {
			return true;
		}
		else { return false; }
	}
	/**
	* 	Determines weather there is overlap with ball, increases 
	*	points, plays sounds and sets special attributes to ball.
	*/
	this.overlap = function() {
		if (game.isOver()) {
			return;
		} else if (game.getPoints() >= game.getLevel()*500) {
			terrain.accel(1);
			game.nextLevel();
		}
		var distance = Math.sqrt(Math.pow(pos[0] - ball.getCoord()[0], 2) + Math.pow(pos[1] - ball.getCoord()[1], 2));
		if (distance < ball.getRadius() + radius) {
			game.increasePoints(10);
			document.getElementById("eat").play();
			terrain.accel(-1);
			if (special == 'shield') {
				ball.special('shield');
				ball.setFarge(farge);
			} else if (special == 'gravity') {
				ball.special(special);
				ball.setFarge(farge);
			}
			return true;
		}
	}
	this.getPos = function() {
		return pos;
	}
}
/**
*	Creates a new flower, adds it to <flowers> and deletes the last element 
*	of <flowers> if it is longer than 10, tries vertical coordinate until successfull
*/
function newFlower() {
	if (flowers.length === 0) {
		flowers.push(new Flower);
		return;
	}
	if ((flowers[flowers.length-1]).passed()) {
		lastFlower = new Flower; 
		lastFlower.specialFlower();
		flowers.push(lastFlower);
		if (flowers.length > 10) {
			flowers.splice(0,1);
		}
		lastRock = rocks[rocks.length - 1];
		if (lastFlower.getPos()[0] > lastRock.getPos()[0] && lastFlower.getPos()[0] < lastRock.getPos()[0] + lastRock.getWH()[0]) {
			if (lastFlower.getPos()[1] > lastRock.getPos()[1] && lastFlower.getPos()[1] < lastRock.getPos()[1] + lastRock.getWH()[1]) {
				flowers.splice(flowers.length - 1, 1);
				newFlower();
			}
		}
	}
}