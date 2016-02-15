var coverTop = false,
	coverSide = false;
function SAMTab() {
	console.log("Dot Illusion tab active");

	var canvas = $('#illusion1Canvas')[0];		// get the canvas element
	var ctx = canvas.getContext("2d");			// set context of canvas
	var width = canvas.width;					// get canvas width
	var height = canvas.height;					// get canvas height
	var evens = true;							// draw the top left/bottom right

	setInterval(function() {
		evens = flashShapes(ctx, evens, width, height)
	}, 130);
}

function drawSamDots(ctx, x, y) {
	ctx.fillStyle = "#00f"
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function flashShapes(ctx, evens, width, height) {
	ctx.clearRect(0, 0, width, height);
	if (coverTop)
		coverTopSAM();
	if (coverSide)
		coverSideSAM();
	var x, y;
	if (evens) {
		if (!coverTop) {
			x = 70;
			y = 30;
			drawSamDots(ctx, x, y);	// top left
		}
		if (!coverSide) {
			x = width - 70;
			y = height - 30;
			drawSamDots(ctx, x, y);	// bottom right[2]
		}
		return evens = false;
	}
	else {
		if (!coverTop && !coverSide) {
			x = width - 70;
			y = 30;
			drawSamDots(ctx, x, y);	// top right
		}
		x = 70;
		y = height - 30;
		drawSamDots(ctx, x, y);	// bottom left
		return evens = true;
	}
}

function toggleTopSAM() {
	if (coverTop)
		coverTop = false;
	else
		coverTop = true;
}

function toggleSideSAM() {
	if (coverSide)
		coverSide = false;
	else
		coverSide = true;
}

function coverTopSAM() {
	var canvas = $('#illusion1Canvas')[0];
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;

	ctx.fillStyle = "#000"
	ctx.beginPath();
	ctx.rect(0, 0, 300, 60);
	ctx.closePath();
	ctx.fill();
}

function coverSideSAM() {
	var canvas = $('#illusion1Canvas')[0];
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;

	ctx.fillStyle = "#000"
	ctx.beginPath();
	ctx.rect(width-100, 0, 300, 300);
	ctx.closePath();
	ctx.fill();
}

function resetSAM() {
	coverTop = coverSide = false;
}