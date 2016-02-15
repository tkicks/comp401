$(document).ready(function() {
	// run when page loads (calls other js functions based on tabs clicked)
	$('#homeTab').click(function() {
		console.log("Home tab active");
	})
	$('#illusion1Tab').click(function() {
		SAMTab();
	})
	$('#illusion2Tab').click(function() {
		tTab();
	})
})