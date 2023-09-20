
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 500;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    console.log(data.map(d => d.activity))

    /* SCALES */
    const xScale = d3.scaleBand()
      // .domain(["running", "chasing", "climbing", "eating", "foraging"])
      .domain(data.map(d => d.activity))
      .range([0, width])
      .padding(0.3)

      console.log(data.map(d => d.count))
      console.log(d3.extent(data.map(d => d.count)))

    const yScale = d3.scaleLinear()
      // .domain([0, 1500])
      // .domain(d3.extent(data.map(d => d.count)))
      // .domain([0, Math.max(...data.map(d => d.count))])
      .domain([0, d3.max(data.map(d => d.count))])
      .range([height, 0])

    /* HTML ELEMENTS */

    // svg
    const svg = d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "aliceblue")
      .style("overflow", "visible")

    // bars
    const bars = svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      // .attr("x", (d, i, c) => {
        //   console.log(d, i, c)
        //   return i * 100;
        // })
      .attr("x", d => xScale(d.activity))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.count))
      .attr("y", d => yScale(d.count))

    const xAxisGroup = svg.append("g")
    const yAxisGroup = svg.append("g")

    yAxisGroup
      .call(d3.axisLeft(yScale))

    xAxisGroup
      .style("transform", `translate(0, ${height}px)`)
      .call(d3.axisBottom(xScale))


  })