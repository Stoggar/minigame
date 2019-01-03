function Customize() {
	this.resetButton = createButton('Start new game!');
	this.resetButton.parent("col2");
	this.resetButton.mousePressed(resetGame);
}