function Rock(speed) {
	var h = (height/terrain.getRows())*Math.floor(1+ (terrain.getRows()/2)*Math.random());
	var w = width/terrain.getColumns();
	var increment = terrain.getSpeed();
	var posy = floor(terrain.getRows()*Math.random()*(height/terrain.getRows()));
	var pos = [width + width/(2*terrain.getColumns()), posy]
	var hue = floor(400*Math.random());
	var overlapped = false;
	var margin = terrain.getRockMargin()*w;

	var speed = random(-2, 2);
	
	this.show = function() {
		colorMode(HSB);
		fill(hue, 200, 100);
		rect(pos[0], pos[1], w, h);
	}
	this.update = function() {
		pos[0] -= increment;
		increment = terrain.getSpeed();
		pos[1] += speed;
		if (counter.getDeciSeconds() === 1 && counter.getSeconds()%2 === 0 && random([0,1]) === 0) {
			speed *= (-1);
		}
	}
	this.newObjectOk = function() {
		var margin = 7*ball.getRadius() + w;
		if (width - pos[0] > margin) {
			return true;
		}
		else { return false; }
	}
	this.overlap = function() {
		if (overlapped) { return; } 
		if (game.isOver()) { return; }
		if (ball.getCoord()[0] > rocks[i].getPos()[0] && ball.getCoord()[0] < rocks[i].getPos()[0]+rocks[i].getWH()[0]) {
			if (ball.getCoord()[1] > rocks[i].getPos()[1] && ball.getCoord()[1] < rocks[i].getPos()[1]+rocks[i].getWH()[1]) {
				overlapped = true;
				var shouldPlaySound = true;
				colorMode(RGB);
				if (ball.special() === 'shield') {
					ball.special('none');
					shouldPlaySound = false;
					ball.setFarge();
				} else if (ball.special() === 'gravity') {
					ball.special('none');
					terrain.accel(1);
					ball.setFarge();
				} else {
					terrain.accel(1);
					if (terrain.getSpeed() >= 20) {
						game.endGame();
					}/* else if(terrain.getSpeed() > 10) {
						sounds.carmen.play();
					}*/
				}
				if (shouldPlaySound) {
					document.getElementById("crash").play();
				}
			}
		}
	}
	this.getPos = function() {
		return pos;
	}
	this.getWH = function() {
		return [w, h];
	}
}

function newRock() {
	if ((rocks[rocks.length-1]).newObjectOk()) {
		rocks.push(new Rock(terrain.getSpeed()));
		if (rocks.length > 10) {
			rocks.splice(0,1);
		}
	}
}