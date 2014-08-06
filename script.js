d3.json('texas.topo.json', function(data) {

	var w = 500;
	var h = 500;

	var projection = d3.geo.albersUsa()
	    .scale(1000)
	    .translate([w / 2, h / 2]); 

	var path = d3.geo.path()
	    .projection(projection);

	var svg = d3.select("body").append("svg")
		.attr("width", w)
		.attr("height", h);

	feature = topojson.feature(data, data.objects.texas);
	console.log(feature);

	svg.append("path")
		.datum(feature)
		.attr("d", path)
		.style('fill', 'black')
		.style('stroke', 'black');

});