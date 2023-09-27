/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])


  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // axis scales

  svg.append("g")
    .attr("transform", `translate(${0},${height - margin.bottom})`)
    .call(selection => selection.call(xAxis))

  svg.append("g")
    .attr("transform", `translate(${margin.left},${0})`)
    .call(selection => selection.call(yAxis))
 
  // debugging
  // console.log(data.find(d => d.BioID === "G000560"))

  // circles
  // svg.selectAll("circle.senator")
  //   .data(data, d => d.BioID)
  //   .join(
  //     enter => enter.append("circle")
  //       .attr("class", "senator")
  //       .attr("id", d => d.BioID)
  //       .attr("r", 0)
  //       .attr("cx", d => xScale(d.ideologyScore2020))
  //       .attr("cy", d => yScale(d.envScore2020))
  //       .call(sel => sel.transition()
  //         .duration(1000)
  //         .delay((d, i) => d.ideologyScore2020 * 1000)
  //         .attr("r", 5))
  //     ,
  //     update => update,
  //     exit => exit.remove()
  //   )

  svg.selectAll("circle.senator")
    .data(data, d => d.BioID)
    .join("circle")
    .attr("class", "senator")
    .attr("id", d => d.BioID)
    .attr("r", 0)
    .attr("cx", d => xScale(d.ideologyScore2020))
    .attr("cy", d => yScale(d.envScore2020))
    .transition()
      .duration(1000)
      .delay((d, i) => d.ideologyScore2020 * 1000)
      .attr("r", 5)
    

});