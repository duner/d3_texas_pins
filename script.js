d3.json('texas.topo.json', function(data) {

	var w = 500;
	var h = 500;

	var texas = topojson.feature(data, data.objects.texas);
    
    var center = d3.geo.centroid(texas);
    var bounds = d3.geo.bounds(texas);

	var projection = d3.geo.albers()
		// .center(center)
	    // .scale(1000)
	    .translate([w / 2, h / 2]);

	var path = d3.geo.path()
	    .projection(projection);

	var svg = d3.select("body").append("svg")
		.attr("width", w)
		.attr("height", h);

	var point = [-97.7500, 30.2500]; //Austin

	svg.append("path")
		.datum(texas)
		.attr("d", path)
		.style('fill', 'black')
		.style('stroke', 'black');

    svg.selectAll("circle")
		.data([point])
		.enter()
		.append("circle")
		.attr("cx", function (d) { return projection(d)[0]; })
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "8px")
		.attr("fill", "red");

});