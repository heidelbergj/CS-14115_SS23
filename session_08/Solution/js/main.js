

// Load CSV file
d3.csv("data/wealth-health-2014.csv", d => {

	// convert
	d.Income = +d.Income;
	d.LifeExpectancy = +d.LifeExpectancy;
	d.Population = +d.Population;

	// return
	return d;

}).then(data => {

	// sort data - countries descending by population
	let sortedData = data.sort((a, b) => b.Population - a.Population);

	// draw chart
	drawChart(sortedData)
});


// outside function drawChart()
function drawChart(data){

	// Margin object with properties for the four directions
	let margin = {top: 20, right: 10, bottom: 40, left: 60};

	// SVG Size
	let width = 700 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// Append a new SVG area
	let svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// X scale
	let incomeScale = d3.scaleLog()
		.domain([d3.min(data, d => d.Income), d3.max(data, d => d.Income )])
		.range([0, width]);

	// Y scale
	let lifeExpectancyScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.LifeExpectancy), d3.max(data, d => d.LifeExpectancy)])
		.range([height, 0]);

	// Radius Scale
	let populationScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.Population))
		.range([4, 30]);

	// Region Scale (ordinal)
	let regionScale = d3.scaleOrdinal(d3.schemeCategory10);

	data.forEach(d => {
		console.log(d.Region)
	})

	let regions = ['1','2','3','4']
	console.log(d3.schemeCategory10)

	d3.schemeCategory10

	// Map data to visual elements (SVG circles)
	let circles = svg.selectAll("circle")
		.data(data)

	console.log(circles)

	circles
		.enter()
		.append("circle")
		.attr("class", "country-circle")
		.attr("cx", d => incomeScale(d.Income))
		.attr("cy", d => lifeExpectancyScale(d.LifeExpectancy))
		.attr("r", d => populationScale(d.Population))
		.attr("stroke", "#333")
		.attr("opacity", 0.7)
		.attr("fill", d => regionScale(d.Region))
		.on('mouseover', (event, d) => {
			console.log(event, d, this)
		})


	// Create axes functions
	let xAxis = d3.axisBottom()
		.scale(incomeScale)
		.tickFormat(d3.format(",d"))
		.tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000]);

	let yAxis = d3.axisLeft()
		.scale(lifeExpectancyScale)
		.ticks(10);

	// Append axes to the SVG drawing area
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("y", -15)
		.attr("x", width)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Income per Person (GDP per Capita)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Life Expectancy");
}
