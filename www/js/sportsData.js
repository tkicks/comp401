function sportsTab() {
	console.log("Sports tab active");
	loadXML();
}

function loadXML() {
	var data = null;
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = getData(xmlhttp);

			makeSVG(data);
		}
	};
	xmlhttp.open("GET", "http://cs.wheatoncollege.edu/~public/sportsData1.xml" , true);
	xmlhttp.send();
}

function getData(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	var players = {};
	var names = xmlDoc.getElementsByTagName("team");
	for (i = 0; i < names.length; i++) {
		var playerInfo = {};
		playerInfo["team"] = names[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		playerInfo["pName"] = names[i].getElementsByTagName("name")[1].childNodes[0].nodeValue;
		playerInfo["pHeight"] = names[i].getElementsByTagName("height")[0].childNodes[0].nodeValue;
		playerInfo["weight"] = names[i].getElementsByTagName("weight")[0].childNodes[0].nodeValue;
		playerInfo["average"] = names[i].getElementsByTagName("average")[0].childNodes[0].nodeValue;
		playerInfo["obp"] = names[i].getElementsByTagName("OBP")[0].childNodes[0].nodeValue;
		playerInfo["hr"] = names[i].getElementsByTagName("home_runs")[0].childNodes[0].nodeValue;
		players[i] = playerInfo;
	}
	return players;
}

function makeSVG(playerInfo) {
	// average is x axis (width) obp is y axis (height)
	var size = Object.keys(playerInfo).length;	// get number of entries
	var minX = 1000;
	var minY = 1000;
	var maxX = 0;
	var maxY = 0;

	for (var i = 0; i < size; i++){
		if (minX > playerInfo[i].average)
			minX = playerInfo[i].average;
		if (minY > playerInfo[i].hr)
			minY = playerInfo[i].hr;
		if (maxX < playerInfo[i].average)
			maxX = playerInfo[i].average;
		if (maxY < playerInfo[i].hr)
			maxY = playerInfo[i].hr;
	}
	makeAxes(minX, minY, maxX, maxY, size, playerInfo);


	// return maxVals;
}

function makeAxes(minX, minY, maxX, maxY, size, playerInfo)
{
	console.log(minX + " " + maxX + " " + minY + " " + maxY);
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = 800 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width])
		.domain([minX, maxX]);

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([minY-100, maxY]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return ("Name: " + playerInfo[d].pName + "<br />");
	  })

	var svg = d3.select("#svgSpot").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("x", width)
		.attr("y", -4)
		.style("text-anchor", "end")
		.text("average");
				
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 10)
		.style("text-anchor", "end")
		.text("home runs");

	
	for (var i = 0; i < size; i++) {
		var onbp = playerInfo[i].obp;
		
		if (onbp < .31)
			var color = "red";
		else if (onbp < .32)
			var color = "orange";
		else if (onbp < .33)
			var color = "blue";
		else if (onbp < .34)
			var color = "green";
		else if (onbp < .35)
			var color = "yellow";
		else if (onbp < .36)
			var color = "black";
		else if (onbp < .37)
			var color = "white";
		else if (onbp < .38)
			var color = "purple";
		else if (onbp < .39)
			var color = "cyan";
		else if (onbp < .4)
			var color = "aqua";

		var circle = svg.append("ellipse")
			.attr("id", playerInfo[i].pName)
			.attr("cx", x(playerInfo[i].average))
			.attr("cy", y(playerInfo[i].hr))
			.attr("rx", playerInfo[i].weight/10)
			.attr("ry", playerInfo[i].pHeight/10)
			.style("fill", color)
			.style("stroke", "black")
			.style("stroke-width", 1)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
	}
}

function displayStats(playerInfo, i) {
	console.log(playerInfo[i].pName);
	var playerName = $('#playerName');
	playerName.append(playerInfo[i].pName);
}