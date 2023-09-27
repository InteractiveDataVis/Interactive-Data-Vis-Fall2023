/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 100, right: 60 }

/* LOAD DATA */
d3.csv('../data/populationOverTime.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    rawYear: +d.Year,
    country: d.Entity,
    population: +d.Population
  }
}).then(data => {
console.log('data :>> ', data);

// SCALES

const xScale = d3.scaleTime()
  // .domain(d3.extent(data, d => d.year))
  .domain(d3.extent(data, d => d.rawYear))
  .range([margin.left, width-margin.right])

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.population))
  .range([height - margin.bottom, margin.top])

// CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// BUILD AND CALL AXES

const xAxis = d3.axisBottom(xScale)
  .ticks(6) // limit the number of tick marks showing -- note: this is approximate

const xAxisGroup = svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${0}, ${height - margin.bottom})`)
  .call(xAxis)

const yAxis = d3.axisLeft(yScale)
  // .tickFormat(formatBillions)

const yAxisGroup = svg.append("g")
  .attr("class", "yAxis")
  .attr("transform", `translate(${margin.left}, ${0})`)
  .call(yAxis)

// LINE GENERATOR FUNCTION

const lineGen = d3.line()
  .x(d => xScale(d.rawYear))
  .y(d => yScale(d.population))

// GROUP THE DATA BY COUNTRY
const groupedData = d3.groups(data, d => d.country)
console.log('groupedData', groupedData)

// DRAW LINE
svg.selectAll("path")
  .data(groupedData)
  .join("path")
  // .attr("d", d => lineGen(d[1]))
  .attr("d", ([countryName, data]) => lineGen(data))
  .attr("id", d => d[0])
  .style("fill", "none")
  .style("stroke", "black")

});