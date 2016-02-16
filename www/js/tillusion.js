function tTab() {
	console.log("T-Illusion tab active");
}

function proveT() {
	// draw thinner (than original object) brown line through
	// vertical line then call animation to rotate it and place
	// overlaying horizontal line to see if it's the same size
	// get guess info
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
	bar.attr("stroke", "yellow");
	bar.animate({
		"stroke-width": '5px',
		"top": "+=950",
		"x1": '95%',
		"x2": '95%',
		"fill": 'freeze'
	}, 1000 );
	bar.attr("transform", "rotate(90, 200, 200)");
	// bar.attr("x1", "95%");
	// bar.attr("x2", "95%");
	// bar.attr("y1", "10%");
	// bar.attr("y2", "90%");
	var newY = 0;
	do {
		newY = moveDown(bar, 5);
	} while (newY > 15);

	// var bar = $('#vertical');
	// bar.attr("transform", "rotate(90, 200, 200)");
	// bar.attr("stroke", "green");
	// bar.animate({
	// 	"stroke-width": '5px',
	// 	"top": "+=950",
	// 	"x1": '95%',
	// 	"x2": '95%',
	// 	"fill": 'freeze'
	// }, 1000 );



	// $('#vertical').attr("transform: 'rotate(90, 200, 200)'");
}

function moveDown(bar, percent) {
	console.log("moving down");
	var downBy = parseFloat(bar.attr("y1"));
	var newY = downBy - percent;
	bar.attr("y1", downBy);
	bar.attr("y2", "90%");

	return newY;
}

function resetT() {
	var resultSpace = $('#tResult');
	resultSpace.empty();

	var bar = $('#vertical')
	bar.attr("stroke", "blue");
	bar.animate({
		"stroke-width": '10px',
		"top": "-=950",
		"x1": '50%',
		"x2": '50%',
		"fill": 'freeze'
	}, 1000 );
	// bar.attr("transform", "rotate(270, 200, 200)");
	bar.attr("x1", "95%");
	bar.attr("x2", "15%");
	bar.attr("y1", "50%");
	bar.attr("y2", "50%");
}