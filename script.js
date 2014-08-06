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
		    .scale(width * 2)
		    .translate([width / 2, height / 2]);

		var path = d3.geo.path()
		    .projection(projection);

		function createMap() {

			svg.append("path")
				.datum(texas)
				.attr("d", path)
				.style('fill', '#4aa1cc')

		    svg.selectAll("circle")
				.data([point])
				.enter()
				.append("circle")
					.attr("cx", function (d) { return projection(d.coords)[0]; })
					.attr("cy", function (d) { return projection(d.coords)[1]; })
					.attr("r", function(d) { return (width / mapRatio) * .01 + 'px'; })
					.attr("fill", "#9772c5");

			svg.selectAll('text')
				.data([point])
				.enter()
				.append("text")
					.attr('x', function(d){ return projection(d.coords)[0]; })
					.attr('y', function(d){ return projection(d.coords)[1]; })
					.attr('text',function(d){ console.log(d); return d.name;})
					.attr('fill', 'black')
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


