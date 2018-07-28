// SVG 
var width = 600;
var height = 600;
var padding = 50;

// Data setup
var data = popData.filter(d => d.AreaName === "Birmingham");

// Axis setup
//Work out minimum and max for y scale
var max = d3.max(data, d => d.Population * 1.02)
var min = d3.min(data, d => d.Population * 0.98)

var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Year))
    .range([padding, width - padding]);


var yScale = d3.scaleLinear()
    .domain([min, max])
    .range([height - padding, padding])

//Set up Axes
var xAxis = d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0);

var yAxis = d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0);

//Set up svg
var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)

//Display Axes
svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis)


svg.append("g")
    .attr("transform", "translate(" + (padding) + ",0)")
    .call(yAxis)

//Set up line
var g = svg.append("g")
    // .attr("transform", "translate(" + margin.left + 
    //     ", " + margin.top + ")");

// assign values to x and y
var line = d3.line()
    .x(function(d) {
        return xScale(d.Year);
    })
    .y(function(d) {
        return yScale(d.Population);
    });

// affix line to page
g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-with", "3px")
    .attr("d", line(data));