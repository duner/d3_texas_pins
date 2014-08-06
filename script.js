d3.json('texas.topo.json', function(texas) {
	
	console.log(texas);

	var w = 500;
	var h = 500;

	var svg = d3.select("body").append("svg")
		.attr("width", w)
		.attr("height", h);

	svg.append("path")
		.datum(topojson.feature(texas, texas.objects.subunits))
		.attr("d", d3.geo.path().projection(d3.geo.mercator()));


});