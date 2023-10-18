/* ---------- CONSTANTS AND GLOBALS ---------- */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.8,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;
let svg;
let xScale;
let yScale;
let colorScale;


/* ---------- APPLICATION STATE ---------- */
let state = {
  data: [], // initialize with empty data
  selectedParty: "All" // initial filter selection
};



/* ---------- LOAD DATA ---------- */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("data", raw_data);

  // save our data to application state
  state.data = raw_data;
  init();

});



/* ---------- INITIALIZING FUNCTION ---------- */
// this will be run *one time* when the data finishes loading in
function init() {
  console.log(state)

  // + SCALES
  xScale = d3.scaleLinear()
    .domain([0, 1])
    // .domain(d3.extent(state.data, d => d.ideologyScore2020))
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  // selectElement  
  //   .selectAll("option")
  //   .data([...Array.from(new Set(state.data.map(d => d.Party))), "All"])
  //   .join("option")
  //   .attr("value", d => d)
  //   .text(d => d)

  selectElement
    .on("change", event => {
      // console.log(event.target.value);
      state.selectedParty = event.target.value;
      draw();
    })

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  svg
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${height - margin.bottom})`)
  
  svg
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${margin.left},0)`)

  draw(); // calls the draw function
}



/* ---------- DRAW FUNCTION ---------- */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedParty === "All" || d.Party === state.selectedParty);

  console.log(filteredData);

  // + APPEND HTML ELEMENTS
  svg.selectAll('circle.congress')
    .data(filteredData, d => d.BioID)
    .join(
      enter => enter.append("circle")
        .attr("r", 0)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020))
        .call(sel => sel
            .transition()
            .duration(500)
            .attr("r", 5)),
      update => update,
      exit => exit
        .call(sel => sel
            .transition()
            .duration(500)
            .attr("r", 0)
            .remove()),
    )
    .attr("class", "congress")
    .style("fill", d => colorScale(d.Party))
  
}