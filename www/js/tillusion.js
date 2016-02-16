function tTab() {
	console.log("T-Illusion tab active");
}

function proveT() {
	var bar = $('#vertical');
	var vertLen = getLength(bar, "y1", "y2", "vert");
	bar = $('#horizontal');
	var zontLen = getLength(bar, "x1", "x2", "zont");
	checkSame(vertLen, zontLen);

	prove();
}

function getLength(bar, coord1, coord2, whichBar) {
	var canvas = $('#svgCanvas');
	var canvasHeight = parseFloat(canvas.attr("height"));	// parseFloat converts dimension string to number
	var canvasWidth = parseFloat(canvas.attr("width"));		// parseFloat converts dimension string to number
	var startBar = parseFloat(bar.attr(coord1));			// parseFloat converts dimension string to number
	var endBar = parseFloat(bar.attr(coord2));				// parseFloat converts dimension string to number
	var barLength = 0;										// init bar length
	startBar = startBar/100;								// account for percentage height/width
	endBar = endBar/100;
	
	if (whichBar === "vert")
		barLength = startBar*canvasHeight - endBar*canvasHeight;	// length of vertical bar
	else
		barLength = endBar*canvasWidth - startBar*canvasWidth;		// length of horizontal bar

	return barLength;
}

function checkSame(vertLen, zontLen) {
	var resultSpace = $('#tResult');
	if (vertLen === zontLen)
		resultSpace.append("They are the same length");
	else
		resultSpace.append("They are not the same length");
}

function prove() {
	var bar = $('#vertical');
	var canvas = $('#svgCanvas');
	var height = parseFloat(canvas.attr("height"));
	var width = parseFloat(canvas.attr("width"));
	var startY = parseFloat(bar.attr("y1"));
	var endY = parseFloat(bar.attr("y2"));
	bar.animate({
		"stroke-width": '5px',
	}, 1000 );
	bar.attr("transform", "rotate(90, 200, 200)");

	window.setTimeout(moveDown, 500);
}

function moveDown() {
	var moving = setInterval(function() {
		var bar = $('#vertical');
		var percent = 5;
		var downBy = parseFloat(bar.attr("x1"));
		var newY = downBy + percent;
		bar.attr("x1", newY + "%");
		bar.attr("x2", newY + "%");
		if (parseFloat(bar.attr("x1")) === 95) {
			clearInterval(moving);
			moveRight();
		}
	}, 500);
}

function moveRight() {
	var moving = setInterval(function() {
		var bar = $('#vertical');
		var percent = 5;
		var rightBy = parseFloat(bar.attr("y1"));
		var right2By = parseFloat(bar.attr("y2"));
		var newX1 = rightBy - percent;
		var newX2 = right2By - percent;
		bar.attr("y1", newX1 + "%");
		bar.attr("y2", newX2 + "%");
		console.log("y2 = " + parseFloat(bar.attr("y2")));
		if (parseFloat(bar.attr("y2")) === 10) {
			clearInterval(moving);
			bar.attr("stroke", "orange");
		}
	}, 500);
}

function resetT() {
	var resultSpace = $('#tResult');
	resultSpace.empty();

	var bar = $('#vertical');
	bar.attr("transform", "rotate(0, 200, 200)");
	bar.attr("stroke", "blue");
	bar.attr("y1", "95%");
	bar.attr("y2", "15%");
	bar.attr("x1", "50%");
	bar.attr("x2", "50%");

	bar.animate({
		"stroke-width": '10px',
	}, 1000 );
}