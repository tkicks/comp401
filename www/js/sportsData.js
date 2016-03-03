function sportsTab() {
	console.log("Sports tab active");
	loadXML();
}

function loadXML() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		myFunction(xmlhttp);
	}
	};
	xmlhttp.open("GET", "cd_catalog.xml" , true);
	// xmlhttp.open("GET", "./files/sportsData1.xml" , true);
	xmlhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD")
  for (i = 0; i < x.length; i++) { 
    table += "<tr><td>" + 
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("CDtable").innerHTML = table;
}