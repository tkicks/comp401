function tTab() {
	console.log("T-Illusion tab active");
}

function proveT() {
// if the prove button is pressed
	var bar = $('#vertical');							// var for vertical line
	var vertLen = getLength(bar, "y1", "y2", "vert");	// get length of vertical line
	bar = $('#horizontal');								// var for horizontal line
	var zontLen = getLength(bar, "x1", "x2", "zont");	// get length of horizontal line
	checkSame(vertLen, zontLen);						// see if they are the same length

	prove();											// prove that they are the same length
}

function getLength(bar, coord1, coord2, whichBar) {
// INPUT: bar object, begin point, end point of line, which bar it is
// OUTPUT: length of the bar passed in
// get the length of the bar
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

	return barLength;										// return the length of the bar
}

function checkSame(vertLen, zontLen) {
// check if the bars are the same length
	var resultSpace = $('#tResult');						// where to append the result to
	if (vertLen === zontLen)								// if they're the same length
		resultSpace.append("They are the same length");		// say so
	else													// otherwise
		resultSpace.append("They are not the same length");	// say so
}

function prove() {
// prove they're the same length
	$('#prove').attr('disabled', 'disabled');			// disable the buttons (stops possibility of infinite loop)
	$('#reset').attr('disabled', 'disabled');			// disable the buttons (stops possibility of infinite loop)
	var bar = $('#vertical');							// vertical line object
	var canvas = $('#svgCanvas');						// canvas object
	var height = parseFloat(canvas.attr("height"));		// get the canvas height
	var width = parseFloat(canvas.attr("width"));		// get the canvas width
	var startY = parseFloat(bar.attr("y1"));			// get the starting y coord
	var endY = parseFloat(bar.attr("y2"));				// get the ending y coord

	bar.attr("transform", "rotate(90, 200, 200)");		// rotate the bar sideways
	// this makes x vals be in y vars in svg elt below

	window.setTimeout(moveDown, 500);					// wait half a second then start moving down
}

function moveDown() {
// move the vertical bar down towards the horizontal bar
	var moving = setInterval(function() {				// set a half second interval between jumps
		var bar = $('#vertical');						// vert bar object
		var percent = 5;								// % to move down by
		var downBy = parseFloat(bar.attr("x1"));		// get the current y val
		var newY = downBy + percent;					// calculate new y val
		bar.attr("x1", newY + "%");						// set the new y coords
		bar.attr("x2", newY + "%");						// set the new y coords
		if (parseFloat(bar.attr("x1")) === 90) {		// check if it's right above horizontal bar
			clearInterval(moving);						// stop moving down
			moveRight();								// move vert bar right over horizontal
		}
	}, 500);
}

function moveRight() {
// align the "vertical" bar with the "horizontal" bar
	var moving = setInterval(function() {				// set a half second interval between jumps
		var bar = $('#vertical');						// vert bar object
		var percent = 5;								// % to move right by
		var rightBy = parseFloat(bar.attr("y1"));		// get the current x1 val
		var right2By = parseFloat(bar.attr("y2"));		// get the current x2 val
		var newX1 = rightBy - percent;					// calculate new x1 val
		var newX2 = right2By - percent;					// calculate new x2 val
		bar.attr("y1", newX1 + "%");					// set the new x1 coords
		bar.attr("y2", newX2 + "%");					// set the new x2 coords
		if (parseFloat(bar.attr("y2")) === 10) {		// check if it's right above horizontal bar
			clearInterval(moving);						// stop moving right
			$('#reset').removeAttr('disabled');			// enable the reset button
		}
	}, 500);
}

function resetT() {
// reset the illusion
	var resultSpace = $('#tResult');				//
	resultSpace.empty();							// clear where it says it's the same length

	var bar = $('#vertical');						// vertical bar object
	bar.attr("transform", "rotate(0, 200, 200)");	// rotate back vertically (reset xcoords to x and ycoords to y)
	bar.attr("y1", "95%");							// reset x and y values to original
	bar.attr("y2", "15%");							// reset x and y values to original
	bar.attr("x1", "50%");							// reset x and y values to original
	bar.attr("x2", "50%");							// reset x and y values to original

	$('#prove').removeAttr('disabled');				// enable prove button again
}