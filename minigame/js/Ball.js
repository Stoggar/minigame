function Ball() {
	var radius = 10;
	var x = width/2;
	var y = height - radius;
	var g = 9.81;
	var t = 0;
	var v = 0;

	var special = '';
	colorMode(RGB);
	farge = color(255,255,255);

	var yi = height - radius;	//initial height
	var vi = 65;	//initial velocity
	var tmax = vi/g;	//elapsed time when ball is back to initial height

	this.show = function() {
		fill(farge);
		ellipse(x, y, 2*radius, 2*radius);
	}
	this.update = function() {
		t += 0.2;
		v = vi - g*t;
		y = yi - (v*t);
		y = constrain(y, radius, height - radius);

		if (y == radius) {
			this.hitRoof();
		}else if (y == height - radius) {
			this.hitFloor();
		}
	}	
	this.special = function(sType = '') {
		if (sType === 'none') {
			special = '';
		} else if (sType) {
			special = sType;
		}
		return special;
	}
	this.setFarge = function(c = color(255,255,255)) {
		farge = c;
	}
	this.hitRoof = function() {
		t = tmax - t + 0.1; 
	}
	this.hitFloor = function() {
		yi = y;
		t = 0;
	}
	this.jump = function() {
		yi = y;
		t = 0;
	}
	this.getRadius = function() {
		return radius;
	}
	this.getCoord = function() {
		return [x, y];
	}

}