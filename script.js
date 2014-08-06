$(document).ready(function(){
	var w = $('#map').width();
	var h = $('#map').height();

	d3.json('texas.topo.json', function(data) {

		var margin = {top: 10, left: 10, bottom: 10, right: 10};
		var mapRatio = 1;
	    var width = w - margin.left - margin.right;
	    var height = width * mapRatio;

		var texas = topojson.feature(data, data.objects.texas);
	  	var point = {
	  		coords: [-97.7500, 30.2500],
	  		name: 'Austin'
	  	};

		var svg = d3.select("#map").append("svg")
			.attr("width", width)
			.attr("height", height);

		var projection = d3.geo.mercator()
			.center(d3.geo.centroid(texas))
		    .scale(width)
		    .translate([width / 2, height / 2]);

		var path = d3.geo.path()
		    .projection(projection);

		function createMap() {

			svg.append("path")
				.datum(texas)
				.attr("d", path)
				.style('fill', 'black')
				.style('stroke', 'black');

		    svg.selectAll("circle")
				.data([point])
				.enter()
				.append("circle")
					.attr("cx", function (d) { return projection(d.coords)[0]; })
					.attr("cy", function (d) { return projection(d.coords)[1]; })
					.attr("r", function(d) { return (width / mapRatio) * .01 + 'px'; })
					.attr("fill", "red");

			svg.append('text')
				.data([point])
				.enter()
				.append("text")
					.attr('x', function(d){ return console.log(d); path.centroid(d.coords)[0];})
					.attr('y', function(d){ return path.centroid(d.coords)[1];})
					.attr('text',function(d){return d.name;})
					.style("font-size","14px");

		}

		$(window).resize(function() {

			var w = $('#map').width();
			var h = $('#map').height();
		    var width = w - margin.left - margin.right;
	    	var height = width * mapRatio;

		  	var projection = d3.geo.mercator()
				.center(d3.geo.centroid(texas))
			    .scale(width)
			    .translate([width / 2, height / 2]);
		
			var path = d3.geo.path()
		    	.projection(projection);    
  		
  			svg
				.attr("width", width)
				.attr("height", height);

		    svg.selectAll('path').attr('d', path);
		    svg.selectAll('circle')
		    	.attr("cx", function (d) { return projection(d.coords)[0]; })
				.attr("cy", function (d) { return projection(d.coords)[1]; })
				.attr("r", function(d) { return (width / mapRatio) * .01 + 'px'; });


		});


		createMap();
	});

});


