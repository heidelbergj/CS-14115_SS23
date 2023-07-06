
// SVG Size
let width = 700,
	height = 500;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", d => {

	d.LifeExpectancy = +d.LifeExpectancy
	return d;
}).then( data => {

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	let sort = [];

	drawChart(sort)

});

function drawChart(data){
	// do whatever
}
